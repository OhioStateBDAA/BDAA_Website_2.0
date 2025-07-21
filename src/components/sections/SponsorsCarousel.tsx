'use client'

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Container } from '../layout/Container'
import { Section } from '../layout/Section'
import Image from 'next/image'

interface Sponsor {
  id: string
  name: string
  logo: string
  website?: string
}

// BDAA Sponsors and Partners
const sponsors: Sponsor[] = [
  { 
    id: 'accenture', 
    name: 'Accenture', 
    logo: '/sponsors/logos/accenture.png',
    website: 'https://www.accenture.com'
  },
  { 
    id: 'aws', 
    name: 'Amazon Web Services', 
    logo: '/sponsors/logos/aws-color.svg',
    website: 'https://aws.amazon.com'
  },
  { 
    id: 'ernst-young', 
    name: 'Ernst & Young', 
    logo: '/sponsors/logos/ernst-young.svg',
    website: 'https://www.ey.com'
  },
  { 
    id: 'fifth-third-bank', 
    name: 'Fifth Third Bank', 
    logo: '/sponsors/logos/fifth-third-bank.svg',
    website: 'https://www.53.com'
  },
  { 
    id: 'honda', 
    name: 'Honda', 
    logo: '/sponsors/logos/honda.png',
    website: 'https://www.honda.com'
  },
  { 
    id: 'osu', 
    name: 'The Ohio State University', 
    logo: '/sponsors/logos/osulogo.png',
    website: 'https://www.osu.edu'
  },
]

export function SponsorsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      containScroll: 'trimSnaps'
    },
    [
      Autoplay({ 
        delay: 4000, // 4 second delay - slow and non-distracting
        stopOnInteraction: false, // Keep auto-scrolling even after user interaction
        stopOnMouseEnter: true, // Pause on hover
        playOnInit: true
      })
    ]
  )

  const handleSponsorClick = useCallback((sponsor: Sponsor) => {
    // Stop autoplay temporarily on click
    if (emblaApi) {
      const autoplay = emblaApi.plugins().autoplay as any
      if (autoplay) {
        autoplay.stop()
        // Restart autoplay after 3 seconds
        setTimeout(() => {
          autoplay.play()
        }, 3000)
      }
    }
    
    // Open sponsor website if available
    if (sponsor.website) {
      window.open(sponsor.website, '_blank', 'noopener,noreferrer')
    }
  }, [emblaApi])

  return (
    <Section padding="md" background="default">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-xl font-display font-bold text-[var(--text-secondary)] mb-2">
            Sponsors/Partners
          </h2>
        </div>
        
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {/* Duplicate sponsors array for smooth infinite scroll */}
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <div 
                key={`${sponsor.id}-${index}`}
                className="flex-[0_0_auto] min-w-0 pl-4 md:pl-8"
              >
                <div 
                  className="flex items-center justify-center p-6 cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={() => handleSponsorClick(sponsor)}
                >
                  <div className="relative w-32 h-20 md:w-40 md:h-24 sponsor-logo flex items-center justify-center">
                    <Image
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      fill
                      className="object-contain object-center"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}