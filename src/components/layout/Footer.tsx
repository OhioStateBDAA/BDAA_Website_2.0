'use client'
import React, { useState, useEffect } from 'react';
import { Container } from './Container';
import { Section } from './Section';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2025);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('email', email);
      
      await fetch('https://embeds.beehiiv.com/v2/newsletter/e9316834-df94-4218-9f11-1d6f602917aa/subscribe', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
      
    } catch (error) {
      console.error('Subscription error:', error);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

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
                  <Link href="https://groupme.com/join_group/88947141/lqUnX8rW" className="relative group">
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
                    <div className="relative z-10 w-full h-full rounded-2xl font-semibold transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 flex flex-col justify-between border border-black p-6 min-h-[140px] bg-blue-400 text-white">
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
                      <form onSubmit={handleSubscribe} className="space-y-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] text-sm"
                          required
                        />
                        <div className="flex items-start gap-2 mb-3">
                          <input
                            type="checkbox"
                            id="newsletter-consent"
                            required
                            className="mt-1"
                          />
                          <label htmlFor="newsletter-consent" className="text-xs text-gray-600">
                            I agree that BDAA may send me newsletters and other notifications via email.
                          </label>
                        </div>
                        <button
                          type="submit"
                          disabled={isSubscribed}
                          className="relative group"
                        >
                          <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-black z-0" />
                          <div className="relative z-10 w-full h-full rounded-lg font-medium transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 flex items-center justify-center border border-black px-4 py-2 text-sm bg-red-400 text-white disabled:opacity-50">
                            {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                          </div>
                        </button>
                      </form>
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
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">info@bdaa-osu.edu</p>
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
                      <li><Link href="https://groupme.com/join_group/88947141/lqUnX8rW" className="hover:text-[var(--text-black)] transition-colors">GroupMe</Link></li>
                      <li><Link href="https://www.linkedin.com/company/big-data-analytics-association/" className="hover:text-[var(--text-black)] transition-colors">LinkedIn</Link></li>
                      <li><Link href="https://instagram.com/bdaa_osu/2" className="hover:text-[var(--text-black)] transition-colors">Instagram</Link></li>
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
