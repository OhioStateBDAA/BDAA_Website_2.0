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

export function SponsorsCarousel() {
  return (
    <Section padding="md" background="default">
      <Container>
        <h2 className="text-center text-xl font-display font-bold text-black mb-8">Sponsors/Partners</h2>
        <div className="sponsor-strip grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SPONSORS.map(sponsor => (
            <a key={sponsor.id} href={sponsor.website} target="_blank" rel="noopener noreferrer"
              className="flex min-h-24 items-center justify-center rounded-lg p-3" aria-label={sponsor.name}>
              <div className="relative w-full h-14 max-w-32">
                <Image src={sponsor.logo} alt={`${sponsor.name} logo`} fill sizes="160px" className="object-contain" />
              </div>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  )
}
