'use client'

import React, { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Navbar } from '@/components/layout/Navbar';
import { TeamGrid } from '@/components/team/TeamGrid';
import { TeamMemberModal } from '@/components/team/TeamMemberModal';
import { Dropdown } from '@/components/ui/Dropdown';
import { BoardHistory, getCurrentBoard, getBoardByKey, TeamMember } from '@/data/officerData';

export default function AboutPage() {
  const [selectedBoard, setSelectedBoard] = useState(getCurrentBoard());
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dropdownOptions = BoardHistory.map(board => ({
    value: `${board.semester}${board.year}`,
    label: board.displayName
  }));

  const handleBoardChange = (value: string) => {
    const board = getBoardByKey(value);
    if (board) {
      setSelectedBoard(board);
    }
  };

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <main className="min-h-screen w-full bg-bd-background">
      <Navbar />

      {/* Mission Section */}
      <Section padding="lg" background="default">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-black mb-6">
              About BDAA
            </h1>
            <p className="text-lg text-black leading-relaxed mb-8">
              The Big Data Analytics Association at The Ohio State University
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-[var(--background-white)] p-8 rounded-xl border border-[var(--border-black)]">
                <h2 className="text-2xl font-display font-bold text-black mb-4">Our Mission</h2>
                <p className="text-black leading-relaxed">
                  BDAA aims to inspire students to think analytically, empower them through hands-on training,
                  and connect them to potential employers. Winner of the Outstanding Overall Organization Award
                  two years running (2017-2018) and the Partnership in Industry Award, BDAA is truly Ohio State&apos;s
                  central hub for involvement in data analytics.
                </p>
              </div>

              <div className="bg-[var(--background-white)] p-8 rounded-xl border border-[var(--border-black)]">
                <h2 className="text-2xl font-display font-bold text-black mb-4">What We Offer</h2>
                <div className="space-y-3 text-black">
                  <p><span className="font-medium">Workshops:</span> Hands-on training in analytics tools</p>
                  <p><span className="font-medium">Networking:</span> Connect with industry professionals</p>
                  <p><span className="font-medium">Career Development:</span> Job placement assistance</p>
                  <p><span className="font-medium">Projects:</span> Real-world data analytics experience</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Team Section */}
      <Section padding="lg" background="default">
        <Container>
          <div className="max-w-7xl mx-auto">
            {/* Section Header with Dropdown */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-black mb-4 md:mb-0">
                  Our Team
                </h2>
                <p className="text-black leading-relaxed mb-6 md:mb-0">
                  Meet the dedicated officers who make BDAA possible
                </p>
              </div>

              {/* Year Selection Dropdown */}
              <div className="w-full md:w-48">
                <Dropdown
                  options={dropdownOptions}
                  value={`${selectedBoard.semester}${selectedBoard.year}`}
                  onChange={handleBoardChange}
                  placeholder="Select Year"
                />
              </div>
            </div>

            {/* Team Grid */}
            <TeamGrid
              board={selectedBoard}
              onMemberClick={handleMemberClick}
            />
          </div>
        </Container>
      </Section>

      {/* Team Member Modal */}
      <TeamMemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}