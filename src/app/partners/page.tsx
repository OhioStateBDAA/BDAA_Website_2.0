'use client'
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Navbar } from '@/components/layout/Navbar';
import { SponsorsCarousel } from '@/components/sections/SponsorsCarousel';
import Image from 'next/image';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  partnership: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
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

const events: Event[] = [
  {
    id: 1,
    title: "Largest Tech-Oriented Club on Campus",
    description: "We have 200+ members coming from majors all across the university, from STEM to the Arts. We consistently partner with innovative companies and organizations to cater to our diverse member demographic.",
  },
  {
    id: 2,
    title: "Leadership Excellence",
    description: "BDAA was awarded the Student Organization Excellence in Membership Award at the 2025 Leadership Awards, highlighting  our commitment to fostering a strong, inclusive, and engaged community of students passionate about data and analytics",
  },
  {
    id: 3,
    title: "Countless Initiatives designed to empower our supporters",
    description: "From our Data I/O hackathon to involvement in the BDAA project series, we offer various opportunities for companies to involve themseleves in the future of innovation at Ohio State .",
  }
];

export default function PartnersPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    // Handle form submission logic here
    console.log('Form submitted:', data);
    // You would typically send this to your backend or email service
  };

  return (
    <main className="min-h-screen w-full bg-bd-background">
      <Navbar />
      
      {/* Hero Section */}
      <Section padding="lg" background="default">
        <Container>
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-display font-bold text-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Our Partners
            </motion.h1>
            <motion.p 
              className="text-lg text-black leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              BDAA is proud to collaborate with industry leaders and academic institutions 
              to provide our members with exceptional opportunities and resources.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* Partners Carousel */}
      <SponsorsCarousel />

      {/* Partner Details */}
      <Section padding="lg" background="alt">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-white text-center mb-12">
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

      {/* Events Carousel Section */}
      <Section padding="lg" background="highlight">
        <Container>
          <div>
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-3 transition-all duration-300 group"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-3 transition-all duration-300 group"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>

              {/* Cards Container */}
              <div className="overflow-hidden mx-12">
              <p className='flex-1 text-center font-bold text-5xl mb-4 text-white'>Why sponsor us?</p>
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(-${currentIndex * 100}%)` 
                  }}
                >
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                        {/* Event Icon */}
                        <div className="text-center mb-6">
                          <span className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          </span>
                        </div>

                        {/* Event Content */}
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-white mb-4">
                            {event.title}
                          </h3>
                          
                          <p className="text-gray-300 mb-6 leading-relaxed">
                            {event.description}
                          </p>

                          {/* Event Details */}
                         

                          {/* Action Button */}
                         
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center mt-12 space-x-3">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Event Counter */}
              <div className="text-center mt-8">
                <span className="text-white/70 text-lg">
                  {currentIndex + 1} of {events.length}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Sponsorship Application Form */}
      <Section padding="lg" background="default">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-black mb-6">
                Sponsorship Application
              </h2>
              <p className="text-lg text-black leading-relaxed">
                Ready to support our mission? Fill out the form below and we'll get back to you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-[var(--background-white)] p-8 rounded-xl border border-[var(--border-black)]">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-primary font-bold text-black mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    className="w-full px-4 py-3 border border-[var(--border-black)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="contactName" className="block text-sm font-primary font-bold text-black mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    className="w-full px-4 py-3 border border-[var(--border-black)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-primary font-bold text-black mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-[var(--border-black)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-primary font-bold text-black mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-[var(--border-black)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-primary font-bold text-black mb-2">
                    Company Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    placeholder="https://"
                    className="w-full px-4 py-3 border border-[var(--border-black)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="partnershipType" className="block text-sm font-primary font-bold text-black mb-2">
                    Partnership Type *
                  </label>
                  <select
                    id="partnershipType"
                    name="partnershipType"
                    required
                    className="w-full px-4 py-3 border border-[var(--border-black)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent"
                  >
                    <option value="">Select Partnership Type</option>
                    <option value="event-sponsor">Event Sponsorship</option>
                    <option value="workshop-partner">Workshop Partner</option>
                    <option value="career-development">Career Development</option>
                    <option value="technology-partner">Technology Partner</option>
                    <option value="research-collaboration">Research Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-primary font-bold text-black mb-2">
                    Partnership Details & Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us about your organization, partnership goals, and how you'd like to collaborate with BDAA..."
                    className="w-full px-4 py-3 border border-[var(--border-black)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent resize-vertical"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="bg-[var(--highlight)] text-white px-8 py-3 rounded-lg font-primary font-bold hover:bg-[var(--highlight)]/90 transition-colors"
                >
                  Submit Partnership Application
                </button>
                <p className="text-sm text-gray-600 mt-4">
                  We'll review your application and get back to you ASAP.
                </p>
              </div>
            </form>
          </div>
        </Container>
      </Section>
    </main>
  );
}