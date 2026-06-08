import { motion } from "motion/react";
import { ArrowRight, Zap, Command, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { mockPosts } from "../data/mock";
import { PostCard } from "../components/ui/PostCard";
import { JsonLd } from "../components/seo/JsonLd";
import { MetaTags } from "../components/seo/MetaTags";

export default function Home() {
  const featuredPost = mockPosts.find(p => p.featured) || mockPosts[0];
  const trendingPosts = mockPosts.filter(p => p.trending && p.id !== featuredPost.id).slice(0, 3);
  const latestPosts = mockPosts.filter(p => p.id !== featuredPost.id && !trendingPosts.includes(p)).slice(0, 4);

  const baseUrl = import.meta.env.VITE_APP_URL || "https://rednexus.com";
  
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        "url": baseUrl,
        "name": "RED.NEXUS — Deciphering the Future of Advanced Compute",
        "description": "Premium editorial covering artificial intelligence, spatial computing, and the hardware that builds tomorrow.",
        "isPartOf": {
          "@id": `${baseUrl}/#website`
        }
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "RED.NEXUS",
        "description": "High-signal technology publication covering deep compute and infrastructure pipelines.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${baseUrl}/blog?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What topics does RED.NEXUS cover?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "RED.NEXUS specializes in premium, high-signal technical journalism covering advanced microarchitectures, artificial intelligence topologies, cloud security, and next-generation developer tooling."
            }
          },
          {
            "@type": "Question",
            "name": "Who writes for RED.NEXUS?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our reports, briefings, and analyses are written and peer-reviewed by engineering leaders, systems architects, and veteran security scholars."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full">
      <MetaTags 
        title="Actionable Intelligence on Advanced Compute"
        description="RED.NEXUS is a premium technology publication dedicated to high-signal, deeply researched reporting on computation, artificial intelligence, and cybersecurity."
        keywords="advanced compute, artificial intelligence topologies, hardware semiconductor systems, cybersecurity infrastructure, deep search, technical blog"
      />
      <JsonLd data={schema} />
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/30 via-slate-900/0 to-slate-950"></div>
        </div>
        <div className="absolute top-40 right-[10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-60 left-[10%] w-96 h-96 bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600/10 border border-red-500/20 text-xs font-bold uppercase tracking-widest text-red-500 rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>Premium Tech Editorial</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 leading-tight">
              Actionable Intelligence on <br className="hidden md:block" /><span className="text-red-500 italic">Advanced</span> Compute.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Cut through the hype. Deep-dive analyses and research on artificial intelligence, spatial computing, and the next generation of hardware systems.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/blog" className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-red-500 hover:text-white rounded-md text-sm uppercase font-bold tracking-widest transition-all flex items-center justify-center gap-2 group">
                Read Latest Insights <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:border-white/60 text-white rounded-md text-sm uppercase font-bold tracking-widest transition-all flex items-center justify-center">
                Explore Our Mission
              </Link>
            </div>
          </motion.div>

          {/* Social Proof / Trust Markers */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="border-y border-white/5 py-8 mb-16"
          >
            <p className="text-center text-xs uppercase tracking-widest text-gray-500 font-bold mb-6">Read by technologists from leading institutions</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
               {/* Placeholders for logos */}
               <div className="text-lg font-black tracking-tighter">OAK RIDGE LABS</div>
               <div className="text-lg font-black tracking-tighter italic">MIT<span className="text-red-500">_</span>CSAIL</div>
               <div className="text-lg font-black tracking-widest font-serif">DeepMind</div>
               <div className="text-lg font-black tracking-tighter uppercase">Stanford RegLab</div>
            </div>
          </motion.div>

          {/* Featured Hero Post */}
          <div className="mt-12">
            <PostCard post={featuredPost} featured={true} />
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-24 bg-[#050505] relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white flex items-center gap-4 mb-4 md:mb-0">
              Trending <span className="text-red-500">Insights</span>
            </h2>
            <Link to="/blog" className="text-sm font-bold uppercase tracking-widest text-red-500 hover:text-white flex items-center gap-1 group transition-colors">
              View All <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingPosts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Stories */}
      <section className="py-24 bg-[#050505] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white flex items-center gap-4">
              Latest <span className="text-red-500">Intelligence</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 block">
            {latestPosts.map((post, i) => (
              <div key={post.id} className="col-span-1 border border-white/5 bg-[#0a0a0a]/50 flex">
                 <PostCard post={post} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-32 relative overflow-hidden bg-red-600/5">
        <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-red-600 p-10 md:p-14 relative overflow-hidden rounded-2xl shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">Stay <span className="text-black">Ahead</span></h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium tracking-tight leading-snug">
              Join 50,000+ executives, engineers, and researchers receiving our exclusive weekly tech intelligence briefing.
            </p>
            <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-white border border-transparent px-5 py-4 text-black focus:outline-none focus:ring-4 focus:ring-white/30 rounded-md text-base"
                required
              />
              <button type="submit" className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest text-sm hover:bg-gray-900 transition-all rounded-md shadow-lg">
                Subscribe Now
              </button>
            </form>
            <p className="text-white/60 text-xs font-bold tracking-widest mt-6">No spam. Only high-signal intelligence.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
