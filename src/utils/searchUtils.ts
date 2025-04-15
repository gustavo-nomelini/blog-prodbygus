// Utility functions to help with search functionality

interface BlogPost {
  id: string;
  slug: string;
  data: {
    title: string;
    description?: string;
    categories?: string[];
    category?: string;
    pubDate: Date | string;
    tags?: string[];
    [key: string]: any;
  };
  body?: string;
  render?: () => Promise<{ Content: any; headings: any[]; remarkPluginFrontmatter: any }>;
}

export interface SearchablePost {
  id: string;
  slug: string;
  data: {
    title: string;
    description: string;
    categories: string[];
    pubDate: string;
    tags: string[];
    content?: string; // Added content field for search
    [key: string]: any;
  };
}

/**
 * Converts Astro collection entries to searchable posts
 */
export function preparePostsForSearch(posts: BlogPost[]): SearchablePost[] {
  console.log(`Preparing ${posts.length} posts for search...`);

  return posts.map((post) => {
    // Normalize the post data
    const searchablePost: SearchablePost = {
      id: post.id,
      slug: post.slug,
      data: {
        title: post.data.title || '',
        description: post.data.description || '',
        categories: normalizeCategories(post),
        pubDate: post.data.pubDate?.toString() || '',
        tags: post.data.tags || [],
        // Extract content from body if available (for MDX posts)
        content: extractContent(post),
      },
    };

    return searchablePost;
  });
}

/**
 * Normalize categories to handle both category and categories fields
 */
function normalizeCategories(post: BlogPost): string[] {
  if (post.data.categories && Array.isArray(post.data.categories)) {
    // Convert any objects to strings and filter out non-string values
    return post.data.categories
      .map((cat) => (typeof cat === 'string' ? cat : ''))
      .filter((cat) => cat !== '');
  }

  if (post.data.category) {
    return [typeof post.data.category === 'string' ? post.data.category : ''];
  }

  return [];
}

/**
 * Extract content from the post body for search
 */
function extractContent(post: BlogPost): string {
  if (post.body) {
    // Basic cleanup of markdown
    return post.body
      .replace(/#+\s+/g, '') // Remove heading markers
      .replace(/\*\*/g, '') // Remove bold markers
      .replace(/\*/g, '') // Remove italic markers
      .replace(/`/g, '') // Remove code markers
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }

  // If no body is available, combine other searchable fields
  return [
    post.data.title,
    post.data.description,
    ...(post.data.categories || []),
    ...(post.data.tags || []),
  ]
    .filter(Boolean)
    .join(' ');
}
