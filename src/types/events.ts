// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: EventType;
  image?: string;
  registrationLink?: string;
  featured?: boolean;
}

export type EventType = 'workshop' | 'meeting' | 'social' | 'competition' | 'guest-speaker';

// Project Track Types
export interface ProjectTrack {
  id: string;
  name: string;
  description: string;
  color: string;
  icon?: string;
}

// Regular Meeting Types
export interface RegularMeeting {
  day: string;
  time: string;
  location: string;
  description: string;
}

export interface RegularMeetings {
  general: RegularMeeting;
  projectSeries: RegularMeeting;
}

// Notion Hub Types
export interface NotionHub {
  url: string;
  title: string;
  description: string;
}

// Officer/Team Member Types
export interface TeamMember {
  name: string;
  img: string;
  role: string;
  linkedIn: string;
  school_year: string;
  major: string;
  minor: string;
  work_experience: string;
  fun_fact: string;
  email: string;
  pronouns?: string;
}

// Board Types
export interface YearBoard {
  year: string;
  semester: string;
  displayName: string;
  officers: TeamMember[];
}

