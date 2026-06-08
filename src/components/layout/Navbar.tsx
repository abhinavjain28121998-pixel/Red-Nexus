import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { useTheme } from "../ThemeContext";
import { useSearch } from "../SearchContext";

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
  const { theme, toggleTheme } = useTheme();
  const { openSearch } = useSearch();

  return (
    <>
      <nav className="w-full tech-nav" id="main-navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2 group">
                <span className="text-2xl font-black tracking-tighter italic uppercase text-theme-text">
                  RED<span className="text-red-500">.</span>NEXUS
                </span>
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
                        ? "text-theme-text"
                        : "text-theme-text-dim hover:text-theme-text"
                    )}
                  >
                    {location.pathname === link.href && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-theme-text/10 z-[-1]"
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
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={openSearch}
                className="p-2 text-theme-text-dim hover:text-theme-text transition-colors" 
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 text-theme-text-dim hover:text-theme-text hover:bg-theme-text/5 rounded-full transition-all duration-300 flex items-center justify-center"
                aria-label="Toggle visual theme"
                id="theme-toggle-btn"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-500 hover:scale-115 transition-transform" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600 hover:scale-115 transition-transform" />
                )}
              </button>

              <button className="hidden sm:block bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-6 py-2.5 hover:bg-theme-text hover:text-theme-bg transition-all duration-300 rounded-md">
                Join Newsletter
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-theme-text-dim hover:text-theme-text p-2"
                aria-label="Toggle menu"
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
            className="md:hidden fixed inset-0 z-40 bg-theme-bg pt-24 pb-6 px-4 overscroll-y-none transition-colors duration-300"
          >
            <div className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-4 text-xs font-bold tracking-widest uppercase border border-theme-border rounded-md",
                    location.pathname === link.href
                      ? "bg-red-600 text-white border-red-500"
                      : "text-theme-text-dim hover:bg-theme-text/5 hover:text-theme-text"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div 
                onClick={() => {
                  setIsOpen(false);
                  openSearch();
                }}
                className="mt-8 relative cursor-pointer"
              >
                <div className="w-full bg-theme-card border border-theme-border px-4 py-4 rounded-md text-theme-text-dim/50 pl-12 text-sm font-medium select-none">
                  Search articles...
                </div>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-theme-text-dim/50" />
              </div>
              <button className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-6 py-4 mt-4 hover:bg-theme-text hover:text-theme-bg transition-colors duration-300 rounded-md w-full">
                Join Newsletter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

