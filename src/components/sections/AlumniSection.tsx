import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { AnimatedCompanyGrid } from '../cards/AnimatedCompanyGrid';

export function AlumniSection() {
  return (
    <Section background="highlight" padding="md">
      <Container>
        {/* Header Section */}
        <div className="mb-6">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
            Where our alumni work
          </h2>
          <p className="text-base text-white/90 leading-relaxed mb-4">
            Our graduates have landed roles at top companies across the tech industry
          </p>
          <Button 
            label="Become a partner" 
            color="var(--background-white)" 
            showArrow={true}
            className="w-fit"
          />
        </div>

        {/* Animated Company Grid */}
        <div className="mt-6">
          <AnimatedCompanyGrid />
        </div>
      </Container>
    </Section>
  );
}