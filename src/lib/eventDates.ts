import type { Event } from '@/types/events';

const campusTimeZone = 'America/New_York';

function campusDate(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: campusTimeZone, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date);
  const part = (name: string) => parts.find(value => value.type === name)!.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

// Airtable date-only values are calendar dates, not UTC instants.
export function eventDateKey(value: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}(?:$|T)/.test(value)) return null;
  const day = value.slice(0, 10);
  const calendarDate = new Date(day + 'T12:00:00Z');
  if (Number.isNaN(calendarDate.getTime()) || calendarDate.toISOString().slice(0, 10) !== day) return null;
  if (value === day) return day;
  if (!/(?:Z|[+-]\d{2}:\d{2})$/.test(value)) return null;
  const instant = new Date(value);
  return Number.isNaN(instant.getTime()) ? null : campusDate(instant);
}

export function formatEventDate(value: string): string {
  const day = eventDateKey(value);
  if (!day) return 'Date to be announced';
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(day + 'T12:00:00Z'));
}

export function groupEvents(events: Event[], now: Date) {
  const today = campusDate(now);
  const upcoming: Event[] = [];
  const past: Event[] = [];
  const undated: Event[] = [];
  for (const event of events) {
    const day = eventDateKey(event.date);
    if (!day) undated.push(event);
    // Event times are free-form; keep today's events visible all day.
    else if (day >= today) upcoming.push(event);
    else past.push(event);
  }
  const chronological = (a: Event, b: Event) => eventDateKey(a.date)!.localeCompare(eventDateKey(b.date)!);
  upcoming.sort(chronological);
  past.sort((a, b) => chronological(b, a));
  return { upcoming, past, undated };
}
