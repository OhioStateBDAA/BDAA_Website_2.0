import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import Image from 'next/image';

export function PhotoGallerySection() {
  // Masonry items with varying heights
  const items = [
    {
      id: "1",
      img: "/api/placeholder/600/400",
      alt: "BDAA Event Photo 1",
      height: 400,
    },
    {
      id: "2", 
      img: "/api/placeholder/600/250",
      alt: "BDAA Event Photo 2",
      height: 250,
    },
    {
      id: "3",
      img: "/api/placeholder/600/600", 
      alt: "BDAA Event Photo 3",
      height: 600,
    },
    {
      id: "4",
      img: "/api/placeholder/600/350",
      alt: "BDAA Event Photo 4", 
      height: 350,
    },
    {
      id: "5",
      img: "/api/placeholder/600/300",
      alt: "BDAA Event Photo 5",
      height: 300,
    },
    {
      id: "6",
      img: "/api/placeholder/600/450",
      alt: "BDAA Event Photo 6",
      height: 450,
    },
    {
      id: "7",
      img: "/api/placeholder/600/280",
      alt: "BDAA Event Photo 7",
      height: 280,
    },
    {
      id: "8",
      img: "/api/placeholder/600/380",
      alt: "BDAA Event Photo 8", 
      height: 380,
    }
  ];

  return (
    <Section background="highlight" padding="lg">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Photo Gallery
          </h2>
          <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
            Moments from our events, workshops, and community gatherings that showcase the vibrant BDAA experience.
          </p>
        </div>

        {/* Masonry layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 max-w-7xl mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid mb-4"
            >
              <div 
                className="bg-white border border-gray-300 overflow-hidden"
                style={{ height: `${item.height}px` }}
              >
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-3xl mb-2">📸</div>
                    <div className="text-sm font-medium">Photo {item.id}</div>
                    <div className="text-xs mt-1">{item.height}px</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}