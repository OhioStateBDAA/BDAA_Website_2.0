import React from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Navbar } from '@/components/layout/Navbar';
import { SponsorsCarousel } from '@/components/sections/SponsorsCarousel';
import Image from 'next/image';

interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  partnership: string;
}

const partners: Partner[] = [
  {
    id: 'accenture',
    name: 'Accenture',
    logo: '/sponsors/logos/accenture.png',
    description: 'Global professional services company providing strategy, consulting, digital, technology and operations services.',
    website: 'https://www.accenture.com',
    partnership: 'Technology Consulting & Career Development'
  },
  {
    id: 'aws',
    name: 'Amazon Web Services',
    logo: '/sponsors/logos/aws-color.svg',
    description: 'Leading cloud computing platform providing comprehensive cloud infrastructure and services.',
    website: 'https://aws.amazon.com',
    partnership: 'Cloud Computing & Data Analytics Training'
  },
  {
    id: 'ernst-young',
    name: 'Ernst & Young',
    logo: '/sponsors/logos/ernst-young.svg',
    description: 'Global leader in assurance, consulting, strategy and transactions, and tax services.',
    website: 'https://www.ey.com',
    partnership: 'Data Analytics Consulting & Internship Opportunities'
  },
  {
    id: 'fifth-third-bank',
    name: 'Fifth Third Bank',
    logo: '/sponsors/logos/fifth-third-bank.svg',
    description: 'Regional banking corporation providing commercial banking, consumer banking and investment advisory services.',
    website: 'https://www.53.com',
    partnership: 'Financial Analytics & Risk Management Training'
  },
  {
    id: 'honda',
    name: 'Honda',
    logo: '/sponsors/logos/honda.png',
    description: 'Multinational automotive manufacturer known for innovation in mobility and clean energy.',
    website: 'https://www.honda.com',
    partnership: 'Automotive Analytics & Manufacturing Innovation'
  },
  {
    id: 'osu',
    name: 'The Ohio State University',
    logo: '/sponsors/logos/osulogo.png',
    description: 'Leading public research university providing world-class education and research opportunities.',
    website: 'https://www.osu.edu',
    partnership: 'Academic Support & Research Collaboration'
  }
];

export default function PartnersPage() {
  return (
    <main className="min-h-screen w-full bg-bd-background">
      <Navbar />
      
      {/* Hero Section */}
      <Section padding="lg" background="default">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-black mb-6">
              Our Partners
            </h1>
            <p className="text-lg text-black leading-relaxed mb-8">
              BDAA is proud to collaborate with industry leaders and academic institutions 
              to provide our members with exceptional opportunities and resources.
            </p>
          </div>
        </Container>
      </Section>

      {/* Partners Carousel */}
      <SponsorsCarousel />

      {/* Partner Details */}
      <Section padding="lg" background="alt">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-black text-center mb-12">
              Partnership Details
            </h2>
            
            <div className="grid gap-8">
              {partners.map((partner, index) => (
                <div 
                  key={partner.id}
                  className={`bg-[var(--background-white)] p-8 rounded-xl border border-[var(--border-black)] flex flex-col md:flex-row gap-6 items-center ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-20 md:w-40 md:h-24">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-display font-bold text-black mb-2">
                      {partner.name}
                    </h3>
                    <p className="text-black leading-relaxed mb-3">
                      {partner.description}
                    </p>
                    <div className="text-sm text-[var(--highlight)] font-primary font-bold mb-3">
                      Partnership: {partner.partnership}
                    </div>
                    <a 
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--highlight)] hover:underline font-primary font-bold"
                    >
                      Visit Website →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Partnership Opportunities */}
      <Section padding="lg" background="highlight">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-6">
              Become a Partner
            </h2>
            <p className="text-lg text-white leading-relaxed mb-8">
              Interested in partnering with BDAA? We're always looking for organizations 
              that share our passion for data analytics and student development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:partnerships@bdaa.osu.edu"
                className="bg-white text-[var(--highlight)] px-8 py-3 rounded-lg font-primary font-bold hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </a>
              <a 
                href="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-primary font-bold hover:bg-white hover:text-[var(--highlight)] transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}