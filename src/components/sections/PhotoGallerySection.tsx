import React from 'react';
import Image from 'next/image';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';

export function PhotoGallerySection() {
  // Real photo gallery items with actual images
  const items = [
    {
      id: "1",
      img: "/img/gallery/photo-1.jpg",
      alt: "Eboard photo #1",
      height: 400,
      width: 600,
    },
    {
      id: "2",
      img: "/img/gallery/photo-2.jpg",
      alt: "Eboard photo #2",
      height: 250,
      width: 600,
    },
    {
      id: "3",
      img: "/img/gallery/photo-3.jpg",
      alt: "BDAA at the involvement fair",
      height: 300,
      width: 600,
    },
    {
      id: "4",
      img: "/img/gallery/photo-4.jpg",
      alt: "Bank of America Tech Talk",
      height: 350,
      width: 600,
    },
    {
      id: "5",
      img: "/img/gallery/photo-5.jpg",
      alt: "BDAA networking event",
      height: 300,
      width: 600,
    },
    {
      id: "6",
      img: "/img/gallery/photo-6.jpg",
      alt: "Talking to a Bank of America representative",
      height: 350,
      width: 600,
    },
    {
      id: "7",
      img: "/img/gallery/photo-7.jpg",
      alt: "BDAA winning OSU's Student Organization Excellence Award",
      height: 270,
      width: 600,
    },
    {
      id: "8",
      img: "/img/gallery/photo-8.jpg",
      alt: "Community building activities at BDAA",
      height: 380,
      width: 600,
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

        {/* Masonry layout with real images */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 max-w-7xl mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid mb-4"
            >
              <div
                className="bg-white border border-black overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                style={{ height: `${item.height}px` }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={item.img}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    priority={item.id === "1" || item.id === "3"}
                  />
                  {/* Optional overlay with photo info */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-end">
                    <div className="w-full p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white text-sm font-medium">{item.alt}</div>
                    </div>
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