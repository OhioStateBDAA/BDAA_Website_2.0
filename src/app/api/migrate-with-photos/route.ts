import { NextResponse } from 'next/server';
import { BoardHistory } from '@/data/officerData';

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

  console.log('Starting migration with photos to Airtable...');
  
  let totalRecordsCreated = 0;
  const results = [];

  try {
    // Process each year/semester board
    for (const board of BoardHistory) {
      console.log(`Migrating ${board.displayName} (${board.officers.length} officers)...`);

      // Process officers in batches of 10 (Airtable's limit)
      const batchSize = 10;
      for (let i = 0; i < board.officers.length; i += batchSize) {
        const batch = board.officers.slice(i, i + batchSize);
        
        const records = batch.map(officer => {
          const fields: any = {
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
          
          // Add Role if not empty
          if (officer.role && officer.role.trim()) {
            fields['Role'] = officer.role.trim();
          } else if (board.year !== '2025') {
            // Default to Officer for historical data
            fields['Role'] = 'Officer';
          }

          // Add Image attachment using public URL
          if (officer.img && officer.img !== '/img/default-headshot.png') {
            const imageUrl = `http://localhost:3002${officer.img}`;
            fields['Image'] = [
              {
                url: imageUrl,
                filename: officer.img.split('/').pop() || 'headshot.png'
              }
            ];
          }
          
          return { fields };
        });

        // Make the API request to Airtable
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
        console.log(`✓ Created batch ${i / batchSize + 1}: ${result.records.length} records with photos`);
        
        results.push({
          board: board.displayName,
          batch: i / batchSize + 1,
          success: true,
          recordsCreated: result.records.length
        });

        // Add a delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 500)); // Longer delay for photo uploads
      }
    }

    console.log(`Migration with photos completed! Total records created: ${totalRecordsCreated}`);

    return NextResponse.json({
      success: true,
      message: 'Migration with photos completed successfully',
      totalRecordsCreated,
      results
    });

  } catch (error) {
    console.error('Migration with photos failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      totalRecordsCreated,
      results
    }, { status: 500 });
  }
}