// app/blog/page.tsx - Complete Medium blog integration in one file

import Link from 'next/link';
import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';


// Type definitions
interface MediumPost {
  title: string;
  link: string;
  description: string;
  author: string;
  pubDate: string;
  guid: string;
  thumbnail?: string;
  categories: string[];
}

interface MediumResponse {
  status: string;
  feed: {
    title: string;
    description: string;
    url: string;
    image: string;
  };
  items: MediumPost[];
}

// Replace with your Medium username
const MEDIUM_USERNAME = 'agastyamishra2006';

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Blog | ',
  description: 'Latest articles and insights from BDAA Medium blog',
  openGraph: {
    title: 'Blog',
    description: 'Latest articles and insights from BDAA Medium blog',
    type: 'website',
  },
};

// Data fetching function with better error handling
async function getMediumPosts(username: string): Promise<MediumPost[]> {
  // First, validate the username
  if (!username || username === 'yourusername') {
    console.warn('Please replace "yourusername" with your actual Medium username');
    return [];
  }

  try {
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`,
      { 
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; BlogFetcher/1.0)',
        }
      }
    );
    
    if (!response.ok) {
      console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
      // Try alternative approach or return empty array
      return [];
    }
    
    const data: MediumResponse = await response.json();
    
    if (data.status !== 'ok') {
      console.error('Medium API returned error status:', data);
      return [];
    }
    
    // Validate that we have items
    if (!data.items || !Array.isArray(data.items)) {
      console.warn('No items found in Medium feed');
      return [];
    }
    
    return data.items;
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    
    // If RSS2JSON fails, try direct RSS parsing (fallback)
    try {
      return await fetchDirectRSS(username);
    } catch (fallbackError) {
      console.error('Fallback RSS fetch also failed:', fallbackError);
      return [];
    }
  }
}

// Fallback function to try direct RSS parsing
async function fetchDirectRSS(username: string): Promise<MediumPost[]> {
  try {
    const response = await fetch(`https://medium.com/feed/@${username}`, {
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml',
      }
    });
    
    if (!response.ok) {
      throw new Error(`RSS fetch failed: ${response.status}`);
    }
    
    // For now, return empty array - RSS parsing would require XML parser
    // You could add xml2js or similar library for full RSS parsing
    console.log('Direct RSS fetch successful, but XML parsing not implemented');
    return [];
  } catch (error) {
    throw error;
  }
}

// Individual Post Card Component
function MediumPostCard({ post }: { post: MediumPost }) {
  const cleanDescription = post.description?.replace(/<[^>]*>/g, '').substring(0, 250);
  const formattedDate = new Date(post.pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-3">
        <Link 
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          {post.title}
        </Link>
      </h2>
      
      <p className="text-gray-600 mb-4 leading-relaxed">
        {cleanDescription}...
      </p>
      
      {post.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.slice(0, 3).map((category, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <span className="text-sm font-medium text-gray-700">
          {post.author}
        </span>
        <time className="text-sm text-gray-500">
          {formattedDate}
        </time>
      </div>
    </article>
  );
}

// Loading Component
function LoadingSkeleton() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <div className="h-8 bg-gray-300 rounded w-64 mx-auto animate-pulse"></div>
      </div>
      
      <div className="max-w-6xl mx-auto grid gap-6 md:gap-8 lg:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <div className="h-6 bg-gray-300 rounded mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="mb-4">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
      <p className="text-gray-600">Check back later for new articles.</p>
    </div>
  );
}

// Main Blog Page Component
export default async function BlogPage() {
  const posts = await getMediumPosts(MEDIUM_USERNAME);

  return (
    <main className="min-h-screen bg-gray-50">
            <Navbar />
      
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          BDAA's Medium Blog
        </h1>
        <h2 className="text-2xl  text-center mb-12 text-gray-800">
         Find tips and insights about the project series, recent BDAA events, and our initatives.
        </h2>
        
        {posts.length > 0 ? (
          <div className="max-w-6xl mx-auto grid gap-6 md:gap-8 lg:grid-cols-2">
            {posts.map((post, index) => (
              <MediumPostCard key={post.guid || index} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
        
        {posts.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Showing {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </p>
            <Link 
              href={`https://medium.com/@${MEDIUM_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
              </svg>
              View on Medium
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}