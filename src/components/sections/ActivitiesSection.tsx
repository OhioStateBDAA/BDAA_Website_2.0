import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { ActivityCard } from '../cards/ActivityCard';
import { Button } from '../ui/Button';

const activities = [
  {
    title: 'Tech talks',
    description: 'Industry experts share insights on cutting-edge technologies, career paths, and emerging trends in data analytics. Learn from professionals working at top companies and expand your technical knowledge.',
    colorVar: '--activity-bookclub',
    image: '/img/activities/tech-talks.jpg',
    alt: 'Industry professionals giving tech talks to BDAA members',
  },
  {
    title: 'Career fair',
    description: 'Connect with leading companies actively recruiting data analysts and data scientists. Network with recruiters, learn about opportunities, and discover your next career move in the analytics field.',
    colorVar: '--activity-newsletter',
    image: '/img/activities/career-fair.jpg',
    alt: 'BDAA career fair with company representatives',
  },
  {
    title: 'Hackathons',
    description: 'Collaborate on real-world data challenges and build innovative solutions over intensive weekends. Work with teammates to solve problems using analytics tools and present your findings to judges.',
    colorVar: '--activity-events',
    image: '/img/activities/hackathons.jpg',
    alt: 'Students collaborating during BDAA hackathon',
  },
  {
    title: 'Social events',
    description: 'Build meaningful connections with fellow data enthusiasts in a relaxed atmosphere. From game nights to study sessions, these events foster community and lasting friendships within our organization.',
    colorVar: '--activity-discord',
    image: '/img/activities/social-events.jpg',
    alt: 'BDAA members enjoying social activities together',
  },
  {
    title: 'Project series',
    description: 'Hands-on workshops where you build portfolio projects using real datasets. Develop practical skills in Python, R, SQL, and visualization tools while creating work to showcase to potential employers.',
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
          <div className="p-6 flex flex-col justify-center h-full min-h-[550px]">
            <div className="font-display text-4xl font-bold text-black leading-tight mb-4">
              Activities
            </div>
            <div className="text-sm text-gray-600 leading-relaxed mb-6">
              Read about all the activities we offer.
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