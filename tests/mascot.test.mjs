import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

const source = await readFile(new URL('../src/components/mascot/guideMotion.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { crossingPosition } = await import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));

test('crossing stays in its lane and clamps progress', () => {
  assert.deepEqual(crossingPosition(1200, 80, 400, -1), { x: 1200, y: 361 });
  assert.deepEqual(crossingPosition(1200, 80, 400, 2), { x: 80, y: 361 });
  let previous = 1200;
  for (let step = 0; step <= 100; step++) {
    const point = crossingPosition(1200, 80, 400, step / 100);
    assert.ok(point.x <= previous && point.x >= 80);
    assert.equal(point.y, 361);
    previous = point.x;
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
