import Link from 'next/link';
import { MediumPost } from '@/types/medium';

interface MediumPostCardProps {
  post: MediumPost;
}

export default function MediumPostCard({ post }: MediumPostCardProps) {
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