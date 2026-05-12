import { Mail, Heart } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background/50 backdrop-blur-xl mt-auto relative overflow-hidden">
      {/* Decorative top border gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
        
        {/* Brand & Description */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <RouterLink to="/" className="flex items-center gap-2 group cursor-pointer">
            <span className="font-extrabold text-foreground text-xl sm:text-2xl uppercase tracking-tight group-hover:opacity-80 transition-opacity">
              NOTES<span className="text-primary italic">CSBS</span>
            </span>
          </RouterLink>
          <p className="text-sm text-muted-foreground text-center md:text-left max-w-sm leading-relaxed">
            Your centralized hub for academic resources, study materials, and past papers. Built to make learning easier.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500/20" /> for BMSCE CSBS students
          </p>
          <p className="text-xs text-muted-foreground/50 mt-4 font-medium tracking-wider uppercase">
            © {new Date().getFullYear()} Notes CSBS. All rights reserved.
          </p>
        </div>
        
        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-end gap-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Quick Links</h3>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground">
            <RouterLink to="/contributors" className="hover:text-primary hover:-translate-y-0.5 transition-all duration-300">
              Our Team
            </RouterLink>
            <RouterLink to="/keywords" className="hover:text-primary hover:-translate-y-0.5 transition-all duration-300">
              Browse Topics
            </RouterLink>
            <RouterLink to="/privacy" className="hover:text-primary hover:-translate-y-0.5 transition-all duration-300">
              Privacy Policy
            </RouterLink>
          </div>
          
          {/* Contact Button */}
          <div className="mt-2">
            <a href="mailto:notescsbsbmsce@gmail.com" className="inline-flex items-center gap-2 bg-primary/10 px-5 py-2.5 rounded-full border border-primary/20 hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(var(--primary),0.2)] transition-all duration-300 text-sm font-bold text-primary group">
              <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
              Contact Us
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
