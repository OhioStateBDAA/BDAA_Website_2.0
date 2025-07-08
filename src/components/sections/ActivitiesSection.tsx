import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';

const activities = [
  {
    title: 'Activity Title',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, eget facilisis massa.',
    color: 'bg-[var(--highlight)]',
  },
  {
    title: 'Activity Title',
    desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    color: 'bg-blue-200',
  },
  {
    title: 'Activity Title',
    desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    color: 'bg-yellow-200',
  },
  {
    title: 'Activity Title',
    desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    color: 'bg-pink-200',
  },
  {
    title: 'Activity Title',
    desc: 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla porttitor accumsan tincidunt.',
    color: 'bg-purple-200',
  },
];

function ActivityCard({ activity }: { activity: typeof activities[0] }) {
  return (
    <div className="activity-card bg-white border border-[var(--border)] rounded-xl shadow p-6 flex flex-col gap-4 h-full">
      <div className="font-display text-xl font-bold mb-2">{activity.title}</div>
      <div className="text-base text-[var(--text-secondary)] mb-2">{activity.desc}</div>
      <div className={`w-full h-40 rounded-lg ${activity.color} flex items-center justify-center`}>
        <span className="text-4xl text-white/60 font-bold">Illustration</span>
      </div>
    </div>
  );
}

export function ActivitiesSection() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: Title, description, button */}
          <div className="lg:w-1/3 w-full flex flex-col gap-6 flex-shrink-0 lg:sticky lg:top-8">
            <div className="font-display text-4xl lg:text-5xl font-bold text-[var(--text-secondary)] leading-tight">
              Activities
            </div>
            <div className="text-lg text-[var(--text-primary)] leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur.
            </div>
            <button className="w-fit border-2 border-[var(--text-secondary)] rounded-lg px-6 py-3 text-base font-medium bg-white hover:bg-[var(--background)] transition-all duration-200 hover:shadow-md">
              See All Activities →
            </button>
          </div>

          {/* Right: Two separate horizontal grids */}
          <div className="lg:w-2/3 w-full flex flex-col gap-6">
            {/* First row: 2 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ActivityCard activity={activities[0]} />
              <ActivityCard activity={activities[1]} />
            </div>
            {/* Second row: 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ActivityCard activity={activities[2]} />
              <ActivityCard activity={activities[3]} />
              <ActivityCard activity={activities[4]} />
            </div>
          </div>
        </div>
        <style jsx global>{`
          .activity-card {
            display: inline-block;
            width: 100%;
          }
        `}</style>
      </Container>
    </Section>
  );
} 