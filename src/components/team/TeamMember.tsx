'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { TeamMember as TeamMemberType } from '@/data/officerData'
import { ExternalLink } from 'lucide-react'

interface TeamMemberProps {
  member: TeamMemberType
  onClick?: (member: TeamMemberType) => void
}

export function TeamMember({ member, onClick }: TeamMemberProps) {
  const [imageError, setImageError] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick(member)
    }
  }

  const handleLinkedInClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (member.linkedIn) {
      window.open(member.linkedIn, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div
      className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      onClick={handleClick}
    >
      {/* Name above photo */}
      <div className="text-center mb-3">
        <h3 className="text-lg font-display font-bold text-black leading-tight">
          {member.name}
        </h3>
      </div>

      {/* Photo container */}
      <div className="team-member-container relative aspect-square mb-3 overflow-hidden rounded-lg">
        {!imageError ? (
          <Image
            src={member.img}
            alt={`${member.name} headshot`}
            fill
            className="object-cover team-member-photo"
            onError={() => setImageError(true)}
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm font-primary">Photo not available</span>
          </div>
        )}

        {/* LinkedIn overlay */}
        {member.linkedIn && (
          <div
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handleLinkedInClick}
          >
            <div className="bg-black/70 text-white p-1.5 rounded-full hover:bg-black/90 transition-colors">
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        )}
      </div>

      {/* Role below photo - right aligned */}
      <div className="text-right">
        <p className="text-sm font-primary font-medium text-black leading-tight">
          {member.role}
        </p>
      </div>
    </div>
  )
}