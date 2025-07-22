import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  sublabel?: string;
  color: string;
  href?: string;
  className?: string;
  showArrow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  sublabel,
  color,
  href,
  className = '',
  showArrow = true,
}) => {
  const content = (
    <div className={`relative group ${className}`}>
      {/* Shadow copy - always visible black background */}
      <div
        className={`absolute top-0 left-0 w-full h-full rounded-2xl bg-black z-0`}
      />

      {/* Main button - lifts up and to the right on hover */}
      <div
        className={`relative z-10 w-full h-full rounded-2xl font-semibold transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 flex items-center justify-center border border-black px-6 py-3 min-h-[48px]`}
        style={{ backgroundColor: color, color: '#fff' }}
      >
        <div className="flex items-center justify-center">
          <span className="leading-tight">{label}</span>
          {sublabel && <span className="leading-tight text-sm ml-2">{sublabel}</span>}
          {showArrow && (
            <div className="ml-4 p-1 rounded-lg" style={{ backgroundColor: color }}>
              <ArrowUpRight className="text-white w-5 h-5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none' }}>
        {content}
      </a>
    );
  }
  return content;
}; 