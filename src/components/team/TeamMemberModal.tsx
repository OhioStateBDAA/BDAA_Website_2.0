'use client'

import React, { useEffect, useRef, useId } from 'react'
import Image from 'next/image'
import { X, ExternalLink, Mail } from 'lucide-react'
import { TeamMember as TeamMemberType } from '@/types/events'

interface TeamMemberModalProps {
  member: TeamMemberType | null
  isOpen: boolean
  onClose: () => void
}

export function TeamMemberModal({ member, isOpen, onClose }: TeamMemberModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  useEffect(() => {
    const dialog = dialogRef.current
    if (!isOpen || !member || !dialog) return
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, member])

  if (!member) return null

  const emailAddress = member.email?.replace(/^mailto:\s*/i, '').trim()

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="m-auto w-[calc(100%-2rem)] max-w-lg max-h-[90vh] rounded-xl p-0 backdrop:bg-black/50"
      onCancel={event => { event.preventDefault(); onClose() }}
      onClick={event => {
        if (event.target !== event.currentTarget) return
        const rect = event.currentTarget.getBoundingClientRect()
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose()
      }}
    >
      <div className="bg-[var(--background-white)] rounded-xl border border-[var(--border-black)] max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 id={titleId} className="text-xl font-display font-bold text-black">
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
                  sizes="128px"
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
          {(member.linkedIn || emailAddress) && (
            <div className="flex flex-wrap gap-3">
              {member.linkedIn && (
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[var(--highlight)] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm font-primary font-bold"
                >
                  <ExternalLink className="w-4 h-4" />
                  LinkedIn
                </a>
              )}
              
              {emailAddress && (
                <a
                  href={`mailto:${emailAddress}`}
                  className="flex items-center gap-2 border border-[var(--border-black)] text-black px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-primary font-bold"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </dialog>
  )
}