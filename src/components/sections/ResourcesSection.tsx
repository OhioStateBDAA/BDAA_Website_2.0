import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';

export function ResourcesSection() {
  return (
    <Section background="highlight" padding="lg">
      <Container>
        <div className="text-white text-xl font-bold mb-4">Resources</div>
        <button className="bg-white text-[var(--highlight)] px-4 py-2 rounded mb-6">read our blog</button>
        <div className="flex flex-wrap gap-6 justify-center">
          {[1,2,3].map((i) => (
            <div key={i} className="w-40 h-40 bg-white/80 rounded-lg flex items-center justify-center text-gray-700">Resource Card</div>
          ))}
        </div>
      </Container>
    </Section>
  );
} 