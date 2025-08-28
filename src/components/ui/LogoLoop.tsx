'use client'

import React from 'react';
import Image from 'next/image';

interface LogoItem {
  node?: React.ReactNode;
  src?: string;
  alt?: string;
  title?: string;
  href?: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right';
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
}

export default function LogoLoop({
  logos,
  speed = 120,
  direction = 'left',
  logoHeight = 48,
  gap = 40,
  pauseOnHover = true,
  scaleOnHover = false,
  fadeOut = true,
  fadeOutColor = '#ffffff',
  ariaLabel = 'Logo carousel'
}: LogoLoopProps) {
  const animationDuration = `${logos.length * (logoHeight + gap) / speed * 10}s`;
  
  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      style={{ height: `${logoHeight + 20}px` }}
      aria-label={ariaLabel}
    >
      {/* Fade out gradients */}
      {fadeOut && (
        <>
          <div 
            className="absolute left-0 top-0 z-10 h-full w-16"
            style={{
              background: `linear-gradient(to right, ${fadeOutColor}, transparent)`
            }}
          />
          <div 
            className="absolute right-0 top-0 z-10 h-full w-16"
            style={{
              background: `linear-gradient(to left, ${fadeOutColor}, transparent)`
            }}
          />
        </>
      )}

      {/* Scrolling container */}
      <div
        className={`flex items-center h-full ${pauseOnHover ? 'hover:pause' : ''}`}
        style={{
          animation: `scroll${direction === 'left' ? 'Left' : 'Right'} ${animationDuration} linear infinite`,
          gap: `${gap}px`,
          animationPlayState: 'running'
        }}
      >
        {/* Duplicate logos for seamless loop */}
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className={`flex-shrink-0 flex items-center justify-center transition-transform duration-200 ${
              scaleOnHover ? 'hover:scale-110' : ''
            }`}
            style={{
              height: `${logoHeight}px`,
              minWidth: `${logoHeight}px`
            }}
          >
            {logo.href ? (
              <a 
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-full"
                title={logo.title || logo.alt}
              >
                {logo.node ? (
                  <div style={{ fontSize: `${logoHeight * 0.6}px` }}>
                    {logo.node}
                  </div>
                ) : logo.src ? (
                  <div className="relative" style={{ width: `${logoHeight}px`, height: `${logoHeight}px` }}>
                    <Image
                      src={logo.src}
                      alt={logo.alt || ''}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : null}
              </a>
            ) : (
              <div className="flex items-center justify-center h-full">
                {logo.node ? (
                  <div style={{ fontSize: `${logoHeight * 0.6}px` }}>
                    {logo.node}
                  </div>
                ) : logo.src ? (
                  <div className="relative" style={{ width: `${logoHeight}px`, height: `${logoHeight}px` }}>
                    <Image
                      src={logo.src}
                      alt={logo.alt || ''}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .hover\\:pause:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}