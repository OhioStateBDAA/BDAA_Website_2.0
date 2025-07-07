import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'full' | 'contained';
}

export function Container({ children, className = '', size = 'contained' }: ContainerProps) {
  return (
    <div
      className={`container-padding mx-auto ${size === 'full' ? 'w-full' : 'max-w-7xl'} ${className}`}
    >
      {children}
    </div>
  );
} 