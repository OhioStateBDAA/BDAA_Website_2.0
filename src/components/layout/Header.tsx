import React from 'react';
import { Container } from './Container';

interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  return (
    <header className={`bg-white border-b border-[var(--border)] ${className}`}>
      <Container>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <div className="text-[var(--highlight)] text-2xl font-bold font-[var(--font-display)]">
              BDAA
            </div>
            <div className="hidden md:block">
              <div className="bg-[var(--background)] border border-[var(--border)] px-4 py-2 rounded">
                <span className="text-[var(--text-secondary)] font-medium">
                  Tag Line
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-[var(--background)] border border-[var(--border)] rounded"></div>
            <div className="w-12 h-8 bg-[var(--background)] border border-[var(--border)] rounded"></div>
          </div>
        </div>
      </Container>
    </header>
  );
}