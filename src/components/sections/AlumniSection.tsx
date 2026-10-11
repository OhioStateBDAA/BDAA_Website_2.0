import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
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
            BDAA alumni work in data science, machine learning, software engineering, and product management. Here are some of the companies they’ve joined.
          </p>
        </div>

        {/* Animated Company Grid */}
        <div className="mt-6">
          <AnimatedCompanyGrid />
        </div>
      </Container>
    </Section>
  );
}