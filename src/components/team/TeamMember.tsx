'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { TeamMember as TeamMemberType } from '@/types/events'
import { ExternalLink } from 'lucide-react'

interface TeamMemberProps {
  member: TeamMemberType
  onClick?: (member: TeamMemberType) => void
}

export function TeamMember({ member, onClick }: TeamMemberProps) {
  const [imageError, setImageError] = useState(false)
  return (
    <div className="relative group">
      <button type="button" onClick={() => onClick?.(member)} aria-label={`View profile for ${member.name}`}
        className="block w-full text-black rounded-lg">
        <span className="block text-center mb-3 text-lg font-display font-bold leading-tight">{member.name}</span>
        <span className="team-member-container relative block aspect-square mb-3 overflow-hidden rounded-lg">
          {!imageError && member.img ? (
            <Image src={member.img} alt={`${member.name} headshot`} fill
              sizes="(max-width: 639px) calc(100vw - 64px), (max-width: 1023px) 45vw, (max-width: 1279px) 29vw, 280px"
              className="object-cover team-member-photo" onError={() => setImageError(true)} />
          ) : (
            <span className="h-full flex items-center justify-center bg-gray-200 text-gray-700 text-sm">Photo not available</span>
          )}
        </span>
        <span className="block text-right text-sm font-primary font-medium">{member.role}</span>
      </button>
      {member.linkedIn && (
        <a href={member.linkedIn} target="_blank" rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="absolute right-2 top-12 flex min-h-11 min-w-11 items-center justify-center bg-black/80 text-white rounded-full">
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      )}
    </div>
  )
}
