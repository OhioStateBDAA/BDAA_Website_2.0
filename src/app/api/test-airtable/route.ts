import { NextResponse } from 'next/server';

export async function GET() {
  const startTime = Date.now();
  console.log('🧪 Starting Airtable connection test...');

  const tests = [];
  let overallStatus = 'PASS';

  try {
    // Test 1: Environment Variables
    console.log('\n📋 Test 1: Environment Variables');
    const envTest = {
      name: 'Environment Variables',
      status: 'PASS' as 'PASS' | 'FAIL',
      details: {} as Record<string, unknown>,
      issues: [] as string[]
    };

    const requiredEnvVars = [
      'AIRTABLE_API_KEY',
      'AIRTABLE_BASE_ID', 
      'AIRTABLE_TABLE_NAME'
    ];

    requiredEnvVars.forEach(varName => {
      const value = process.env[varName];
      if (!value) {
        envTest.status = 'FAIL';
        envTest.issues.push(`❌ Missing ${varName}`);
        overallStatus = 'FAIL';
      } else {
        envTest.details[varName] = varName === 'AIRTABLE_API_KEY' 
          ? value.substring(0, 10) + '...' 
          : value;
        console.log(`   ✅ ${varName}: ${envTest.details[varName]}`);
      }
    });

    if (envTest.issues.length > 0) {
      envTest.issues.forEach(issue => console.log(`   ${issue}`));
    }

    tests.push(envTest);

    // Test 2: API Key Format Validation
    console.log('\n🔑 Test 2: API Key Format');
    const keyTest = {
      name: 'API Key Format',
      status: 'PASS' as 'PASS' | 'FAIL',
      details: {} as Record<string, unknown>,
      issues: [] as string[]
    };

    const apiKey = process.env.AIRTABLE_API_KEY;
    if (apiKey) {
      if (apiKey.startsWith('pat')) {
        keyTest.details.type = 'Personal Access Token (Correct)';
        console.log('   ✅ Using Personal Access Token (recommended)');
      } else if (apiKey.startsWith('key')) {
        keyTest.status = 'FAIL';
        keyTest.issues.push('❌ Using deprecated API Key format');
        keyTest.details.type = 'Deprecated API Key';
        overallStatus = 'FAIL';
        console.log('   ⚠️ Using deprecated API Key format. Switch to Personal Access Token');
      } else {
        keyTest.status = 'FAIL'; 
        keyTest.issues.push('❌ Unknown API key format');
        keyTest.details.type = 'Unknown format';
        overallStatus = 'FAIL';
      }
    }

    tests.push(keyTest);

    // Test 3: Basic Connection Test
    console.log('\n🌐 Test 3: Basic Connection');
    const connectionTest = {
      name: 'Connection Test',
      status: 'PASS' as 'PASS' | 'FAIL',
      details: {} as Record<string, unknown>,
      issues: [] as string[]
    };

    const tableIdentifier = process.env.AIRTABLE_TABLE_ID || 
                           encodeURIComponent(process.env.AIRTABLE_TABLE_NAME!);
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${tableIdentifier}?maxRecords=1`;
    
    console.log(`   📡 Testing connection to: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    connectionTest.details.statusCode = response.status;
    connectionTest.details.statusText = response.statusText;
    connectionTest.details.url = url;

    if (!response.ok) {
      connectionTest.status = 'FAIL';
      overallStatus = 'FAIL';
      
      const errorText = await response.text();
      let errorDetails;
      
      try {
        errorDetails = JSON.parse(errorText);
      } catch {
        errorDetails = { message: errorText };
      }

      connectionTest.details.error = errorDetails;

      switch (response.status) {
        case 401:
          connectionTest.issues.push('❌ Authentication failed - Invalid API key');
          break;
        case 403:
          connectionTest.issues.push('❌ Access forbidden - Check token permissions');
          break;
        case 404:
          connectionTest.issues.push('❌ Base or table not found');
          break;
        default:
          connectionTest.issues.push(`❌ HTTP ${response.status}: ${response.statusText}`);
      }

      connectionTest.issues.forEach(issue => console.log(`   ${issue}`));
    } else {
      console.log('   ✅ Connection successful');
    }

    tests.push(connectionTest);

    // Test 4: Data Structure Test
    if (connectionTest.status === 'PASS') {
      console.log('\n📊 Test 4: Data Structure');
      const dataTest = {
        name: 'Data Structure',
        status: 'PASS' as 'PASS' | 'FAIL',
        details: {} as Record<string, unknown>,
        issues: [] as string[]
      };

      try {
        const data = await response.json();
        const records = data.records || [];
        
        dataTest.details.recordCount = records.length;
        dataTest.details.hasRecords = records.length > 0;
        
        if (records.length === 0) {
          dataTest.issues.push('⚠️ No records found in table');
          console.log('   ⚠️ Table is empty or no accessible records');
        } else {
          console.log(`   ✅ Found ${records.length} record(s)`);
          
          // Analyze field structure
          const firstRecord = records[0];
          const availableFields = Object.keys(firstRecord.fields || {});
          
          dataTest.details.availableFields = availableFields;
          dataTest.details.sampleRecord = firstRecord.fields;
          
          console.log(`   📋 Available fields: ${availableFields.join(', ')}`);
          
          // Check for expected fields
          const expectedFields = ['Name', 'Role', 'LinkedIn', 'School Year', 'Major', 'Email', 'Year', 'Semester'];
          const missingFields = expectedFields.filter(field => !availableFields.includes(field));
          
          if (missingFields.length > 0) {
            dataTest.issues.push(`⚠️ Missing expected fields: ${missingFields.join(', ')}`);
            console.log(`   ⚠️ Missing fields: ${missingFields.join(', ')}`);
          } else {
            console.log('   ✅ All expected fields present');
          }
        }
      } catch {
        dataTest.status = 'FAIL';
        dataTest.issues.push('❌ Failed to parse response data');
        overallStatus = 'FAIL';
        console.log('   ❌ Failed to parse response data');
      }

      tests.push(dataTest);
    }

    // Final Results
    const duration = Date.now() - startTime;
    console.log(`\n🏁 Test Summary (${duration}ms):`);
    console.log(`   Overall Status: ${overallStatus === 'PASS' ? '✅ PASS' : '❌ FAIL'}`);
    
    tests.forEach(test => {
      console.log(`   ${test.status === 'PASS' ? '✅' : '❌'} ${test.name}`);
    });

    if (overallStatus === 'FAIL') {
      console.log('\n💡 Troubleshooting suggestions:');
      console.log('   1. Verify your Personal Access Token is valid and not expired');
      console.log('   2. Ensure token has data.records:read permission for this base');
      console.log('   3. Double-check your base ID and table name');
      console.log('   4. Confirm the table exists and has records');
    }

    return NextResponse.json({
      success: overallStatus === 'PASS',
      overallStatus,
      duration: `${duration}ms`,
      tests,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('💥 Test suite failed:', error);
    
    return NextResponse.json({
      success: false,
      overallStatus: 'ERROR',
      duration: `${duration}ms`,
      error: error instanceof Error ? error.message : 'Unknown error',
      tests,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}