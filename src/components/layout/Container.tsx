import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'full' | 'contained';
}

export function Container({ children, className = '', size = 'contained' }: ContainerProps) {
  return (
    <div
      className={`px-1 md:px-10 mx-auto ${size === 'full' ? 'w-full' : 'max-w-screen-2xl'} ${className}`}
    >
      {children}
    </div>
  );
} 