'use client'
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import emailjs from '@emailjs/browser';





interface EventImage {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date?: string;
  location?: string;
}



// Sample event images - replace with your actual event images
const eventImages: EventImage[] = [
  {
    id: 1,
    title: "Data I/O Hackathon 2025",
    description: "Our flagship hackathon brought together 100+ students to solve real-world data challenges.",
    imageUrl: "/img/events/dataio.JPG", // Replace with actual image path
    date: "February 08, 2025",
    location: "Keenan Center for Entrepreneurship"
  },
  {
    id: 2,
    title: "BDAA Research Gala",
    description: "Members spent the semester working on innovative data science projects and presented their work infront of industry professionals.",
    imageUrl: "/img/events/gala.JPG", // Replace with actual image path
    date: "April 20, 2025",
    location: "Student Union"
  },
  {
    id: 3,
    title: "Bank of America Tech Talk",
    description: "BDAA is proud to host weekly tech talks led by professionals making a difference in industry.",
    imageUrl: "/img/events/BOA.JPG", // Replace with actual image path
    date: "March 2025",
    location: "Pomerene Hall"
  },

];

const emailConfigured = Boolean(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID && process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID && process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

export default function PartnersPage() {
  const reduceMotion = useReducedMotion();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Image carousel navigation functions
  const nextImageSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === eventImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImageSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? eventImages.length - 1 : prevIndex - 1
    );
  };

  const goToImageSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || !emailConfigured) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      // Convert FormData to regular object for EmailJS
      const templateParams = {
        company_name: formData.get('companyName'),
        contact_name: formData.get('contactName'),
        email: formData.get('email'),
        phone: formData.get('phone') || 'Not provided',
        website: formData.get('website') || 'Not provided',
        partnership_type: formData.get('partnershipType'),
        message: formData.get('message'),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // Your EmailJS service ID
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // Your EmailJS template ID
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! // Your EmailJS public key
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your partnership application has been submitted successfully. We will get back to you soon.');
        form.reset();
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error submitting your application. Your entries are saved in the form. Please try again or email info@bdaa-osu.edu.');
    } finally {
      setIsSubmitting(false);

    }
  };

  return (
    <main id="main-content" tabIndex={-1} className="page-partners  w-full max-w-full overflow-hidden    min-h-screen w-full bg-bd-background">
      <Navbar />

      {/* Hero Section */}
      <Section padding="lg" background="default">
        <Container>
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-black mb-6">
              Become a partner of BDAA
            </h1>
            <p className="text-lg text-black leading-relaxed mb-8">
              We partner with companies to host tech talks and various events that enable our students to gain valuable industry experience and learn about best practices. This collaborative approach allows our members to network and grow in a supportive environment where they have access to professional guidance. Beyond networking events, we also provide comprehensive professional support including resume reviews, LinkedIn headshots, and other career development resources to help our students succeed in the data and analytics industry.
            </p>
            <div className="mt-8">
              <button
                onClick={() => document.getElementById('sponsorship-application')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })}
                className="site-button bg-[var(--highlight)] text-white"
              >Become a partner</button>
            </div>
          </motion.div>
        </Container>
      </Section>


      {/* Events Carousel Section */}


      {/* Event Images Carousel Section */}
      <Section padding="lg" background="highlight">
        <Container>
          <div>
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                aria-label="Previous event"
                onClick={prevImageSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-3 transition-all duration-300 group"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>

              <button
                aria-label="Next event"
                onClick={nextImageSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-3 transition-all duration-300 group"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>

              {/* Single Event Card Container */}
              <div className="mb-10">
                <h2 className='text-center font-bold mb-8 text-white'>Our Events in Action</h2>

                {/* Single Event Card */}
                <div className="flex justify-center px-4">
                  <div className="w-full max-w-4xl">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden">
                      {/* Event Image */}
                      <div className="relative overflow-hidden h-64 sm:h-[380px] lg:h-[480px]">
                        <Image
                          src={eventImages[currentImageIndex].imageUrl}
                          alt={eventImages[currentImageIndex].title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 896px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        {/* Event metadata overlay */}
                        <div className="absolute bottom-4 left-4 text-white">
                          {eventImages[currentImageIndex].date && (
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm font-medium">{eventImages[currentImageIndex].date}</span>
                            </div>
                          )}
                          {eventImages[currentImageIndex].location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm font-medium">{eventImages[currentImageIndex].location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="event-details-section">
                        <h3 className="event-title">
                          {eventImages[currentImageIndex].title}
                        </h3>
                        <p className="event-description">
                          {eventImages[currentImageIndex].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center mt-12 space-x-3">
                {eventImages.map((_, index) => (
                  <button
                    key={index}
                    aria-label={`Show event ${index + 1}: ${eventImages[index].title}`}
                    aria-pressed={index === currentImageIndex}
                    onClick={() => goToImageSlide(index)}
                    className={`w-8 h-8 rounded-full transition-all duration-300 ${index === currentImageIndex
                        ? 'bg-white scale-125'
                        : 'bg-white/30 hover:bg-white/50'
                      }`}
                  />
                ))}
              </div>

              {/* Event Counter */}
              <div className="text-center mt-8">
                <span className="text-white/70 text-lg">
                  {currentImageIndex + 1} of {eventImages.length}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="lg" background="default">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-black mb-6">Want more information?</h2>
            </div>
            <div className="bg-[var(--background-white)] p-4 rounded-xl border border-[var(--border-black)]">
              <a className="inline-flex min-h-11 items-center text-[var(--highlight)] underline mb-3" href="/FILE_7307.pdf" target="_blank" rel="noopener noreferrer">BDAA sponsorship information (PDF)</a>
              <iframe
                title="BDAA sponsorship information"
                loading="lazy"
                src="/FILE_7307.pdf"
                width="100%"
                height="800px"
                className="rounded-lg h-[65vh] max-h-[680px]"
              >
              </iframe>
            </div>
          </div>
        </Container>
      </Section>

      {/* Sponsorship Application Form */}
      <Section padding="lg" background="default" id="sponsorship-application">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold text-black mb-6">
                Sponsorship Application
              </h2>
              <p className="text-lg text-black leading-relaxed">
                Ready to support our mission? Fill out the form below and we&apos;ll get back to you.
              </p>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {submitStatus !== 'idle' && (
                <motion.div
                  role={submitStatus === 'error' ? 'alert' : 'status'}
                  initial={reduceMotion ? false : { opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mb-6 p-4 rounded-lg border flex items-center gap-3 ${submitStatus === 'success'
                      ? 'bg-green-50 border-green-200 text-green-800'
                      : 'bg-red-50 border-red-200 text-red-800'
                    }`}
                >
                  {submitStatus === 'success' ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <p className="font-medium">{submitMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {!emailConfigured && (
              <p className="surface-card rounded-xl bg-white p-6 text-black">
                To discuss a partnership, email <a className="underline font-semibold" href="mailto:info@bdaa-osu.edu">info@bdaa-osu.edu</a>. Online applications are temporarily unavailable.
              </p>
            )}
            {emailConfigured && <form onSubmit={handleSubmit} className="surface-card bg-[var(--background-white)] text-black p-8 rounded-xl border border-[var(--border-black)]">
              <div className="text-black grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-primary font-bold text-black mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    disabled={isSubmitting}
                    className="w-full  px-4 py-3 border border-[var(--border-black)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                

                <div>
                  <label htmlFor="contactName" className="block text-sm font-primary font-bold text-black mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-[var(--border-black)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-primary font-bold text-black mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-[var(--border-black)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-primary font-bold text-black mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-[var(--border-black)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-primary font-bold text-black mb-2">
                    Company Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    placeholder="https://"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-[var(--border-black)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label htmlFor="partnershipType" className="block text-sm font-primary font-bold text-black mb-2">
                    Partnership Type *
                  </label>
                  <select
                    id="partnershipType"
                    name="partnershipType"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-[var(--border-black)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select Partnership Type</option>
                    <option value="event-sponsor">Event Sponsorship</option>
                    <option value="workshop-partner">Workshop Partner</option>
                    <option value="career-development">Career Development</option>
                    <option value="technology-partner">Technology Partner</option>
                    <option value="research-collaboration">Research Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-primary font-bold text-black mb-2">
                    Partnership Details & Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    disabled={isSubmitting}
                    placeholder="Tell us about your organization, partnership goals, and how you&apos;d like to collaborate with BDAA..."
                    className="w-full px-4 py-3 border border-[var(--border-black)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent resize-vertical disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button
                  label={isSubmitting ? "Submitting..." : "Submit Partnership Application"}
                  color="var(--highlight)"
                  showArrow={!isSubmitting}
                  type="submit"
                  disabled={isSubmitting}
                  className={isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                />
                <p className="text-sm text-gray-600 mt-4">
                  We&apos;ll review your application and get back to you ASAP.
                </p>
              </div>
            </form>}
          </div>
        </Container>
      </Section>
    </main>
  );
}