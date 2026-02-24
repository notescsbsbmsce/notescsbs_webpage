import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Users, Mail, Home } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-lg shadow-black/5">
      <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-4 transition-all hover:scale-105 active:scale-95 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all"></div>
            <img src="/notes-csbs-logo.png" alt="Notes CSBS Logo" className="relative h-10 w-10 sm:h-12 sm:w-12 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-foreground text-lg sm:text-xl leading-tight tracking-tight">Notes <span className="text-primary">CSBS</span></span>
            <span className="text-[10px] sm:text-xs font-bold text-muted-foreground leading-tight uppercase tracking-widest">BMSCE Resources</span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1 bg-muted/50 p-1 rounded-2xl border border-border/50">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                location.pathname === "/" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/contributors"
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                location.pathname === "/contributors" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Contributors</span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="gap-2 text-muted-foreground hover:text-foreground font-semibold rounded-xl px-4"
            >
              <a href="mailto:notescsbsbmsce@gmail.com" target="_blank" rel="noopener noreferrer">
                <Mail className="h-4 w-4" />
                <span>Feedback</span>
              </a>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
