import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle";
import { Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

const links = [
  { name: "Home", href: "/" },
  { name: "Latest", href: "/blog" },
  { name: "Topics", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#050505] border-b border-white/10 tech-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2 group">
                <span className="text-2xl font-black tracking-tighter italic uppercase text-white">RED<span className="text-red-500">.</span>NEXUS</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-1">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 relative group",
                      location.pathname === link.href
                        ? "text-white"
                        : "text-white/50 hover:text-white"
                    )}
                  >
                    {location.pathname === link.href && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-white/10 z-[-1]"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right section */}
            <div className="hidden md:flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <ThemeToggle />
              <button className="bg-white text-black text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 hover:bg-red-500 hover:text-white transition-all">
                Subscribe
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-white p-2"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-40 bg-[#050505] pt-24 pb-6 px-4"
          >
            <div className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-4 text-[10px] font-bold tracking-widest uppercase border border-white/10",
                    location.pathname === link.href
                      ? "bg-red-600 text-white border-red-500"
                      : "text-white/50 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8 relative">
                 <input 
                   type="text" 
                   placeholder="SEARCH ARTICLES..." 
                   className="w-full bg-[#050505] border border-white/10 px-4 py-4 text-white pl-12 focus:outline-none focus:border-white/30 text-[10px] font-bold uppercase tracking-widest"
                 />
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
