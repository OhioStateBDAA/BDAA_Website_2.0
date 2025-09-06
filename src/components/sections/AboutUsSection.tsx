'use client';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import Image from 'next/image';


type ClubImage = {
  id: number;
  img: string;
  alt: string;
  width: number;
  height: number;
};

const CLUB_IMAGES: ClubImage[] = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    alt: "BDAA workshop session",
    width: 280,
    height: 180
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=400&fit=crop",
    alt: "Data analytics presentation",
    width: 200,
    height: 150
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=500&fit=crop",
    alt: "Team collaboration",
    width: 220,
    height: 280
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
    alt: "Networking event",
    width: 180,
    height: 120
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop",
    alt: "Team meeting",
    width: 240,
    height: 160
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
    alt: "Data science project",
    width: 200,
    height: 140
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    alt: "Data visualization",
    width: 160,
    height: 200
  },
  {
    id: 8,
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    alt: "Team discussion",
    width: 190,
    height: 130
  }
];

const useMeasure = (): [React.RefObject<HTMLDivElement>, { width: number; height: number }] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref as React.RefObject<HTMLDivElement>, size];
};

export function AboutUsSection() {
  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  const grid = useMemo(() => {
    if (!width) return [];
    
    // Position images within a centered box area (similar to the content box)
    const boxWidth = Math.min(width * 0.8, 1000); // Max width like content box
    const boxHeight = 500;
    const boxX = (width - boxWidth) / 2;
    const boxY = 50;
    
    return CLUB_IMAGES.map((item) => {
      // Create random positions within the box bounds
      const maxX = boxWidth - item.width;
      const maxY = boxHeight - item.height;
      
      // Use a seed based on ID for consistent positioning
      const seed = item.id * 137.5;
      const x = boxX + Math.abs(Math.sin(seed)) * Math.max(0, maxX);
      const y = boxY + Math.abs(Math.cos(seed * 1.3)) * Math.max(0, maxY);
      
      return { 
        ...item, 
        x, 
        y, 
        w: item.width, 
        h: item.height 
      };
    });
  }, [width]);

  useEffect(() => {
    const preloadImages = async () => {
      await Promise.all(
        CLUB_IMAGES.map(
          (item) =>
            new Promise<void>((resolve) => {
              const img = new window.Image();
              img.src = item.img;
              img.onload = img.onerror = () => resolve();
            })
        )
      );
      setImagesReady(true);
    };
    preloadImages();
  }, []);

  const handleMouseEnter = (element: HTMLElement) => {
    element.style.transform = 'scale(0.95)';
    element.style.transition = 'transform 0.3s ease';
  };

  const handleMouseLeave = (element: HTMLElement) => {
    element.style.transform = 'scale(1)';
    element.style.transition = 'transform 0.3s ease';
  };

  return (
    <Section background="alt" padding="lg">
      <Container>
        <div className="flex items-center justify-center min-h-[600px]">
          <div className="relative group cursor-pointer max-w-4xl w-full">
            {/* Black shadow */}
            <div className="absolute top-0 left-0 w-full h-full rounded-3xl bg-black z-0" />
            
            {/* Main container with images and content */}
            <div className="relative z-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300 ease-out">
              <div className="relative bg-[#F8F6F0] rounded-3xl border border-black min-h-[500px] overflow-hidden">
                
                {/* Background Images - positioned within the box */}
                <div ref={containerRef} className="absolute inset-0">
                  {imagesReady && grid.map((item) => (
                    <div
                      key={item.id}
                      className="absolute rounded-2xl overflow-hidden shadow-md"
                      style={{
                        left: `${item.x - (grid.length > 0 ? grid[0].x - 50 : 0)}px`,
                        top: `${item.y - 50}px`,
                        width: `${item.w}px`,
                        height: `${item.h}px`,
                        willChange: 'transform',
                        opacity: 0,
                        animation: `fadeInUp 0.8s ease forwards ${item.id * 0.15}s`
                      }}
                      onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                      onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                    >
                      <Image
                        src={item.img}
                        alt={item.alt}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>

                {/* Content overlay */}
                <div className="relative z-10 p-12 min-h-[500px] flex flex-col justify-center bg-[#F8F6F0]/90 backdrop-blur-sm">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="inline-block px-6 py-3 bg-[var(--highlight)] text-white rounded-full text-sm font-medium mb-8">
                      Who we are
                    </div>
                  </div>

                  {/* Title and description */}
                  <div className="text-center">
                    <h2 className="font-display text-4xl lg:text-5xl font-bold text-black leading-tight mb-6">
                      Building the future of
                      <br />
                      data analytics
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                      We&apos;re a community of students passionate about turning data into insights. 
                      Through workshops, networking events, and hands-on projects, we prepare the next 
                      generation of data professionals at The Ohio State University.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </Container>
    </Section>
  );
}