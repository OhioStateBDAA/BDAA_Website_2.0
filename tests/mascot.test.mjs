import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

const source = await readFile(new URL('../src/components/mascot/guideMotion.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { guidePosition } = await import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));

const base = { progress: 0, viewportWidth: 1280, viewportHeight: 800, guideWidth: 72, guideHeight: 78, still: false };
test('guide stays in the gutters outside the crossing', () => {
  assert.equal(guidePosition({ ...base, crossingCenter: 1200 }).x, 1206);
  assert.equal(guidePosition({ ...base, crossingCenter: 100 }).x, 2);
});
test('crossing follows the empty lane from right to left', () => {
  for (const center of [600, 500, 400, 300, 200]) {
    const position = guidePosition({ ...base, crossingCenter: center });
    assert.equal(position.y + base.guideHeight / 2, center);
    assert.ok(position.x >= 2 && position.x <= 1206);
  }
  assert.equal(guidePosition({ ...base, crossingCenter: 400 }).x, 604);
});
test('reduced motion stays docked and phone paths stay in bounds', () => {
  for (const crossingCenter of [1000, 600, 400, 200, -100]) {
    assert.deepEqual(guidePosition({ ...base, crossingCenter, still: true }), { x: 1206, y: 706 });
    const phone = guidePosition({ ...base, crossingCenter, viewportWidth: 320, guideWidth: 48, guideHeight: 52 });
    assert.ok(phone.x >= 0 && phone.x + 48 <= 320);
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
