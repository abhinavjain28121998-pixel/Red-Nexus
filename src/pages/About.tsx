import { motion } from "motion/react";
import { Server, ShieldAlert, Cpu } from "lucide-react";
import { JsonLd } from "../components/seo/JsonLd";

export default function About() {
  const baseUrl = import.meta.env.VITE_APP_URL || "https://rednexus.com";
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About RED.NEXUS",
    "description": "RED.NEXUS is a premium technology publication dedicated to high-signal, deeply researched reporting on the frontiers of computation.",
    "url": `${baseUrl}/about`
  };

  return (
    <div className="w-full bg-[#050505] pb-24">
      <JsonLd data={schema} />
      {/* Hero */}
      <div className="relative py-24 overflow-hidden isolate">
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050505] to-[#050505]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl leading-tight font-black uppercase tracking-tight text-white mb-6"
          >
            Decoding <span className="hidden md:inline"><br/></span>the <span className="text-red-500">Unknown</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 font-medium tracking-tight max-w-2xl mx-auto leading-relaxed"
          >
            RED.NEXUS is a premium technology publication dedicated to high-signal, deeply researched reporting on the frontiers of computation.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-16">
          <div className="order-2 md:order-1 relative rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 blur opacity-30"></div>
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&h=1000" 
              alt="Data Infrastructure" 
              className="relative w-full opacity-80 mix-blend-screen object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">Our <span className="text-red-500">Mission</span></h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed font-medium">
              We cut through the noise of daily product hype to focus on the underlying architectural shifts in technology. Our editors are engineers, security researchers, and data scientists who understand the mechanics of the systems they cover.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed font-medium">
              We believe that to understand the future, you must understand the infrastructure. From silicon fab yields and neural network topologies to zero-trust cryptography frameworks—we provide the intelligence professionals need.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="py-24 border-t border-white/10 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "Deep Technical Rigor", icon: Cpu, desc: "Reporting built on whitepapers, patents, and hardware architectures, not press releases." },
             { title: "Unbiased Analysis", icon: ShieldAlert, desc: "Independent editorial stance with transparent methodology and vendor-neutral assessments." },
             { title: "Global Infrastructure", icon: Server, desc: "A macroeconomic view of how technology shapes logistics, supply chains, and society." },
           ].map((pillar, i) => (
             <div key={i} className="bg-[#0a0a0a] p-10 border border-white/10 hover:border-white/30 transition-colors rounded-xl mx-auto md:mx-0 w-full max-w-sm md:max-w-none text-center md:text-left">
               <div className="w-14 h-14 bg-red-600/10 flex items-center justify-center mb-8 rounded-lg mx-auto md:mx-0 text-red-500">
                 <pillar.icon className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold tracking-tight text-white mb-4">{pillar.title}</h3>
               <p className="text-gray-400 text-sm font-medium leading-relaxed">{pillar.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
