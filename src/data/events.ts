import { ProjectTrack, RegularMeetings, NotionHub } from '@/types/events';

export const projectTracks: ProjectTrack[] = [
  {
    id: 'data-science-analytics',
    name: 'Data Science & Analytics',
    description: 'Master data preparation, EDA, feature engineering, and modeling with hands-on projects and storytelling.',
    color: '#3B82F6', // blue
  },
  {
    id: 'full-stack',
    name: 'Full Stack',
    description: 'Build complete web applications covering APIs, databases, and backend development with practical workshops.',
    color: '#10B981', // green
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    description: 'Explore linear regression, k-means clustering, and random forest algorithms through practical implementation.',
    color: '#8B5CF6', // purple
  },
  {
    id: 'foundations-ai',
    name: 'Foundations of AI',
    description: 'Dive into LLMs, MCPs, and AI agents while building your own intelligent systems from the ground up.',
    color: '#F59E0B', // amber
  },
];

// Sample upcoming events data
export const regularMeetings: RegularMeetings = {
  general: {
    day: 'Tuesday',
    time: '7:00 PM',
    location: 'Pomerene Hall',
    locationUrl: 'https://maps.app.goo.gl/redNoVKLBrgrQRP97',
    description: 'Join our weekly general meetings to connect with fellow students, learn about upcoming events, and participate in discussions about data analytics and career opportunities.',
  },
  projectSeries: {
    day: 'Thursday', 
    time: '7:00 PM',
    location: 'Pomerene Hall',
    locationUrl: 'https://maps.app.goo.gl/redNoVKLBrgrQRP97',
    description: 'Hands-on learning sessions covering data visualization, data science, and machine learning. Build projects while learning from experienced mentors.',
  },
};

// Notion hub information
export const notionHub: NotionHub = {
  url: 'https://coordinated-nymphea-a4f.notion.site/16a2baa503d4801c8a9aee5b8d54123a?v=16a2baa503d481379ce9000c054ca96f',
  title: 'BDAA Project Hub',
  description: 'Access all project materials, student work, lecture slides, and resources from our comprehensive Notion workspace.',
};