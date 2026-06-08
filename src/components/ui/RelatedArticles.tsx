import { useMemo } from "react";
import { BlogPost } from "../../types";
import { mockPosts } from "../../data/mock";
import { PostCard } from "./PostCard";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface RelatedArticlesProps {
  currentPostId: string;
  currentTags: string[];
  currentCategoryId?: string;
}

export function RelatedArticles({ currentPostId, currentTags, currentCategoryId }: RelatedArticlesProps) {
  const relatedPosts = useMemo(() => {
    // Filter out the current active post
    const otherPosts = mockPosts.filter((p) => p.id !== currentPostId);

    // Score based on matching tags first as requested
    const scored = otherPosts.map((p) => {
      let score = 0;
      
      // Calculate matching tags
      const commonTags = p.tags.filter((t) => currentTags.includes(t));
      // Give very high weight to matching tags
      score += commonTags.length * 10;

      // Secondary matching on category
      if (currentCategoryId && p.category.id === currentCategoryId) {
        score += 3;
      }

      return { post: p, score, commonTagsCount: commonTags.length };
    });

    // Sort by score (tags weight highest) descending, then by publication date
    scored.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime();
    });

    // Take top 3
    return scored.map((item) => item.post).slice(0, 3);
  }, [currentPostId, currentTags, currentCategoryId]);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-theme-border mt-16" id="related-intelligence">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-red-500 font-mono text-xs uppercase tracking-widest font-bold">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>// RECOMMENDED CORRELATIONS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase italic tracking-tight text-theme-text font-sans">
            Related <span className="text-red-500">Articles</span>
          </h2>
        </div>
        <p className="text-theme-text-dim text-sm max-w-md">
          Explore deeper analysis, contextual connections, and strategic intelligence calculated based on your reading subject.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedPosts.map((relatedPost, i) => (
          <div key={relatedPost.id} className="relative group/card">
            {/* Soft background glow effect on card hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-amber-500 rounded-xl blur opacity-0 group-hover/card:opacity-15 transition duration-500 group-hover/card:duration-200" />
            <PostCard post={relatedPost} index={i} className="relative z-10" />
          </div>
        ))}
      </div>
    </section>
  );
}
