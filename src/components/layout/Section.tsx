import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  background?: 'default' | 'highlight' | 'alt';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  id?: string;
}

const bgMap = {
  default: 'bg-[var(--background)]',
  highlight: 'bg-[var(--highlight)]',
  alt: 'bg-[var(--background-alt)]',
};

const padMap = {
  sm: 'py-4',
  md: 'py-8',
  lg: 'py-16',
  xl: 'py-24',
};

export function Section({ children, background = 'default', padding = 'md', className = '', id }: SectionProps) {
  return (
    <section id={id} className={`${bgMap[background]} ${padMap[padding]} ${className}`}>
      {children}
    </section>
  );
} 