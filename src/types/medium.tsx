export interface MediumPost {
    title: string;
    link: string;
    description: string;
    author: string;
    pubDate: string;
    guid: string;
    thumbnail?: string;
    categories: string[];
  }
  
  export interface MediumResponse {
    status: string;
    feed: {
      title: string;
      description: string;
      url: string;
      image: string;
    };
    items: MediumPost[];
  }
  
  