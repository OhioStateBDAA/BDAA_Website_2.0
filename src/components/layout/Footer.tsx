'use client'
import { socialLinks } from '@/data/socialLinks';
import React from 'react';
import { Container } from './Container';
import { Section } from './Section';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface FooterProps {
  currentYear: number;
}

export function Footer({ currentYear }: FooterProps) {
  const newsletterUrl = process.env.NEXT_PUBLIC_NEWSLETTER_URL;

  return (
    <footer className="bg-[var(--background)] text-[var(--text-black)]">
      <Section padding="lg" background="default">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="lg:w-1/3">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-black)] mb-4 leading-tight">
                  A community of students in data analytics
                </h2>
              </div>
              
              <div className="lg:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link href={socialLinks.groupMe} className="relative group">
                    <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-black z-0" />
                    <div className="relative z-10 w-full h-full rounded-2xl font-semibold transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 flex flex-col border border-black p-6 min-h-[140px] bg-orange-400 text-black">
                      <h3 className="text-xl font-bold mb-2">Join the GroupMe</h3>
                      <p className="text-sm mb-4 opacity-90 flex-1">
                        A safe space for exchanging ideas, events, job opportunities and opportunities for personal and career development.
                      </p>
                      <div className="self-end">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>

                  <Link href="/partners#sponsorship-application" className="relative group">
                    <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-black z-0" />
                    <div className="relative z-10 w-full h-full rounded-2xl font-semibold transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 flex flex-col justify-between border border-black p-6 min-h-[140px] bg-blue-400 text-black">
                      <h3 className="text-xl font-bold mb-2">Become a partner</h3>
                      <div className="self-end">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>

                  <Link href="/events" className="relative group">
                    <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-black z-0" />
                    <div className="relative z-10 w-full h-full rounded-2xl font-semibold transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 flex flex-col justify-between border border-black p-6 min-h-[140px] bg-red-400 text-black">
                      <h3 className="text-xl font-bold mb-2">Join an event</h3>
                      <div className="self-end">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>

                  <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-black z-0" />
                    <div className="relative z-10 w-full h-full rounded-2xl border border-black p-6 min-h-[140px] bg-gray-100 text-black">
                      <h3 className="text-xl font-bold mb-4">Subscribe to newsletter</h3>
                      {newsletterUrl ? (
                        <a href={newsletterUrl} className="inline-flex min-h-11 items-center rounded-lg bg-[var(--highlight)] px-4 py-2 text-white font-semibold">
                          Sign up for the newsletter
                        </a>
                      ) : (
                        <p className="text-sm text-gray-700">
                          Newsletter signup is temporarily unavailable. <a href={socialLinks.groupMe} className="underline font-semibold">Join GroupMe for updates</a>.
                        </p>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="md" background="default" className="border-t border-gray-200">
        <Container>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <div className="lg:w-1/3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-12 w-32">
                    <Image
                      src="/BDAALogo.png"
                      alt="BDAA Logo"
                      sizes="128px"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                </div>
                <a href="mailto:info@bdaa-osu.edu" className="text-gray-600 text-sm mb-4 inline-block underline">info@bdaa-osu.edu</a>
              </div>

              <div className="lg:w-2/3">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="font-bold text-[var(--text-black)] mb-3">About us</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><Link href="/about" className="hover:text-[var(--text-black)] transition-colors">Meet BDAA</Link></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-[var(--text-black)] mb-3">Activities</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><Link href="/events" className="hover:text-[var(--text-black)] transition-colors">Events</Link></li>
                      <li><Link href="/blog" className="hover:text-[var(--text-black)] transition-colors">Blog</Link></li>
                      <li><Link href="/partners" className="hover:text-[var(--text-black)] transition-colors">Partnerships</Link></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-[var(--text-black)] mb-3">Join us</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li><Link href={socialLinks.groupMe} className="hover:text-[var(--text-black)] transition-colors">GroupMe</Link></li>
                      <li><Link href="https://www.linkedin.com/company/big-data-analytics-association/" className="hover:text-[var(--text-black)] transition-colors">LinkedIn</Link></li>
                      <li><Link href="https://www.instagram.com/bdaaosu/" className="hover:text-[var(--text-black)] transition-colors">Instagram</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-8 pt-6">
              <p className="text-gray-500 text-sm text-center">
                © {currentYear} Big Data Analytics Association. All rights reserved.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
