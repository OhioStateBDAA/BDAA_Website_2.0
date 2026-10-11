import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

const source = await readFile(new URL('../src/components/mascot/guideMotion.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { guidePosition } = await import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));

test('guide stays within phone and desktop viewports throughout its journey', () => {
  for (const [viewport, width] of [[320, 126], [390, 126], [768, 180], [1440, 180]]) {
    for (let i = 0; i <= 100; i++) {
      const { x, y } = guidePosition(i / 100, viewport, width, false);
      assert.ok(x >= 0 && x + width <= viewport);
      assert.ok(Math.abs(y) <= 12);
    }
    assert.ok(guidePosition(0, viewport, width, false).x > guidePosition(0.5, viewport, width, false).x);
    assert.deepEqual(guidePosition(0, viewport, width, false), guidePosition(-1, viewport, width, false));
  }
});

test('paused and reduced-motion guide remains stationary regardless of scroll', () => {
  for (const p of [0, 0.25, 0.5, 0.75, 1]) {
    assert.deepEqual(guidePosition(p, 390, 126, true), { x: 248, y: 0 });
  }
});

test('bundled model is self-contained and includes the interactive animations', async () => {
  const bytes = await readFile(new URL('../public/mascot/bdaa-mascot.glb', import.meta.url));
  assert.equal(bytes.toString('utf8', 0, 4), 'glTF');
  assert.equal(bytes.readUInt32LE(4), 2);
  assert.ok(bytes.length < 300_000);
  const model = JSON.parse(bytes.toString('utf8', 20, 20 + bytes.readUInt32LE(12)));
  for (const name of ['Idle', 'Run', 'Wave']) assert.ok(model.animations.some(clip => clip.name === name));
  assert.ok(model.buffers.every(buffer => !buffer.uri));
  assert.ok(model.images.every(image => image.bufferView !== undefined));
});
