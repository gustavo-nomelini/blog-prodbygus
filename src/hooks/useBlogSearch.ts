import Fuse from 'fuse.js';
import { useEffect, useMemo, useRef, useState } from 'react';

// Interfaces
export interface BlogPost {
  id: string;
  slug: string;
  data: {
    title: string;
    description: string;
    categories?: string[];
    category?: string;
    pubDate: Date | string;
    tags?: string[];
    [key: string]: any;
  };
}

export interface FuseResult<T = BlogPost> {
  item: T;
  refIndex: number;
  score?: number;
  matches?: Array<{
    indices: Array<[number, number]>;
    key?: string;
    value?: string;
  }>;
}

interface UseBlogSearchProps {
  posts: BlogPost[];
  resultsLimit?: number;
}

interface UseBlogSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: FuseResult<BlogPost>[];
  isSearching: boolean;
  isLoading: boolean;
  selectedResultIndex: number;
  setSelectedResultIndex: (index: number) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  highlightMatch: (
    text: string | undefined,
    indices: Array<[number, number]> | undefined
  ) => string;
  formatDate: (dateString: string | Date) => string;
  resetSearch: () => void;
}

export function useBlogSearch({
  posts,
  resultsLimit = 8,
}: UseBlogSearchProps): UseBlogSearchReturn {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FuseResult<BlogPost>[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Prepare the data for searching
  const normalizedPosts = useMemo(() => {
    console.log('Normalizing posts for search:', posts.length);
    return posts;
  }, [posts]);

  // Initialize Fuse instance with optimized options
  const fuse = useMemo(() => {
    console.log('Creating new Fuse instance with', normalizedPosts.length, 'posts');
    return new Fuse(normalizedPosts, {
      keys: [{ name: 'data.title', weight: 1.0 }],
      includeMatches: true,
      includeScore: true,
      threshold: 0.3, // Threshold mais restrito para títulos
      distance: 100,
      ignoreLocation: true,
      useExtendedSearch: true,
      findAllMatches: true,
      minMatchCharLength: 2,
      shouldSort: true,
      tokenize: true,
      matchAllTokens: false,
      isCaseSensitive: false,
    });
  }, [normalizedPosts]);

  // Perform search when query changes
  useEffect(() => {
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Se não houver consulta ou for muito curta, limpar resultados
    if (!searchQuery || searchQuery.trim().length <= 1) {
      setSearchResults([]);
      setIsSearching(false);
      setIsLoading(false);
      setSelectedResultIndex(-1);
      return;
    }

    // Temos uma consulta válida, vamos buscar
    setIsSearching(true);
    setIsLoading(true);

    // Add a small delay to show loading state and debounce rapid typing
    searchTimeoutRef.current = setTimeout(() => {
      try {
        console.log('Executing search with fuse.js for query:', searchQuery);
        const results = fuse.search(searchQuery);
        console.log('Search results found:', results.length);

        if (results.length > 0) {
          console.log('First result:', results[0]?.item?.data?.title);
        }

        setSearchResults(results.slice(0, resultsLimit));
        // Reset selected index when search results change
        setSelectedResultIndex(-1);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, resultsLimit, posts.length, fuse]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      resetSearch();
    } else if (e.key === 'ArrowDown' && searchResults.length > 0) {
      e.preventDefault();
      setSelectedResultIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp' && searchResults.length > 0) {
      e.preventDefault();
      setSelectedResultIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && selectedResultIndex >= 0) {
      e.preventDefault();
      const selectedPost = searchResults[selectedResultIndex]?.item;
      if (selectedPost) {
        window.location.href = `/blog/${selectedPost.slug}`;
      }
    }
  };

  // Function to highlight matching text
  const highlightMatch = (
    text: string | undefined,
    indices: Array<[number, number]> | undefined
  ) => {
    if (!indices || indices.length === 0 || !text) return text || '';

    let result = '';
    let lastIndex = 0;

    indices.forEach(([start, end]) => {
      // Add the text before the match
      result += text.substring(lastIndex, start);
      // Add the highlighted match with stronger highlighting for titles
      result += `<span class="bg-[var(--primary)]/30 text-[var(--accent)] font-bold">${text.substring(
        start,
        end + 1
      )}</span>`;
      lastIndex = end + 1;
    });

    // Add any remaining text
    result += text.substring(lastIndex);
    return result;
  };

  // Format date for display
  const formatDate = (dateString: string | Date) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch (e) {
      return '';
    }
  };

  // Reset search function
  const resetSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
    setSelectedResultIndex(-1);
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    isLoading,
    selectedResultIndex,
    setSelectedResultIndex,
    handleKeyDown,
    highlightMatch,
    formatDate,
    resetSearch,
  };
}
