import Fuse from 'fuse.js';
import { useEffect, useRef, useState } from 'react';

// CollectionEntry type to match Astro's structure
interface BlogPost {
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

interface FuseResult {
  item: BlogPost;
  refIndex: number;
  score?: number;
  matches?: Array<{
    indices: number[][];
    key?: string;
    value: string;
  }>;
}

interface BlogSearchProps {
  posts: BlogPost[];
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  console.log('Received posts:', posts.length, posts[0]?.data);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FuseResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Prepare the data for searching - normalize category/categories
  const normalizedPosts = posts.map((post) => {
    // If post has category but not categories, add it to categories
    if (post.data.category && (!post.data.categories || post.data.categories.length === 0)) {
      return {
        ...post,
        data: {
          ...post.data,
          categories: [post.data.category],
        },
      };
    }
    return post;
  });

  // Initialize Fuse instance with options
  const fuse = new Fuse(normalizedPosts, {
    keys: [
      { name: 'data.title', weight: 1.0 },
      { name: 'data.description', weight: 0.75 },
      { name: 'data.categories', weight: 0.5 },
      { name: 'data.tags', weight: 0.5 },
    ],
    includeMatches: true,
    includeScore: true,
    threshold: 0.4,
    ignoreLocation: true,
    useExtendedSearch: true,
    findAllMatches: true,
    minMatchCharLength: 2,
  });

