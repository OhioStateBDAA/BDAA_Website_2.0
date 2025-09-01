import React from 'react';
import Image from 'next/image';

interface ActivityCardProps {
  title: string;
  description: string;
  colorVar: string;
  image?: string;
  alt?: string;
  illustration?: React.ReactNode;
  className?: string;
}

export function ActivityCard({
  title,
  description,
  colorVar,
  image,
  alt,
  illustration,
  className = ''
}: ActivityCardProps) {
  const cardId = `activity-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div
      className={`activity-card ${className}`}
      role="article"
      aria-labelledby={cardId}
    >
      <div className="activity-card-header">
        <h3 id={cardId} className="activity-card-title">
          {title}
        </h3>
        <p className="activity-card-description">
          {description}
        </p>
      </div>

      <div
        className="activity-card-illustration relative overflow-hidden rounded-lg"
        style={{ backgroundColor: `var(${colorVar})` }}
        role="img"
        aria-label={alt || `${title} illustration`}
      >
        {image ? (
          <Image
            src={image}
            alt={alt || `${title} activity`}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : illustration ? (
          illustration
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-lg opacity-70 text-white font-medium">
              {title} Activity
            </span>
          </div>
        )}
      </div>
    </div>
  );
}