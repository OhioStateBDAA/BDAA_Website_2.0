# Activities Section Redesign Documentation

## Overview

This document outlines the redesign of the Activities section to match the new visual design with illustrated cards and improved content organization.

## Design Reference

Based on the provided screenshot, the Activities section will feature 5 activity cards in a responsive grid layout, each with:
- Colorful illustrated backgrounds
- Clear titles and descriptions
- Consistent card styling with rounded corners
- Color-coded themes for each activity type

## New Activities Content

### 1. Bookclub
- **Color Theme**: Purple/Lavender (`#B8A9E0` or similar)
- **Title**: "Bookclub"
- **Description**: "A gathering for everyone who enjoys reading and discussions alongside technology. Every few months, we choose a book that sparked group interest to topics such as technology and the role of women in society, personal growth, and career development."
- **Illustration**: Reading/discussion scene with people and books

### 2. Newsletter  
- **Color Theme**: Pink/Coral (`#FF9DB4` or similar)
- **Title**: "Newsletter"
- **Description**: "Through the newsletter, we share invitations to upcoming events and event summaries, useful tips, links to other valuable resources such as hackathons, career events, job opportunities, and more."
- **Illustration**: Mobile device/communication theme

### 3. Monthly Events
- **Color Theme**: Red/Coral (`#FF6B6B` or similar)  
- **Title**: "Monthly events"
- **Description**: "We host industry experts and talk about various career and technical topics intertwined with soft skills. After the events, we socialize and exchange ideas in a relaxed atmosphere over snacks and drinks."
- **Illustration**: People networking and socializing

### 4. Discord Community
- **Color Theme**: Orange/Yellow (`#FFB347` or similar)
- **Title**: "Discord community" 
- **Description**: "We provide a safe and relaxed space for communication where we share ideas, discuss current topics, and post interesting events, job opportunities, and educational resources."
- **Illustration**: Communication/discussion theme with devices

### 5. Coffee&Code
- **Color Theme**: Blue (`#87CEEB` or similar)
- **Title**: "Coffee&Code"
- **Description**: "A series of informal tech sessions where we come together on projects each person chooses for themselves. You can work on homework, develop a project, follow a tutorial, or find motivation to start a new project."
- **Illustration**: Collaborative work scene with laptops and coffee

## Technical Requirements

### Component Structure
Follow the established BDAA component architecture:

```
/src/components/sections/ActivitiesSection.tsx  # Main section component
/src/components/cards/ActivityCard.tsx          # Individual activity card
```

### Layout Specifications
- **Grid Layout**: Responsive CSS Grid
  - Mobile: 1 column
  - Tablet: 2 columns  
  - Desktop: 3 columns (2-3-0 or 2-2-1 pattern)
- **Card Dimensions**: Consistent height with flexible content
- **Spacing**: Follow existing container padding (`px-1 md:px-10`)

### Styling Guidelines

#### Section Container
- Use existing `Section` component with appropriate background
- Follow standard `Container` responsive padding
- Include section header with "Activities" title and optional description

#### Card Design
- **Border Radius**: `rounded-lg` (12px)
- **Background**: Solid colors matching design reference
- **Content Padding**: `p-6` for internal spacing
- **Typography**: 
  - Title: `font-display text-xl font-semibold`
  - Description: `text-sm` or `text-base` with appropriate line height
- **Illustrations**: SVG or image assets positioned appropriately

#### Color Implementation
```css
/* Suggested CSS custom properties */
--activity-bookclub: #B8A9E0;
--activity-newsletter: #FF9DB4; 
--activity-events: #FF6B6B;
--activity-discord: #FFB347;
--activity-coffee: #87CEEB;
```

### Accessibility Requirements
- Proper semantic HTML structure
- ARIA labels for cards and illustrations
- Sufficient color contrast for text readability
- Keyboard navigation support
- Screen reader friendly descriptions

### Responsive Behavior
- **Mobile (< 768px)**: Single column, full-width cards
- **Tablet (768px - 1024px)**: 2-column grid
- **Desktop (> 1024px)**: 3-column grid with balanced layout

## Implementation Steps

1. **Create ActivityCard Component**
   - Reusable card component with props for title, description, color, illustration
   - TypeScript interface for props
   - Consistent styling and hover effects

2. **Update ActivitiesSection Component**
   - Replace current implementation with new grid layout
   - Import and use new ActivityCard components
   - Implement responsive grid behavior

3. **Add Illustration Assets**
   - Source or create SVG illustrations matching the design
   - Optimize for web performance
   - Implement proper alt text for accessibility

4. **Test Responsive Layout**
   - Verify grid behavior across all breakpoints
   - Ensure proper spacing and alignment
   - Test accessibility features

## Integration Notes

- Follow existing BDAA design system colors and typography
- Maintain consistency with other section components
- Use established component patterns from `/components/layout/`
- Ensure the section integrates properly with the main page layout

## Future Enhancements

- Consider hover effects or subtle animations
- Potential for individual activity detail pages
- Integration with actual event/activity data
- Interactive elements (buttons, links to sign up, etc.)