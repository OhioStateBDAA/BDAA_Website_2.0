import React from 'react';

interface CompanyCardProps {
  companyName: string;
  logoEmoji: string;
  className?: string;
}

export function CompanyCard({ 
  companyName, 
  logoEmoji, 
  className = '' 
}: CompanyCardProps) {
  return (
    <div 
      className={`
        bg-white 
        rounded-xl 
        p-6 
        flex 
        flex-col 
        items-center 
        justify-center 
        shadow-sm 
        hover:shadow-md 
        transition-all 
        duration-200
        min-h-[120px]
        min-w-[120px]
        ${className}
      `}
      role="article"
      aria-label={`${companyName} company`}
    >
      {/* Company Logo/Emoji */}
      <div className="text-4xl mb-2">
        {logoEmoji}
      </div>
      
      {/* Company Name */}
      <div className="text-sm font-medium text-gray-800 text-center">
        {companyName}
      </div>
    </div>
  );
}