import React from 'react';

interface ActivityCardProps {
  title: string;
  description: string;
  colorVar: string;
  illustration?: React.ReactNode;
  className?: string;
}

export function ActivityCard({ 
  title, 
  description, 
  colorVar, 
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
        className="activity-card-illustration"
        style={{ backgroundColor: `var(${colorVar})` }}
        role="img"
        aria-label={`${title} illustration`}
      >
        {illustration || (
          <span className="text-lg opacity-70">
            {title} Activity
          </span>
        )}
      </div>
    </div>
  );
}