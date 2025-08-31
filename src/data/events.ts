import { Event, EventType, ProjectTrack, RegularMeetings, NotionHub } from '@/types/events';

export const projectTracks: ProjectTrack[] = [
  {
    id: 'data-viz',
    name: 'Data Visualization',
    description: 'Learn to create compelling charts and visual stories with your data using modern tools and techniques.',
    color: '#3B82F6', // blue
  },
  {
    id: 'data-science',
    name: 'Data Science',
    description: 'Master the fundamentals of data analysis, statistical modeling, and data-driven decision making.',
    color: '#10B981', // green
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    description: 'Dive into algorithms, predictive modeling, and AI applications with hands-on projects.',
    color: '#8B5CF6', // purple
  },
];

// Sample upcoming events data
export const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Data Science Workshop: Python Fundamentals',
    description: 'Learn the basics of Python programming for data analysis. Perfect for beginners looking to get started with data science.',
    date: '2025-09-15',
    time: '2:00 PM',
    location: 'Dreese Labs 105',
    type: 'workshop',
    featured: true,
    registrationLink: 'https://forms.gle/example',
  },
  {
    id: '2',
    title: 'Industry Panel: Careers in Analytics',
    description: 'Join us for an exclusive panel discussion with data professionals from top companies including Google, Amazon, and Microsoft.',
    date: '2025-09-22',
    time: '6:00 PM',
    location: 'Thompson Library Auditorium',
    type: 'guest-speaker',
    featured: true,
  },
  {
    id: '3',
    title: 'Networking Night',
    description: 'Connect with fellow students, alumni, and industry professionals in a casual setting. Light refreshments provided.',
    date: '2025-09-29',
    time: '7:00 PM',
    location: 'Ohio Union Ballroom',
    type: 'social',
  },
  {
    id: '4',
    title: 'Machine Learning Competition',
    description: 'Test your skills in our semester-long ML competition. Prizes for top performers and great portfolio projects!',
    date: '2025-10-06',
    time: '1:00 PM',
    location: 'Virtual Event',
    type: 'competition',
    featured: true,
  },
  {
    id: '5',
    title: 'Tableau Visualization Workshop',
    description: 'Learn advanced Tableau techniques for creating interactive dashboards and compelling data stories.',
    date: '2025-10-13',
    time: '3:00 PM',
    location: 'Caldwell Lab 120',
    type: 'workshop',
  },
];

// Regular meeting information
export const regularMeetings: RegularMeetings = {
  general: {
    day: 'Tuesday',
    time: '7:30 PM',
    location: 'Palm Reen Hall',
    description: 'Join our weekly general meetings to connect with fellow students, learn about upcoming events, and participate in discussions about data analytics and career opportunities.',
  },
  projectSeries: {
    day: 'Thursday', 
    time: '7:30 PM',
    location: 'Palm Reen Hall',
    description: 'Hands-on learning sessions covering data visualization, data science, and machine learning. Build projects while learning from experienced mentors.',
  },
};

// Notion hub information
export const notionHub: NotionHub = {
  url: 'https://notion.so/bdaa-projects', // Placeholder URL
  title: 'BDAA Project Hub',
  description: 'Access all project materials, student work, lecture slides, and resources from our comprehensive Notion workspace.',
};