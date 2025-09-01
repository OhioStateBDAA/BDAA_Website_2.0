import { NextResponse } from 'next/server';
import { Event } from '@/types/events';
import { AirtableEventRecord, AirtableResponse } from '@/types/airtable';

export async function GET() {
  try {
    console.log('🎉 API: Fetching events from Airtable...');

    const eventsBaseId = process.env.AIRTABLE_EVENTS_BASE_ID;
    const eventsTableId = process.env.AIRTABLE_EVENTS_TABLE_ID;
    const eventsViewId = process.env.AIRTABLE_EVENTS_VIEW_ID;
    const apiKey = process.env.AIRTABLE_API_KEY;

    console.log('Base ID:', eventsBaseId);
    console.log('Table ID:', eventsTableId);
    console.log('View ID:', eventsViewId);
    console.log('API Key present:', !!apiKey);

    if (!apiKey) {
      throw new Error('AIRTABLE_API_KEY is missing from environment variables');
    }

    if (!eventsBaseId) {
      throw new Error('AIRTABLE_EVENTS_BASE_ID is missing from environment variables');
    }

    if (!eventsTableId) {
      throw new Error('AIRTABLE_EVENTS_TABLE_ID is missing from environment variables');
    }

    let url = `https://api.airtable.com/v0/${eventsBaseId}/${eventsTableId}`;
    if (eventsViewId) {
      url += `?view=${encodeURIComponent(eventsViewId)}`;
    }

    console.log('📡 Making request to:', url);

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`📊 Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      let errorDetails;

      try {
        errorDetails = JSON.parse(errorText);
      } catch {
        errorDetails = { message: errorText };
      }

      console.error(`🚨 Airtable API error (${response.status}):`, errorDetails);
      return NextResponse.json(
        { error: `Airtable API error: ${response.status} - ${JSON.stringify(errorDetails)}` },
        { status: response.status }
      );
    }

    const data: AirtableResponse = await response.json();
    const records = data.records || [];

    console.log(`✅ Successfully fetched ${records.length} event records from Airtable`);

    if (records.length === 0) {
      console.warn('⚠️ No event records found in table');
      return NextResponse.json([]);
    }

    // Process records into Event format
    const events: Event[] = records.map((record: AirtableEventRecord, index: number) => {
      const fields = record.fields;

      // Log first record structure for debugging
      if (index === 0) {
        console.log('📋 Sample event record structure:', JSON.stringify(fields, null, 2));
      }

      return {
        id: record.id,
        title: (fields['Title'] || fields['Event Name'] || fields['Name'] || 'Untitled Event') as string,
        description: (fields['Description'] || fields['Details'] || '') as string,
        date: (fields['Date'] || fields['Event Date'] || '') as string,
        time: (fields['Time'] || fields['Event Time'] || '') as string,
        location: (fields['Location'] || fields['Venue'] || '') as string,
        type: mapEventType((fields['Type'] || fields['Event Type'] || fields['Category']) as string),
        image: fields['Image'] && Array.isArray(fields['Image']) && fields['Image'][0] ? fields['Image'][0].url : undefined,
        registrationLink: (fields['Registration Link'] || fields['Registration URL'] || fields['Registration']) as string | undefined,
        featured: fields['Featured'] === true || fields['Featured'] === 'Yes' || fields['Featured'] === 'True',
      };
    });

    console.log(`🎉 Successfully processed ${events.length} events`);
    return NextResponse.json(events);

  } catch (error) {
    console.error('💥 Fatal error fetching events:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to fetch events: ${errorMessage}` },
      { status: 500 }
    );
  }
}

function mapEventType(type: string): 'workshop' | 'meeting' | 'social' | 'competition' | 'guest-speaker' {
  if (!type) return 'meeting';

  const lowerType = type.toLowerCase();
  if (lowerType.includes('workshop') || lowerType.includes('training')) return 'workshop';
  if (lowerType.includes('guest') || lowerType.includes('speaker') || lowerType.includes('panel')) return 'guest-speaker';
  if (lowerType.includes('social') || lowerType.includes('networking') || lowerType.includes('mixer')) return 'social';
  if (lowerType.includes('competition') || lowerType.includes('contest') || lowerType.includes('hackathon')) return 'competition';

  return 'meeting';
}