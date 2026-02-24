import { Link, useLocation } from "react-router-dom";
import { Home, Users, Mail, Settings } from "lucide-react";

export function MobileNav() {
  const location = useLocation();

  const navItems = [
    { label: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { label: "Contributors", href: "/contributors", icon: <Users className="h-5 w-5" /> },
    { label: "Feedback", href: "mailto:notescsbsbmsce@gmail.com", icon: <Mail className="h-5 w-5" />, isExternal: true },
  ];

  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50 bg-background/80 backdrop-blur-xl border border-border/50 flex justify-around items-center h-16 rounded-2xl shadow-2xl shadow-primary/10 px-6 safe-area-inset-bottom animate-in slide-in-from-bottom-10 duration-500">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        
        if (item.isExternal) {
          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-all px-3 py-2 rounded-xl active:scale-90"
            >
              {item.icon}
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </a>
          );
        }

        return (
          <Link
            key={item.label}
            to={item.href}
            className={`flex flex-col items-center gap-1.5 transition-all px-3 py-2 rounded-xl active:scale-90 relative ${
              isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
            }`}
          >
            {isActive && (
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse" />
            )}
            {item.icon}
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
