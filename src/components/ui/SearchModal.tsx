import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Hash, BookOpen, CornerDownLeft, Calendar, User, ArrowRight, Lightbulb, Sparkles } from "lucide-react";
import { useSearch } from "../SearchContext";
import { mockPosts } from "../../data/mock";
import { cn } from "../../lib/utils";

// Helper component to highlight search terms in text
function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  
  try {
    const parts = text.split(new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, "gi"));
    return (
      <>
        {parts.map((part, index) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={index} className="bg-red-500/25 text-red-400 font-semibold rounded px-0.5">
              {part}
            </mark>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  } catch (e) {
    return <>{text}</>;
  }
}

export function SearchModal() {
  const { isSearchOpen, closeSearch } = useSearch();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "title" | "tags" | "content">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Dynamic tags from all mock posts
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    mockPosts.forEach(post => {
      post.tags?.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, []);

  // Popular/Trending tags to recommend
  const popularTags = useMemo(() => {
    return allTags.slice(0, 5);
  }, [allTags]);

  // Unique categories
  const categoriesList = useMemo(() => {
    const catsSet = new Set<string>();
    mockPosts.forEach(post => {
      if (post.category?.name) catsSet.add(post.category.name);
    });
    return Array.from(catsSet);
  }, []);

  // Filter posts based on query, tag selection, and category
  const filteredResults = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();
    
    // Default search matching logic
    return mockPosts.filter((post) => {
      // 1. Category Filter
      if (selectedCategory !== "all" && post.category?.name !== selectedCategory) {
        return false;
      }

      if (!trimmedQuery) return true;

      // 2. Query Scope Filter
      const titleMatch = post.title.toLowerCase().includes(trimmedQuery);
      const excerptMatch = post.excerpt.toLowerCase().includes(trimmedQuery);
      const categoryMatch = post.category?.name.toLowerCase().includes(trimmedQuery);
      const authorMatch = post.author?.name.toLowerCase().includes(trimmedQuery);
      const tagMatch = post.tags?.some(tag => tag.toLowerCase().includes(trimmedQuery));
      const contentMatch = post.content.toLowerCase().includes(trimmedQuery);

      if (activeTab === "title") {
        return titleMatch;
      }
      if (activeTab === "tags") {
        return tagMatch;
      }
      if (activeTab === "content") {
        return contentMatch;
      }
      
      // 'all' tab matches everything
      return titleMatch || excerptMatch || tagMatch || contentMatch || categoryMatch || authorMatch;
    });
  }, [query, activeTab, selectedCategory]);

  // Handle focus on open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      setSelectedIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen]);

  // Listen to keyboard shortcuts (Cmd+K, Ctrl+K, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isSearchOpen) {
          closeSearch();
        } else {
          // Open search triggered
          const btn = document.querySelector('[aria-label="Search"]');
          if (btn) (btn as HTMLButtonElement).click();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  // Navigate active index on keyboard navigation
  useEffect(() => {
    const handleNavKeys = (e: KeyboardEvent) => {
      if (!isSearchOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredResults.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          const selectedPost = filteredResults[selectedIndex];
          navigate(`/blog/${selectedPost.slug}`);
          closeSearch();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeSearch();
      }
    };

    window.addEventListener("keydown", handleNavKeys);
    return () => window.removeEventListener("keydown", handleNavKeys);
  }, [isSearchOpen, filteredResults, selectedIndex, navigate, closeSearch]);

  // Scroll active item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const activeEl = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        const parent = resultsRef.current;
        const activeTop = activeEl.offsetTop;
        const activeHeight = activeEl.offsetHeight;
        const parentHeight = parent.clientHeight;
        const parentScrollTop = parent.scrollTop;

        if (activeTop < parentScrollTop) {
          parent.scrollTop = activeTop;
        } else if (activeTop + activeHeight > parentScrollTop + parentHeight) {
          parent.scrollTop = activeTop + activeHeight - parentHeight;
        }
      }
    }
  }, [selectedIndex]);

  // Format Date for premium styling
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const handleSelectPost = (slug: string) => {
    navigate(`/blog/${slug}`);
    closeSearch();
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 md:px-0">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="absolute inset-0 bg-[#000000]/85 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            ref={containerRef}
            className="relative w-full max-w-3xl bg-[#09090b] border border-white/10 rounded-2xl shadow-[0_0_50px_-12px_rgba(239,68,68,0.2)] overflow-hidden flex flex-col max-h-[80vh] text-white"
            id="search-index-modal"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-white/5">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search index by title, tags, or content..."
                className="w-full bg-transparent text-white text-base font-medium placeholder:text-gray-500 focus:outline-none focus:ring-0 leading-relaxed"
                id="search-index-input"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-gray-400 font-mono tracking-widest uppercase">
                ESC
              </div>
            </div>

            {/* Scope / Filter Tabs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 px-6 py-3 bg-[#0d0d11] border-b border-white/5 text-xs">
              {/* Scope filter */}
              <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar py-1">
                <span className="text-gray-500 mr-2 shrink-0 select-none">Scope:</span>
                {[
                  { id: "all", label: "Full Index" },
                  { id: "title", label: "Title Only" },
                  { id: "tags", label: "Tags Only" },
                  { id: "content", label: "Content Only" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setSelectedIndex(0);
                    }}
                    className={cn(
                      "px-3 py-1 rounded-full font-semibold uppercase tracking-widest text-[10px] transition-all",
                      activeTab === tab.id
                        ? "bg-red-600 text-white"
                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Category selector */}
              <div className="flex items-center gap-2">
                <span className="text-gray-500 select-none">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="bg-white/5 border border-white/10 rounded-md px-3 py-1 text-xs text-white uppercase font-bold tracking-wider focus:outline-none focus:border-red-500/50"
                  id="category-search-filter"
                >
                  <option value="all" className="bg-[#09090b]">All Categories</option>
                  {categoriesList.map(cat => (
                    <option key={cat} value={cat} className="bg-[#09090b]" style={{ textTransform: "uppercase" }}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow overflow-y-auto p-6" ref={resultsRef}>
              {/* If no query is entered, show Quick Suggestions and Recents */}
              {!query.trim() && (
                <div className="space-y-8">
                  {/* Quick tips list */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500 shrink-0" />
                      Tips for Better Searching
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-400">
                      <div className="p-3 bg-white/5 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                        <span className="text-white font-semibold">Search Tags</span>: Click any hashtag or use "Tags Only" tab to query topics dynamically.
                      </div>
                      <div className="p-3 bg-white/5 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                        <span className="text-white font-semibold">Keyboard Nav</span>: Try <span className="font-mono text-red-400">↑</span> and <span className="font-mono text-red-400">↓</span> keys to browse, and <span className="font-mono text-red-400">Enter</span> to opening details.
                      </div>
                    </div>
                  </div>

                  {/* Trending tags */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-red-500 shrink-0" />
                      Trending Indices
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => {
                            setQuery(tag);
                            setActiveTab("tags");
                          }}
                          className="flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 text-xs font-semibold text-gray-300 rounded-lg border border-white/5 transition-all"
                        >
                          <Hash className="w-3 h-3 text-gray-500" />
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Search Results */}
              {query.trim() && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500 uppercase tracking-widest pb-3 border-b border-white/5">
                    <span>Search Index Matches</span>
                    <span className="font-mono font-bold text-red-400">{filteredResults.length} Result{filteredResults.length !== 1 ? "s" : ""}</span>
                  </div>

                  {filteredResults.length > 0 ? (
                    filteredResults.map((post, idx) => {
                      const isSelected = idx === selectedIndex;
                      return (
                        <div
                          key={post.id}
                          onClick={() => handleSelectPost(post.slug)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={cn(
                            "group block p-4 rounded-xl border text-left cursor-pointer transition-all duration-300",
                            isSelected
                              ? "bg-red-500/10 border-red-500/30 shadow-md"
                              : "bg-[#0b0c10] hover:bg-white/5 border-white/5"
                          )}
                        >
                          <div className="flex flex-col gap-2">
                            {/* Meta row */}
                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                              <span className="text-red-500 flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                {post.category?.name}
                              </span>
                              <span className="text-gray-500 group-hover:text-gray-300 transition-colors flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(post.publishedAt)}
                              </span>
                            </div>

                            {/* Title */}
                            <h4 className={cn(
                              "text-base font-black tracking-tight leading-snug uppercase group-hover:text-red-400 transition-colors",
                              isSelected ? "text-red-400" : "text-white"
                            )}>
                              <HighlightedText text={post.title} query={query} />
                            </h4>

                            {/* Snippet / Excerpt */}
                            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                              <HighlightedText text={post.excerpt} query={query} />
                            </p>

                            {/* Match Details if matching tags or content body */}
                            <div className="flex flex-wrap items-center justify-between gap-4 mt-2 pt-2 border-t border-white/5">
                              {/* Tags matching preview */}
                              <div className="flex flex-wrap gap-1 items-center">
                                {post.tags?.map((tag) => {
                                  const queryMatch = tag.toLowerCase().includes(query.toLowerCase());
                                  return (
                                    <span
                                      key={tag}
                                      className={cn(
                                        "inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[9px] font-mono tracking-wider transition-all",
                                        queryMatch
                                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                          : "bg-white/5 text-gray-500 border border-transparent"
                                      )}
                                    >
                                      #{tag}
                                    </span>
                                  );
                                })}
                              </div>

                              {/* Author and Go detail Action */}
                              <div className="flex items-center gap-2 ml-auto text-[10px] text-gray-500 shrink-0">
                                <User className="w-3 h-3" />
                                <span>{post.author?.name}</span>
                                <span className={cn(
                                  "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider text-red-400 transition-opacity",
                                  isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                )}>
                                  Open Article
                                  <CornerDownLeft className="w-2.5 h-2.5" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-16">
                      <X className="w-8 h-8 text-white/20 mx-auto mb-3" />
                      <h4 className="text-sm font-bold uppercase tracking-widest text-white/70">No intelligence found</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Try checking your spelling, selecting another category, or broadening your scope filters.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer status line */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#0d0d11] border-t border-white/5 text-[10px] text-gray-500 font-mono select-none">
              <div className="flex gap-4">
                <span><span className="text-red-500 font-bold">↑↓</span> Navigate</span>
                <span><span className="text-red-500 font-bold">Enter</span> Open</span>
                <span><span className="text-red-500 font-bold">ESC</span> Close</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors cursor-pointer" onClick={closeSearch}>
                <span>Red.Nexus Intelligence Index v1.0</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
