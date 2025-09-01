// import Airtable from 'airtable';
import { TeamMember, YearBoard, Event } from '@/types/events';

// Configure Airtable with Personal Access Token
// const base = new Airtable({
//   apiKey: process.env.AIRTABLE_API_KEY,
// }).base(process.env.AIRTABLE_BASE_ID!);

// const table = base(process.env.AIRTABLE_TABLE_NAME!);

// interface AirtableRecord {
//   id: string;
//   fields: {
//     Name?: string;
//     Image?: Array<{ url: string; filename: string }>;
//     Role?: string;
//     LinkedIn?: string;
//     'School Year'?: string;
//     Major?: string;
//     Minor?: string;
//     'Work Experience'?: string;
//     'Fun Fact'?: string;
//     Email?: string;
//     Year?: string;
//     Semester?: string;
//     Status?: string;
//   };
// }

export async function fetchOfficersFromAirtable(): Promise<YearBoard[]> {
  const startTime = Date.now();
  
  try {
    // Enhanced configuration logging
    const config = {
      baseId: process.env.AIRTABLE_BASE_ID,
      tableName: process.env.AIRTABLE_TABLE_NAME,
      tableId: process.env.AIRTABLE_TABLE_ID,
      hasApiKey: !!process.env.AIRTABLE_API_KEY,
      apiKeyPrefix: process.env.AIRTABLE_API_KEY?.substring(0, 10) + '...'
    };
    console.log('🔧 Airtable Configuration:', config);

    // Validation checks
    if (!process.env.AIRTABLE_API_KEY) {
      throw new Error('❌ AIRTABLE_API_KEY is missing from environment variables');
    }
    
    if (!process.env.AIRTABLE_BASE_ID) {
      throw new Error('❌ AIRTABLE_BASE_ID is missing from environment variables');
    }
    
    if (!process.env.AIRTABLE_TABLE_NAME && !process.env.AIRTABLE_TABLE_ID) {
      throw new Error('❌ Either AIRTABLE_TABLE_NAME or AIRTABLE_TABLE_ID must be provided');
    }

    const tableIdentifier = process.env.AIRTABLE_TABLE_ID || encodeURIComponent(process.env.AIRTABLE_TABLE_NAME!);
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${tableIdentifier}`;
    
    console.log('📡 Making request to:', url);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
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
      
      // Enhanced error reporting based on status code
      switch (response.status) {
        case 401:
          console.error('🔐 Authentication Error: Invalid API key or insufficient permissions');
          console.error('💡 Solution: Check your Personal Access Token and ensure it has data.records:read permission');
          break;
        case 403:
          console.error('🚫 Forbidden: API key lacks permission to access this base/table');
          console.error('💡 Solution: Ensure your PAT has access to base:', process.env.AIRTABLE_BASE_ID);
          break;
        case 404:
          console.error('🔍 Not Found: Base or table does not exist');
          console.error('💡 Check: Base ID =', process.env.AIRTABLE_BASE_ID);
          console.error('💡 Check: Table =', tableIdentifier);
          break;
        case 422:
          console.error('📝 Invalid Request: Check field names and data format');
          break;
        case 429:
          console.error('⏰ Rate Limited: Too many requests to Airtable API');
          console.error('💡 Solution: Reduce request frequency or implement retry logic');
          break;
        default:
          console.error(`🚨 Unexpected error (${response.status}):`, errorDetails);
      }
      
      throw new Error(`Airtable API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorDetails)}`);
    }

    const data = await response.json();
    const records = data.records || [];
    
    console.log(`✅ Successfully fetched ${records.length} records from Airtable`);
    
    if (records.length === 0) {
      console.warn('⚠️ No records found in table. This might indicate:');
      console.warn('   • Empty table');
      console.warn('   • Wrong table name/ID');
      console.warn('   • Records filtered out by permissions');
      return [];
    }

    // Group officers by year and semester
    const groupedData: { [key: string]: TeamMember[] } = {};

    // Process records with enhanced error handling
    let processedCount = 0;
    let skippedCount = 0;
    const fieldMissingCounts: { [key: string]: number } = {};

    records.forEach((record: { id: string; fields: Record<string, unknown> }, index: number) => {
      try {
        const fields = record.fields;
        
        // Log sample record structure (first record only)
        if (index === 0) {
          console.log('📋 Sample record structure:', JSON.stringify(fields, null, 2));
        }

        // Validate required fields
        if (!fields.Name) {
          console.warn(`⚠️ Record ${index + 1}: Missing required field 'Name', skipping record`);
          skippedCount++;
          return;
        }

        // Track missing optional fields for analytics
        const optionalFields = ['Role', 'LinkedIn', 'School Year', 'Major', 'Work Experience', 'Fun Fact', 'Email', 'Image'];
        optionalFields.forEach(field => {
          if (!fields[field] || (Array.isArray(fields[field]) && fields[field].length === 0)) {
            fieldMissingCounts[field] = (fieldMissingCounts[field] || 0) + 1;
          }
        });
        
        const officer: TeamMember = {
          name: (fields.Name as string) || '',
          img: (Array.isArray(fields.Image) && fields.Image[0] ? (fields.Image[0] as { url: string }).url : '/img/default-headshot.png'),
          role: (fields.Role as string) || '',
          linkedIn: (fields.LinkedIn as string) || '',
          school_year: (fields['School Year'] as string) || '',
          major: (fields.Major as string) || '',
          minor: (fields.Minor as string) || 'N/A',
          work_experience: (fields['Work Experience'] as string) || '',
          fun_fact: (fields['Fun Fact'] as string) || '',
          email: (fields.Email as string) || '',
        };

        const year = (fields.Year as string) || '2025';
        const semester = (fields.Semester as string) || 'Spring';
        const key = `${semester}${year}`;

        if (!groupedData[key]) {
          groupedData[key] = [];
        }
        groupedData[key].push(officer);
        processedCount++;
        
      } catch (recordError) {
        console.error(`❌ Error processing record ${index + 1}:`, recordError);
        skippedCount++;
      }
    });

    // Report processing statistics
    console.log(`📊 Processing Summary:`);
    console.log(`   ✅ Successfully processed: ${processedCount} records`);
    if (skippedCount > 0) {
      console.log(`   ⚠️ Skipped records: ${skippedCount}`);
    }
    
    // Report missing field statistics
    if (Object.keys(fieldMissingCounts).length > 0) {
      console.log(`📈 Missing field statistics:`);
      Object.entries(fieldMissingCounts).forEach(([field, count]) => {
        console.log(`   • ${field}: missing in ${count}/${records.length} records (${Math.round(count/records.length*100)}%)`);
      });
    }

    // Convert grouped data to YearBoard format
    const boardHistory: YearBoard[] = Object.entries(groupedData).map(([key, officers]) => {
      const semester = key.includes('Spring') ? 'Spring' : 'Fall';
      const year = key.replace('Spring', '').replace('Fall', '');
      
      return {
        year,
        semester,
        displayName: `${semester} ${year}`,
        officers: officers.sort((a, b) => {
          // Sort by role hierarchy
          const roleOrder = ['President', 'Vice President', 'Treasurer', 'Secretary'];
          const aIndex = roleOrder.indexOf(a.role);
          const bIndex = roleOrder.indexOf(b.role);
          
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return a.name.localeCompare(b.name);
        })
      };
    });

    // Sort by year and semester (most recent first)
    const sortedBoardHistory = boardHistory.sort((a, b) => {
      if (a.year !== b.year) {
        return parseInt(b.year) - parseInt(a.year);
      }
      // Spring comes after Fall in academic year
      if (a.semester === 'Spring' && b.semester === 'Fall') return -1;
      if (a.semester === 'Fall' && b.semester === 'Spring') return 1;
      return 0;
    });

    const duration = Date.now() - startTime;
    console.log(`⏱️ Total processing time: ${duration}ms`);
    console.log(`🏆 Final result: ${sortedBoardHistory.length} boards with ${processedCount} total officers`);
    
    // Log summary of each board
    sortedBoardHistory.forEach(board => {
      console.log(`   📅 ${board.displayName}: ${board.officers.length} officers`);
    });

    return sortedBoardHistory;

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`💥 Fatal error after ${duration}ms:`, error);
    
    // Enhanced error context
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack?.split('\n').slice(0, 3).join('\n') // First 3 lines of stack
      });
    }
    
    console.error('🔧 Troubleshooting checklist:');
    console.error('   1. Verify Airtable Personal Access Token is valid');
    console.error('   2. Check base ID and table name/ID are correct');
    console.error('   3. Ensure token has data.records:read permission');
    console.error('   4. Confirm table exists and has records');
    console.error('   5. Check network connectivity to Airtable API');
    
    throw new Error('Failed to fetch officer data from Airtable');
  }
}

export async function getCurrentBoardFromAirtable(): Promise<YearBoard> {
  const boards = await fetchOfficersFromAirtable();
  return boards[0]; // Most recent board
}

export async function getBoardByKeyFromAirtable(key: string): Promise<YearBoard | undefined> {
  const boards = await fetchOfficersFromAirtable();
  return boards.find(board => `${board.semester}${board.year}` === key);
}

// Events Airtable Functions
export async function fetchEventsFromAirtable(): Promise<Event[]> {
  const startTime = Date.now();
  
  try {
    const eventsBaseId = process.env.AIRTABLE_EVENTS_BASE_ID;
    const eventsTableId = process.env.AIRTABLE_EVENTS_TABLE_ID;
    const eventsViewId = process.env.AIRTABLE_EVENTS_VIEW_ID;
    
    console.log('🎉 Fetching events from Airtable...');
    console.log('Base ID:', eventsBaseId);
    console.log('Table ID:', eventsTableId);
    console.log('View ID:', eventsViewId);

    if (!process.env.AIRTABLE_API_KEY) {
      throw new Error('❌ AIRTABLE_API_KEY is missing from environment variables');
    }
    
    if (!eventsBaseId) {
      throw new Error('❌ AIRTABLE_EVENTS_BASE_ID is missing from environment variables');
    }
    
    if (!eventsTableId) {
      throw new Error('❌ AIRTABLE_EVENTS_TABLE_ID is missing from environment variables');
    }

    let url = `https://api.airtable.com/v0/${eventsBaseId}/${eventsTableId}`;
    if (eventsViewId) {
      url += `?view=${encodeURIComponent(eventsViewId)}`;
    }
    
    console.log('📡 Making request to:', url);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
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
      throw new Error(`Airtable API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorDetails)}`);
    }

    const data = await response.json();
    const records = data.records || [];
    
    console.log(`✅ Successfully fetched ${records.length} event records from Airtable`);
    
    if (records.length === 0) {
      console.warn('⚠️ No event records found in table');
      return [];
    }

    // Process records into Event format
    const events: Event[] = records.map((record: { id: string; fields: Record<string, unknown> }, index: number) => {
      const fields = record.fields;
      
      // Log first record structure for debugging
      if (index === 0) {
        console.log('📋 Sample event record structure:', JSON.stringify(fields, null, 2));
      }

      return {
        id: record.id,
        title: fields['Title'] || fields['Event Name'] || fields['Name'] || 'Untitled Event',
        description: fields['Description'] || fields['Details'] || '',
        date: fields['Date'] || fields['Event Date'] || '',
        time: fields['Time'] || fields['Event Time'] || '',
        location: fields['Location'] || fields['Venue'] || '',
        type: mapEventType((fields['Type'] || fields['Event Type'] || fields['Category']) as string),
        image: fields['Image'] && Array.isArray(fields['Image']) && fields['Image'][0] ? (fields['Image'][0] as { url: string }).url : undefined,
        registrationLink: (fields['Registration Link'] || fields['Registration URL'] || fields['Registration']) as string | undefined,
        featured: fields['Featured'] === true || fields['Featured'] === 'Yes' || fields['Featured'] === 'True',
      };
    });

    const duration = Date.now() - startTime;
    console.log(`⏱️ Total processing time: ${duration}ms`);
    console.log(`🎉 Successfully processed ${events.length} events`);
    
    return events;

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`💥 Fatal error fetching events after ${duration}ms:`, error);
    
    console.error('🔧 Events troubleshooting checklist:');
    console.error('   1. Verify events base ID:', process.env.AIRTABLE_EVENTS_BASE_ID);
    console.error('   2. Verify events table ID:', process.env.AIRTABLE_EVENTS_TABLE_ID);
    console.error('   3. Check if view ID exists:', process.env.AIRTABLE_EVENTS_VIEW_ID);
    console.error('   4. Ensure API key has access to events base');
    
    // Return empty array instead of throwing to prevent page crashes
    return [];
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