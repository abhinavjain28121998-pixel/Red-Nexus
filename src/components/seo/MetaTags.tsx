import { useEffect } from "react";

interface MetaTagsProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile" | "blog";
  canonicalPath?: string;
  authorName?: string;
  robots?: string;
}

export function MetaTags({
  title,
  description,
  keywords = "technology, AI, quantum computing, cybersecurity, computation",
  ogImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200&h=630",
  ogType = "website",
  canonicalPath,
  authorName,
  robots = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
}: MetaTagsProps) {
  useEffect(() => {
    // 1. Title
    const fullTitle = `${title} | RED.NEXUS`;
    document.title = fullTitle;

    // Helper to get or create tag
    const setMetaTag = (attribute: "name" | "property", value: string, contentValue: string) => {
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentValue);
    };

    // 2. Base Meta Tags
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);
    setMetaTag("name", "robots", robots);

    if (authorName) {
      setMetaTag("name", "author", authorName);
    }

    // 3. Open Graph Tags
    const currentUrl = window.location.href;
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:url", currentUrl);
    setMetaTag("property", "og:site_name", "RED.NEXUS");
    setMetaTag("property", "og:locale", "en_US");

    // 4. Twitter Card Tags
    setMetaTag("name", "twitter:card", ogType === "article" ? "summary_large_image" : "summary");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImage);
    setMetaTag("name", "twitter:site", "@rednexus");

    // 5. Canonical Link
    const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
    const finalCanonicalUrl = canonicalPath 
      ? `${baseUrl}${canonicalPath}` 
      : `${baseUrl}${window.location.pathname}`;

    let canonicalLinkObj = document.querySelector('link[rel="canonical"]');
    if (!canonicalLinkObj) {
      canonicalLinkObj = document.createElement("link");
      canonicalLinkObj.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLinkObj);
    }
    canonicalLinkObj.setAttribute("href", finalCanonicalUrl);

  }, [title, description, keywords, ogImage, ogType, canonicalPath, authorName, robots]);

  return null; // Side-effect only component
}
