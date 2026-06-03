import { Link } from "react-router-dom";
import { categories } from "../../data/mock";

export function Footer() {
  return (
    <footer className="bg-white text-black pt-16 pb-8 mt-24 border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-6">
              <span className="text-2xl font-black tracking-tighter italic uppercase text-black">RED<span className="text-red-500">.</span>NEXUS</span>
            </Link>
            <p className="text-black/60 max-w-sm mb-6 leading-relaxed font-bold text-sm">
              Deciphering the future of technology, one insight at a time. The premium publication for developers, innovators, and early adopters.
            </p>
            <div className="flex gap-4">
              {/* Social icons placeholder */}
              {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-black/40 hover:bg-black hover:text-white transition-all">
                  <span className="text-[10px] font-bold">{social.substring(0,2).toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-black text-[9px] uppercase font-black tracking-widest mb-4">Categories</h3>
            <ul className="space-y-3">
              {categories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link to={`/blog?category=${category.slug}`} className="text-xs font-bold text-black/60 hover:text-red-500 transition-colors uppercase">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-black text-[9px] uppercase font-black tracking-widest mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-xs font-bold text-black/60 hover:text-black transition-colors uppercase">About Us</Link></li>
              <li><Link to="/contact" className="text-xs font-bold text-black/60 hover:text-black transition-colors uppercase">Contact</Link></li>
              <li><a href="#" className="text-xs font-bold text-black/60 hover:text-black transition-colors uppercase">Privacy Policy</a></li>
              <li><a href="#" className="text-xs font-bold text-black/60 hover:text-black transition-colors uppercase">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-black/40 text-[9px] uppercase font-black tracking-widest">
            © {new Date().getFullYear()} RED.NEXUS Media. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex gap-6 text-[9px] uppercase font-black tracking-widest text-black/40">
            <span>Built with React</span>
            <span>Design: High-Tech Premium</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
