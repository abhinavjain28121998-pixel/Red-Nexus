import { motion } from "motion/react";
import { Mail, MapPin, MessagesSquare } from "lucide-react";
import { JsonLd } from "../components/seo/JsonLd";
import { MetaTags } from "../components/seo/MetaTags";

export default function Contact() {
  const baseUrl = import.meta.env.VITE_APP_URL || "https://rednexus.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact RED.NEXUS",
    "description": "Have a tip, partnership proposal, or feedback? Securely route your message to our editorial terminal.",
    "url": `${baseUrl}/contact`
  };

  return (
    <div className="w-full bg-[#050505] pb-24 pt-24 min-h-screen">
      <MetaTags 
        title="Establish Contact Matrix"
        description="Connect securely with RED.NEXUS. Submit editorial tips, feedback, partnership proposals, or corrections directly to our newsdesk terminal."
        keywords="security tipped articles, independent news submission, engineering feedback, pitch editorial"
      />
      <JsonLd data={schema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl leading-tight font-black uppercase tracking-tight text-white mb-6"
          >
            Establish <br className="hidden md:block"/><span className="text-red-500">Connection</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 font-medium tracking-tight"
          >
            Have a tip, partnership proposal, or feedback? Securely route your message to our editorial team.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-[#0a0a0a] p-8 border border-white/10 flex flex-col items-start hover:border-white/30 transition-colors rounded-xl">
               <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-white mb-6 rounded-lg">
                 <Mail className="w-6 h-6 text-red-500" />
               </div>
               <h3 className="text-white font-bold uppercase tracking-tight mb-2">Editorial Desk</h3>
               <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">For tips and press assets</p>
               <a href="mailto:editor@RED.NEXUS.io" className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-white transition-colors">editor@RED.NEXUS.io</a>
             </div>

             <div className="bg-[#0a0a0a] p-8 border border-white/10 flex flex-col items-start hover:border-white/30 transition-colors rounded-xl">
               <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-white mb-6 rounded-lg">
                 <MessagesSquare className="w-6 h-6 text-red-500" />
               </div>
               <h3 className="text-white font-bold uppercase tracking-tight mb-2">Partnerships</h3>
               <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Sponsorships & Syndication</p>
               <a href="mailto:biz@RED.NEXUS.io" className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-white transition-colors">biz@RED.NEXUS.io</a>
             </div>

             <div className="bg-[#0a0a0a] p-8 border border-white/10 flex flex-col items-start hover:border-white/30 transition-colors rounded-xl">
               <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-white mb-6 rounded-lg">
                 <MapPin className="w-6 h-6 text-red-500" />
               </div>
               <h3 className="text-white font-bold uppercase tracking-tight mb-2">Headquarters</h3>
               <p className="text-xs font-bold uppercase tracking-widest text-gray-500 leading-relaxed">
                 100 Innovation Way<br/>
                 San Francisco, CA 94105
               </p>
             </div>
          </div>

          <div className="lg:col-span-2 bg-[#0a0a0a] p-8 md:p-12 border border-white/10 rounded-xl">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-8">Secure <span className="text-red-500">Transmission</span></h2>
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Name</label>
                  <input type="text" className="w-full bg-[#050505] border border-white/10 px-4 py-4 rounded-md text-white text-sm font-medium focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-colors placeholder:text-gray-600" placeholder="Full Name" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                  <input type="email" className="w-full bg-[#050505] border border-white/10 px-4 py-4 rounded-md text-white text-sm font-medium focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-colors placeholder:text-gray-600" placeholder="Email Vector" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Topic Classification</label>
                <select className="w-full bg-[#050505] border border-white/10 rounded-md px-4 py-4 text-white text-sm font-medium focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-colors appearance-none">
                  <option>Editorial Tip</option>
                  <option>Partnership Inquiry</option>
                  <option>Correction Request</option>
                  <option>General Feedback</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Message</label>
                <textarea rows={6} className="w-full bg-[#050505] border border-white/10 rounded-md px-4 py-4 text-white text-sm font-medium focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-colors resize-none placeholder:text-gray-600" placeholder="Enter your message details here..."></textarea>
              </div>
              <button className="w-full py-4 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-md hover:bg-red-600 hover:text-white transition-all shadow-lg">
                Transmit Message
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
