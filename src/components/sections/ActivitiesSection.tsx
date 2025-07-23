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
  },
  {
    title: 'Career fair',
    description: 'Connect with leading companies actively recruiting data analysts and data scientists. Network with recruiters, learn about opportunities, and discover your next career move in the analytics field.',
    colorVar: '--activity-newsletter',
  },
  {
    title: 'Hackathons',
    description: 'Collaborate on real-world data challenges and build innovative solutions over intensive weekends. Work with teammates to solve problems using analytics tools and present your findings to judges.',
    colorVar: '--activity-events',
  },
  {
    title: 'Social events',
    description: 'Build meaningful connections with fellow data enthusiasts in a relaxed atmosphere. From game nights to study sessions, these events foster community and lasting friendships within our organization.',
    colorVar: '--activity-discord',
  },
  {
    title: 'Project series',
    description: 'Hands-on workshops where you build portfolio projects using real datasets. Develop practical skills in Python, R, SQL, and visualization tools while creating work to showcase to potential employers.',
    colorVar: '--activity-coffee',
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
              showArrow={true}
            />
          </div>

          {/* Activity cards - fill remaining 5 positions */}
          <ActivityCard 
            title={activities[0].title}
            description={activities[0].description}
            colorVar={activities[0].colorVar}
          />
          
          <ActivityCard 
            title={activities[1].title}
            description={activities[1].description}
            colorVar={activities[1].colorVar}
          />
          
          <ActivityCard 
            title={activities[2].title}
            description={activities[2].description}
            colorVar={activities[2].colorVar}
          />
          
          <ActivityCard 
            title={activities[3].title}
            description={activities[3].description}
            colorVar={activities[3].colorVar}
          />
          
          <ActivityCard 
            title={activities[4].title}
            description={activities[4].description}
            colorVar={activities[4].colorVar}
          />
          
        </div>
      </Container>
    </Section>
  );
}