import { NextResponse } from 'next/server';
import { fetchEventsFromAirtable } from '@/services/airtable';

export async function GET() {
  try {
    const events = await fetchEventsFromAirtable();
    return NextResponse.json(events);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json(
      { error: 'Unable to load events. Please try again.' },
      { status: 500 }
    );
  }
}

