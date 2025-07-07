import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';

export function SocialFeedSection() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 bg-gray-200 rounded-lg min-h-[200px] flex items-center justify-center">Instagram Feed Placeholder</div>
          <div className="flex-1 bg-white rounded-lg p-6 shadow text-gray-800">
            <div className="text-lg font-bold mb-2">Join Us</div>
            <div className="text-base">Follow us on insta<br/>[placeholder text]</div>
          </div>
        </div>
      </Container>
    </Section>
  );
} 