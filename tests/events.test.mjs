import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

async function loadTypescript(path, transform = value => value) {
  const source = await readFile(new URL(path, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  return 'data:text/javascript;base64,' + Buffer.from(transform(outputText)).toString('base64');
}
const { eventDateKey, formatEventDate, groupEvents } = await import(
  await loadTypescript('../src/lib/eventDates.ts')
);

test('calendar dates do not shift with the visitor timezone', () => {
  const original = process.env.TZ;
  try {
    for (const zone of ['America/Los_Angeles', 'Asia/Tokyo', 'UTC']) {
      process.env.TZ = zone;
      assert.equal(formatEventDate('2025-09-09'), 'Tuesday, September 9, 2025');
    }
  } finally {
    if (original === undefined) delete process.env.TZ;
    else process.env.TZ = original;
  }
});

test('invalid or missing dates have an honest label', () => {
  for (const value of ['', 'invalid', '2025-02-29', '2025-13-01', '2025-09-09T10:00:00']) {
    assert.equal(eventDateKey(value), null);
    assert.equal(formatEventDate(value), 'Date to be announced');
  }
  assert.equal(eventDateKey('2024-02-29'), '2024-02-29');
});

test('timestamps use the campus date, including across DST', () => {
  assert.equal(eventDateKey('2026-03-08T04:59:00Z'), '2026-03-07');
  assert.equal(eventDateKey('2026-03-08T07:01:00Z'), '2026-03-08');
});

test('today stays upcoming until campus midnight, with sorted archives and undated records', () => {
  const events = ['2026-09-29', '', '2026-09-26', '2026-09-28', '2026-09-25'].map(date => ({ date }));
  const original = [...events];
  const beforeMidnight = groupEvents(events, new Date('2026-09-27T03:59:59Z'));
  assert.deepEqual(beforeMidnight.upcoming.map(event => event.date), ['2026-09-26', '2026-09-28', '2026-09-29']);
  const afterMidnight = groupEvents(events, new Date('2026-09-27T04:00:00Z'));
  assert.deepEqual(afterMidnight.upcoming.map(event => event.date), ['2026-09-28', '2026-09-29']);
  assert.deepEqual(afterMidnight.past.map(event => event.date), ['2026-09-26', '2026-09-25']);
  assert.equal(afterMidnight.undated.length, 1);
  assert.deepEqual(events, original);
  assert.deepEqual(groupEvents([], new Date()), { upcoming: [], past: [], undated: [] });
});

test('Airtable failures reject instead of masquerading as an empty calendar', async () => {
  const fieldsUrl = await loadTypescript('../src/types/airtable.ts');
  const imageUrl = await loadTypescript('../src/services/officerImage.ts');
  const serviceUrl = await loadTypescript('../src/services/airtable.ts', source =>
    source.replaceAll('@/types/airtable', fieldsUrl).replaceAll('./officerImage', imageUrl));
  const { fetchEventsFromAirtable } = await import(serviceUrl);
  const keys = ['AIRTABLE_API_KEY', 'AIRTABLE_API_KEY_READ_ONLY', 'AIRTABLE_EVENTS_BASE_ID', 'AIRTABLE_EVENTS_TABLE_ID'];
  const originalEnv = Object.fromEntries(keys.map(key => [key, process.env[key]]));
  const originalFetch = globalThis.fetch;
  const originalError = console.error;
  console.error = () => {};
  try {
    keys.forEach(key => delete process.env[key]);
    await assert.rejects(fetchEventsFromAirtable(), /Missing Airtable events configuration/);
    process.env.AIRTABLE_EVENTS_BASE_ID = 'test-base';
    process.env.AIRTABLE_EVENTS_TABLE_ID = 'test-table';
    await assert.rejects(fetchEventsFromAirtable(), /API_KEY/);
    process.env.AIRTABLE_API_KEY_READ_ONLY = 'test-key';
    globalThis.fetch = async () => new Response('unavailable', { status: 503 });
    await assert.rejects(fetchEventsFromAirtable(), /503/);
    globalThis.fetch = async () => Response.json({ records: [] });
    assert.deepEqual(await fetchEventsFromAirtable(), []);
  } finally {
    globalThis.fetch = originalFetch;
    console.error = originalError;
    for (const [key, value] of Object.entries(originalEnv)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
