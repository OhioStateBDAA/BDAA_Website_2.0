import { MediumPost } from '@/types/medium';
import MediumPostCard from './MediumPostCard';

interface MediumBlogGridProps {
  posts: MediumPost[];
  title?: string;
  limit?: number;
}

export default function MediumBlogGrid({ 
  posts, 
  title = "Latest Blog Posts",
  limit 
}: MediumBlogGridProps) {
  const displayPosts = limit ? posts.slice(0, limit) : posts;

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No blog posts found.</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        {title}
      </h1>
      
      <div className="max-w-6xl mx-auto grid gap-6 md:gap-8 lg:grid-cols-2">
        {displayPosts.map((post, index) => (
          <MediumPostCard key={post.guid || index} post={post} />
        ))}
      </div>
      
      {limit && posts.length > limit && (
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Showing {limit} of {posts.length} posts
          </p>
        </div>
      )}
    </section>
  );
}