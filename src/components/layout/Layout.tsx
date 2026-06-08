import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { JsonLd } from "../seo/JsonLd";
import { SearchModal } from "../ui/SearchModal";

export function Layout() {
  const baseUrl = import.meta.env.VITE_APP_URL || "https://rednexus.com";
  
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RED.NEXUS",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "sameAs": [
      "https://twitter.com/rednexus",
      "https://linkedin.com/company/rednexus"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "RED.NEXUS",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-theme-bg text-theme-text transition-colors duration-300 selection:bg-red-500/30">
      <ScrollRestoration />
      <JsonLd data={orgSchema} />
      <JsonLd data={websiteSchema} />
      <header className="fixed top-0 left-0 right-0 z-50 w-full flex flex-col bg-theme-bg/90 backdrop-blur-md border-b border-theme-border transition-colors duration-300" id="site-header">
        <Navbar />
      </header>
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
      <SearchModal />
    </div>
  );
}
