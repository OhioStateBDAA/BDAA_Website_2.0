# About Us Page Redesign Requirements

## Overview
Complete redesign of the About Us page to include a mission section and an interactive team member grid showcasing BDAA leadership and members with photos and personal information.

## Visual Reference
Based on the provided screenshot showing a clean, professional team layout with:
- Black and white photos that transition to color on hover
- Name above each person, title right-justified underneath
- Clean, minimal design with proper spacing
- 4 members per row layout
- Professional headshot-style photography

## Page Structure

### 1. Mission Section (Top)
- **Location**: Top of page, after navbar
- **Content**: BDAA mission, vision, and key achievements
- **Design**: Following existing BDAA design system
- **Background**: Use established section colors (default/alt/highlight)

### 2. Team Section (Main Focus)
- **Location**: Below mission section
- **Content**: Interactive grid of team members
- **Layout**: 4 members per row on desktop, responsive for mobile
- **Design**: Minimal, professional, consistent with BDAA branding

## Team Member Grid Specifications

### Layout Requirements
- **Desktop**: 4 members per row
- **Tablet**: 2-3 members per row
- **Mobile**: 1-2 members per row
- **Spacing**: Consistent gaps between members
- **Alignment**: Perfect grid alignment with centered content

### Photo Requirements
- **Format**: Professional headshots
- **Aspect Ratio**: Square or 3:4 portrait orientation
- **Size**: Consistent dimensions across all photos
- **Quality**: High resolution for crisp display
- **Default State**: Grayscale/black and white filter
- **Hover State**: Full color with smooth transition

### Text Layout
- **Name**: Positioned above the photo
- **Title/Role**: Right-justified, positioned below the photo
- **Typography**: Use BDAA font system (primary/display fonts)
- **Color**: Black text for consistency
- **Hierarchy**: Clear distinction between name and title

### Interaction Design
- **Hover Effect**: 
  - Photo transitions from grayscale to full color
  - Smooth animation (300ms transition)
  - Optional subtle scale effect (1.02x)
  - Maintain aspect ratio and alignment

- **Click Animation**:
  - Subtle click feedback animation
  - Could expand to show more details (modal/overlay)
  - Or navigate to individual member page
  - Smooth bounce or scale effect

## Technical Requirements

### Design System Integration
- **Colors**: Use BDAA color palette variables
- **Typography**: Use established font hierarchy
- **Buttons**: Use existing Button component if needed
- **Sections**: Use Section and Container components
- **Backgrounds**: Use established background variants

### Component Architecture
- **TeamGrid**: Main grid container component
- **TeamMember**: Individual member card component
- **TeamMemberModal**: Optional detailed view component
- **Location**: `/src/components/sections/` or `/src/components/team/`

### Animation Implementation
- **CSS Approach**: Prefer CSS transitions and transforms
- **Fallbacks**: Ensure graceful degradation
- **Performance**: 60fps smooth animations
- **Accessibility**: Respect `prefers-reduced-motion`

## Data Structure

### Team Member Interface (Updated from actual data)
```typescript
interface TeamMember {
  name: string
  img: string
  role: string
  linkedIn: string
  school_year: string
  major: string
  minor: string
  work_experience: string
  fun_fact: string
  email: string
}

interface YearBoard {
  year: string
  semester: string
  officers: TeamMember[]
}
```

### Team Categories (Based on SP25 Data)
- **Executive Board**: President, Vice President, Treasurer
- **Directors**: Education Director, Corporate Relations Director, Projects Director, Marketing Director, Social Events Director, Webmaster
- **Liaisons**: Projects Liaison, Education Liaison, Corporate Relations Liaison, Treasurer Liaison, Webmaster Liaison

### Year Selection Feature
- **Dropdown Component**: Minimal dropdown to switch between different year/semester boards
- **Data Structure**: Support for multiple years (e.g., SP25, FA24, SP24, etc.)
- **Default View**: Latest semester (SP25)
- **State Management**: Local state for selected year

## Content Requirements

### Mission Section Content
- **Mission Statement**: Clear, concise organizational purpose
- **Vision Statement**: Future goals and aspirations
- **Values**: Core principles and beliefs
- **Achievements**: Key awards and recognition
- **Impact**: Quantifiable results and outcomes

### Team Member Information
- **Required**: Name, title, photo
- **Optional**: Bio, contact info, graduation year, major
- **Consistent**: All members follow same data structure
- **Professional**: Appropriate tone and information

## Implementation Tasks

### Phase 1: Foundation
1. Create team member data structure and interface
2. Set up photo storage and organization system
3. Design mission section layout and content
4. Plan responsive grid system

### Phase 2: Component Development
1. Build TeamMember component with hover effects
2. Create TeamGrid layout component
3. Implement grayscale to color photo transitions
4. Add responsive breakpoints and mobile layout

### Phase 3: Interactions & Polish
1. Add click animations and interactions
2. Implement modal/detail view (if needed)
3. Optimize photo loading and performance
4. Add accessibility features

### Phase 4: Content Integration
1. Organize and optimize team member photos
2. Gather and format team member information
3. Write mission section content
4. Test with real content and various photo sizes

### Phase 5: Testing & Refinement
1. Cross-browser testing
2. Mobile responsiveness testing
3. Performance optimization
4. Accessibility compliance testing

## Success Criteria
- **Visual Impact**: Professional, engaging team presentation
- **Performance**: Smooth 60fps animations
- **Responsive**: Works perfectly on all device sizes
- **Accessibility**: Screen reader and keyboard navigation support
- **Maintainable**: Easy to add/remove/update team members
- **Brand Consistent**: Follows BDAA design system perfectly
- **User Experience**: Intuitive interactions and clear information hierarchy

## Future Considerations
- **Member Profiles**: Individual detail pages for each member
- **Alumni Section**: Separate section for past members
- **Search/Filter**: Ability to filter by role, graduation year, etc.
- **Admin Interface**: Easy way to manage team member data
- **Photo Guidelines**: Standardized photo requirements for consistency

## Notes
- Maintain minimal, clean aesthetic inspired by provided screenshot
- Ensure all animations are subtle and professional
- Consider loading states for photos
- Plan for various photo qualities and sizes
- Keep mobile experience as polished as desktop