'use client';
import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

const companies = [
  { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
  { name: 'Google', logo: 'https://logo.clearbit.com/google.com' },
  { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
  { name: 'Meta', logo: 'https://logo.clearbit.com/meta.com' },
  { name: 'Apple', logo: 'https://logo.clearbit.com/apple.com' },
  { name: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com' },
  { name: 'Tesla', logo: 'https://logo.clearbit.com/tesla.com' },
  { name: 'Spotify', logo: 'https://logo.clearbit.com/spotify.com' },
  { name: 'Uber', logo: 'https://logo.clearbit.com/uber.com' },
  { name: 'Airbnb', logo: 'https://logo.clearbit.com/airbnb.com' },
  { name: 'LinkedIn', logo: 'https://logo.clearbit.com/linkedin.com' },
  { name: 'Salesforce', logo: 'https://logo.clearbit.com/salesforce.com' },
  { name: 'Adobe', logo: 'https://logo.clearbit.com/adobe.com' },
  { name: 'Intel', logo: 'https://logo.clearbit.com/intel.com' },
  { name: 'IBM', logo: 'https://logo.clearbit.com/ibm.com' },
  { name: 'Oracle', logo: 'https://logo.clearbit.com/oracle.com' },
  { name: 'Cisco', logo: 'https://logo.clearbit.com/cisco.com' },
  { name: 'Dropbox', logo: 'https://logo.clearbit.com/dropbox.com' },
  { name: 'Huntington Bank', logo: 'https://logo.clearbit.com/huntington.com' },
  { name: 'Nationwide', logo: 'https://logo.clearbit.com/nationwide.com' },
  { name: 'JPMorgan Chase', logo: 'https://logo.clearbit.com/jpmorganchase.com' },
  { name: 'Progressive', logo: 'https://logo.clearbit.com/progressive.com' },
  { name: 'Fifth Third Bank', logo: 'https://logo.clearbit.com/53.com' },
  { name: 'Honda', logo: 'https://logo.clearbit.com/honda.com' },
  { name: 'Accenture', logo: 'https://logo.clearbit.com/accenture.com' },
  { name: 'Capital One', logo: 'https://logo.clearbit.com/capitalone.com' },
  { name: 'Stripe', logo: 'https://logo.clearbit.com/stripe.com' },
];

interface CompanyCardProps {
  company: { name: string; logo: string };
  index: number;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
}

function CompanyCard({ company, index, onMouseEnter, onMouseLeave }: CompanyCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleMouseEnter = useCallback(() => {
    onMouseEnter(index);
  }, [index, onMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    onMouseLeave();
  }, [onMouseLeave]);

  return (
    <div
      className="aspect-square w-full flex items-center justify-center cursor-pointer group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="article"
      aria-label={`${company.name} company`}
    >
      {/* Shadow copy - always visible black background */}
      <div className="absolute top-0 left-0 w-full h-full rounded-xl bg-black z-0" />
      
      {/* Main logo circle - lifts up and to the right on hover */}
      <div className="company-logo-circle relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ease-out">
        {!imageError ? (
          <Image
            src={company.logo}
            alt={`${company.name} logo`}
            fill
            className="object-contain p-2"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="company-logo-fallback">
            {company.name.charAt(0)}
          </div>
        )}
      </div>
    </div>
  );
}

export function AnimatedCompanyGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!gridRef.current) return;
    
    const rect = gridRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    gridRef.current.style.setProperty('--mouse-x', `${x}%`);
    gridRef.current.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  const handleCardMouseEnter = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    grid.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      grid.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <>
      <style jsx global>{`
        .company-grid {
          position: relative;
        }
        
        .company-grid::before {
          content: '';
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          background: radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.04) 25%,
            transparent 50%
          );
          opacity: ${activeIndex !== null ? '1' : '0'};
          transition: opacity 0.3s ease;
          pointer-events: none;
          border-radius: 1rem;
          z-index: 0;
        }
      `}</style>
      
      <div ref={gridRef} className="company-grid">
        {companies.map((company, index) => (
          <CompanyCard
            key={index}
            company={company}
            index={index}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
          />
        ))}
      </div>
    </>
  );
}