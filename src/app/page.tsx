'use client';
import React from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { ActivitiesSection } from '@/components/sections/ActivitiesSection';
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
            {[1,2,3].map((i) => (
              <div key={i} className="w-48 h-64 bg-gray-300 rounded-lg" />
            ))}
          </div>
        </Container>
      </Section>

      {/* Activities Section */}
      <ActivitiesSection />

      {/* Alumni Section */}
      <Section background="highlight" padding="lg">
        <Container>
          <div className="h-8 w-40 bg-gray-200 rounded mb-6" /> {/* Alumni Title */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="rounded-full bg-gray-200 w-12 h-12 md:w-20 md:h-20" />
            ))}
          </div>
        </Container>
      </Section>

      {/* Social Feed Section */}
      <Section padding="lg">
        <Container>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 bg-gray-200 rounded-lg min-h-[200px]" /> {/* Instagram Feed */}
            <div className="flex-1 bg-gray-100 rounded-lg min-h-[200px]" /> {/* Join Us Card */}
          </div>
        </Container>
      </Section>

      {/* Resources Section */}
      <Section background="highlight" padding="lg">
        <Container>
          <div className="h-8 w-40 bg-gray-200 rounded mb-4" /> {/* Resources Title */}
          <div className="h-8 w-32 bg-gray-300 rounded mb-6" /> {/* Read Blog Button */}
          <div className="flex flex-wrap gap-6 justify-center">
            {[1,2,3].map((i) => (
              <div key={i} className="w-40 h-40 bg-gray-300 rounded-lg" />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
