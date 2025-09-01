export interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

export interface AirtableResponse {
  records: AirtableRecord[];
}

export interface AirtableError {
  error: {
    type: string;
    message: string;
  };
}

export interface AirtableImage {
  url: string;
  filename?: string;
  size?: number;
  type?: string;
}

// More specific field types for events
export interface AirtableEventFields {
  'Title'?: string;
  'Event Name'?: string;
  'Name'?: string;
  'Description'?: string;
  'Details'?: string;
  'Date'?: string;
  'Event Date'?: string;
  'Time'?: string;
  'Event Time'?: string;
  'Location'?: string;
  'Venue'?: string;
  'Type'?: string;
  'Event Type'?: string;
  'Category'?: string;
  'Image'?: AirtableImage[];
  'Registration Link'?: string;
  'Registration URL'?: string;
  'Registration'?: string;
  'Featured'?: boolean | string;
}

// More specific field types for officers
export interface AirtableOfficerFields {
  'Name'?: string;
  'Role'?: string;
  'LinkedIn'?: string;
  'School Year'?: string;
  'Major'?: string;
  'Minor'?: string;
  'Work Experience'?: string;
  'Fun Fact'?: string;
  'Email'?: string;
  'Year'?: string;
  'Semester'?: string;
  'Status'?: string;
  'Image'?: AirtableImage[];
}

export interface AirtableEventRecord {
  id: string;
  fields: AirtableEventFields;
}

export interface AirtableOfficerRecord {
  id: string;
  fields: AirtableOfficerFields;
}

// Type for creating records (without ID)
export interface AirtableCreateRecord {
  fields: AirtableOfficerFields;
}
