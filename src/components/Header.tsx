import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Users, Mail, Home, Bell } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home, isExternal: false },
  { label: "Contributors", href: "/contributors", icon: Users, isExternal: false },
  { label: "Notice Board", href: "/notices", icon: Bell, isExternal: false },
  { label: "Feedback", href: "mailto:notescsbsbmsce@gmail.com", icon: Mail, isExternal: true },
];

export function Header() {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  // Drag-to-scroll logic
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (navRef.current?.offsetLeft || 0);
    scrollLeft.current = navRef.current?.scrollLeft || 0;
    if (navRef.current) navRef.current.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (navRef.current) navRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !navRef.current) return;
    e.preventDefault();
    const x = e.pageX - (navRef.current.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;
    navRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-lg shadow-black/5">
      <div className="container mx-auto flex h-16 sm:h-20 items-center justify-between px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3 transition-all hover:scale-105 active:scale-95 group shrink-0">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all"></div>
            <img src="/newlogo.png" alt="NOTESCSBS Logo" title="Notes CSBS - BMSCE CSBS Academic Repository" className="relative h-9 w-9 sm:h-10 sm:w-10 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-foreground text-lg sm:text-xl leading-tight tracking-tight uppercase">NOTES<span className="text-primary italic">CSBS</span></span>
            <span className="text-[10px] sm:text-[9px] font-bold text-muted-foreground leading-tight uppercase tracking-[0.2em]">BMSCE Resources</span>
          </div>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6 overflow-hidden">
          {/* Sliding nav bar — scrollable + draggable + clickable */}
          <nav
            ref={navRef}
            className="flex items-center gap-1.5 sm:gap-2 p-1 bg-muted/40 rounded-2xl border border-border/50 overflow-x-auto scrollbar-hide cursor-grab select-none max-w-[45vw] sm:max-w-none"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              if (item.isExternal) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap text-muted-foreground hover:text-foreground hover:bg-background/50 shrink-0"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span>{item.label}</span>
                  </a>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? "bg-background shadow-sm text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0 pl-2 sm:pl-4 border-l border-border">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
