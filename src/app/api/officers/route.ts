import { NextResponse } from 'next/server';
import { fetchOfficersFromAirtable } from '@/services/airtable';

export async function GET() {
  try {
    // Check if required environment variables are set
    if (!process.env.AIRTABLE_API_KEY_READ_ONLY && !process.env.AIRTABLE_API_KEY) {
      // Don't log this as an error since it's expected when Airtable isn't configured
      return NextResponse.json(
        {
          success: false,
          error: 'Airtable API key not configured - using fallback data',
          timestamp: new Date().toISOString()
        },
        { status: 503 } // Service Unavailable
      );
    }

    const boardHistory = await fetchOfficersFromAirtable();

    return NextResponse.json({
      success: true,
      data: boardHistory,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('API Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch officer data from Airtable',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Add revalidation for caching
export const revalidate = 300; // Revalidate every 5 minutes