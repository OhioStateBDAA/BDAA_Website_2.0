import React from 'react';
import { Container } from './Container';
import { Button } from '../ui/Button';
import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  return (
    <Container size="contained">
      <nav className="navbar">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-12 w-40">
            <Image
              src="/BDAALogo.png"
              alt="BDAA Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>
        {/* Nav Links */}
        <div className="navbar-links">
          <Link href="/about" className="hover:underline">About Us</Link>
          <Link href="/partners" className="hover:underline">Partners</Link>
          <Link href="#" className="hover:underline">Blog</Link>
        </div>
        {/* CTA Button */}
        <div className="mr-2">
          <Button 
            label="All Events" 
            color="var(--highlight)" 
            showArrow={false} 
            className="hero-button min-w-[100px] max-h-[50px]" 
          />
        </div>
      </nav>
    </Container>
  );
} 