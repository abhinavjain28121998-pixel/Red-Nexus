import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, Filter } from "lucide-react";
import { mockPosts, categories } from "../data/mock";
import { PostCard } from "../components/ui/PostCard";
import { cn } from "../lib/utils";
import { JsonLd } from "../components/seo/JsonLd";
import { MetaTags } from "../components/seo/MetaTags";
import { BlogCardSkeleton } from "../components/ui/Skeleton";

export default function BlogListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialSearch = searchParams.get("search") || "";
  
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setActiveCategory(searchParams.get("category"));
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  // Simulate modern analytical data fetching loader when active filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (slug: string | null) => {
    setActiveCategory(slug);
    const params: { [key: string]: string } = {};
    if (slug) {
      params.category = slug;
    }
    if (searchQuery) {
      params.search = searchQuery;
    }
    setSearchParams(params);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const params: { [key: string]: string } = {};
    if (activeCategory) {
      params.category = activeCategory;
    }
    if (query) {
      params.search = query;
    }
    setSearchParams(params);
  };

  const filteredPosts = mockPosts.filter((post) => {
    const matchesCategory = activeCategory ? post.category.slug === activeCategory : true;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      post.title.toLowerCase().includes(query) || 
      post.excerpt.toLowerCase().includes(query) ||
      post.tags?.some(tag => tag.toLowerCase().includes(query)) ||
      post.category?.name.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const baseUrl = import.meta.env.VITE_APP_URL || "https://rednexus.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": activeCategory ? `${activeCategory} Articles - RED.NEXUS` : "Blog - RED.NEXUS",
    "description": "Browse our complete collection of deep dives, analyses, and research papers across the technology landscape.",
    "url": activeCategory ? `${baseUrl}/blog?category=${activeCategory}` : `${baseUrl}/blog`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": filteredPosts.length,
      "itemListElement": filteredPosts.map((post, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "url": `${baseUrl}/blog/${post.slug}`,
        "name": post.title
      }))
    }
  };

  const categoryName = activeCategory ? categories.find(c => c.slug === activeCategory)?.name : null;
  const pageTitle = categoryName ? `${categoryName} Intelligence Insights` : "Actionable Technical Intelligence Briefs";

  return (
    <div className="w-full pt-12 pb-24 bg-[#050505]">
      <MetaTags 
        title={pageTitle}
        description={categoryName ? `Deep-dive analyses and research reports focusing on the frontier of ${categoryName}.` : "Browse our complete collection of deep technical dives and briefs on computer platforms, cyber structures, and artificial intelligence architectures."}
        keywords="computation, technology intelligence, research papers, technology analytics, technical briefs"
      />
      <JsonLd data={schema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-6 leading-tight"
          >
            Editorial<br className="hidden md:block" /> <span className="text-red-500">Archive</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl font-medium tracking-tight"
          >
            Browse our complete collection of deep dives, analyses, and research papers across the technology landscape.
          </motion.p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between bg-[#0a0a0a] p-4 border border-white/10 rounded-xl">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto hide-scrollbar" id="categories-filter-links">
            <Link
              to={searchQuery ? `/blog?search=${encodeURIComponent(searchQuery)}` : "/blog"}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300",
                activeCategory === null 
                  ? "bg-white text-black" 
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              )}
            >
              All Topics
            </Link>
            {categories.map((category) => {
              const queryParams = new URLSearchParams();
              queryParams.set("category", category.slug);
              if (searchQuery) {
                queryParams.set("search", searchQuery);
              }
              return (
                <Link
                  key={category.id}
                  to={`/blog?${queryParams.toString()}`}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300",
                    activeCategory === category.slug
                      ? "bg-red-600 text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search intelligence..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-full pl-11 pr-4 py-3 text-white text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-red-500/50 transition-colors placeholder:text-gray-500"
              id="search-intelligence-input"
            />
          </div>
        </div>

        {/* Post Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-[#050505] border border-white/10">
            <Filter className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2 italic">Nothing matching intelligence</h3>
            <p className="text-white/50">Try adjusting your filters or search terms to find what you're looking for.</p>
            <Link 
              to="/blog"
              className="mt-6 inline-block text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-white transition-colors"
              id="reset-filters-link"
            >
              Reset Filters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
