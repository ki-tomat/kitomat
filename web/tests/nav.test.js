import { describe, expect, it } from 'vitest';
import { isRouteAllowed } from '../src/lib/nav.js';

describe('role guarded routes', () => {
  it('keeps AP4 and AP5 public routes open except my requests', () => {
    expect(isRouteAllowed('dashboard', 'user')).toBe(true);
    expect(isRouteAllowed('library', 'user')).toBe(true);
    expect(isRouteAllowed('detail', 'user')).toBe(true);
    expect(isRouteAllowed('contribution', 'user')).toBe(true);
    expect(isRouteAllowed('community', 'user')).toBe(true);
    expect(isRouteAllowed('faq', 'user')).toBe(true);
    expect(isRouteAllowed('about', 'user')).toBe(true);
  });

  it('allows my requests only for contributors', () => {
    expect(isRouteAllowed('my-requests', 'user')).toBe(false);
    expect(isRouteAllowed('my-requests', 'contributor')).toBe(true);
    expect(isRouteAllowed('my-requests', 'reviewer')).toBe(false);
    expect(isRouteAllowed('my-requests', 'maintainer')).toBe(false);
    expect(isRouteAllowed('my-requests', 'admin')).toBe(false);
  });

  it('allows review only for review roles', () => {
    expect(isRouteAllowed('review', 'user')).toBe(false);
    expect(isRouteAllowed('review', 'contributor')).toBe(false);
    expect(isRouteAllowed('review', 'reviewer')).toBe(true);
    expect(isRouteAllowed('review', 'maintainer')).toBe(true);
    expect(isRouteAllowed('review', 'admin')).toBe(true);
  });

  it('allows admin only for admins', () => {
    expect(isRouteAllowed('admin', 'user')).toBe(false);
    expect(isRouteAllowed('admin', 'contributor')).toBe(false);
    expect(isRouteAllowed('admin', 'reviewer')).toBe(false);
    expect(isRouteAllowed('admin', 'maintainer')).toBe(false);
    expect(isRouteAllowed('admin', 'admin')).toBe(true);
  });
});
