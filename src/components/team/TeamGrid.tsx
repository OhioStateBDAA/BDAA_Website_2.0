'use client'

import React from 'react'
import { TeamMember } from './TeamMember'
import { TeamMember as TeamMemberType, YearBoard } from '@/data/officerData'

interface TeamGridProps {
  board: YearBoard
  onMemberClick?: (member: TeamMemberType) => void
}

export function TeamGrid({ board, onMemberClick }: TeamGridProps) {
  // Sort officers by role hierarchy
  const roleOrder = [
    'President',
    'Vice President', 
    'Treasurer',
    'Education Director',
    'Corporate Relations Director',
    'Projects Director',
    'Marketing Director',
    'Social Events Director',
    'Webmaster',
    'Projects Liaison',
    'Education Liaison', 
    'Corporate Relations Liaison',
    'Treasurer Liaison',
    'Webmaster Liaison'
  ]

  const sortedOfficers = [...board.officers].sort((a, b) => {
    const aIndex = roleOrder.indexOf(a.role)
    const bIndex = roleOrder.indexOf(b.role)
    
    // If role not found in order, put at end
    if (aIndex === -1 && bIndex === -1) return 0
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    
    return aIndex - bIndex
  })

  return (
    <div className="w-full">
      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
        {sortedOfficers.map((officer, index) => (
          <TeamMember
            key={`${officer.name}-${index}`}
            member={officer}
            onClick={onMemberClick}
          />
        ))}
      </div>
      
      {/* Officer count */}
      <div className="text-center mt-8">
        <p className="text-sm font-primary text-gray-600">
          {board.officers.length} Officers • {board.displayName}
        </p>
      </div>
    </div>
  )
}