'use client';
import React from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ActivitiesSection } from '@/components/sections/ActivitiesSection';

function Navbar() {
  return (
    <Container size="contained">
      <nav className="w-full border border-[var(--border)] bg-[var(--background)] rounded-b-[12px] shadow-sm px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="h-10 w-24 bg-gray-300 rounded" />
        </div>
        {/* Nav Links */}
        <div className="hidden md:flex gap-8 text-[var(--text-secondary)] font-primary text-base">
          <a href="#" className="hover:underline">O nas</a>
          <a href="#" className="hover:underline">Blog</a>
          <a href="#" className="hover:underline">Partnerstva</a>
        </div>
        {/* CTA Button */}
        <div>
          <button className="bg-[var(--highlight)] text-white rounded px-5 py-2 font-bold text-base shadow hover:opacity-90 transition-all">
            Vsi dogodki
          </button>
        </div>
      </nav>
    </Container>
  );
}

function SponsorsCarousel() {
  const sponsors = Array.from({ length: 10 });
  // Duplicate the sponsors for seamless infinite scroll
  const allSponsors = [...sponsors, ...sponsors];
  return (
    <Section padding="md">
      <Container>
        <div className="text-center font-display text-2xl font-bold mb-8">Sponsors/Partners</div>
      </Container>
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] px-0 overflow-x-hidden">
        <div className="group relative w-full overflow-x-hidden">
          <div
            className="flex gap-16 px-8 animate-scroll-sponsors group-hover:[animation-play-state:paused]"
            style={{ minWidth: 'max-content' }}
          >
            {allSponsors.map((_, i) => (
              <div
                key={i}
                className="min-w-[220px] md:min-w-[260px] lg:min-w-[320px] h-24 bg-white border border-[var(--border)] rounded-lg shadow flex items-center justify-center text-2xl font-bold text-gray-400 select-none"
                aria-label={`Sponsor logo placeholder ${(i % 10) + 1}`}
              >
                Logo
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes scroll-sponsors {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-sponsors {
          animation: scroll-sponsors 40s linear infinite;
        }
      `}</style>
    </Section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-bd-background">
      <Navbar />
      {/* Hero Section */}
      <Section padding="lg">
        <Container>
          <div className="flex flex-col md:flex-row gap-8 min-h-[420px] items-stretch">
            {/* Left: Text Card */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex-1 flex flex-col border border-[var(--border)] rounded-xl bg-white/90 p-6 mb-4">
                <div className="h-10 w-32 bg-gray-300 rounded mb-4" /> {/* Logo */}
                <div className="h-14 w-full bg-gray-200 rounded mb-4" /> {/* Large Tagline */}
                <div className="h-20 w-full bg-gray-100 rounded mb-4" /> {/* Subtext/Description */}
                <div className="flex-1" /> {/* Spacer to push buttons down */}
              </div>
              <div className="flex gap-4 w-full">
                <div className="flex-1 h-20 bg-[var(--highlight)] text-white rounded-xl flex items-center justify-center font-bold text-lg">Pridi na dogodek</div>
                <div className="flex-1 h-20 bg-[var(--background-alt)] text-[var(--text-secondary)] rounded-xl flex items-center justify-center font-bold text-lg border border-[var(--border)]">Postani partner</div>
              </div>
            </div>
            {/* Right: Image */}
            <div className="flex-1 flex items-stretch">
              <div className="w-full h-full min-h-[320px] bg-gray-300 rounded-xl" /> {/* Hero Image */}
            </div>
          </div>
        </Container>
      </Section>

      {/* Sponsors Section - Embla Carousel */}
      <SponsorsCarousel />

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
