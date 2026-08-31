import { generateKeyPair, SignJWT } from 'jose';
import { beforeAll, describe, expect, it } from 'vitest';

import worker, {
  authenticateRequest,
  checkOrigin,
  createWorker,
  fetchContentApi,
} from '../src/worker.js';

const FIREBASE_PROJECT_ID = 'kitomat-auth-test';
const FIREBASE_ISSUER = `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`;

let privateKey;
let publicKey;
let otherPrivateKey;

beforeAll(async () => {
  ({ privateKey, publicKey } = await generateKeyPair('RS256', { modulusLength: 2048 }));
  ({ privateKey: otherPrivateKey } = await generateKeyPair('RS256', { modulusLength: 2048 }));
});

function env(overrides = {}) {
  return { FIREBASE_PROJECT_ID, ...overrides };
}

async function signToken({
  key = privateKey,
  issuer = FIREBASE_ISSUER,
  audience = FIREBASE_PROJECT_ID,
  email = 'Admin@Example.com',
  emailVerified = true,
  subject = 'firebase-user-123',
  issuedAt = Math.floor(Date.now() / 1000) - 5,
  authTime = Math.floor(Date.now() / 1000) - 10,
  expiresAt = Math.floor(Date.now() / 1000) + 300,
  includeExpiration = true,
  includeIssuedAt = true,
  includeAuthTime = true,
} = {}) {
  const payload = {};
  if (email !== null) payload.email = email;
  if (emailVerified !== null) payload.email_verified = emailVerified;
  if (includeAuthTime) payload.auth_time = authTime;
  let token = new SignJWT(payload)
    .setProtectedHeader({ alg: 'RS256', kid: 'test-key' })
    .setIssuer(issuer)
    .setAudience(audience);
  if (subject !== null) token = token.setSubject(subject);
  if (includeIssuedAt) token = token.setIssuedAt(issuedAt);
  if (includeExpiration) token = token.setExpirationTime(expiresAt);
  return token.sign(key);
}

function requestWithToken(token, headers = {}) {
  return new Request('https://kitomat-admin.example.workers.dev/', {
    headers: { Authorization: `Bearer ${token}`, ...headers },
  });
}

