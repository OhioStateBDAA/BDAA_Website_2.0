export async function getMediumPosts(username: string): Promise<MediumPost[]> {
    try {
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`,
        { next: { revalidate: 3600 } } // Cache for 1 hour
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch Medium posts');
      }
      
      const data: MediumResponse = await response.json();
      
      if (data.status !== 'ok') {
        throw new Error('Medium API returned error status');
      }
      
      return data.items;
    } catch (error) {
      console.error('Error fetching Medium posts:', error);
      return [];
    }
  