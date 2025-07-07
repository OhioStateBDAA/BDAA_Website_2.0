import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';

export function HeroSection() {
  return (
    <Section padding="lg">
      <Container>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 flex flex-col gap-4">
            <div className="h-10 w-32 bg-gray-200 rounded mb-2" /> {/* Logo placeholder */}
            <div className="text-3xl font-bold">Tag Line</div>
            <div className="h-4 w-2/3 bg-gray-100 rounded" />
            <div className="flex gap-4 mt-4">
              <button className="bg-[var(--highlight)] text-white px-4 py-2 rounded">CTA</button>
              <button className="bg-[var(--highlight)] text-white px-4 py-2 rounded">CTA</button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="aspect-video w-full max-w-md bg-gray-300 rounded-lg flex items-center justify-center">Image</div>
          </div>
        </div>
      </Container>
    </Section>
  );
} 