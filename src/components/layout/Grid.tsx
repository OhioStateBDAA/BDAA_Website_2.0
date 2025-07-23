import React from 'react';

interface GridProps {
  children: React.ReactNode;
  pattern?: 'auto-fit' | 'auto-fill' | '2-3' | 'equal';
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

const gapMap = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

export function Grid({ children, pattern = 'auto-fit', gap = 'md', className = '' }: GridProps) {
  let gridClass = '';
  if (pattern === 'auto-fit') {
    gridClass = `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`;
  } else if (pattern === 'auto-fill') {
    gridClass = `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3`;
  } else if (pattern === '2-3') {
    gridClass = 'grid grid-cols-2 md:grid-cols-3';
  } else {
    gridClass = 'grid grid-cols-1';
  }
  return (
    <div className={`${gridClass} ${gapMap[gap]} ${className}`}>{children}</div>
  );
} 