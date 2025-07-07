import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';

export function AlumniSection() {
  return (
    <Section background="highlight" padding="lg">
      <Container>
        <div className="text-white text-xl font-bold mb-6">Alumni</div>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="rounded-full bg-white/80 w-12 h-12 md:w-20 md:h-20 flex items-center justify-center">&nbsp;</div>
          ))}
        </div>
      </Container>
    </Section>
  );
} 