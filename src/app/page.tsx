'use client';
import React from 'react';
import { ActivitiesSection } from '@/components/sections/ActivitiesSection';
import { AlumniSection } from '@/components/sections/AlumniSection';
import { SocialFeedSection } from '@/components/sections/SocialFeedSection';
import { PhotoGallerySection } from '@/components/sections/PhotoGallerySection';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { SponsorsCarousel as SponsorsCarouselComponent } from '@/components/sections/SponsorsCarousel';


export default function Home() {
  return (
<main className="w-full max-w-full min-h-screen px-4 sm:px-6 lg:px-8 bg-bd-background overflow-x-hidden">
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
