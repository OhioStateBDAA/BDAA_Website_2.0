'use client';
import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

  const companies = [
    { name: 'Microsoft', logo: 'https://img.logo.dev/microsoft.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Google', logo: 'https://img.logo.dev/google.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Amazon', logo: 'https://img.logo.dev/amazon.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Meta', logo: 'https://img.logo.dev/meta.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Apple', logo: 'https://img.logo.dev/apple.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Netflix', logo: 'https://img.logo.dev/netflix.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Tesla', logo: 'https://img.logo.dev/tesla.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Spotify', logo: 'https://img.logo.dev/spotify.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Uber', logo: 'https://img.logo.dev/uber.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Airbnb', logo: 'https://img.logo.dev/airbnb.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'LinkedIn', logo: 'https://img.logo.dev/linkedin.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Salesforce', logo: 'https://img.logo.dev/salesforce.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Adobe', logo: 'https://img.logo.dev/adobe.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Intel', logo: 'https://img.logo.dev/intel.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'IBM', logo: 'https://img.logo.dev/ibm.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' }, 
    { name: 'Oracle', logo: 'https://img.logo.dev/oracle.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Cisco', logo: 'https://img.logo.dev/cisco.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' }, 
    { name: 'Dropbox', logo: 'https://img.logo.dev/dropbox.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Huntington Bank', logo: 'https://img.logo.dev/huntington.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Nationwide', logo: 'https://img.logo.dev/nationwide.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'JPMorgan Chase', logo: 'https://img.logo.dev/jpmorganchase.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Progressive', logo: 'https://img.logo.dev/progressive.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Fifth Third Bank', logo: 'https://img.logo.dev/53.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Honda', logo: 'https://img.logo.dev/honda.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Accenture', logo: 'https://img.logo.dev/accenture.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Capital One', logo: 'https://img.logo.dev/capitalone.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
    { name: 'Stripe', logo: 'https://img.logo.dev/stripe.com?token=pk_V44kw7KDSY-9AnxSTCIH7g' },
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
      className="company-logo-square aspect-square cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="article"
      aria-label={`${company.name} company`}
    >
      {!imageError ? (
        <Image
          src={company.logo}
          alt={`${company.name} logo`}
          fill
          className="object-contain p-3"
          onError={() => setImageError(true)}
          unoptimized
        />
      ) : (
        <div className="company-logo-fallback">
          {company.name.charAt(0)}
        </div>
      )}
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