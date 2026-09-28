import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import Image from 'next/image';
import { Button } from '../ui/Button';

import heroImage from '../../../public/group-photo.jpg';
import guysImage from '../../../public/img/group-guys.jpg';
import girlsImage from '../../../public/img/group-girls.jpg';

export function HeroSection() {
  return (
    <Section padding="lg" background="default">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 items-stretch">
          {/* Left: Text Card */}
          <div className="flex flex-col min-w-0 font-primary">
            {/* Let the text card grow with its content on every screen size. */}
            <div className="hero-card">
              <div className="flex flex-col">
                <h1 className="hero-title text-black">Welcome to BDAA</h1>
                <p className="text-base text-black leading-relaxed">
                  BDAA aims to inspire students to think analytically, empower them through hands on training, and connect them to potential employers. Winner of the Outstanding Overall Organization Award two years running (2017-2018) and the Partnership in Industry Award, BDAA is truly Ohio State&apos;s central hub for involvement in data analytics.
                </p>
              </div>
            </div>
            {/* Buttons outside the card - big rectangular buttons like wireframe */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="flex-1">
                <Button
                  label="Join Event"
                  color="var(--highlight)"
                  showArrow={false}
                  className="hero-button w-full"
                  href="/events"
                />
              </div>
              <div className="flex-1">
                  <Button
                    href="/partners#sponsorship-application"
                    label="Partner With Us"
                    color="var(--text-secondary)"
                    showArrow={false}
                    className="hero-button w-full"
                  />
              </div>
            </div>
          </div>
          {/* Right: Photo collage — vertical portrait left, guys top-right, girls bottom-right */}
          <div className="grid grid-cols-[42fr_58fr] gap-3 min-w-0 aspect-[4/3] sm:aspect-video lg:aspect-auto lg:min-h-[400px]">
            {/* Vertical group photo */}
            <div className="relative rounded-xl overflow-hidden min-w-0">
              <Image src={heroImage} alt="Group photo of BDAA members" sizes="(min-width: 1536px) 350px, (min-width: 1024px) 25vw, 42vw" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} priority />
            </div>
            {/* Right column: guys on top, girls on bottom */}
            <div className="grid grid-rows-2 gap-3 min-w-0">
              <div className="relative rounded-xl overflow-hidden min-h-0">
                <Image src={guysImage} alt="BDAA guys group photo" sizes="(min-width: 1536px) 490px, (min-width: 1024px) 35vw, 58vw" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
              </div>
              <div className="relative rounded-xl overflow-hidden min-h-0">
                <Image src={girlsImage} alt="BDAA girls group photo" sizes="(min-width: 1536px) 490px, (min-width: 1024px) 35vw, 58vw" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
