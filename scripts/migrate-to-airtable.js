require('dotenv').config({ path: '.env.local' });

// Officer data from the original file
const BoardHistory = [
  {
    year: "2025",
    semester: "Spring",
    displayName: "Spring 2025",
    officers: [
      {
        name: "Suvan Dommeti",
        img: "/img/SP25BDAAHeadshots/Suvan.png",
        role: "President",
        linkedIn: "https://www.linkedin.com/in/suvan-dommeti/",
        school_year: "3rd Year",
        major: "Computer Science & Engineering",
        minor: "Statistics",
        work_experience: "SWE intern @ JPMC",
        fun_fact: "I've folded over 5000 origami cranes in my life",
        email: "mailto: donmeti.1@osu.edu",
      },
      {
        name: "Pratty Giriraj",
        img: "/img/SP25BDAAHeadshots/Pratty.png",
        role: "Vice President",
        linkedIn: "https://www.linkedin.com/in/prattyush-giriraj",
        school_year: "4th Year",
        major: "Computer Science and Engineering",
        minor: "Statistics",
        work_experience: "SWE Intern @ GE Aerospace, GE Corporate",
        fun_fact: "I have played basketball with an NBA Hall of Famer",
        email: "mailto: giriraj.1@osu.edu",
      },
      {
        name: "Rohan Mawalkar",
        img: "/img/SP25BDAAHeadshots/Rohan.png",
        role: "Treasurer",
        linkedIn: "https://www.linkedin.com/in/rohanmawalkar/",
        school_year: "2nd Year",
        major: "Data Analytics and Honors Theoretical Mathematics",
        minor: "N/A",
        work_experience: "Math TA @ OSU",
        fun_fact: "My favorite color is orange",
        email: "mailto: mawalkar.5@osu.edu",
      },
      {
        name: "Pranav Rajesh",
        img: "/img/SP25BDAAHeadshots/Pranav.png",
        role: "Education Director",
        linkedIn: "https://www.linkedin.com/in/pranav-rajesh02/",
        school_year: "3rd Year",
        major: "MIS and Neuroscience",
        minor: "N/A",
        work_experience: "Analyst Intern @ Marathon Petroleum Corporation, OSU",
        fun_fact: "I can speak 6 languages",
        email: "mailto: rajesh.30@osu.edu",
      },
      {
        name: "Adithi Math",
        img: "/img/SP25BDAAHeadshots/Adithi.png",
        role: "Corporate Relations Director",
        linkedIn: "http://linkedin.com/in/adithimath",
        school_year: "2nd Year",
        major: "Data Analytics",
        minor: "N/A",
        work_experience: "Incoming Machine Learning Operations Intern @ Huntington National Bank",
        fun_fact: "I like to collect vinyls for my record player",
        email: "mailto: teligiharapanahallimath.1@buckeyemail.osu.edu",
      },
      {
        name: "Isabella Lo",
        img: "/img/SP25BDAAHeadshots/Isabella.png",
        role: "Corporate Relations Director",
        linkedIn: "https://www.linkedin.com/in/igwlo/",
        school_year: "2nd Year",
        major: "Computer and Information Science",
        minor: "Business",
        work_experience: "Consulting Intern @ Arlington Consulting",
        fun_fact: "I know five languages",
        email: "mailto: lo.314@osu.edu",
      },
      // Add all other SP25 officers...
      {
        name: "Karthik Kallam",
        img: "/img/SP25BDAAHeadshots/Karthik.png",
        role: "Webmaster",
        linkedIn: "https://www.linkedin.com/in/karthikkallam/",
        school_year: "2nd Year",
        major: "Computer Science & Engineering",
        minor: "Statistics",
        work_experience: "SWE Intern @ Technology Consultants Inc",
        fun_fact: "My favorite artist is Smino",
        email: "mailto: kallam.2@osu.edu",
      }
      // ... continuing with remaining officers
    ]
  }
  // Add other years if needed
];

async function migrateOfficersToAirtable() {
  const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID;

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
    console.error('Missing required environment variables');
    process.exit(1);
  }

  console.log('Starting migration to Airtable...');
  console.log(`Base ID: ${AIRTABLE_BASE_ID}`);
  console.log(`Table ID: ${AIRTABLE_TABLE_ID}`);

  let totalRecordsCreated = 0;

  try {
    // Process each year/semester board
    for (const board of BoardHistory) {
      console.log(`\nMigrating ${board.displayName} (${board.officers.length} officers)...`);

      // Process officers in batches of 10 (Airtable's limit)
      const batchSize = 10;
      for (let i = 0; i < board.officers.length; i += batchSize) {
        const batch = board.officers.slice(i, i + batchSize);
        
        const records = batch.map(officer => ({
          fields: {
            'Name': officer.name,
            'Role': officer.role,
            'LinkedIn': officer.linkedIn,
            'School Year': officer.school_year,
            'Major': officer.major,
            'Minor': officer.minor,
            'Work Experience': officer.work_experience,
            'Fun Fact': officer.fun_fact,
            'Email': officer.email.replace('mailto: ', ''), // Clean up email format
            'Year': board.year,
            'Semester': board.semester,
            'Status': 'Active' // Set all as active for now
          }
        }));

        // Make the API request
        const response = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
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
          continue;
        }

        const result = await response.json();
        totalRecordsCreated += result.records.length;
        console.log(`✓ Created batch ${i / batchSize + 1}: ${result.records.length} records`);

        // Add a small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    console.log(`\n🎉 Migration completed successfully!`);
    console.log(`Total records created: ${totalRecordsCreated}`);

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
migrateOfficersToAirtable();