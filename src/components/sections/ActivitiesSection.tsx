import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Grid } from '../layout/Grid';

export function ActivitiesSection() {
  return (
    <Section>
      <Container>
        <div className="mb-8">
          <div className="text-xl font-bold mb-2">What do we do</div>
          <div className="text-base text-gray-700 mb-4">Mission Statement and other information about the club</div>
        </div>
        <Grid pattern="auto-fit" gap="md">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="bg-blue-100 rounded-lg p-4 min-h-[200px] flex flex-col items-center justify-center">Card Placeholder</div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
} 