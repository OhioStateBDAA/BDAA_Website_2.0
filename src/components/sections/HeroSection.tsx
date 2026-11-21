import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Archivo } from 'next/font/google';
import { Container } from '../layout/Container';
import { AnimatedTagline } from '../ui/AnimatedTagline';
import { socialLinks } from '../../data/socialLinks';
import heroImage from '../../../public/group-photo.jpg';
import guysImage from '../../../public/img/group-guys.jpg';
import girlsImage from '../../../public/img/group-girls.jpg';

const display = Archivo({ subsets: ['latin'], weight: ['800'] });
const RED = '#861B21';

const photos = [
  { src: guysImage, alt: 'BDAA members at a campus gathering' },
  { src: heroImage, alt: 'BDAA members together on campus' },
  { src: girlsImage, alt: 'BDAA members at an organization event' },
];

// Repeated so the strip is wider than any screen; the second half makes the loop seamless
const strip = [...photos, ...photos];
const fade = 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)';

export function HeroSection() {
  return (
    <section className="relative">
      <div className="-mt-48 pt-48 pb-[190px] text-white" style={{ backgroundColor: RED }}>
        <Container size="contained">
          <div className="pt-10 md:pt-16">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.08em] text-white/75">
              Big Data &amp; Analytics Association · Ohio State
            </p>
            <h1 className={`${display.className} max-w-[1050px] text-[44px] leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-[88px]`}>
              <AnimatedTagline highlightClassName="underline decoration-white/40 decoration-[6px] underline-offset-[10px]" />
            </h1>

            <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={socialLinks.groupMe}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full bg-white px-6 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
                  style={{ color: RED }}
                >
                  Join the GroupMe
                </a>
                <Link href="/events" className="inline-flex min-h-11 items-center gap-1 font-semibold text-white hover:underline">
                  See upcoming events <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <Link href="/partners#sponsorship-application" className="inline-flex min-h-11 items-center gap-1 font-semibold text-white/80 hover:underline">
                  Partner with us <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>

              <dl className="flex flex-wrap gap-x-10 gap-y-4">
                <div>
                  <dt className="text-sm text-white/70">Members</dt>
                  <dd className={`${display.className} text-4xl`}>900+</dd>
                </div>
                <div>
                  <dt className="text-sm text-white/70">Project tracks</dt>
                  <dd className={`${display.className} text-4xl`}>4</dd>
                </div>
                <div>
                  <dt className="text-sm text-white/70">Building since</dt>
                  <dd className={`${display.className} text-4xl`}>2014</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </div>

      <div className="ribbon relative -mt-[150px] overflow-hidden" style={{ maskImage: fade, WebkitMaskImage: fade }}>
        <div className="ribbon-track flex w-max gap-4">
          {[0, 1].map(half => (
            <div key={half} className="flex gap-4" aria-hidden={half === 1 ? true : undefined}>
              {strip.map((photo, i) => (
                <Image
                  key={`${half}-${i}`}
                  src={photo.src}
                  alt={half === 0 && i < photos.length ? photo.alt : ''}
                  sizes="600px"
                  className="h-[220px] w-auto rounded-[20px] md:h-[300px]"
                  loading={half === 0 && i < photos.length ? "eager" : "lazy"}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
