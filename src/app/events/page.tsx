'use client'

import React, { useState, useEffect } from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { UpcomingEvents } from '@/components/events/UpcomingEvents';
import { upcomingEvents, regularMeetings, projectTracks, notionHub } from '@/data/events';
// Removed direct Airtable import to avoid client-side issues
import { Event } from '@/types/events';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(upcomingEvents);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        console.log('🔄 Fetching events from API...');
        
        const response = await fetch('/api/events');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        const airtableEvents: Event[] = await response.json();
        
        if (airtableEvents.length > 0) {
          console.log(`✅ Loaded ${airtableEvents.length} events from Airtable`);
          setEvents(airtableEvents);
        } else {
          console.log('⚠️ No events from Airtable, using static data');
          setEvents(upcomingEvents);
        }
      } catch (err) {
        console.error('Error loading events from API:', err);
        setError(err instanceof Error ? err.message : 'Failed to load events');
        setEvents(upcomingEvents); // Fallback to static data
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <main className="min-h-screen w-full bg-bd-background">
      <Navbar />
      
      {/* Hero Section */}
      <Section padding="lg" background="default">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-black mb-6">
              Events & Meetings
            </h1>
            <p className="text-lg text-black leading-relaxed mb-8">
              Join us for weekly meetings, workshops, and special events as we explore the world of data analytics together.
            </p>
          </div>
        </Container>
      </Section>

      {/* Regular Meetings Section */}
      <Section padding="lg" background="default">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-black mb-8 text-center">
              Regular Meetings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* General Meeting Card */}
              <div className="bg-white border border-black rounded-xl p-6 shadow-sm">
                <h3 className="text-2xl font-display font-bold text-black mb-4 text-center">
                  General Meetings
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-black font-medium">Every {regularMeetings.general.day}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-black font-medium">{regularMeetings.general.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    {regularMeetings.general.locationUrl ? (
                      <a 
                        href={regularMeetings.general.locationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black font-medium hover:text-red-600 transition-colors underline"
                      >
                        {regularMeetings.general.location}
                      </a>
                    ) : (
                      <span className="text-black font-medium">{regularMeetings.general.location}</span>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 mt-4 leading-relaxed">
                  {regularMeetings.general.description}
                </p>
              </div>

              {/* Project Series Card */}
              <div className="bg-white border border-black rounded-xl p-6 shadow-sm">
                <h3 className="text-2xl font-display font-bold text-black mb-4 text-center">
                  Project Series
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-black font-medium">Every {regularMeetings.projectSeries.day}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-black font-medium">{regularMeetings.projectSeries.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {regularMeetings.projectSeries.locationUrl ? (
                      <a 
                        href={regularMeetings.projectSeries.locationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black font-medium hover:text-blue-600 transition-colors underline"
                      >
                        {regularMeetings.projectSeries.location}
                      </a>
                    ) : (
                      <span className="text-black font-medium">{regularMeetings.projectSeries.location}</span>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 mt-4 leading-relaxed">
                  {regularMeetings.projectSeries.description}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Upcoming Events Section */}
      <Section padding="lg" background="default">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-black mb-8 text-center">
              Upcoming Events
            </h2>
            
            {loading && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">Loading events...</p>
              </div>
            )}
            
            {error && (
              <div className="text-center py-12">
                <p className="text-lg text-red-600 mb-2">⚠️ {error}</p>
                <p className="text-sm text-gray-600">Showing cached events instead</p>
              </div>
            )}
            
            {!loading && <UpcomingEvents events={events} />}
          </div>
        </Container>
      </Section>

      {/* Project Series Archive Section */}
      <Section padding="lg" background="alt">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Project Series Archive
            </h2>
            <p className="text-lg text-white leading-relaxed mb-8">
              Explore our comprehensive collection of past project series, including student projects, 
              lecture materials, and resources from previous semesters.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {projectTracks.map((track) => (
                <div key={track.id} className="bg-white border border-black rounded-xl p-6">
                  <div className="text-center mb-3">
                    <h3 className="text-xl font-display font-bold text-black">
                      {track.name}
                    </h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    {track.description}
                  </p>
                </div>
              ))}
            </div>
            
            {/* CTA Button for Notion Hub */}
            <Button
              label={notionHub.title}
              color="var(--highlight)"
              showArrow={false}
              href={notionHub.url}
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}