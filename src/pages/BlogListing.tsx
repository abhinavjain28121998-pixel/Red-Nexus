import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, Filter } from "lucide-react";
import { mockPosts, categories } from "../data/mock";
import { PostCard } from "../components/ui/PostCard";
import { cn } from "../lib/utils";
import { JsonLd } from "../components/seo/JsonLd";

export default function BlogListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");
  
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setActiveCategory(searchParams.get("category"));
  }, [searchParams]);

  const handleCategoryChange = (slug: string | null) => {
    setActiveCategory(slug);
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  const filteredPosts = mockPosts.filter((post) => {
    const matchesCategory = activeCategory ? post.category.slug === activeCategory : true;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const baseUrl = import.meta.env.VITE_APP_URL || "https://rednexus.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": activeCategory ? `${activeCategory} Articles - RED.NEXUS` : "Blog - RED.NEXUS",
    "description": "Browse our complete collection of deep dives, analyses, and research papers across the technology landscape.",
    "url": activeCategory ? `${baseUrl}/blog?category=${activeCategory}` : `${baseUrl}/blog`
  };

  return (
    <div className="w-full pt-12 pb-24 bg-[#050505]">
      <JsonLd data={schema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-[80px] font-black uppercase tracking-tighter italic text-white mb-6 leading-[0.85]"
          >
            Editorial<br className="hidden md:block" /><span className="text-red-500">_</span>Archive
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/50 max-w-2xl font-bold tracking-tight"
          >
            Browse our complete collection of deep dives, analyses, and research papers across the technology landscape.
          </motion.p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between bg-[#050505] p-4 border border-white/10">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto hide-scrollbar">
            <button
              onClick={() => handleCategoryChange(null)}
              className={cn(
                "px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300",
                activeCategory === null 
                  ? "bg-white text-black" 
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
              )}
            >
              All Topics
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.slug)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300",
                  activeCategory === category.slug
                    ? "bg-red-600 text-white"
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search intelligence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-full pl-11 pr-4 py-2.5 text-white text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-red-500/50 transition-colors placeholder:text-white/30"
            />
          </div>
        </div>

        {/* Post Grid */}
        {filteredPosts.length > 0 ? (
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
            <button 
              onClick={() => { handleCategoryChange(null); setSearchQuery(""); }}
              className="mt-6 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
