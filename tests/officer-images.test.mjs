import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';
const source = await readFile(new URL('../src/services/officerImage.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { officerImageUrl } = await import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));
test('portraits prefer the large thumbnail, never the tiny thumbnail or camera original', () => {
  assert.equal(officerImageUrl([{url: 'original', thumbnails: {small: {url: 'tiny'}, large: {url: 'portrait'}}}]), 'portrait');
});
test('legacy and missing attachments retain usable fallbacks', () => {
  assert.equal(officerImageUrl([{url: 'original'}]), 'original');
  for (const value of [undefined, null, [], [{}]]) assert.equal(officerImageUrl(value), '/img/default-headshot.svg');
});
