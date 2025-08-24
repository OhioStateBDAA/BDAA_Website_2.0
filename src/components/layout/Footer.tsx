import React from 'react';
import { Container } from './Container';
import { Section } from './Section';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Calendar, ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <Section padding="lg" background="default" className="bg-black">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Mission */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-12 w-32">
                  <Image
                    src="/BDAALogo.png"
                    alt="BDAA Logo"
                    fill
                    className="object-contain object-left filter brightness-0 invert"
                  />
                </div>
              </div>
              <p className="text-gray-200 leading-relaxed mb-6 max-w-md">
                BDAA aims to inspire students to think analytically, empower them through hands-on training,
                and connect them to potential employers at The Ohio State University.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="mailto:bdaa@osu.edu"
                  className="text-gray-200 hover:text-white transition-colors"
                  aria-label="Email BDAA"
                >
                  <Mail className="w-5 h-5" />
                </Link>
                <Link
                  href="https://github.com/bdaa-osu"
                  className="text-gray-200 hover:text-white transition-colors"
                  aria-label="BDAA GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5" />
                </Link>
                <Link
                  href="https://linkedin.com/company/bdaa-osu"
                  className="text-gray-200 hover:text-white transition-colors"
                  aria-label="BDAA LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link
                  href="https://twitter.com/bdaa_osu"
                  className="text-gray-200 hover:text-white transition-colors"
                  aria-label="BDAA Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-display font-bold text-lg mb-4 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-200 hover:text-white transition-colors flex items-center gap-2"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partners"
                    className="text-gray-200 hover:text-white transition-colors flex items-center gap-2"
                  >
                    Partners
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-200 hover:text-white transition-colors flex items-center gap-2"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partners#sponsorship-application"
                    className="text-gray-200 hover:text-white transition-colors flex items-center gap-2"
                  >
                    Partner With Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://osu.edu"
                    className="text-gray-200 hover:text-white transition-colors flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ohio State University
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Location */}
            <div>
              <h3 className="font-display font-bold text-lg mb-4 text-white">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 text-gray-300 flex-shrink-0" />
                  <div>
                    <p className="text-gray-200 text-sm">
                      The Ohio State University<br />
                      Columbus, OH 43210
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  <Link
                    href="mailto:bdaa@osu.edu"
                    className="text-gray-200 hover:text-white transition-colors text-sm"
                  >
                    ohiostatebdaa@gmail.com
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  <p className="text-gray-200 text-sm">
                    Founded 2014
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-600 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-300 text-sm">
                © {currentYear} Big Data Analytics Association. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                </Link>
                <Link
                  href="/accessibility"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
