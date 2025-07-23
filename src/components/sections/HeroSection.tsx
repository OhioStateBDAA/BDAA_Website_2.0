import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import Image from 'next/image';
import { Button } from '../ui/Button';

import heroImage from '../../../public/group-photo.jpg';

export function HeroSection() {
  return (
    <Section padding="lg" background="default">
      <Container>
        <div className="flex flex-col md:flex-row gap-10 items-stretch" style={{ minHeight: 'var(--hero-min-height)' }}>
          {/* Left: Text Card */}
          <div className="flex-1 flex flex-col min-w-0 max-w-full h-full justify-start font-primary" style={{ maxWidth: 'var(--hero-text-max-width)' }}>
            {/* White card with dashed border - fixed height to match image with padding */}
            <div className="hero-card">
              <div className="flex flex-col">
                <div className="hero-title text-black">Welcome to BDAA</div>
                <div className="text-base text-black leading-relaxed">
                  BDAA aims to inspire students to think analytically, empower them through hands on training, and connect them to potential employers. Winner of the Outstanding Overall Organization Award two years running (2017-2018) and the Partnership in Industry Award, BDAA is truly Ohio State&apos;s central hub for involvement in data analytics.
                </div>
              </div>
              <div className="flex-1"></div>
            </div>
            {/* Buttons outside the card - big rectangular buttons like wireframe */}
            <div className="flex gap-4 w-full">
              <Button 
                label="Join Event" 
                color="var(--highlight)" 
                showArrow={false} 
                className="hero-button" 
              />
              <Button 
                label="Partner With Us" 
                color="var(--text-secondary)" 
                showArrow={false} 
                className="hero-button" 
              />
            </div>
          </div>
          {/* Right: Image - bigger horizontally */}
          <div className="flex items-stretch min-w-[200px] max-w-full" style={{ flex: 'var(--hero-image-flex)' }}>
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image src={heroImage} alt="Group photo of BDAA members" fill style={{objectFit: 'cover', objectPosition: 'center'}} priority />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
} 