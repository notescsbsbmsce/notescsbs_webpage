import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Users, Mail, Home } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-lg shadow-black/5">
      <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3 transition-all hover:scale-105 active:scale-95 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all"></div>
            <img src="/notes-csbs-logo.png" alt="NOTESCSBS Logo" className="relative h-9 w-9 sm:h-10 sm:w-10 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-foreground text-lg sm:text-xl leading-tight tracking-tight uppercase">NOTES<span className="text-primary italic">CSBS</span></span>
            <span className="text-[10px] sm:text-[9px] font-bold text-muted-foreground leading-tight uppercase tracking-[0.2em]">BMSCE Resources</span>
          </div>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-2 p-1 bg-muted/40 rounded-2xl border border-border/50">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all ${
                location.pathname === "/" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>
            <Link
              to="/contributors"
              className={`flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all ${
                location.pathname === "/contributors" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              <span>Contributors</span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="gap-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground rounded-xl px-4 h-9"
            >
              <a href="mailto:notescsbsbmsce@gmail.com" target="_blank" rel="noopener noreferrer">
                <Mail className="h-3.5 w-3.5" />
                <span>Feedback</span>
              </a>
            </Button>
          </nav>
          
          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-border">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
