import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';

export function EventsSection() {
  return (
    <Section background="highlight" padding="lg">
      <Container>
        <div className="text-white text-xl font-bold mb-4">Come to our next event</div>
        <button className="bg-white text-[var(--highlight)] px-4 py-2 rounded mb-6">All Events</button>
        <div className="flex flex-wrap gap-6 justify-center">
          {[1,2,3].map((i) => (
            <div key={i} className="w-48 h-64 bg-white/80 rounded-lg flex flex-col items-center justify-center text-gray-700">Event Card</div>
          ))}
        </div>
      </Container>
    </Section>
  );
} 