import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Linkedin, Users, ChevronLeft, Github, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SEOHead, buildBreadcrumbJsonLd } from "@/components/SEOHead";

interface Contributor {
  name: string;
  role: string;
  linkedIn: string;
  github?: string;
  batch: string;
  bio: string;
}

const contributors: Contributor[] = [
  {
    name: "Tushar Jain",
    role: "Lead Architect",
    linkedIn: "https://www.linkedin.com/in/tushar-jain-781149322/",
    github: "https://github.com/Tusharjain-19",
    batch: "2028",
    bio: ""
  },
  {
    name: "Ayush Kumar",
    role: "Core Developer",
    linkedIn: "https://www.linkedin.com/in/ayush-kumar-b903b7285/",
    batch: "2028",
    bio: ""
  }
];

const ContributorCard = ({ contributor, index }: { contributor: Contributor; index: number }) => (
  <div 
    className={`group relative p-6 sm:p-12 md:p-16 rounded-[32px] md:rounded-[60px] bg-card border border-border hover:border-primary/30 transition-all duration-700 hover:shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-10 delay-${index * 200}`}
  >
    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:bg-primary/10 transition-colors duration-700"></div>
    
    <div className="flex-1 relative z-10 text-center md:text-left">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tighter uppercase font-serif italic leading-none group-hover:text-primary transition-colors duration-500">
          {contributor.name}
        </h3>
        <span className="hidden md:block w-2 h-2 rounded-full bg-primary/30"></span>
        <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary shadow-sm inline-block w-fit mx-auto md:mx-0">
          Batch of {contributor.batch}
        </span>
      </div>
      
      {contributor.bio && (
        <p className="text-[15px] text-muted-foreground font-medium leading-relaxed mb-8 max-w-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500">
          {contributor.bio}
        </p>
      )}
      {!contributor.bio && <div className="mb-4"></div>}

      <div className="flex items-center justify-center md:justify-start gap-4">
        <a
          href={contributor.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-primary/10 text-primary text-[11px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95 group/link"
        >
          <Linkedin className="h-4 w-4 group-hover/link:rotate-12 transition-transform" />
          LinkedIn
        </a>
        {contributor.github && (
          <a 
            href={contributor.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon" className="rounded-full w-11 h-11 border border-border hover:bg-muted/50 transition-all opacity-40 hover:opacity-100">
                <Github className="h-4 w-4" />
            </Button>
          </a>
        )}
      </div>
    </div>
  </div>
);

export default function Contributors() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      <SEOHead
        title="Contributors — Meet the Makers of NOTESCSBS | BMSCE CSBS"
        description="Meet the student developers behind NOTESCSBS — the definitive CSBS academic repository at BMS College of Engineering, Bengaluru. Built by Tushar Jain and Ayush Kumar."
        canonicalPath="/contributors"
        jsonLd={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contributors", path: "/contributors" }
        ])}
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-6xl animate-fade-in">
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-xl h-10 px-4 group bg-muted/20 border-border hover:bg-primary/10 transition-all font-bold gap-2"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Return
          </Button>

          <nav className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
            <span>Institutional</span>
            <span className="opacity-30">|</span>
            <span>Governance</span>
            <span className="opacity-30">|</span>
            <span className="text-foreground font-black">Meet the Makers</span>
          </nav>
        </div>

        {/* Hero Section */}
        <header className="relative p-6 sm:p-12 md:p-20 rounded-[32px] md:rounded-[60px] bg-card border border-border overflow-hidden shadow-2xl mb-12 sm:mb-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-xl shadow-primary/5">
                <Users className="h-7 w-7" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary/60 italic font-serif">Curated Intelligence</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-8xl font-black mb-6 sm:mb-8 tracking-tighter uppercase font-serif text-foreground leading-[0.9]">
              Meet the <span className="italic italic-none block">Makers of NOTESCSBS</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed font-medium opacity-80">
              This digital repository was meticulously engineered by students, for students. It represents our collective dedication to academic excellence through technical precision and scholarly archival.
            </p>
          </div>
        </header>

        {/* Contributors List */}
        <div className="space-y-10 mb-24">
          <div className="grid grid-cols-1 gap-10">
            {contributors.map((contributor, index) => (
              <ContributorCard key={contributor.name} contributor={contributor} index={index} />
            ))}
          </div>
        </div>

        {/* Closing Statment */}
        <div className="relative p-8 sm:p-12 rounded-[32px] md:rounded-[50px] border border-dashed border-border flex flex-col items-center justify-center text-center space-y-6 bg-muted/10 overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
             <Globe className="h-10 w-10 text-primary/30 animate-pulse" />
             <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground/70 uppercase font-serif italic">The Open Registry Initiative</h2>
             <p className="text-muted-foreground text-sm max-w-xl font-medium opacity-60 leading-relaxed">
                Notes CSBS is a student-founded academic registry. Our mission is to leverage state-of-the-art technology to curate and democratize high-fidelity educational assets across the BMSCE community.
             </p>
             <div className="pt-8">
                <Button variant="outline" className="rounded-2xl h-12 px-8 font-black uppercase tracking-widest text-[10px] bg-card border-border hover:scale-105 active:scale-95 transition-all">
                    Inquire for Contribution
                </Button>
             </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
