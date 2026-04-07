import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import { SEOHead, buildBreadcrumbJsonLd } from "@/components/SEOHead";
import { useQuery } from "@tanstack/react-query";
import { fetchSemesterById, fetchSubjectsBySemester } from "@/lib/admin-utils";
import { Header } from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  BookMarked, 
  FlaskConical, 
  ArrowRight, 
  Download, 
  Calendar,
  Layers,
  Database,
  Cpu,
  Globe,
  Leaf,
  ShieldCheck,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

// Helper to get icons for subjects based on name/code
const getSubjectIcon = (name: string, isLab: boolean) => {
  const n = name.toLowerCase();
  if (isLab) return <FlaskConical className="h-5 w-5" />;
  if (n.includes("math")) return <Layers className="h-5 w-5" />;
  if (n.includes("database") || n.includes("dbms")) return <Database className="h-5 w-5" />;
  if (n.includes("operating") || n.includes("system")) return <Cpu className="h-5 w-5" />;
  if (n.includes("network")) return <Globe className="h-5 w-5" />;
  if (n.includes("environment")) return <Leaf className="h-5 w-5" />;
  if (n.includes("constitution") || n.includes("india")) return <ShieldCheck className="h-5 w-5" />;
  return <BookMarked className="h-5 w-5" />;
};

const Semester = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const semesterId = parseInt(id || "0");

  const { data: semester, isLoading: semesterLoading } = useQuery({
    queryKey: ["semester", semesterId],
    queryFn: async () => {
      return await fetchSemesterById(semesterId);
    },
    staleTime: 5 * 60 * 1000,
  });

  const { data: subjects, isLoading: subjectsLoading } = useQuery({
    queryKey: ["subjects", semesterId],
    queryFn: async () => {
      if (!semester) return [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return await fetchSubjectsBySemester(semesterId, (semester as any).order);
    },
    enabled: !!semester,
    staleTime: 5 * 60 * 1000,
  });

  const isLoading = semesterLoading || subjectsLoading;
  const theorySubjects = subjects?.filter(s => !s.is_lab) || [];
  const labSubjects = subjects?.filter(s => s.is_lab) || [];

  // Extract semester number for display
  const semNumber = semester?.name.match(/\d+/)?.[0] || "";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary transition-colors duration-300">
      <SEOHead
        title={`Semester ${semNumber} — CSBS Notes, PYQs & Study Material | BMSCE NOTESCSBS`}
        description={`Access all Semester ${semNumber} CSBS subjects at BMSCE — lecture notes, CIE question papers, SEE papers, and textbooks. ${theorySubjects.map(s => s.name).join(', ')}.`}
        canonicalPath={`/semester/${id}`}
        jsonLd={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: `Semester ${semNumber}`, path: `/semester/${id}` }
        ])}
      />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-7xl">
        {/* Breadcrumb & Back Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-xl h-10 px-4 group bg-muted/20 border-border hover:bg-primary/10 transition-all font-bold gap-2"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>

          <nav className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
            <RouterLink to="/" className="hover:text-primary transition-colors">Home</RouterLink>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-black">{semester?.name || `Semester ${semNumber}`}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <header className="mb-12 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-9xl font-black mb-6 sm:mb-8 tracking-tighter text-foreground leading-[0.85]">
            Semester <span className="italic font-serif text-primary">{semNumber}</span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl font-serif italic opacity-80 leading-relaxed font-medium">
            Academic Excellence. Curated BMSCE resources, verified by the council.
          </p>
        </header>

        {isLoading ? (
          <div className="space-y-12">
            <Skeleton className="h-8 w-48 bg-white/5" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-48 rounded-3xl bg-white/5" />)}
            </div>
          </div>
        ) : (
          <div className="space-y-24">
            {/* Theory Subjects */}
            <section>
              <div className="flex items-center justify-between mb-10 border-b border-primary/20 pb-4">
                <h2 className="text-2xl md:text-3xl font-black text-foreground">Theory Subjects</h2>
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{theorySubjects.length} Resources Available</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {theorySubjects.map((subject) => (
                  <RouterLink 
                    key={subject.id} 
                    to={`/subject/${subject.id}`}
                    className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-card border border-border hover:border-primary/40 hover:shadow-2xl transition-all flex flex-col justify-between overflow-hidden"
                  >
                    {/* Hover Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">{subject.code}</span>
                        <div className="text-muted-foreground group-hover:text-primary transition-colors">
                          {getSubjectIcon(subject.name, false)}
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold leading-tight mb-8 group-hover:text-primary transition-colors text-foreground">
                        {subject.name}
                      </h3>
                    </div>
                    
                    <div className="relative z-10 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-muted text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Core Theory</span>
                      <span className="px-3 py-1 rounded-full bg-muted text-[9px] font-black text-muted-foreground uppercase tracking-widest font-sans">Unit I-V</span>
                    </div>
                  </RouterLink>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-10 border-b border-pink-500/20 pb-4">
                <h2 className="text-2xl md:text-3xl font-black italic font-serif text-pink-accent">Practical Laboratories</h2>
                <span className="text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase">{labSubjects.length} Practical Units</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {labSubjects.map((subject) => (
                  <RouterLink 
                    key={subject.id} 
                    to={`/subject/${subject.id}`}
                    className="group flex items-center gap-4 sm:gap-6 p-5 sm:p-8 rounded-2xl sm:rounded-[40px] bg-card border-l-4 border-l-pink-accent border border-border hover:bg-muted/30 hover:shadow-2xl transition-all"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-pink-accent/10 flex items-center justify-center text-pink-accent group-hover:scale-110 transition-transform shadow-xl shadow-pink-accent/5 shrink-0">
                      {getSubjectIcon(subject.name, true)}
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-pink-accent/70 tracking-[0.2em] uppercase">{subject.code}</span>
                      <h3 className="text-xl md:text-2xl font-black group-hover:text-primary transition-colors text-foreground font-serif leading-tight mt-1">
                        {subject.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2 font-medium opacity-60">Verified lab manual & experimental procedures.</p>
                    </div>
                  </RouterLink>
                ))}
              </div>
            </section>

            {/* Bottom Promo Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 pb-12">
              <div className="lg:col-span-2 rounded-2xl sm:rounded-[40px] p-6 sm:p-10 bg-gradient-to-br from-indigo-500/10 via-card to-primary/5 border border-border hover:shadow-2xl transition-all relative overflow-hidden group">
                <div className="relative z-10">
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-4 sm:mb-6 text-foreground">Exam Ready?</h2>
                  <p className="text-sm sm:text-lg text-muted-foreground max-w-lg mb-6 sm:mb-10">
                    Access our curated collection of previous year question papers and model answer sheets for all Semester {semNumber} subjects.
                  </p>
                  <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-black gap-2 sm:gap-3 group shadow-lg shadow-primary/20 text-sm sm:text-base">
                    Download Question Bank
                    <Download className="h-5 w-5" />
                  </Button>
                </div>
                <div className="absolute bottom-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <BookMarked className="w-48 h-48" />
                </div>
              </div>
              
              <div className="rounded-2xl sm:rounded-[40px] p-6 sm:p-10 bg-card border border-border flex flex-col items-center justify-center text-center group hover:shadow-2xl transition-all">
                <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-black mb-4 text-foreground">Schedule</h3>
                <p className="text-muted-foreground mb-10">
                  Internal assessments and laboratory exams start in 14 days.
                </p>
                <Button variant="link" className="text-primary font-black uppercase tracking-widest gap-2 hover:no-underline hover:text-primary/80 transition-all">
                  View Calendar
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </section>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Semester;
