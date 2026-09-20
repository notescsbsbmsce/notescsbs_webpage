import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ChevronLeft, Search, Compass, BookOpen, Bell, Shield, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

const SEMESTERS = [
  { id: 1, name: "Semester 1", desc: "Foundations & Physics" },
  { id: 2, name: "Semester 2", desc: "Calculus & C Programming" },
  { id: 3, name: "Semester 3", desc: "Data Structures & DE" },
  { id: 4, name: "Semester 4", desc: "Algorithms, OS & DBMS" },
  { id: 5, name: "Semester 5", desc: "Networks, SE & AI" },
  { id: 6, name: "Semester 6", desc: "Web Tech & Analytics" },
  { id: 7, name: "Semester 7", desc: "Cloud & Cyber Security" },
  { id: 8, name: "Semester 8", desc: "Electives & Major Project" },
];

const NotFound = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/10 selection:text-primary">
      <SEOHead
        title="404 - Page Lost in Orbit | NOTESCSBS"
        description="The requested CSBS academic resource or page could not be located. Explore our 8-semester curriculum repository."
        canonicalPath="/404"
        noindex={true}
      />

      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full mx-auto space-y-12 text-center animate-in fade-in zoom-in-95 duration-700">
          
          {/* Ambient Cosmic Visual & Badge */}
          <div className="relative flex flex-col items-center justify-center pt-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-primary/30 via-indigo-500/20 to-purple-500/10 blur-3xl pointer-events-none -z-10 animate-pulse"></div>

            <Badge
              variant="outline"
              className="mb-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] border-primary/30 bg-primary/10 text-primary shadow-sm"
            >
              <Compass className="h-3.5 w-3.5 mr-2 animate-spin-slow" />
              404 · Navigation Exception
            </Badge>

            {/* Giant 404 Heading */}
            <h1 className="text-7xl sm:text-9xl font-black tracking-tighter bg-gradient-to-b from-foreground via-foreground/80 to-foreground/30 bg-clip-text text-transparent font-serif select-none drop-shadow-sm">
              404
            </h1>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mt-2 text-foreground">
              Page Lost in Academic Orbit
            </h2>

            <p className="text-muted-foreground font-medium text-sm sm:text-base max-w-lg mx-auto mt-3 leading-relaxed">
              The curriculum material or path you are seeking doesn't exist, has moved semesters, or was pruned during institutional maintenance.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto h-14 rounded-2xl px-8 font-bold border-border bg-card hover:bg-muted text-foreground transition-all gap-2 shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
              Go Back
            </Button>

            <Link to="/" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-14 rounded-2xl px-8 font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all gap-2">
                <Home className="h-4 w-4" />
                Return to Homepage
              </Button>
            </Link>
          </div>

          {/* Recovery Search Input */}
          <div className="max-w-xl mx-auto w-full pt-4">
            <form onSubmit={handleSearch} className="relative flex items-center">
              <Search className="absolute left-5 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search subject, topic, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-16 pl-14 pr-32 rounded-3xl bg-card border-border text-foreground placeholder:text-muted-foreground font-medium text-sm sm:text-base shadow-lg focus:border-primary/50 transition-all"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-3 h-10 px-5 rounded-2xl bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider"
              >
                Search
              </Button>
            </form>
          </div>

          {/* Semester Quick Jump Grid */}
          <div className="pt-8 space-y-6">
            <div className="space-y-1">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Direct Navigation</h3>
              <p className="text-lg font-bold tracking-tight">Jump Directly to Your Semester</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              {SEMESTERS.map((sem) => (
                <Link
                  key={sem.id}
                  to={`/semester/${sem.id}`}
                  className="group p-4 rounded-2xl border border-border bg-card/60 hover:bg-card hover:border-primary/40 hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary group-hover:underline">
                      SEM 0{sem.id}
                    </span>
                    <p className="text-sm font-bold text-foreground leading-snug mt-1">{sem.name}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-[11px] text-muted-foreground group-hover:text-foreground">
                    <span className="truncate">{sem.desc}</span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 ml-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Institutional Links Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-muted-foreground">
            <Link to="/notices" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Bell className="h-3.5 w-3.5" /> Notice Board
            </Link>
            <span className="text-border">•</span>
            <Link to="/contributors" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Users className="h-3.5 w-3.5" /> Contributors
            </Link>
            <span className="text-border">•</span>
            <Link to="/privacy" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Shield className="h-3.5 w-3.5" /> Privacy & Policy
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
