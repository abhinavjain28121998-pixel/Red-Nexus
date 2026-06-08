import { Link } from "react-router-dom";
import { categories } from "../../data/mock";

export function Footer() {
  return (
    <footer className="bg-[#050505] text-white pt-16 pb-8 border-t border-white/10 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-6">
              <span className="text-2xl font-black tracking-tighter italic uppercase text-white">RED<span className="text-red-500">.</span>NEXUS</span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed text-sm">
              Actionable Intelligence on Advanced Compute. Deciphering the future of technology, one insight at a time. The premium publication for developers, innovators, and early adopters.
            </p>
            <div className="flex gap-4">
              {/* Social icons placeholder */}
              {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all">
                  <span className="text-[10px] font-bold">{social.substring(0,2).toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-[10px] uppercase font-black tracking-widest mb-4">Categories</h3>
            <ul className="space-y-3">
              {categories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link to={`/blog?category=${category.slug}`} className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors uppercase">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-[10px] uppercase font-black tracking-widest mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors uppercase">About Us</Link></li>
              <li><Link to="/contact" className="text-sm font-medium text-gray-400 hover:text-white transition-colors uppercase">Contact</Link></li>
              <li><a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors uppercase">Privacy Policy</a></li>
              <li><a href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors uppercase">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">
            © {new Date().getFullYear()} RED.NEXUS Media. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10px] uppercase font-bold tracking-widest text-gray-500">
            <span>Built with React</span>
            <span>Design: High-Tech Premium</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
