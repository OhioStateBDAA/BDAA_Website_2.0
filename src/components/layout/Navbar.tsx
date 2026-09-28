'use client';

import React, { useId, useRef, useState } from 'react';
import { Container } from './Container';
import { Button } from '../ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/about', label: 'About Us' },
  { href: '/partners', label: 'Partners' },
  { href: '/blog', label: 'Blog' },
  { href: '/events', label: 'All Events' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  return (
    <Container size="contained">
      <nav
        className="navbar flex-wrap gap-y-4"
        aria-label="Main navigation"
        onKeyDown={event => {
          if (event.key === 'Escape' && isOpen) {
            setIsOpen(false);
            toggleRef.current?.focus();
          }
        }}
        onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
        }}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2" onClick={() => setIsOpen(false)}>
          <div className="relative h-12 w-40">
            <Image
              src="/BDAALogo.png"
              alt="BDAA home"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        <div className="navbar-links">
          {links.slice(0, 3).map(link => (
            <Link key={link.href} href={link.href} className="hover:underline" aria-current={pathname === link.href ? 'page' : undefined}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:block">
          <Button
            label="All Events"
            color="var(--highlight)"
            showArrow={false}
            className="hero-button min-w-[100px] max-h-[50px]"
            href="/events"
          />
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-black px-3 font-semibold text-black md:hidden focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsOpen(open => !open)}
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          Menu
        </button>

        <div id={menuId} hidden={!isOpen} className="w-full border-t border-gray-200 pt-2 md:hidden">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
              className="flex min-h-11 items-center rounded-lg px-3 py-2 text-black hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 aria-[current=page]:font-bold"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </Container>
  );
}
