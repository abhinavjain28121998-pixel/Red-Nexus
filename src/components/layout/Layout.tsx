import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { JsonLd } from "../seo/JsonLd";

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
    <div className="min-h-screen flex flex-col bg-[#050505] text-white selection:bg-red-500/30">
      <ScrollRestoration />
      <JsonLd data={orgSchema} />
      <JsonLd data={websiteSchema} />
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
