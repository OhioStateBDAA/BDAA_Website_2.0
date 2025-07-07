import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';

export function SponsorsSection() {
  return (
    <Section>
      <Container>
        <div className="text-xl font-bold mb-6">Sponsors/Partners</div>
        <div className="flex gap-8 flex-wrap justify-center">
          {[1,2,3,4,5].map((i) => (
            <div key={i} className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">Logo</div>
          ))}
        </div>
      </Container>
    </Section>
  );
} 