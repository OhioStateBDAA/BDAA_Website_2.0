import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Test the built application, so an accidentally restored administration route
// fails validation even if nobody links to it from a page.
test('production exposes only the public event and officer API routes', async () => {
  const manifest = JSON.parse(await readFile(
    new URL('../.next/server/app-paths-manifest.json', import.meta.url),
    'utf8',
  ));
  const apiRoutes = Object.keys(manifest)
    .filter(route => route.startsWith('/api/'))
    .sort();

  assert.deepEqual(apiRoutes, ['/api/events/route', '/api/officers/route']);
});
