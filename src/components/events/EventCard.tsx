import React from 'react';
import { Event } from '@/data/events';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const getTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'workshop':
        return 'bg-blue-500';
      case 'guest-speaker':
        return 'bg-purple-500';
      case 'social':
        return 'bg-green-500';
      case 'competition':
        return 'bg-orange-500';
      case 'meeting':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatType = (type: Event['type']) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className={`bg-white border border-black rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${event.featured ? 'ring-2 ring-[var(--highlight)]' : ''}`}>
      {/* Event Type Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 ${getTypeColor(event.type)} rounded-full`}></div>
          <span className="text-sm font-medium text-gray-600">
            {formatType(event.type)}
          </span>
        </div>
        {event.featured && (
          <span className="bg-[var(--highlight)] text-white text-xs px-2 py-1 rounded-full font-medium">
            Featured
          </span>
        )}
      </div>

      {/* Event Title */}
      <h3 className="text-xl font-display font-bold text-black mb-3">
        {event.title}
      </h3>

      {/* Event Description */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        {event.description}
      </p>

      {/* Event Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-3">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm text-black font-medium">
            {formatDate(event.date)}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-black font-medium">
            {event.time}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm text-black font-medium">
            {event.location}
          </span>
        </div>
      </div>

      {/* Registration Link */}
      {event.registrationLink && (
        <a
          href={event.registrationLink}
          className="inline-flex items-center gap-2 bg-[var(--highlight)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors duration-200"
        >
          <span>Register</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>
  );
}