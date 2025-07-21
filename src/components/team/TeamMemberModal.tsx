'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { X, ExternalLink, Mail } from 'lucide-react'
import { TeamMember as TeamMemberType } from '@/data/officerData'

interface TeamMemberModalProps {
  member: TeamMemberType | null
  isOpen: boolean
  onClose: () => void
}

export function TeamMemberModal({ member, isOpen, onClose }: TeamMemberModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !member) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-[var(--background-white)] rounded-xl border border-[var(--border-black)] max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-display font-bold text-black">
            {member.name}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Photo and basic info */}
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={member.img}
                  alt={`${member.name} headshot`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="flex-1 space-y-2">
              <p className="text-lg font-primary font-bold text-[var(--highlight)]">
                {member.role}
              </p>
              {member.school_year && (
                <p className="text-sm font-primary text-black">
                  <span className="font-medium">Year:</span> {member.school_year}
                </p>
              )}
              {member.major && (
                <p className="text-sm font-primary text-black">
                  <span className="font-medium">Major:</span> {member.major}
                </p>
              )}
              {member.minor && member.minor !== 'N/A' && (
                <p className="text-sm font-primary text-black">
                  <span className="font-medium">Minor:</span> {member.minor}
                </p>
              )}
              {member.pronouns && (
                <p className="text-sm font-primary text-black">
                  <span className="font-medium">Pronouns:</span> {member.pronouns}
                </p>
              )}
              {!member.school_year && !member.major && (
                <p className="text-sm font-primary text-gray-500 italic">
                  Additional information not available
                </p>
              )}
            </div>
          </div>

          {/* Work Experience */}
          {member.work_experience && member.work_experience !== 'N/A' && (
            <div className="mb-4">
              <h3 className="text-sm font-primary font-bold text-black mb-2">Work Experience</h3>
              <p className="text-sm font-primary text-black leading-relaxed">
                {member.work_experience}
              </p>
            </div>
          )}

          {/* Fun Fact */}
          {member.fun_fact && (
            <div className="mb-6">
              <h3 className="text-sm font-primary font-bold text-black mb-2">Fun Fact</h3>
              <p className="text-sm font-primary text-black leading-relaxed">
                {member.fun_fact}
              </p>
            </div>
          )}

          {/* Contact Links */}
          {(member.linkedIn || member.email) && (
            <div className="flex flex-wrap gap-3">
              {member.linkedIn && (
                <button
                  onClick={() => handleLinkClick(member.linkedIn)}
                  className="flex items-center gap-2 bg-[var(--highlight)] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm font-primary font-bold"
                >
                  <ExternalLink className="w-4 h-4" />
                  LinkedIn
                </button>
              )}
              
              {member.email && (
                <button
                  onClick={() => handleLinkClick(member.email)}
                  className="flex items-center gap-2 border border-[var(--border-black)] text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-primary font-bold"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}