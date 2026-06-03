import { motion } from "motion/react";
import { Mail, MapPin, MessagesSquare } from "lucide-react";
import { JsonLd } from "../components/seo/JsonLd";

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
      <JsonLd data={schema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-[80px] leading-[0.85] font-black uppercase tracking-tighter italic text-white mb-6"
          >
            Establish<br/><span className="text-red-500">_</span>Connection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/50 font-bold tracking-tight"
          >
            Have a tip, partnership proposal, or feedback? Securely route your message to our editorial terminal.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-white/[0.02] p-8 border border-white/10 flex flex-col items-start hover:border-white/30 transition-colors">
               <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-white mb-6">
                 <Mail className="w-6 h-6" />
               </div>
               <h3 className="text-white font-bold uppercase tracking-tight mb-2">Editorial Desk</h3>
               <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-4">For tips and press assets</p>
               <a href="mailto:editor@RED.NEXUS.io" className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-white transition-colors">editor@RED.NEXUS.io</a>
             </div>

             <div className="bg-white/[0.02] p-8 border border-white/10 flex flex-col items-start hover:border-white/30 transition-colors">
               <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-white mb-6">
                 <MessagesSquare className="w-6 h-6" />
               </div>
               <h3 className="text-white font-bold uppercase tracking-tight mb-2">Partnerships</h3>
               <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-4">Sponsorships & Syndication</p>
               <a href="mailto:biz@RED.NEXUS.io" className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-white transition-colors">biz@RED.NEXUS.io</a>
             </div>

             <div className="bg-white/[0.02] p-8 border border-white/10 flex flex-col items-start hover:border-white/30 transition-colors">
               <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-white mb-6">
                 <MapPin className="w-6 h-6" />
               </div>
               <h3 className="text-white font-bold uppercase tracking-tight mb-2">Headquarters</h3>
               <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 leading-loose">
                 100 Innovation Way<br/>
                 San Francisco, CA 94105
               </p>
             </div>
          </div>

          <div className="lg:col-span-2 bg-[#050505] p-8 md:p-12 border border-white/10">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic text-white mb-8">Secure<span className="text-red-500">_</span>Transmission</h2>
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Identifier</label>
                  <input type="text" className="w-full bg-[#050505] border border-white/10 px-4 py-4 text-white text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-white/30 transition-colors" placeholder="FULL NAME" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Return Vector</label>
                  <input type="email" className="w-full bg-[#050505] border border-white/10 px-4 py-4 text-white text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-white/30 transition-colors" placeholder="EMAIL ADDRESS" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Topic Classification</label>
                <select className="w-full bg-[#050505] border border-white/10 px-4 py-4 text-white text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-white/30 transition-colors appearance-none">
                  <option>EDITORIAL TIP</option>
                  <option>PARTNERSHIP INQUIRY</option>
                  <option>CORRECTION REQUEST</option>
                  <option>GENERAL FEEDBACK</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Encrypted Payload</label>
                <textarea rows={6} className="w-full bg-[#050505] border border-white/10 px-4 py-4 text-white text-[10px] font-bold tracking-widest focus:outline-none focus:border-white/30 transition-colors resize-none" placeholder="ENTER YOUR MESSAGE DETAILS HERE..."></textarea>
              </div>
              <button className="w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-colors">
                Transmit Message
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
