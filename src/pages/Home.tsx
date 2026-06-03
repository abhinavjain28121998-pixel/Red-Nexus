import { motion } from "motion/react";
import { ArrowRight, Zap, Command, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { mockPosts } from "../data/mock";
import { PostCard } from "../components/ui/PostCard";
import { JsonLd } from "../components/seo/JsonLd";

export default function Home() {
  const featuredPost = mockPosts.find(p => p.featured) || mockPosts[0];
  const trendingPosts = mockPosts.filter(p => p.trending && p.id !== featuredPost.id).slice(0, 3);
  const latestPosts = mockPosts.filter(p => p.id !== featuredPost.id && !trendingPosts.includes(p)).slice(0, 4);

  const baseUrl = import.meta.env.VITE_APP_URL || "https://rednexus.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "RED.NEXUS - The Future of Technology",
    "description": "Premium editorial covering artificial intelligence, spatial computing, and the hardware that builds tomorrow.",
    "url": baseUrl
  };

  return (
    <div className="w-full">
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
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-[10px] font-bold uppercase tracking-widest text-white mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span>The Forefront of Innovation</span>
            </div>
            
            <h1 className="text-5xl md:text-[80px] font-black tracking-tighter uppercase mb-8 leading-[0.85]">
              Decipher the <br className="hidden md:block" /><span className="text-red-500 italic">Future</span> of Technology.
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Premium editorial covering artificial intelligence, spatial computing, and the hardware that builds tomorrow.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/blog" className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-red-500 hover:text-white rounded-full text-[10px] uppercase font-bold tracking-widest transition-all flex items-center justify-center gap-2 group">
                Read Latest <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="w-full sm:w-auto px-8 py-4 bg-white/[0.02] border border-white/10 hover:bg-white/10 text-white rounded-full text-[10px] uppercase font-bold tracking-widest transition-all flex items-center justify-center">
                Our Mission
              </Link>
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
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-white flex items-center gap-4">
              Trending<span className="text-red-500">_</span>
            </h2>
            <Link to="/blog" className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-white flex items-center gap-1 group transition-colors">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingPosts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories / Topics Highlight */}
      <section className="py-24 bg-white/[0.02] border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-white mb-4">Deep<span className="text-red-500">_</span>Dives</h2>
            <p className="text-white/50 text-lg">Explore our highly curated categories covering the spectrum of modern compute.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Artificial Intelligence", desc: "Neural networks, LLMs, and synthetic logic.", icon: Command, color: "text-white", bg: "bg-red-600" },
              { title: "Cybersecurity", desc: "Zero-trust, encryption, and threat models.", icon: Shield, color: "text-white", bg: "bg-red-600" },
              { title: "Hardware Systems", desc: "Silicon yield, quantum logic, and supply chain.", icon: Zap, color: "text-white", bg: "bg-red-600" },
            ].map((topic, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#050505] p-8 border border-white/10 hover:border-white/30 transition-colors group cursor-pointer"
              >
                <div className={`w-12 h-12 flex items-center justify-center mb-6 ${topic.bg} ${topic.color}`}>
                  <topic.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-2">{topic.title}</h3>
                <p className="text-white/50 mb-6">{topic.desc}</p>
                <Link to="/blog" className="text-[10px] font-bold uppercase tracking-widest text-white group-hover:text-red-500 flex items-center gap-2 transition-colors">
                  Explore Topic <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Stories */}
      <section className="py-24 bg-[#050505] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-white flex items-center gap-4">
              Latest<span className="text-red-500">_</span>Intelligence
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 block">
            {latestPosts.map((post, i) => (
              <div key={post.id} className="col-span-1">
                 <PostCard post={post} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-900/20"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-red-600 p-12 relative overflow-hidden"
          >
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-white mb-6">Stay<span className="text-black">_</span>Ahead</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-bold tracking-tight">
              Join 50,000+ executives, engineers, and researchers receiving our exclusive weekly briefing.
            </p>
            <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-0" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Secure email address" 
                className="flex-1 bg-white/[0.15] border-none px-4 py-4 text-white focus:outline-none focus:bg-white/20 placeholder:text-white/50 text-sm font-bold uppercase tracking-widest"
                required
              />
              <button type="submit" className="px-8 py-4 bg-white text-red-600 font-bold uppercase tracking-widest text-[10px] hover:bg-black hover:text-white transition-all">
                Subscribe
              </button>
            </form>
            <p className="text-red-200 text-[10px] uppercase font-bold tracking-widest mt-6">No spam. Only high-signal intelligence.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
