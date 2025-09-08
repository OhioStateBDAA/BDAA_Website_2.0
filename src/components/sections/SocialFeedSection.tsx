import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';

const InstagramPreview = () => {
  return (
    <div className="instagram-preview-mockup">
      <div className="instagram-preview-container">
        <Image
          src="/img/community/IceCreamSocial.jpeg"
          alt="BDAA Community Ice Cream Social"
          fill
          className="object-cover object-center rounded-2xl"
          unoptimized
        />
      </div>
    </div>
  );
};

const InstagramSectionCard = () => {
  return (
    <div className="instagram-section-card">
      <div className="instagram-section-content">
        {/* Left side - Instagram mockup (wider) */}
        <div className="instagram-section-preview">
          <InstagramPreview />
        </div>
        
        {/* Right side - Join community content */}
        <div className="instagram-section-info">
          <h2 className="instagram-section-title">Join our community</h2>
          
          <p className="instagram-section-description">
            Our platforms are safe spaces to exchange ideas, interesting topics, events, useful resources, and opportunities for personal and professional development for everyone.
          </p>
          
          <div className="flex flex-col gap-4">
            <Link href="https://www.instagram.com/bdaaosu/" target="_blank" rel="noopener noreferrer">
              <Button 
                label="Follow Insta" 
                color="#BCB8B1" 
                showArrow={false}
              />
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <Button 
                label="Join GroupMe" 
                color="#BCB8B1" 
                showArrow={false}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export function SocialFeedSection() {
  return (
    <Section background="default" padding="lg">
      <Container>
        <div className="flex justify-center w-full">
          <InstagramSectionCard />
        </div>
      </Container>
    </Section>
  );
}