import { Link } from "react-router-dom";
import { format } from "date-fns";
import { motion } from "motion/react";
import { BlogPost } from "../../types";
import { cn } from "../../lib/utils";

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
  className?: string;
  index?: number;
}

export function PostCard({ post, featured, className, index = 0 }: PostCardProps) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden bg-theme-card border border-theme-border hover:border-theme-text/30 transition-colors duration-500 rounded-xl",
        featured ? "md:flex-row md:h-[480px]" : "h-full",
        className
      )}
    >
      {/* Image container */}
      <div className={cn(
        "relative overflow-hidden",
        featured ? "md:w-1/2 lg:w-3/5" : "aspect-video w-full"
      )}>
        <div className="absolute inset-0 bg-gradient-to-t from-theme-card via-transparent z-10 transition-colors duration-300" />
        <img 
          src={post.coverImage} 
          alt={post.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105 transform"
        />
        <div className="absolute top-4 left-4 z-20">
          <Link
            to={`/blog?category=${post.category.slug}`}
            className={cn(
              "px-3 py-1.5 text-xs font-bold uppercase tracking-widest bg-red-600 text-white hover:bg-white hover:text-black transition-colors block font-sans"
            )}
            id={`postcard-category-${post.id}`}
          >
            {post.category.name}
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className={cn(
        "flex flex-col flex-1 relative z-20 bg-theme-card transition-colors duration-300",
        featured ? "md:w-1/2 lg:w-2/5 p-8 md:p-12 justify-center" : "p-6"
      )}>
        <div className="flex items-center gap-2 text-xs uppercase font-bold text-theme-text-dim tracking-wider mb-4">
          <time dateTime={post.publishedAt}>
            {format(new Date(post.publishedAt), "MMM d, yyyy")}
          </time>
          <span className="w-px h-3 bg-theme-border" />
          <span>{post.readTimeMinutes} min read</span>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h2 className={cn(
            "font-black tracking-tight text-theme-text group-hover:text-red-500 transition-colors line-clamp-3 mb-4",
            featured ? "text-4xl md:text-5xl leading-tight" : "text-2xl leading-snug"
          )}>
            {post.title}
          </h2>
        </Link>
        
        <p className={cn(
          "text-theme-text-muted line-clamp-3 mb-6 font-medium",
          featured ? "text-lg hidden md:block" : "text-sm"
        )}>
          {post.excerpt}
        </p>


      </div>
    </motion.article>
  );
}
