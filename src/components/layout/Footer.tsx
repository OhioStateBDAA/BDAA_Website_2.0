'use client';
import { socialLinks } from '@/data/socialLinks';
import React from 'react';
import { Container } from './Container';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface FooterProps {
  currentYear: number;
}

export function Footer({ currentYear }: FooterProps) {
  const newsletterUrl = process.env.NEXT_PUBLIC_NEWSLETTER_URL;

  const cardStyles =
    'group relative flex flex-col justify-between overflow-hidden ' +
    'rounded-xl border border-black/[0.07] bg-white/70 ' +
    'p-5 md:p-6 transition-all duration-300 ease-out ' +
    'hover:-translate-y-1 hover:border-[#B83E38]/30 ' +
    'hover:bg-white hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)]';

  const arrowStyles =
    'h-4 w-4 text-[#B83E38] transition-transform ' +
    'duration-300 group-hover:translate-x-1';

  const navStyles =
    'text-sm text-gray-500 transition-colors duration-200 ' +
    'hover:text-[#B83E38]';

  return (
    <footer className="bg-[var(--background)] text-[var(--text-black)]">
      
      {/* MAIN FOOTER CONTENT */}
      <div className="border-t border-black/[0.06]">
        <Container>
          <div className="mx-auto max-w-7xl py-10 md:py-12">

            {/* SECTION HEADING */}
            <div className="mb-7 text-center">
              <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-[#B83E38]" />

              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Let's stay connected.
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Discover ways to get involved with BDAA.
              </p>
            </div>

            {/* FOUR HORIZONTAL CARDS */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

              {/* GROUPME */}
              <Link
                href={socialLinks.groupMe}
                className="group flex min-h-[190px] flex-col justify-between rounded-xl border border-black/[0.07] bg-[#F1E8E1]/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#B83E38]/30 hover:shadow-lg"
              >
                <div>
                  <h3 className="mb-2 text-lg font-semibold tracking-tight">
                    Join the GroupMe
                  </h3>

                  <p className="text-[13px] leading-relaxed text-gray-600">
                    A safe space for exchanging ideas, events,
                    job opportunities and opportunities for
                    personal and career development.
                  </p>
                </div>

                <ArrowRight className="mt-3 h-5 w-5 self-end text-[#B83E38] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* PARTNERS */}
              <Link
                href="/partners#sponsorship-application"
                className="group flex min-h-[190px] flex-col justify-between rounded-xl border border-black/[0.07] bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#B83E38]/30 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold tracking-tight">
                  Become a partner
                </h3>

                <ArrowRight className="h-5 w-5 self-end text-[#B83E38] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* EVENTS */}
              <Link
                href="/events"
                className="group flex min-h-[190px] flex-col justify-between rounded-xl border border-black/[0.07] bg-white/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#B83E38]/30 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold tracking-tight">
                  Join an event
                </h3>

                <ArrowRight className="h-5 w-5 self-end text-[#B83E38] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* NEWSLETTER */}
              <div className="flex min-h-[190px] flex-col rounded-xl border border-black/[0.07] bg-[#F5F5F5]/80 p-5">
                <h3 className="mb-2 text-lg font-semibold tracking-tight">
                  Subscribe to newsletter
                </h3>

                {newsletterUrl ? (
                  <a
                    href={newsletterUrl}
                    className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#B83E38] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#9F302C]"
                  >
                    Sign up for the newsletter
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <p className="text-[13px] leading-relaxed text-gray-600">
                    Newsletter signup is temporarily unavailable.{' '}
                    <a
                      href={socialLinks.groupMe}
                      className="font-semibold underline underline-offset-4 hover:text-[#B83E38]"
                    >
                      Join GroupMe for updates
                    </a>
                    .
                  </p>
                )}
              </div>

            </div>
          </div>
        </Container>
      </div>
      
      {/* FOOTER NAVIGATION */}
      <div className="border-t border-black/[0.07]">
        <Container>
          <div className="mx-auto max-w-7xl flex flex-col items-center py-8">

            {/* CENTERED LOGO */}
            <div className="relative mb-3 h-14 w-36">
              <Image
                src="/BDAALogo.png"
                alt="BDAA Logo"
                sizes="144px"
                fill
                className="object-contain"
              />
            </div>

            {/* EMAIL */}
            <a
              href="mailto:info@bdaa-osu.edu"
              className="mb-6 text-sm text-gray-500 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-[#B83E38]"
            >
              info@bdaa-osu.edu
            </a>

            {/* HORIZONTAL LINKS */}
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
            >
              {[
                { label: 'Meet BDAA', href: '/about' },
                { label: 'Events', href: '/events' },
                { label: 'Blog', href: '/blog' },
                { label: 'Partnerships', href: '/partners' },
                { label: 'GroupMe', href: socialLinks.groupMe },
                {
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/company/big-data-analytics-association/'
                },
                {
                  label: 'Instagram',
                  href: 'https://www.instagram.com/bdaaosu/'
                }
              ].map((link, index) => (
                <React.Fragment key={link.label}>
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="text-gray-300 select-none"
                    >
                      |
                    </span>
                  )}

                  <Link
                    href={link.href}
                    className="text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-[#B83E38]"
                  >
                    {link.label}
                  </Link>
                </React.Fragment>
              ))}
            </nav>

          </div>
        </Container>
      </div>

      {/* COPYRIGHT */}
      <Container>
        <div className="mx-auto max-w-7xl border-t border-black/[0.06] py-4">
          <p className="text-center text-xs tracking-wide text-gray-400">
            © {currentYear} Big Data Analytics Association. All rights reserved.
          </p>
        </div>
      </Container>

    </footer>
  );
}
