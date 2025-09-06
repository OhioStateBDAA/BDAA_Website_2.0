// Generic Airtable types
export interface AirtableRecord<T = Record<string, unknown>> {
  id: string;
  fields: T;
}

export interface AirtableResponse<T = Record<string, unknown>> {
  records: AirtableRecord<T>[];
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

// Field mapping configurations
export const EVENT_FIELD_MAP = {
  title: ['Title', 'Event Name', 'Name'],
  description: ['Description', 'Details'],
  date: ['Date', 'Event Date'],
  time: ['Time', 'Event Time'],
  location: ['Location', 'Venue'],
  type: ['Type', 'Event Type', 'Category'],
  image: ['Image'],
  registrationLink: ['Registration Link', 'Registration URL', 'Registration'],
  featured: ['Featured'],
} as const;

export const OFFICER_FIELD_MAP = {
  name: ['Name'],
  role: ['Role'],
  linkedIn: ['LinkedIn'],
  schoolYear: ['School Year'],
  major: ['Major'],
  minor: ['Minor'],
  workExperience: ['Work Experience'],
  funFact: ['Fun Fact'],
  email: ['Email'],
  year: ['Year'],
  semester: ['Semester'],
  status: ['Status'],
  image: ['Image'],
} as const;

// Utility type for field mapping
export type FieldMap = typeof EVENT_FIELD_MAP | typeof OFFICER_FIELD_MAP;

// Type for creating records (without ID)
export interface AirtableCreateRecord<T = Record<string, unknown>> {
  fields: T;
}