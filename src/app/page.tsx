'use client';
import React from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { ActivitiesSection } from '@/components/sections/ActivitiesSection';
import { AlumniSection } from '@/components/sections/AlumniSection';
import { SocialFeedSection } from '@/components/sections/SocialFeedSection';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { SponsorsCarousel as SponsorsCarouselComponent } from '@/components/sections/SponsorsCarousel';


export default function Home() {
  return (
    <main className="min-h-screen w-full bg-bd-background">
      <Navbar />
      {/* Hero Section */}
      <HeroSection />

      {/* Sponsors Section - Embla Carousel */}
      <SponsorsCarouselComponent />

      {/* Events Section */}
      <Section background="highlight" padding="lg">
        <Container>
          <div className="h-8 w-64 bg-gray-200 rounded mb-4" /> {/* Events Title */}
          <div className="h-8 w-32 bg-gray-300 rounded mb-6" /> {/* All Events Button */}
          <div className="flex flex-wrap gap-6 justify-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-48 h-64 bg-gray-300 rounded-lg" />
            ))}
          </div>
        </Container>
      </Section>

      {/* Activities Section */}
      <ActivitiesSection />

      {/* Alumni Section */}
      <AlumniSection />

      {/* Social Feed Section */}
      <SocialFeedSection />

      {/* Resources Section */}
      <Section background="highlight" padding="lg">
        <Container>
          <div className="h-8 w-40 bg-gray-200 rounded mb-4" /> {/* Resources Title */}
          <div className="h-8 w-32 bg-gray-300 rounded mb-6" /> {/* Read Blog Button */}
          <div className="flex flex-wrap gap-6 justify-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-40 h-40 bg-gray-300 rounded-lg" />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
