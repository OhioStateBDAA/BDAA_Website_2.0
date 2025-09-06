import { TeamMember, YearBoard, Event, EventType } from '@/types/events';
import { 
  AirtableRecord, 
  AirtableResponse, 
  AirtableImage,
  EVENT_FIELD_MAP,
  OFFICER_FIELD_MAP 
} from '@/types/airtable';

// Generic Airtable client
class AirtableClient {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.AIRTABLE_API_KEY_READ_ONLY || process.env.AIRTABLE_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('AIRTABLE_API_KEY_READ_ONLY or AIRTABLE_API_KEY is required');
    }
  }

  async fetch<T = Record<string, unknown>>(
    baseId: string, 
    tableId: string, 
    viewId?: string
  ): Promise<AirtableRecord<T>[]> {
    if (!baseId || !tableId) {
      throw new Error('Base ID and Table ID are required');
    }

    let url = `https://api.airtable.com/v0/${baseId}/${tableId}`;
    if (viewId) url += `?view=${encodeURIComponent(viewId)}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Airtable API error (${response.status}): ${error}`);
    }

    const data: AirtableResponse<T> = await response.json();
    return data.records || [];
  }
}

// Field mapping utility
function getFieldValue(fields: Record<string, unknown>, possibleNames: readonly string[]): unknown {
  for (const name of possibleNames) {
    if (fields[name] !== undefined) return fields[name];
  }
  return null;
}

function getImageUrl(imageField: unknown, fallback = '/img/default-headshot.png'): string {
  if (Array.isArray(imageField) && imageField[0]) {
    return (imageField[0] as AirtableImage).url;
  }
  return fallback;
}

// Event type mapping
function mapEventType(type: string): EventType {
  if (!type) return 'meeting';
  
  const lower = type.toLowerCase();
  if (lower.includes('workshop')) return 'workshop';
  if (lower.includes('guest') || lower.includes('speaker')) return 'guest-speaker';
  if (lower.includes('social') || lower.includes('networking')) return 'social';
  if (lower.includes('competition') || lower.includes('hackathon')) return 'competition';
  return 'meeting';
}

// Initialize client
const client = new AirtableClient();

// Officer functions
export async function fetchOfficersFromAirtable(): Promise<YearBoard[]> {
  try {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableId = process.env.AIRTABLE_TABLE_ID || process.env.AIRTABLE_TABLE_NAME;
    
    if (!baseId || !tableId) {
      throw new Error('Missing Airtable configuration for officers');
    }

    const records = await client.fetch(baseId, tableId);
    const groupedData: { [key: string]: TeamMember[] } = {};

    records.forEach((record) => {
      const { fields } = record;
      
      // Skip if no name
      const name = getFieldValue(fields, OFFICER_FIELD_MAP.name);
      if (!name) return;

      const officer: TeamMember = {
        name: name as string,
        img: getImageUrl(getFieldValue(fields, OFFICER_FIELD_MAP.image)),
        role: getFieldValue(fields, OFFICER_FIELD_MAP.role) as string || '',
        linkedIn: getFieldValue(fields, OFFICER_FIELD_MAP.linkedIn) as string || '',
        school_year: getFieldValue(fields, OFFICER_FIELD_MAP.schoolYear) as string || '',
        major: getFieldValue(fields, OFFICER_FIELD_MAP.major) as string || '',
        minor: getFieldValue(fields, OFFICER_FIELD_MAP.minor) as string || 'N/A',
        work_experience: getFieldValue(fields, OFFICER_FIELD_MAP.workExperience) as string || '',
        fun_fact: getFieldValue(fields, OFFICER_FIELD_MAP.funFact) as string || '',
        email: getFieldValue(fields, OFFICER_FIELD_MAP.email) as string || '',
      };

      const year = getFieldValue(fields, OFFICER_FIELD_MAP.year) as string || '2025';
      const semester = getFieldValue(fields, OFFICER_FIELD_MAP.semester) as string || 'Spring';
      const key = `${semester}${year}`;

      if (!groupedData[key]) groupedData[key] = [];
      groupedData[key].push(officer);
    });

    // Convert to YearBoard format and sort
    const boards: YearBoard[] = Object.entries(groupedData)
      .map(([key, officers]) => {
        const semester = key.includes('Spring') ? 'Spring' : 'Fall';
        const year = key.replace('Spring', '').replace('Fall', '');
        
        return {
          year,
          semester,
          displayName: `${semester} ${year}`,
          officers: officers.sort((a, b) => {
            const roleOrder = ['President', 'Vice President', 'Treasurer', 'Secretary'];
            const aIndex = roleOrder.indexOf(a.role);
            const bIndex = roleOrder.indexOf(b.role);
            
            if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;
            return a.name.localeCompare(b.name);
          })
        };
      })
      .sort((a, b) => {
        if (a.year !== b.year) return parseInt(b.year) - parseInt(a.year);
        return a.semester === 'Spring' && b.semester === 'Fall' ? -1 : 
               a.semester === 'Fall' && b.semester === 'Spring' ? 1 : 0;
      });

    return boards;
  } catch (error) {
    console.error('Failed to fetch officers:', error);
    throw error;
  }
}

export async function getCurrentBoardFromAirtable(): Promise<YearBoard> {
  const boards = await fetchOfficersFromAirtable();
  return boards[0];
}

export async function getBoardByKeyFromAirtable(key: string): Promise<YearBoard | undefined> {
  const boards = await fetchOfficersFromAirtable();
  return boards.find(board => `${board.semester}${board.year}` === key);
}

// Event functions
export async function fetchEventsFromAirtable(): Promise<Event[]> {
  try {
    const baseId = process.env.AIRTABLE_EVENTS_BASE_ID;
    const tableId = process.env.AIRTABLE_EVENTS_TABLE_ID;
    const viewId = process.env.AIRTABLE_EVENTS_VIEW_ID;
    
    if (!baseId || !tableId) {
      console.warn('Missing Airtable events configuration, returning empty array');
      return [];
    }

    const records = await client.fetch(baseId, tableId, viewId);

    return records.map((record): Event => {
      const { fields } = record;

      return {
        id: record.id,
        title: getFieldValue(fields, EVENT_FIELD_MAP.title) as string || 'Untitled Event',
        description: getFieldValue(fields, EVENT_FIELD_MAP.description) as string || '',
        date: getFieldValue(fields, EVENT_FIELD_MAP.date) as string || '',
        time: getFieldValue(fields, EVENT_FIELD_MAP.time) as string || '',
        location: getFieldValue(fields, EVENT_FIELD_MAP.location) as string || '',
        type: mapEventType(getFieldValue(fields, EVENT_FIELD_MAP.type) as string),
        image: getImageUrl(getFieldValue(fields, EVENT_FIELD_MAP.image), undefined),
        registrationLink: getFieldValue(fields, EVENT_FIELD_MAP.registrationLink) as string || undefined,
        featured: ['true', 'yes', '1'].includes(
          String(getFieldValue(fields, EVENT_FIELD_MAP.featured)).toLowerCase()
        ) || getFieldValue(fields, EVENT_FIELD_MAP.featured) === true,
      };
    });
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return []; // Return empty array to prevent page crashes
  }
}