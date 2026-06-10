import { useParams, Link, Navigate } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Share2, Bookmark, List, Type, Sliders } from "lucide-react";
import { mockPosts } from "../data/mock";
import { cn } from "../lib/utils";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { JsonLd } from "../components/seo/JsonLd";
import { RelatedArticles } from "../components/ui/RelatedArticles";
import { MetaTags } from "../components/seo/MetaTags";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";
import { useEffect, useState, useMemo } from "react";
import { SinglePostSkeleton } from "../components/ui/Skeleton";

export default function SinglePost() {
  const { slug } = useParams();
  const post = mockPosts.find((p) => p.slug === slug);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [slug]);

  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">(() => {
    const saved = localStorage.getItem("reader-font-size");
    return (saved as "sm" | "base" | "lg" | "xl") || "base";
  });

  const [lineHeight, setLineHeight] = useState<"snug" | "normal" | "relaxed" | "loose">(() => {
    const saved = localStorage.getItem("reader-line-height");
    return (saved as "snug" | "normal" | "relaxed" | "loose") || "relaxed";
  });

  useEffect(() => {
    localStorage.setItem("reader-font-size", fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("reader-line-height", lineHeight);
  }, [lineHeight]);

  const fontSizeClass = useMemo(() => {
    switch (fontSize) {
      case "sm": return "text-sm md:text-base";
      case "lg": return "text-lg md:text-xl";
      case "xl": return "text-xl md:text-2xl";
      case "base":
      default:
        return "text-base md:text-lg";
    }
  }, [fontSize]);

  const excerptFontSizeClass = useMemo(() => {
    switch (fontSize) {
      case "sm": return "text-lg md:text-xl";
      case "lg": return "text-2xl md:text-3xl";
      case "xl": return "text-3xl md:text-4xl";
      case "base":
      default:
        return "text-xl md:text-2xl";
    }
  }, [fontSize]);

  const lineHeightClass = useMemo(() => {
    switch (lineHeight) {
      case "snug": return "leading-snug";
      case "normal": return "leading-normal";
      case "loose": return "leading-loose";
      case "relaxed":
      default:
        return "leading-relaxed";
    }
  }, [lineHeight]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#3b82f6", "#a855f7", "#ef4444"]
  );

  const headings = useMemo(() => {
    if (!post?.content) return [];
    const slugger = new GithubSlugger();
    const matches = Array.from(post.content.matchAll(/^(#{2,3})\s+(.+)$/gm));
    return matches.map((match) => {
      // Remove any trailing markdown elements from heading text if needed
      const rawText = match[2];
      const cleanText = rawText.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1').replace(/[*_~`]/g, '');
      return {
        level: match[1].length,
        text: cleanText,
        id: slugger.slug(rawText)
      };
    });
  }, [post?.content]);

  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const cleanContent = useMemo(() => {
    if (!post?.content) return "";
    // Remove the first H1 markdown line if it exists to avoid repeating the header
    return post.content.replace(/^\s*#\s+.+$/m, "");
  }, [post?.content]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  if (isLoading) {
    return <SinglePostSkeleton />;
  }

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
    "dateModified": post.publishedAt,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".prose-lg > h1", ".prose-lg > h2", ".prose-lg > p"]
    }
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
    <article className="w-full bg-theme-bg pb-24 transition-colors duration-300">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 z-50 origin-left"
        style={{ scaleX, backgroundColor }}
      />
      <MetaTags 
        title={post.title}
        description={post.excerpt}
        keywords={`${post.category.name.toLowerCase()}, ${post.tags.join(', ')}, computation, research`}
        ogImage={post.coverImage}
        ogType="article"
        canonicalPath={`/blog/${post.slug}`}
        authorName={post.author.name}
      />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* Hero Image & Title Section */}
      <div className="relative min-h-[60vh] md:min-h-[500px] lg:min-h-[600px] w-full mt-[-80px] flex items-end pt-32 pb-12 overflow-hidden">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-theme-bg/80 z-10 transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/40 to-transparent z-10 transition-colors duration-300" />
        
        <div className="relative w-full z-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/blog" className="inline-flex items-center gap-2 text-theme-text-dim hover:text-theme-text transition-colors mb-8 font-medium text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Intelligence
            </Link>
            
              <div className="flex flex-wrap items-center gap-4 mb-6">
              <Link
                to={`/blog?category=${post.category.slug}`}
                className={cn(
                  "px-3 py-1.5 text-xs uppercase font-bold tracking-widest bg-red-600 text-white hover:bg-white hover:text-black transition-colors block font-sans"
                )}
                id="singlepost-hero-category"
              >
                {post.category.name}
              </Link>
              <div className="text-xs uppercase tracking-widest font-bold text-theme-text-dim flex items-center gap-2">
                <time dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), "MMM d, yyyy")}
                </time>
                <span className="w-px h-3 bg-theme-border" />
                <span>{post.readTimeMinutes} min read</span>
              </div>
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-7xl leading-tight font-black tracking-tight uppercase text-theme-text mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)] selection:bg-red-500/30"
            >
              {post.title}
            </motion.h1>

            <div className="flex items-center justify-end border-t border-theme-border pt-6">
              <div className="flex items-center gap-3">
                <button aria-label="Save bookmark" className="w-10 h-10 rounded-full bg-theme-text/5 border border-theme-border flex items-center justify-center text-theme-text-dim hover:text-theme-text hover:bg-theme-text/10 transition-all">
                  <Bookmark className="w-4 h-4" />
                </button>
                <button aria-label="Share post" className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-600 hover:text-white transition-all shadow-lg">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-8 xl:gap-16 items-start">
          <div className="bg-theme-card p-8 md:p-12 xl:p-16 border border-theme-border w-full min-w-0 rounded-xl shadow-2xl transition-all duration-300">
            {/* Mobile/Tablet Accessibility / Reader Control Bar */}
            <div className="lg:hidden mb-10 p-4 bg-theme-text/5 border border-theme-border rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-bold uppercase tracking-widest text-theme-text-dim backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="flex items-center gap-1.5"><Type className="w-3.5 h-3.5" /> Reading Options</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-theme-text-dim">Size:</span>
                  <div className="flex bg-theme-bg border border-theme-border rounded-md p-0.5">
                    {(["sm", "base", "lg", "xl"] as const).map((sz) => {
                      const labels = { sm: "A-", base: "A", lg: "A+", xl: "A++" };
                      const active = fontSize === sz;
                      return (
                        <button
                          key={sz}
                          onClick={() => setFontSize(sz)}
                          className={cn(
                            "px-2.5 py-1 text-[11px] font-black rounded transition-all duration-200",
                            active
                              ? "bg-red-600 text-white shadow shadow-red-500/20"
                              : "text-theme-text-dim hover:text-theme-text"
                          )}
                          title={`Set font size to ${sz}`}
                        >
                          {labels[sz]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-theme-text-dim">Spacing:</span>
                  <div className="flex bg-theme-bg border border-theme-border rounded-md p-0.5">
                    {(["snug", "normal", "relaxed", "loose"] as const).map((lh) => {
                      const labels = { snug: "Cond", normal: "Reg", relaxed: "Wide", loose: "Huge" };
                      const active = lineHeight === lh;
                      return (
                        <button
                          key={lh}
                          onClick={() => setLineHeight(lh)}
                          className={cn(
                            "px-2.5 py-1 text-[10px] font-bold rounded transition-all duration-200",
                            active
                              ? "bg-red-600 text-white shadow shadow-red-500/20"
                              : "text-theme-text-dim hover:text-theme-text"
                          )}
                          title={`Set line spacing to ${lh}`}
                        >
                          {labels[lh]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <p className={cn(excerptFontSizeClass, lineHeightClass, "text-theme-text font-medium mb-12 border-l-4 border-red-500 pl-6 transition-all duration-300")}>
              {post.excerpt}
            </p>

            <div className="max-w-none text-theme-text scroll-mt-24">
              <Markdown
                rehypePlugins={[rehypeRaw, rehypeSlug]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-theme-text mt-8 mb-10 pb-4 border-b border-red-500/20" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase italic tracking-tight text-theme-text mt-16 mb-6 flex items-center gap-3 border-l-4 border-red-500 pl-4 scroll-mt-24" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-red-500 mt-12 mb-4 scroll-mt-24" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className={cn("text-theme-text-muted mb-8 font-sans transition-all duration-300", fontSizeClass, lineHeightClass)} {...props} />
                  ),
                  ul: ({ node, ...props }: any) => {
                    const { ordered, ...cleanProps } = props;
                    return <ul className={cn("list-disc list-outside pl-6 mb-8 mt-4 space-y-3.5 text-theme-text-muted transition-all duration-300", fontSizeClass, lineHeightClass)} {...cleanProps} />;
                  },
                  ol: ({ node, ...props }: any) => {
                    const { ordered, ...cleanProps } = props;
                    return <ol className={cn("list-decimal list-outside pl-6 mb-8 mt-4 space-y-3.5 text-theme-text-muted transition-all duration-300", fontSizeClass, lineHeightClass)} {...cleanProps} />;
                  },
                  li: ({ node, ...props }: any) => {
                    const { ordered, index, ...cleanProps } = props;
                    return <li className="pl-2 [&::marker]:text-red-500 [&::marker]:font-bold" {...cleanProps} />;
                  },
                  blockquote: ({ node, ...props }) => (
                    <blockquote className={cn("border-l-4 border-red-500 bg-theme-text/5 p-6 md:p-8 italic text-theme-text my-10 rounded-r-lg font-medium shadow-lg border-y border-r border-theme-border transition-all duration-300", fontSizeClass, lineHeightClass)} {...props} />
                  ),
                  a: ({ node, ...props }) => (
                    <a className="text-red-500 hover:text-red-400 transition-colors underline underline-offset-4 decoration-red-500/30 hover:decoration-red-400 font-medium" {...props} />
                  ),
                  hr: ({ node, ...props }) => (
                    <hr className="my-12 border-t border-theme-border" {...props} />
                  ),
                  pre: ({ node, ...props }) => (
                    <pre className="bg-theme-card-elevated border border-theme-border p-6 rounded-lg overflow-x-auto my-8 font-mono text-sm shadow-md scrollbar-thin scrollbar-thumb-theme-text/20 transition-all" {...props} />
                  ),
                  code: ({ node, ...props }) => (
                    <code className="bg-theme-text/5 border border-theme-border px-1.5 py-0.5 rounded font-mono text-xs text-red-500 font-semibold transition-all" {...props} />
                  ),
                  img: ({ node, ...props }) => (
                    <img className="border border-theme-border rounded-lg max-w-full h-auto my-8 md:my-12 shadow-2xl transition-all" referrerPolicy="no-referrer" {...props} />
                  ),
                  script: () => null
                }}
              >
                {cleanContent}
              </Markdown>
            </div>

            {/* Tags */}
            <div className="mt-16 pt-8 border-t border-theme-border flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-theme-text-dim mr-2 flex items-center">Tags:</span>
              {post.tags.map(tag => (
                <Link 
                  key={tag} 
                  to={`/blog?search=${encodeURIComponent(tag)}`}
                  className="px-3 py-1.5 bg-theme-text/5 border border-theme-border text-xs font-bold tracking-widest uppercase text-theme-text-muted hover:bg-theme-text/10 hover:text-red-500 hover:border-red-500/30 transition-all rounded font-mono"
                  id={`singlepost-tag-${tag}`}
                >
                  #{tag}
                </Link>
              ))}
            </div>


          </div>

          {/* Persistent Sticky Desktop Sidebar */}
          <div className="sticky top-24 hidden lg:block">
            <div className="flex flex-col gap-6 w-full">
              {/* Reading Preferences Card */}
              <div className="bg-theme-card border border-theme-border p-6 rounded-xl shadow-lg transition-all duration-300">
                <div className="flex items-center gap-2 mb-4 text-theme-text font-bold uppercase tracking-widest text-xs">
                  <Sliders className="w-4 h-4 text-red-500" />
                  Reading Preferences
                </div>
                
                <div className="space-y-4">
                  {/* Font Size Group */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-theme-text-dim mb-2">// FONT INTEGRITY</label>
                    <div className="grid grid-cols-4 bg-theme-bg border border-theme-border rounded-lg p-0.5">
                      {(["sm", "base", "lg", "xl"] as const).map((sz) => {
                        const labels = { sm: "A-", base: "A", lg: "A+", xl: "A++" };
                        const active = fontSize === sz;
                        return (
                          <button
                            key={sz}
                            onClick={() => setFontSize(sz)}
                            className={cn(
                              "py-1.5 text-xs font-black rounded transition-all duration-200",
                              active
                                ? "bg-red-600 text-white shadow"
                                : "text-theme-text-dim hover:text-theme-text"
                            )}
                          >
                            {labels[sz]}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Line Height Group */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-theme-text-dim mb-2">// LINE DENSITY</label>
                    <div className="grid grid-cols-4 bg-theme-bg border border-theme-border rounded-lg p-0.5">
                      {(["snug", "normal", "relaxed", "loose"] as const).map((lh) => {
                        const labels = { snug: "Cond", normal: "Reg", relaxed: "Wide", loose: "Huge" };
                        const active = lineHeight === lh;
                        return (
                          <button
                            key={lh}
                            onClick={() => setLineHeight(lh)}
                            className={cn(
                              "py-1.5 text-[10px] font-bold rounded transition-all duration-200",
                              active
                                ? "bg-red-600 text-white shadow"
                                : "text-theme-text-dim hover:text-theme-text"
                            )}
                          >
                            {labels[lh]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Table of Contents Card */}
              {headings.length > 0 && (
                <div className="bg-theme-card border border-theme-border p-6 rounded-xl shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-2 mb-6 text-theme-text font-bold uppercase tracking-widest text-xs">
                    <List className="w-4 h-4 text-red-500" />
                    Table of Contents
                  </div>
                  <nav className="flex flex-col gap-3">
                    {headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={cn(
                          "text-sm transition-colors block",
                          heading.level === 3 ? "ml-4" : "",
                          activeId === heading.id 
                            ? "text-red-500 font-bold" 
                            : "text-theme-text-dim hover:text-theme-text"
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.getElementById(heading.id);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                            setActiveId(heading.id);
                          }
                        }}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <RelatedArticles 
        currentPostId={post.id} 
        currentTags={post.tags} 
        currentCategoryId={post.category.id} 
      />
    </article>
  );
}
