import { NextResponse } from 'next/server';

export async function DELETE() {
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;
  const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID;

  // Use table ID if available, otherwise use table name
  const tableIdentifier = AIRTABLE_TABLE_ID || encodeURIComponent(AIRTABLE_TABLE_NAME!);

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !tableIdentifier) {
    return NextResponse.json({
      success: false,
      error: 'Missing required environment variables'
    }, { status: 500 });
  }

  console.log('Starting to clear Airtable data...');
  
  let totalRecordsDeleted = 0;

  try {
    // First, get all records
    let allRecords: Array<{ id: string }> = [];
    let offset = '';

    do {
      const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableIdentifier}${offset ? `?offset=${offset}` : ''}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch records: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      allRecords = allRecords.concat(data.records as Array<{ id: string }>);
      offset = data.offset;
      
    } while (offset);

    console.log(`Found ${allRecords.length} records to delete`);

    if (allRecords.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No records to delete',
        totalRecordsDeleted: 0
      });
    }

    // Delete records in batches of 10 (Airtable's limit)
    const batchSize = 10;
    for (let i = 0; i < allRecords.length; i += batchSize) {
      const batch = allRecords.slice(i, i + batchSize);
      const recordIds = batch.map(record => record.id);
      
      // Create query string with record IDs
      const queryParams = recordIds.map(id => `records[]=${id}`).join('&');
      const deleteUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableIdentifier}?${queryParams}`;

      const response = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error deleting batch ${i / batchSize + 1}:`, response.status, errorText);
        continue;
      }

      const result = await response.json();
      totalRecordsDeleted += result.records.length;
      console.log(`✓ Deleted batch ${i / batchSize + 1}: ${result.records.length} records`);

      // Add a small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    console.log(`Clearing completed! Total records deleted: ${totalRecordsDeleted}`);

    return NextResponse.json({
      success: true,
      message: 'All records cleared successfully',
      totalRecordsDeleted
    });

  } catch (error) {
    console.error('Clear operation failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      totalRecordsDeleted
    }, { status: 500 });
  }
}