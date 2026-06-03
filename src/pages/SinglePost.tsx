import { useParams, Link, Navigate } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Share2, Bookmark, Twitter, Linkedin, Github } from "lucide-react";
import { mockPosts } from "../data/mock";
import { cn } from "../lib/utils";
import { motion } from "motion/react";
import { PostCard } from "../components/ui/PostCard";
import { JsonLd } from "../components/seo/JsonLd";

export default function SinglePost() {
  const { slug } = useParams();
  const post = mockPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = mockPosts
    .filter((p) => p.category.id === post.category.id && p.id !== post.id)
    .slice(0, 3);

  const baseUrl = import.meta.env.VITE_APP_URL || "https://rednexus.com";
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "url": `${baseUrl}/author/${post.author.slug || post.author.name.toLowerCase().replace(' ', '-')}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "RED.NEXUS",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": postUrl
      }
    ]
  };

  return (
    <article className="w-full bg-[#050505] pb-24">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* Hero Image & Title Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full mt-[-80px]">
        <div className="absolute inset-0 bg-[#050505]/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute bottom-0 left-0 w-full z-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 font-medium text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Intelligence
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={cn(
                "px-2 py-1 text-[10px] uppercase font-bold tracking-widest bg-red-600 text-white"
              )}>
                {post.category.name}
              </span>
              <div className="text-[10px] uppercase tracking-widest font-bold text-white/50 flex items-center gap-2">
                <time dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), "MMM d, yyyy")}
                </time>
                <span className="w-px h-3 bg-white/20" />
                <span>{post.readTimeMinutes} min read</span>
              </div>
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-[80px] leading-[0.85] font-black tracking-tighter uppercase text-white mb-8"
            >
              {post.title}
            </motion.h1>

            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <div className="flex items-center gap-4">
                <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 border border-white/20" />
                <div>
                  <p className="text-white font-bold">{post.author.name}</p>
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <Bookmark className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-600 hover:text-white transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-20">
        <div className="bg-[#050505] p-8 md:p-16 border border-white/10">
          <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-12 border-l-4 border-red-500 pl-6">
            {post.excerpt}
          </p>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:italic prose-a:text-red-500 prose-img:border prose-img:border-white/10 prose-p:text-white/70">
            {/* Real implementation would render Markdown/HTML here */}
            <p>
              In the rapidly evolving landscape of {post.category.name.toLowerCase()}, there are few milestones as significant as the ones we are witnessing today. {post.content}
            </p>
            <h2>The Technical Debt of Progress</h2>
            <p>
               Every massive leap forward introduces new complexities. When we examine the underlying architecture, the paradigm shifts are undeniable. 
               We are no longer optimizing for raw speed; we are optimizing for intelligent throughput and verifiable security.
            </p>
            <p>
              Consider the implications highlighted in recent whitepapers. The consensus is building around a distributed, highly decoupled architecture.
              This requires a fundamental rethinking of how state is managed across ephemeral nodes.
            </p>
            <blockquote>
              "The architecture of tomorrow is not built by extending the architecture of today, but by dismantling it entirely and starting from first principles." — {post.author.name}
            </blockquote>
            <p>
              As we look toward the horizon, the focus must shift from individual components to systemic resilience. It is a challenging transition, but one that is absolutely necessary for the next generation of scalable infrastructure.
            </p>
          </div>

          {/* Tags */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mr-2 flex items-center">Tags:</span>
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white/70 cursor-pointer hover:bg-white/10 hover:text-white transition-colors">
                {tag}
              </span>
            ))}
          </div>

          {/* Author Bio Box */}
          <div className="mt-16 bg-white/[0.02] border border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
             <img src={post.author.avatar} alt={post.author.name} className="w-24 h-24 border border-white/10" />
             <div className="text-center md:text-left">
               <h3 className="font-bold text-xl text-white mb-2 uppercase">By {post.author.name}</h3>
               <p className="text-white/50 text-sm mb-4">{post.author.bio}</p>
               <div className="flex gap-3 justify-center md:justify-start">
                  <a href="#" className="text-gray-500 hover:text-red-400 transition-colors"><Twitter className="w-5 h-5"/></a>
                  <a href="#" className="text-gray-500 hover:text-red-400 transition-colors"><Linkedin className="w-5 h-5"/></a>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10 mt-12 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white">Related<span className="text-red-500">_</span>Intelligence</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost, i) => (
              <PostCard key={relatedPost.id} post={relatedPost} index={i} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
