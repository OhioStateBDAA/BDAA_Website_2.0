# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern website for BDAA (organization) built with Next.js 15, React 19, TypeScript, and Tailwind CSS. The project uses a component-based architecture with a strong design system foundation emphasizing clean layouts, consistent spacing, and professional content presentation.

### Visual Reference
The website design is based on the wireframe located at `Tag Line.png` in the project root. This wireframe shows the complete layout structure and serves as the primary visual reference for development.

**Wireframe Layout Overview:**
- **Header**: BDAA logo with navigation
- **Hero Section**: Tag Line with group photo on white/cream background
- **Sponsors/Partners**: Horizontal scrolling logos section
- **CTA Section**: Red background with "Come to our next event" call-to-action
- **Activities/What We Do**: 5-card grid layout with icons and descriptions
- **Alumni Section**: Circular avatar grid on red background
- **Social Feed**: Instagram integration with "Join Us" card on white background
- **Resources**: 3-card layout on red background with white cards
- **Footer**: Additional content area

## Common Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Technology Stack

- **Next.js 15** with App Router
- **React 19** (RSC preferred)
- **TypeScript 5**
- **Tailwind CSS 4** with custom design tokens
- **Embla Carousel** for carousel components
- **Lucide React** for icons

## Architecture Overview

### Design System
The project follows a comprehensive design system with:
- **BDAA Color Palette**: Defined as CSS custom properties in `src/app/globals.css`
  - Primary text: `#BCB8B1`
  - Secondary text: `#1F2421` 
  - Background: `#F4F3EE`
  - Highlight/CTA: `#7A1400`
  - Background alt: `#FFFFFF`

- **Typography**: 
  - Primary font: Anaheim
  - Display font: Courier Prime
  - Configured via Next.js Google Fonts

- **Responsive Container System**: 
  - Mobile: 10px padding
  - Desktop (768px+): 40px padding
  - Max width: `screen-2xl`

### Component Hierarchy & Structure

```
/components
├── /ui              # Atomic components (Button, Card, Badge, Input, etc.)
├── /layout          # Layout components (Container, Section, Grid, Header, Navbar)
├── /cards           # Molecule-level card components (EventCard, ResourceCard, etc.)
├── /sections        # Organism-level page sections (HeroSection, ActivitiesSection, etc.)
└── /common          # Shared utility components (Logo, Avatar, etc.)
```

### Component Organization Strategy

**1. UI Components (`/ui`)**
- Atomic-level components
- Highly reusable across the application
- Based on design system tokens
- Examples: Button, Card, Input, Badge, Avatar

**2. Layout Components (`/layout`)**
- Structural components that define page layout
- Handle responsive behavior and spacing
- Examples: Container, Section, Grid, Header, Navbar

**3. Card Components (`/cards`)**
- Molecule-level components that combine UI atoms
- Represent specific data entities
- Examples: EventCard, ResourceCard, AlumniCard, ActivityCard

**4. Section Components (`/sections`)**
- Organism-level components that combine multiple molecules
- Represent major page sections from the wireframe
- Examples: HeroSection, ActivitiesSection, AlumniSection

**5. Common Components (`/common`)**
- Shared components that don't fit other categories
- Examples: Logo, specialized avatars, navigation elements

### Key Layout Components

- **Container**: Provides responsive horizontal padding and max-width constraints
- **Section**: Handles background variants and vertical spacing
- **Grid**: CSS Grid-based layouts with responsive patterns
- **Header/Navbar**: Navigation components

### Section Architecture
The main page (`src/app/page.tsx`) is organized into distinct sections:
1. Hero Section - Main landing content
2. Sponsors Carousel - Infinite scrolling sponsor logos
3. Events Section - Event listings with highlight background
4. Activities Section - Two-column activities grid
5. Alumni Section - Circular avatar grid
6. Social Feed Section - Instagram integration and CTA
7. Resources Section - Resource cards and blog links

## Component-Based Architecture Philosophy

This project emphasizes a **highly modular, intuitive component-based architecture** designed for easy future additions and maintenance.

### Design Principles
1. **Atomic Design**: Components built from smallest to largest (atoms → molecules → organisms)
2. **Single Responsibility**: Each component has one clear purpose
3. **Composability**: Components easily combine to create complex layouts
4. **Reusability**: Components work across different contexts with minimal changes
5. **Predictable Props**: Consistent prop patterns across similar components
6. **Future-Proof**: New sections/features can be added without modifying existing code

### Component Guidelines
- Use TypeScript interfaces for all component props
- Prefer React Server Components (minimize 'use client')
- Follow semantic HTML structure
- Use named exports for components
- Implement proper accessibility (ARIA labels, keyboard navigation)
- Design components to be **easily discoverable and self-documenting**
- Create components that **anticipate future use cases** without over-engineering

### Styling Approach
- Tailwind utility classes as primary styling method
- CSS custom properties for design tokens
- Responsive design mobile-first approach
- Grid-based layouts using CSS Grid with auto-fit/auto-fill patterns

### File Naming
- PascalCase for components
- camelCase for functions/variables
- Lowercase with dashes for directories

## Key Configuration Files

- `tailwind.config.js`: Tailwind configuration with BDAA color tokens
- `src/app/globals.css`: Global styles and CSS custom properties
- `cursorrules.md`: Comprehensive design system and development guidelines
- `next.config.ts`: Next.js configuration
- `tsconfig.json`: TypeScript configuration

## Development Workflow for Future Additions

### Adding New Sections
1. **Reference the wireframe** (`Tag Line.png`) for visual guidance
2. **Start with Section component** as the foundation
3. **Build from atoms up**: Create/reuse UI components first
4. **Compose into molecules**: Create card components if needed
5. **Assemble the organism**: Build the complete section component
6. **Add to page**: Import and place in the main page structure

### Adding New Features
1. **Identify reusable patterns** from existing components
2. **Check for similar components** that can be extended or variant-ized
3. **Create new atomic components** only if existing ones don't fit
4. **Follow established prop patterns** for consistency
5. **Test responsive behavior** across all breakpoints
6. **Ensure accessibility** with proper ARIA labels and keyboard navigation

### Component Development Workflow
1. Start with layout components (Container, Section, Grid)
2. Apply BDAA design tokens through Tailwind classes
3. Implement responsive behavior mobile-first
4. Add TypeScript interfaces for props
5. Test accessibility and responsive behavior
6. Use React Server Components where possible
7. **Document component usage** in comments for future developers

## Future-Proofing Guidelines

### For Component Developers
- **Always consider reusability** when creating new components
- **Use consistent prop naming** across similar component types
- **Create variants instead of new components** when possible
- **Document component purpose and usage** clearly
- **Test components in isolation** before integrating

### For Feature Additions
- **Reference the wireframe** as the single source of truth for layout
- **Maintain design system consistency** with existing color/typography tokens
- **Build incrementally** - start small and expand functionality
- **Consider mobile-first responsive behavior** from the beginning
- **Plan for accessibility** in all interactive components

## Important Notes

- **Visual Reference**: `Tag Line.png` wireframe is the authoritative design source
- **Design System**: Detailed specifications in `cursorrules.md`
- **Component Architecture**: Designed for maximum reusability and future additions
- **Performance Priority**: Next.js Image optimization and minimal client-side JS
- **Responsive Strategy**: Mobile-first with consistent container padding (`px-1 md:px-10`)
- **Brand Consistency**: All components maintain BDAA visual identity

## Git Workflow

- Main branch: `main`
- Current development branch: `dev`
- Recent commits show component refactoring and initial website setup