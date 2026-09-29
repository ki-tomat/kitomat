import { describe, expect, it } from 'vitest';

import { ap15ZipName, buildAp15SubmissionUrl, hasOnlyTextPackageFiles } from '../src/lib/ap15Handoff.js';

describe('AP15 contribution handoff', () => {
  it('builds a prefilled portal URL without transferring package data', () => {
    const url = new URL(buildAp15SubmissionUrl('https://submissions.example/', {
      id: 'mein-test-prompt',
      type: 'prompt',
    }));
    expect(url.origin).toBe('https://submissions.example');
    expect(url.pathname).toBe('/');
    expect(url.searchParams.get('artifactId')).toBe('mein-test-prompt');
    expect(url.searchParams.get('artifactType')).toBe('prompt');
  });

  it('uses a deterministic AP15 filename', () => {
    expect(ap15ZipName('industry', 'kmu-plan')).toBe('kitomat-ap15-industry-kmu-plan.zip');
  });

  it('allows only generated text files in the AP15 ZIP', () => {
    expect(hasOnlyTextPackageFiles([{ path: 'prompts/demo/README.md', content: 'Text' }])).toBe(true);
    expect(hasOnlyTextPackageFiles([{ path: 'prompts/demo/attachment.pdf', binary: new ArrayBuffer(4) }])).toBe(false);
  });
});
