import { NextResponse } from 'next/server';
import { fetchOfficersFromAirtable } from '@/services/airtable';

export async function GET() {
  try {
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
        error: 'Failed to fetch officer data',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Add revalidation for caching
export const revalidate = 300; // Revalidate every 5 minutes