  useEffect(() => {
    // Handle clicks outside of search results to close them
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        searchInputRef.current !== event.target
      ) {
        setSearchResults([]);
        setIsSearching(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Perform search when query changes
    if (searchQuery.trim().length > 1) {
      setIsSearching(true);
      setIsLoading(true);

      // Add a small delay to show loading state and debounce rapid typing
      searchTimeoutRef.current = setTimeout(() => {
        try {
          const results = fuse.search(searchQuery);
          console.log('Search results:', results.length);
          setSearchResults(results.slice(0, 5));
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      }, 300);
    } else {
      setSearchResults([]);
      setIsSearching(false);
      setIsLoading(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSearchResults([]);
      setIsSearching(false);
      setIsFocused(false);
      searchInputRef.current?.blur();
    }
  };

  // Custom cyberpunk placeholder animation
  const placeholderText = 'Search the matrix...';
  const [placeholder, setPlaceholder] = useState(placeholderText);

  useEffect(() => {
    if (!isFocused) {
      setPlaceholder(placeholderText);
      return;
    }

    // Cursor blink effect in placeholder
    let index = 0;
    let forward = true;
    const intervalId = setInterval(() => {
      if (forward) {
        index++;
        if (index > placeholderText.length) {
          forward = false;
          index = placeholderText.length;
        }
      } else {
        index--;
        if (index < 0) {
          forward = true;
          index = 0;
        }
      }

      const textSlice = placeholderText.slice(0, index);
      const cursorChar = forward && index < placeholderText.length ? '|' : '';
      setPlaceholder(`${textSlice}${cursorChar}`);
    }, 150);

    return () => clearInterval(intervalId);
  }, [isFocused]);

  // Function to highlight matching text
  const highlightMatch = (text: string, indices: number[][]) => {
    if (!indices || indices.length === 0 || !text) return text || '';

    let result = '';
    let lastIndex = 0;

    indices.forEach(([start, end]) => {
      // Add the text before the match
      result += text.substring(lastIndex, start);
      // Add the highlighted match
      result += `<span class="bg-[var(--primary)]/20 text-[var(--accent)]">${text.substring(
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

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="search-container relative">
        <div className={`cyberpunk-border ${isFocused ? 'active' : ''}`}></div>

        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() =>
            isFocused && searchResults.length === 0 && !isLoading && setIsFocused(false)
          }
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="search-input w-full py-3 px-4 pr-12 bg-[var(--surface-3)] text-[var(--text)] border-2 border-[var(--primary)]/30 rounded-lg focus:outline-none focus:border-[var(--accent)] placeholder-[var(--text-muted)] transition-all duration-300"
        />

        <div
          className={`search-icon absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--primary)] ${
            isFocused ? 'focused' : ''
          } ${isLoading ? 'searching' : ''}`}
        >
          {isLoading ? (
            <div className="spinner-container">
              <div className="search-spinner"></div>
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          )}
        </div>

        <div className="search-glow absolute inset-0 rounded-lg pointer-events-none"></div>

        {/* Decorative elements */}
        <div className="cyberpunk-corner top-left"></div>
        <div className="cyberpunk-corner top-right"></div>
        <div className="cyberpunk-corner bottom-left"></div>
        <div className="cyberpunk-corner bottom-right"></div>
      </div>

      {/* Search Results */}
      {isSearching && !isLoading && searchResults.length > 0 && (
        <div
          ref={resultsRef}
          className="search-results absolute mt-2 w-full bg-[var(--surface-5)] border-2 border-[var(--accent)]/50 rounded-lg shadow-lg z-50 overflow-hidden"
        >
          <div className="results-header px-4 py-2 border-b border-[var(--primary)]/20 text-xs text-[var(--accent)]">
            <span className="pulse-text">SEARCH RESULTS</span>
            <span className="float-right">{`${searchResults.length} ${
              searchResults.length === 1 ? 'MATCH' : 'MATCHES'
            } FOUND`}</span>
          </div>
          <ul className="py-2">
            {searchResults.map((result) => {
              const post = result.item;

              if (!post || !post.data) {
                console.error('Invalid post data:', post);
                return null;
              }

              // Find title match if any
              const titleMatch = result.matches?.find((match) => match.key === 'data.title');
              const titleHtml =
                titleMatch && post.data.title
                  ? highlightMatch(post.data.title, titleMatch.indices)
                  : post.data.title || 'Untitled';

              // Find description match if any
              const descMatch = result.matches?.find((match) => match.key === 'data.description');
              const descHtml =
                descMatch && post.data.description
                  ? highlightMatch(post.data.description, descMatch.indices)
                  : post.data.description || 'No description';

              // Get categories (handle both arrays and single string)
              const categories =
                post.data.categories || (post.data.category ? [post.data.category] : []);

              return (
                <li
                  key={post.slug}
                  className="px-4 py-3 hover:bg-[var(--primary)]/10 transition-colors duration-200"
                >
                  <a
                    href={`/blog/${post.slug}`}
                    className="block"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                      setIsSearching(false);
                      setIsFocused(false);
                    }}
                  >
                    <h3
                      className="text-[var(--text)] font-medium"
                      dangerouslySetInnerHTML={{ __html: titleHtml }}
                    />
                    <p
                      className="text-[var(--text-muted)] text-sm truncate mt-1"
                      dangerouslySetInnerHTML={{ __html: descHtml }}
                    />
                    <div className="flex items-center mt-2 gap-2">
                      <span className="text-xs text-[var(--accent)]">
                        {formatDate(post.data.pubDate)}
                      </span>
                      {categories.length > 0 && (
                        <span className="text-xs px-2 py-1 bg-[var(--primary)]/10 rounded-full text-[var(--primary)]">
                          {categories[0]}
                        </span>
                      )}
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Loading state */}
      {isSearching && isLoading && searchQuery.trim().length > 1 && (
        <div
          ref={resultsRef}
          className="search-results absolute mt-2 w-full bg-[var(--surface-5)] border-2 border-[var(--accent)]/50 rounded-lg shadow-lg z-50 overflow-hidden"
        >
          <div className="results-header px-4 py-2 border-b border-[var(--primary)]/20 text-xs text-[var(--accent)]">
            <span className="pulse-text">SCANNING MATRIX</span>
          </div>
          <div className="py-6 px-4 text-center">
            <div className="flex justify-center items-center gap-2">
              <div className="large-spinner"></div>
              <p className="text-[var(--text-muted)] glitch-text">Searching across dimensions...</p>
            </div>
          </div>
        </div>
      )}

      {/* No results state */}
      {isSearching && !isLoading && searchQuery.trim().length > 1 && searchResults.length === 0 && (
        <div
          ref={resultsRef}
          className="search-results absolute mt-2 w-full bg-[var(--surface-5)] border-2 border-[var(--accent)]/50 rounded-lg shadow-lg z-50 overflow-hidden"
        >
          <div className="results-header px-4 py-2 border-b border-[var(--primary)]/20 text-xs text-[var(--accent)]">
            <span className="pulse-text">SEARCH RESULTS</span>
          </div>
          <div className="py-6 px-4 text-center">
            <div className="error-code text-2xl font-bold text-[var(--accent)]">ERR_404</div>
            <p className="text-[var(--text-muted)] mt-2">No posts found for "{searchQuery}"</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .search-container {
          position: relative;
          z-index: 1;
        }

        .search-glow {
          background: linear-gradient(45deg, var(--primary), var(--accent));
          opacity: 0;
          transition: opacity 0.3s ease;
          filter: blur(20px);
          z-index: -1;
        }

        .search-input:focus + .search-icon + .search-glow {
          opacity: 0.15;
        }

        .search-input {
          caret-color: var(--accent);
          box-shadow: 0 0 0 1px rgba(var(--primary-rgb), 0.1);
          backdrop-filter: blur(5px);
        }

        .search-input:focus {
          box-shadow: 0 0 15px rgba(var(--accent-rgb), 0.2);
        }

        .search-results {
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3),
            0 0 10px rgba(var(--primary-rgb), 0.1) inset, 0 0 0 1px rgba(var(--accent-rgb), 0.2);
        }

        /* Spinner animation for loading state */
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .search-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid var(--accent);
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .large-spinner {
          width: 30px;
          height: 30px;
          border: 3px solid var(--accent);
          border-top: 3px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Glitch text animation for loading */
        .glitch-text {
          position: relative;
          animation: glitch 1.5s infinite;
        }

        .cyberpunk-corner {
          position: absolute;
          width: 10px;
          height: 10px;
          border-width: 2px;
          z-index: 2;
        }

        .top-left {
          top: -1px;
          left: -1px;
          border-style: solid none none solid;
          border-color: var(--accent);
        }

        .top-right {
          top: -1px;
          right: -1px;
          border-style: solid solid none none;
          border-color: var(--accent);
        }

        .bottom-left {
          bottom: -1px;
          left: -1px;
          border-style: none none solid solid;
          border-color: var(--accent);
        }

        .bottom-right {
          bottom: -1px;
          right: -1px;
          border-style: none solid solid none;
          border-color: var(--accent);
        }

        .cyberpunk-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 2px solid transparent;
          border-radius: 8px;
          pointer-events: none;
          z-index: 1;
          transition: all 0.3s ease;
          border-image: linear-gradient(
              45deg,
              var(--primary),
              transparent 40%,
              transparent 60%,
              var(--accent)
            )
            1;
          opacity: 0;
        }

        .cyberpunk-border.active {
          opacity: 1;
        }

        .pulse-text {
          animation: pulse 2s infinite ease-in-out;
          display: inline-block;
        }

        .results-header {
          font-family: monospace;
          letter-spacing: 1px;
        }

        .error-code {
          font-family: monospace;
          letter-spacing: 2px;
          text-shadow: 0 0 5px var(--accent);
        }

        .search-icon.focused {
          color: var(--accent);
        }

        .search-icon.searching {
          color: var(--accent);
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