describe('Firebase authentication', () => {
  it('accepts a correctly signed token and normalizes the email', async () => {
    const result = await authenticateRequest(requestWithToken(await signToken()), env(), {
      firebaseKeyResolver: publicKey,
    });

    expect(result).toEqual({
      ok: true,
      identity: { email: 'admin@example.com', displayName: 'admin@example.com' },
    });
  });

  it('accepts the Firebase ID token from the secure session cookie', async () => {
    const token = await signToken();
    const request = new Request('https://kitomat-admin.example.workers.dev/', {
      headers: { Cookie: `other=value; __Host-kitomat_firebase_id_token=${token}` },
    });
    const result = await authenticateRequest(request, env(), { firebaseKeyResolver: publicKey });
    expect(result.ok).toBe(true);
  });

  it.each([
    ['missing token', () => new Request('https://kitomat-admin.example.workers.dev/')],
    ['wrong signature', async () => requestWithToken(await signToken({ key: otherPrivateKey }))],
    ['wrong issuer', async () => requestWithToken(await signToken({ issuer: 'https://securetoken.google.com/wrong-project' }))],
    ['wrong audience', async () => requestWithToken(await signToken({ audience: 'wrong-project' }))],
    ['expired token', async () => requestWithToken(await signToken({ expiresAt: Math.floor(Date.now() / 1000) - 60 }))],
    ['missing expiration', async () => requestWithToken(await signToken({ includeExpiration: false }))],
    ['missing issued-at', async () => requestWithToken(await signToken({ includeIssuedAt: false }))],
    ['future issued-at', async () => requestWithToken(await signToken({ issuedAt: Math.floor(Date.now() / 1000) + 60 }))],
    ['missing auth-time', async () => requestWithToken(await signToken({ includeAuthTime: false }))],
    ['future auth-time', async () => requestWithToken(await signToken({ authTime: Math.floor(Date.now() / 1000) + 60 }))],
    ['missing subject', async () => requestWithToken(await signToken({ subject: null }))],
    ['missing email', async () => requestWithToken(await signToken({ email: null }))],
    ['unverified email', async () => requestWithToken(await signToken({ emailVerified: false }))],
  ])('rejects %s', async (_label, makeRequest) => {
    const request = await makeRequest();
    const result = await authenticateRequest(request, env(), { firebaseKeyResolver: publicKey });
    expect(result.ok).toBe(false);
    expect(result.status).toBe(403);
  });

  it('fails closed when Firebase configuration is incomplete or malformed', async () => {
    const token = await signToken();
    expect((await authenticateRequest(requestWithToken(token), env({ FIREBASE_PROJECT_ID: '' }))).ok).toBe(false);
    expect((await authenticateRequest(requestWithToken(token), env({ FIREBASE_PROJECT_ID: 'invalid_project!' }))).ok).toBe(false);
  });

  it('ignores forged legacy identity headers and does not touch D1', async () => {
    let dbCalls = 0;
    const DB = {
      prepare() {
        dbCalls += 1;
        throw new Error('D1 must not be called before authentication');
      },
    };
    const hardenedWorker = createWorker({ firebaseKeyResolver: publicKey });
    const response = await hardenedWorker.fetch(new Request(
      'https://kitomat-admin.example.workers.dev/api/admin/state',
      {
        headers: {
          'Cf-Access-Jwt-Assertion': await signToken(),
          'oai-authenticated-user-email': 'attacker@example.com',
          'x-openai-workspace-user': 'attacker@example.com',
        },
      },
    ), env({ DB }));

    expect(response.status).toBe(403);
    expect(dbCalls).toBe(0);
  });

  it('serves only the Firebase login shell on an unauthenticated root request', async () => {
    let dbCalls = 0;
    const DB = { prepare() { dbCalls += 1; } };
    const response = await worker.fetch(new Request('https://kitomat-admin.example.workers.dev/'), env({
      DB,
      FIREBASE_API_KEY: 'test-api-key',
      FIREBASE_AUTH_DOMAIN: 'kitomat-auth-test.firebaseapp.com',
      FIREBASE_APP_ID: '1:123:web:test',
    }));
    expect(response.status).toBe(200);
    const html = await response.text();
    expect(html).toContain('Mit Google anmelden');
    expect(html).toContain('signInWithRedirect');
    expect(html).not.toContain('signInWithPopup');
    expect(dbCalls).toBe(0);
  });

  it('proxies Firebase auth helpers on the app origin before authentication or D1', async () => {
    let dbCalls = 0;
    let upstreamUrl = '';
    const DB = { prepare() { dbCalls += 1; } };
    const __FETCH = async (request) => {
      upstreamUrl = request.url;
      return new Response('firebase-helper', {
        status: 200,
        headers: { 'content-type': 'text/html' },
      });
    };

    const response = await worker.fetch(new Request(
      'https://kitomat-admin.example.workers.dev/__/auth/iframe?apiKey=test',
    ), env({ DB, __FETCH }));

    expect(response.status).toBe(200);
    expect(await response.text()).toBe('firebase-helper');
    expect(upstreamUrl).toBe(
      'https://kitomat-auth-test.firebaseapp.com/__/auth/iframe?apiKey=test',
    );
    expect(dbCalls).toBe(0);
  });

  it('exports production API routes in fail-closed mode', async () => {
    const response = await worker.fetch(new Request('https://kitomat-admin.example.workers.dev/api/admin/state'), env());
    expect(response.status).toBe(403);
  });

  it('does not invoke the content service before authentication', async () => {
    let contentCalls = 0;
    const CONTENT_API = {
      async fetch() {
        contentCalls += 1;
        return new Response(JSON.stringify({ artifacts: [] }));
      },
    };

    const response = await worker.fetch(
      new Request('https://kitomat-admin.example.workers.dev/api/admin/state'),
      env({ CONTENT_API }),
    );

    expect(response.status).toBe(403);
    expect(contentCalls).toBe(0);
  });

  it('rejects a valid-JWT POST without Origin before touching D1', async () => {
    let dbCalls = 0;
    const DB = {
      prepare() {
        dbCalls += 1;
        throw new Error('D1 must not be called before origin validation');
      },
    };
    const hardenedWorker = createWorker({ firebaseKeyResolver: publicKey });
    const response = await hardenedWorker.fetch(new Request(
      'https://kitomat-admin.example.workers.dev/api/admin/notes',
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${await signToken()}` },
      },
    ), env({ DB, ALLOWED_ORIGIN: 'https://kitomat-admin.example.workers.dev' }));

    expect(response.status).toBe(403);
    expect(dbCalls).toBe(0);
  });
});

describe('POST origin protection', () => {
  const allowedEnv = { ALLOWED_ORIGIN: 'https://kitomat-admin.example.workers.dev' };

  it('accepts the exact same origin', () => {
    const request = new Request('https://kitomat-admin.example.workers.dev/api/admin/notes', {
      method: 'POST',
      headers: { Origin: allowedEnv.ALLOWED_ORIGIN },
    });
    expect(checkOrigin(request, allowedEnv)).toBeNull();
  });

  it.each([
    ['missing origin', {}],
    ['wrong origin', { Origin: 'https://evil.example' }],
    ['missing configuration', { Origin: 'https://kitomat-admin.example.workers.dev' }, {}],
  ])('rejects %s', (_label, headers, originEnv = allowedEnv) => {
    const request = new Request('https://kitomat-admin.example.workers.dev/api/admin/notes', {
      method: 'POST',
      headers,
    });
    expect(checkOrigin(request, originEnv).status).toBe(403);
  });
});

describe('Content API service binding', () => {
  it('uses the bound Worker and preserves the configured public request URL', async () => {
    let requestSeen;
    const CONTENT_API = {
      async fetch(request) {
        requestSeen = request;
        return Response.json({ artifacts: [{ id: 'demo' }] });
      },
    };

    const response = await fetchContentApi(
      { CONTENT_API },
      'https://kitomat-content-api.ki-tomat.workers.dev',
    );

    expect(response.status).toBe(200);
    expect(requestSeen.url).toBe(
      'https://kitomat-content-api.ki-tomat.workers.dev/api/content',
    );
    expect(requestSeen.headers.get('accept')).toBe('application/json');
  });
});
