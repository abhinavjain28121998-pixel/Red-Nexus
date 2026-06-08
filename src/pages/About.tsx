import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Server, ShieldAlert, Cpu, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { JsonLd } from "../components/seo/JsonLd";
import { MetaTags } from "../components/seo/MetaTags";

export default function About() {
  const baseUrl = import.meta.env.VITE_APP_URL || "https://rednexus.com";
  
  const faqs = [
    {
      question: "What core topics does RED.NEXUS investigate?",
      answer: "We focus on three primary computational pillars: advanced neural architectures (LLMs, neural networks, translation models), cybersecurity frameworks (zero-trust infrastructure, container hardening, novel exploit vectors), and next-generation silicon-hardware limits (semiconductor fab challenges, chip layouts, quantum compute bounds)."
    },
    {
      question: "Are articles on RED.NEXUS generated using AI text formats?",
      answer: "No. RED.NEXUS strictly rejects automated or AI-generated copy. Every publication, insight, and research Brief on our platform is authored, peer-reviewed, and verified by human systems design specialists, cybersecurity investigators, and research engineers."
    },
    {
      question: "How is RED.NEXUS funded, and is there an editorial bias?",
      answer: "RED.NEXUS operates as an independent technical publisher. We maintain zero vendor sponsorship inside our editorial pipelines. All analyses are completely neutral, peer-reviewed, and strictly backed by hardware benchmarks, whitepaper audits, and public code repositories rather than corporate PR marketing briefs."
    },
    {
      question: "Can technical researchers submit anonymous articles or hardware security tips?",
      answer: "Yes, we encourage security researchers, systems engineering groups, and compute hardware experts to share peer-verified findings. Technical tips can be securely submitted via our secure terminal channels listed on our connection terminal page."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${baseUrl}/about#aboutpage`,
        "url": `${baseUrl}/about`,
        "name": "About RED.NEXUS — Premium Technical Compute Intelligence",
        "description": "RED.NEXUS is a premium technology publication dedicated to high-signal, deeply researched reporting on computation, AI architectures, and infrastructure pipelines."
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/about#faq`,
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="w-full bg-[#050505] pb-24">
      <MetaTags 
        title="Our Mission & Tech Intelligence Framework"
        description="Learn more about RED.NEXUS. We cut through the daily tech product hype to investigate advanced microarchitectures, AI neural models, cryptography, and semiconductor fabrications."
        keywords="computation mission, independent publishing, research methodology, hardware systems auditing, technology analytics expert"
      />
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

        {/* Dynamic AEO FAQ Accordion Panel */}
        <div className="py-24 border-t border-white/10 mt-12 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              AEO <span className="text-red-500">Insights</span> & Methodology
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              Direct, peer-reviewed operational answers to understand how we produce independent computation briefings.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="border border-white/5 bg-[#0a0a0a]/40 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-[#0a0a0a] transition-all"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base md:text-lg font-bold text-white pr-4">
                      {faq.question}
                    </span>
                    <span className="text-red-500 shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-white/5">
                          <p className="text-gray-400 text-sm leading-relaxed font-medium">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
