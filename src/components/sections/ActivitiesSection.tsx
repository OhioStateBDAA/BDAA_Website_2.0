import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { ActivityCard } from '../cards/ActivityCard';
import { Button } from '../ui/Button';

const activities = [
  {
    title: 'Tech talks',
    description: 'Hear from people working in data analytics about their jobs and the problems they work on. Bring your questions.',
    colorVar: '--activity-bookclub',
    image: '/img/activities/tech-talks.jpg',
    alt: 'Industry professionals giving tech talks to BDAA members',
  },
  {
    title: 'Career fair',
    description: 'Meet recruiters and ask about internships, full-time roles, and what working at their company is like.',
    colorVar: '--activity-newsletter',
    image: '/img/activities/career-fair.jpg',
    alt: 'BDAA career fair with company representatives',
  },
  {
    title: 'Hackathons',
    description: 'Work with a team on a data challenge, try out your ideas, and present your results.',
    colorVar: '--activity-events',
    image: '/img/activities/hackathons.jpg',
    alt: 'Students collaborating during BDAA hackathon',
  },
  {
    title: 'Social events',
    description: 'Get to know other members outside of meetings. Our socials give us a chance to hang out and take a break from class.',
    colorVar: '--activity-discord',
    image: '/img/activities/social-events.jpg',
    alt: 'BDAA members enjoying social activities together',
  },
  {
    title: 'Project series',
    description: 'Work through a project with other members and practice using data tools along the way. Past materials are available in our Project Hub.',
    colorVar: '--activity-coffee',
    image: '/img/activities/project-series.jpg',
    alt: 'Students working on data science projects',
  },
];

export function ActivitiesSection() {
  return (
    <Section background="default" padding="lg">
      <Container>
        {/* Single 3x2 grid with text section in first position */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {/* Text section - takes first grid position */}
          <div className="p-4 flex flex-col justify-center h-full min-h-[240px]">
            <h2 className="font-display text-3xl font-bold text-black leading-tight mb-4">
              What we do
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed mb-6">
              We host tech talks, project workshops, recruiting events, and socials throughout the semester.
            </div>
            <Button
              label="Activity calendar"
              color="var(--text-secondary)"
              showArrow={false}
              href="/events"
              className="text-center justify-center"
            />
          </div>

          {/* Activity cards - fill remaining 5 positions */}
          <ActivityCard
            title={activities[0].title}
            description={activities[0].description}
            colorVar={activities[0].colorVar}
            image={activities[0].image}
            alt={activities[0].alt}
          />

          <ActivityCard
            title={activities[1].title}
            description={activities[1].description}
            colorVar={activities[1].colorVar}
            image={activities[1].image}
            alt={activities[1].alt}
          />

          <ActivityCard
            title={activities[2].title}
            description={activities[2].description}
            colorVar={activities[2].colorVar}
            image={activities[2].image}
            alt={activities[2].alt}
          />

          <ActivityCard
            title={activities[3].title}
            description={activities[3].description}
            colorVar={activities[3].colorVar}
            image={activities[3].image}
            alt={activities[3].alt}
          />

          <ActivityCard
            title={activities[4].title}
            description={activities[4].description}
            colorVar={activities[4].colorVar}
            image={activities[4].image}
            alt={activities[4].alt}
          />

        </div>
      </Container>
    </Section>
  );
}