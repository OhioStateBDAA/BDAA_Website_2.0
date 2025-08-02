'use client'
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Navbar } from '@/components/layout/Navbar';
import { SponsorsCarousel } from '@/components/sections/SponsorsCarousel';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  partnership: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Largest Tech-Oriented Club on Campus",
    description: "We have 200+ members coming from majors all across the university, from STEM to the Arts. We consistently partner with innovative companies and organizations to cater to our diverse member demographic.",
  },
  {
    id: 2,
    title: "Leadership Excellence",
    description: "BDAA was awarded the Student Organization Excellence in Membership Award at the 2025 Leadership Awards, highlighting  our commitment to fostering a strong, inclusive, and engaged community of students passionate about data and analytics",
  },
  {
    id: 3,
    title: "Countless Initiatives designed to empower our supporters",
    description: "From our Data I/O hackathon to involvement in the BDAA project series, we offer various opportunities for companies to involve themseleves in the future of innovation at Ohio State .",
  }
];

export default function PartnersPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        setSubmitMessage('Thank you! Your partnership application has been submitted successfully. We\'ll get back to you soon.');
        form.reset();
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error submitting your application. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
    }
  };

  return (
    <main className="min-h-screen w-full bg-bd-background">
      <Navbar />
      
      {/* Hero Section */}
      <Section padding="lg" background="default">
        <Container>
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-display font-bold text-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Our Partners
            </motion.h1>
            <motion.p 
              className="text-lg text-black leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              BDAA is proud to collaborate with industry leaders and academic institutions 
              to provide our members with exceptional opportunities and resources.
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* Partners Carousel */}
      <SponsorsCarousel />
     
      {/* Events Carousel Section */}
      <Section padding="lg" background="highlight">
        <Container>
          <div>
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-3 transition-all duration-300 group"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-3 transition-all duration-300 group"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>


             
              {/* Cards Container */}
              <div className="overflow-hidden mb-10 mx-12">
              <p className='flex-1 text-center font-bold text-5xl mb-4 text-white'>Why sponsor us?</p>
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(-${currentIndex * 100}%)` 
                  }}
                >
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-white mb-4">
                            {event.title}
                          </h3>
                          
                          <p className="text-gray-300 mb-6 leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="flex justify-center mt-12 space-x-3">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Event Counter */}
              <div className="text-center mt-8">
                <span className="text-white/70 text-lg">
                  {currentIndex + 1} of {events.length}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <Section>
      <div className="overflow-hidden mx-12 mb-10 mt-10">
            <p className='flex-1 text-center font-bold text-5xl mb-10 text-black'>Want more information?</p>


<iframe src="/FILE_7307.pdf" width="100%" height="500px"> <p>Your browser does not support iframes. </p> </iframe>

  
</div>
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
                Ready to support our mission? Fill out the form below and we'll get back to you.
              </p>
            </div>

            {/* Status Messages */}
            <AnimatePresence>
              {submitStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mb-6 p-4 rounded-lg border flex items-center gap-3 ${
                    submitStatus === 'success'
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
        








            <form onSubmit={handleSubmit} className="bg-[var(--background-white)] text-black p-8 rounded-xl border border-[var(--border-black)]">
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
                    placeholder="Tell us about your organization, partnership goals, and how you'd like to collaborate with BDAA..."
                    className="w-full px-4 py-3 border border-[var(--border-black)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] focus:border-transparent resize-vertical disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[var(--highlight)] text-white px-8 py-3 rounded-lg font-primary font-bold hover:bg-[var(--highlight)]/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Partnership Application
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-600 mt-4">
                  We'll review your application and get back to you ASAP.
                </p>
              </div>
            </form>
          </div>
        </Container>
      </Section>
    </main>
  );
}