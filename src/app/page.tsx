'use client';
import React from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { ActivitiesSection } from '@/components/sections/ActivitiesSection';
import { AlumniSection } from '@/components/sections/AlumniSection';
import { SocialFeedSection } from '@/components/sections/SocialFeedSection';
import { PhotoGallerySection } from '@/components/sections/PhotoGallerySection';
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

      {/* Photo Gallery Section */}
      <PhotoGallerySection />

      {/* Activities Section */}
      <ActivitiesSection />

      {/* Alumni Section */}
      <AlumniSection />

      {/* Social Feed Section */}
      <SocialFeedSection />

    </main>
  );
}
