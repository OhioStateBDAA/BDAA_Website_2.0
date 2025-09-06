import { NextResponse } from 'next/server';
import { BoardHistory } from '@/data/officerData';
import { AirtableCreateRecord } from '@/types/airtable';

export async function POST() {
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;
  const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID;

  const tableIdentifier = AIRTABLE_TABLE_ID || encodeURIComponent(AIRTABLE_TABLE_NAME!);

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !tableIdentifier) {
    return NextResponse.json({
      success: false,
      error: 'Missing required environment variables'
    }, { status: 500 });
  }

  console.log('Starting historical data migration...');

  let totalRecordsCreated = 0;
  const results = [];

  try {
    // Only migrate 2024 and 2023 (skip 2025 which is already migrated)
    const historicalBoards = BoardHistory.filter(board => board.year !== "2025");

    for (const board of historicalBoards) {
      console.log(`Migrating ${board.displayName} (${board.officers.length} officers)...`);

      const batchSize = 10;
      for (let i = 0; i < board.officers.length; i += batchSize) {
        const batch = board.officers.slice(i, i + batchSize);

        const records: AirtableCreateRecord[] = batch.map(officer => {
          const fields: Record<string, unknown> = {
            'Name': officer.name || '',
            'LinkedIn': officer.linkedIn || '',
            'School Year': officer.school_year || '',
            'Major': officer.major || '',
            'Minor': officer.minor || '',
            'Work Experience': officer.work_experience || '',
            'Fun Fact': officer.fun_fact || '',
            'Email': officer.email?.replace('mailto: ', '') || '',
            'Year': board.year,
            'Semester': board.semester,
            'Status': 'Active'
          };

          // For historical data, default empty roles to "Officer"
          if (officer.role && officer.role.trim()) {
            fields['Role'] = officer.role.trim();
          } else {
            fields['Role'] = 'Officer'; // Default for historical data
          }

          return { fields };
        });

        const response = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableIdentifier}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ records })
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error creating batch ${i / batchSize + 1}:`, response.status, errorText);
          results.push({
            board: board.displayName,
            batch: i / batchSize + 1,
            success: false,
            error: errorText
          });
          continue;
        }

        const result = await response.json();
        totalRecordsCreated += result.records.length;
        console.log(`✓ Created batch ${i / batchSize + 1}: ${result.records.length} records`);

        results.push({
          board: board.displayName,
          batch: i / batchSize + 1,
          success: true,
          recordsCreated: result.records.length
        });

        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    console.log(`Historical migration completed! Total records created: ${totalRecordsCreated}`);

    return NextResponse.json({
      success: true,
      message: 'Historical migration completed successfully',
      totalRecordsCreated,
      results
    });

  } catch (error) {
    console.error('Historical migration failed:', error);

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      totalRecordsCreated,
      results
    }, { status: 500 });
  }
}