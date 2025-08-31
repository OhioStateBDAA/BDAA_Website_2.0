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

const SPONSORS: Sponsor[] = [
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

const CAROUSEL_OPTIONS = {
  loop: true,
  align: 'start',
  slidesToScroll: 1,
  containScroll: 'trimSnaps'
} as const

const AUTOPLAY_OPTIONS = {
  delay: 3000,
  stopOnInteraction: false,
  stopOnMouseEnter: true,
  playOnInit: true
} as const

const AUTOPLAY_RESTART_DELAY = 3000

export function SponsorsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(CAROUSEL_OPTIONS, [
    Autoplay(AUTOPLAY_OPTIONS)
  ])

  const handleSponsorClick = useCallback((sponsor: Sponsor) => {
    if (!emblaApi) return

    const autoplay = emblaApi.plugins().autoplay as { stop: () => void; play: () => void }
    if (autoplay) {
      autoplay.stop()
      setTimeout(() => autoplay.play(), AUTOPLAY_RESTART_DELAY)
    }
    
    if (sponsor.website) {
      window.open(sponsor.website, '_blank', 'noopener,noreferrer')
    }
  }, [emblaApi])

  const renderSponsorSlide = (sponsor: Sponsor, index: number) => (
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
  )

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
            {[...SPONSORS, ...SPONSORS].map(renderSponsorSlide)}
          </div>
        </div>
      </Container>
    </Section>
  )
}