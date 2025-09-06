import { NextResponse } from 'next/server';
import { fetchEventsFromAirtable } from '@/services/airtable';

export async function GET() {
  try {
    const events = await fetchEventsFromAirtable();
    return NextResponse.json(events);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to fetch events: ${errorMessage}` },
      { status: 500 }
    );
  }
}

