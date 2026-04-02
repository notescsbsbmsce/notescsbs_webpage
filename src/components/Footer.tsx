import { Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Link as RouterLink } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-md py-6 mt-auto">
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-foreground text-lg uppercase tracking-tight">NOTES<span className="text-primary italic">CSBS</span></span>
          </div>
          <p className="text-xs text-muted-foreground text-center md:text-left max-w-xs leading-relaxed">
            © {new Date().getFullYear()} Editorial Intelligence. All rights reserved. 
            Built with 💙 for BMSCE CSBS students.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest">
          <RouterLink to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</RouterLink>
          <a href="mailto:notescsbsbmsce@gmail.com" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <Mail className="h-3 w-3" />
            Feedback & Support
          </a>
        </div>
      </div>
    </footer>
  );
}
