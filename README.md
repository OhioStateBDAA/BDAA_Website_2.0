# BDAA Website

This is the official website for the Big Data Analytics Association at The Ohio State University, built with [Next.js](https://nextjs.org).

## Recent Updates
- Refactored Airtable integration for better maintainability  
- Added expandable event descriptions with Read More/Less functionality

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/` - Next.js App Router pages
- `src/components/` - Reusable React components
- `src/data/` - Static data and type definitions
- `src/hooks/` - Custom React hooks
- `src/services/` - API services and integrations

## Design System

The website follows a consistent design system defined in `src/app/globals.css`:

- **Colors**: Cream background (#F4F3EE), red highlight (#7A1400), black text
- **Typography**: Anaheim (primary), Courier Prime (display/headings)
- **Layout**: Container/Section components for consistent spacing
- **Components**: Reusable card patterns with shadow/border styling

## Events Page Development Plan

### Overview
Creating a dedicated Events page that will be accessible via the "All Events" button and other event links throughout the site. The page will showcase upcoming BDAA events and provide access to historical Project Series content.

### Requirements
1. **Regular Meetings Display**
   - Weekly general meetings: Tuesdays 7:30 PM at Palm Reen Hall
   - Project Series: Thursdays at Palm Reen Hall (concurrent program)

2. **Upcoming Events Section**
   - Card-based layout (no calendar interface)
   - Display major upcoming events
   - Follow existing design system styling

3. **Project Series Archive**
   - Link to Notion hub containing historical content
   - Previous year's project tracks:
     - Charted Data Visualization
     - Data Science  
     - Machine Learning
   - Student projects and lecture materials

### Technical Implementation Plan

#### Phase 1: Page Structure
- Create `/src/app/events/page.tsx`
- Implement standard layout with Navbar, Container, Section components
- Add page title and introductory content

#### Phase 2: Event Components
- Create `EventCard` component for individual events
- Design `UpcomingEvents` section component
- Implement `RegularMeetings` information component

#### Phase 3: Project Series Integration
- Create `ProjectSeriesArchive` component
- Add external link to Notion hub
- Include track descriptions and call-to-action

#### Phase 4: Data Integration
- Create event data structure
- Consider future database integration
- Implement responsive design patterns

### File Structure
```
src/
├── app/
│   └── events/
│       └── page.tsx
├── components/
│   ├── events/
│   │   ├── EventCard.tsx
│   │   ├── UpcomingEvents.tsx
│   │   ├── RegularMeetings.tsx
│   │   └── ProjectSeriesArchive.tsx
└── data/
    └── events.ts
```

### Design Specifications
- Follow existing color scheme and typography
- Use consistent card patterns from current components
- Maintain responsive design principles
- Include hover effects and transitions
- Ensure accessibility standards

### Future Enhancements
- Dynamic event loading from database/CMS
- Event registration functionality
- Integration with calendar systems
- Image galleries for past events

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
