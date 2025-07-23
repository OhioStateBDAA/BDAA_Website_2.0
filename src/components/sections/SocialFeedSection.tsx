import React from 'react';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';


const InstagramMockup = () => {
  const posts = [
    { user: '@klub_ada', image: '/placeholder1.jpg', likes: 42, caption: 'Great turnout at today\'s data science workshop! 📊' },
    { user: '@klub_ada', image: '/placeholder2.jpg', likes: 28, caption: 'Our team at the hackathon finals 🏆' },
    { user: '@klub_ada', image: '/placeholder3.jpg', likes: 35, caption: 'Coffee chat with industry professionals ☕' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm border border-gray-200">
      {/* Instagram Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">@klub_ada</h3>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-yellow-400 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="h-64 overflow-y-auto">
        {/* Instagram Stories */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 p-0.5">
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs">📸</span>
                  </div>
                </div>
                <span className="text-xs text-gray-600 mt-1">Story</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram Posts */}
        <div className="space-y-4">
          {posts.map((post, index) => (
            <div key={index} className="">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-2xl mb-2">📷</div>
                  <div className="text-xs">Post Image {index + 1}</div>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center gap-3 mb-2">
                  <button className="text-red-500">♥</button>
                  <button className="text-gray-600">💬</button>
                  <button className="text-gray-600">➤</button>
                </div>
                <div className="text-xs font-semibold text-gray-900 mb-1">{post.likes} likes</div>
                <div className="text-xs text-gray-800">
                  <span className="font-semibold">{post.user}</span> {post.caption}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const JoinCommunityCard = () => {
  return (
    <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-8 text-white max-w-4xl">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Instagram Mockup embedded in the orange card */}
        <div className="flex-shrink-0">
          <InstagramMockup />
        </div>
        
        {/* Content section */}
        <div className="flex-1">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-yellow-400 rounded-xl mb-6">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8"
              fill="currentColor"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Join our community</h2>
          
          <p className="text-lg mb-6 text-white/90">
            Our Instagram platform is a safe space to exchange ideas, interesting topics, events, useful resources, and opportunities for personal and career development.
          </p>
          
          <Button 
            label="Follow us" 
            color="white" 
            showArrow={true}
            className="w-fit"
          />
        </div>
      </div>
    </div>
  );
};

export function SocialFeedSection() {
  return (
    <Section background="default" padding="lg">
      <Container>
        <div className="flex justify-center max-w-6xl mx-auto">
          <JoinCommunityCard />
        </div>
      </Container>
    </Section>
  );
}