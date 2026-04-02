import { useState, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  Download, 
  ChevronRight, 
  ChevronLeft,
  Users, 
  X,
  ExternalLink,
  FileBox,
  File as FileIcon,
  FileText,
  Code,
  BookOpen,
  Layers,
  Eye,
  Presentation
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { optimizeDriveUrl, fetchSubjectById } from "@/lib/admin-utils";

// Types for Supabase response compatibility
interface Resource {
  id: string;
  title: string;
  file_url: string;
  type: 'notes' | 'cie1' | 'cie2' | 'cie3' | 'see' | 'book';
  unit?: string;
  year: string;
  description?: string;
}

interface SubjectData {
  id: number;
  name: string;
  code: string;
  semester_id: number;
  resources: Resource[];
}

const getFileExtension = (url: string) => {
  if (url.includes('drive.google.com')) return 'DRIVE';
  const parts = url.split('.');
  if (parts.length <= 1) return 'FILE';
  const ext = parts.pop()?.toUpperCase() || 'FILE';
  return ext.length > 5 ? 'FILE' : ext;
};

export default function Subject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const subjectId = parseInt(id || "0");
  const [activeSection, setActiveSection] = useState<"pyq" | "notes" | "books">("notes");
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<string>("all");
  const [previewFile, setPreviewFile] = useState<{ url: string; title: string; unit?: string } | null>(null);

  const { data: subject, isLoading } = useQuery({
    queryKey: ["subject", subjectId],
    queryFn: async () => {
      const data = await fetchSubjectById(subjectId) as unknown as SubjectData;
      return data;
    },
    enabled: !!subjectId,
  });

  const resources: Resource[] = subject?.resources || [];
  const noteResources = resources.filter(r => r.type === 'notes').sort((a, b) => (a.unit || '').localeCompare(b.unit || ''));
  const pyqResources = resources.filter(r => ['cie1', 'cie2', 'cie3', 'see'].includes(r.type));
  const textbookResources = resources.filter(r => r.type === 'book');

  // Grouping PYQs by exam cycle (Year + Session)
  const groupPYQs = () => {
    const groups: Record<string, Resource[]> = {};
    pyqResources.forEach(res => {
      const year = res.year || 'Unknown';
      const key = `${res.type}_${year}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(res);
    });
    return groups;
  };

  // Grouping Books by Title
  const groupBooks = () => {
    const groups: Record<string, Resource[]> = {};
    textbookResources.forEach(res => {
      const baseTitle = res.title.split(' - ')[0].split(' (Part')[0].trim();
      if (!groups[baseTitle]) groups[baseTitle] = [];
      groups[baseTitle].push(res);
    });
    return Object.entries(groups);
  };

  // Grouping Notes by Unit
  const groupNotes = () => {
    const groups: Record<string, Resource[]> = {
      'Unit 1': [],
      'Unit 2': [],
      'Unit 3': [],
      'Unit 4': [],
      'Unit 5': []
    };
    noteResources.forEach(res => {
      const unit = res.unit || 'General';
      if (!groups[unit]) groups[unit] = [];
      groups[unit].push(res);
    });
    // Remove empty 'General' if no content, but keep Units 1-5
    const result = Object.entries(groups);
    if (groups['General'] && groups['General'].length === 0) {
      return result.filter(([u]) => u !== 'General').sort((a, b) => a[0].localeCompare(b[0]));
    }
    return result.sort((a, b) => a[0].localeCompare(b[0]));
  };

  const formatTitle = (title: string) => {
    // Only strip the technical subject prefix if it exists, but keep the user's chosen name
    return title.replace(`Subject_${subjectId}_`, '').replace(/\.pdf$/i, '').replace(/\.pptx?$/i, '');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      <Header />
      
      <main className="flex-1 container mx-auto px-6 py-12 max-w-7xl animate-fade-in">
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-xl h-10 px-4 group bg-muted/20 border-border hover:bg-primary/10 transition-all font-bold gap-2"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </Button>

          <nav className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
            <span>Curriculum</span>
            <ChevronRight className="h-3 w-3" />
            <span>BMSCE</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-black">Academic Focus</span>
          </nav>
        </div>

        {isLoading ? (
          <div className="space-y-12">
            <Skeleton className="h-32 w-full rounded-[40px] bg-white/5" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 rounded-2xl bg-white/5" />)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-64 rounded-[40px] bg-white/5" />)}
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Subject Hero */}
            <header className="relative p-12 rounded-[50px] bg-card border border-border overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-accent/5 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="relative z-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-[11px] font-black uppercase tracking-widest text-primary mb-6 shadow-sm border border-primary/20">
                  {subject?.code || 'CSBS-CORE'}
                </span>
                <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter italic font-serif text-foreground leading-[0.9]">
                  {subject?.name}
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed font-medium">
                  Centralized access to all academic modules, verified question papers, and textbook references for {subject?.name}.
                </p>
              </div>
            </header>

            {/* Filter Buttons Section (Enhanced & Larger) */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-2">
              <Button 
                variant={activeSection === "notes" ? "default" : "outline"} 
                className={`rounded-2xl h-14 px-10 font-black uppercase tracking-widest text-[12px] transition-all duration-300 ${activeSection === "notes" ? 'shadow-xl shadow-primary/30 scale-105' : 'hover:bg-muted font-bold'}`}
                onClick={() => setActiveSection("notes")}
              >
                <FileText className="h-5 w-5 mr-3" />
                Lecture Notes
              </Button>
              <Button 
                variant={activeSection === "pyq" ? "default" : "outline"} 
                className={`rounded-2xl h-14 px-10 font-black uppercase tracking-widest text-[12px] transition-all duration-300 ${activeSection === "pyq" ? 'shadow-xl shadow-primary/30 scale-105' : 'hover:bg-muted font-bold'}`}
                onClick={() => setActiveSection("pyq")}
              >
                <Code className="h-5 w-5 mr-3" />
                PYQs (Papers)
              </Button>
              <Button 
                variant={activeSection === "books" ? "default" : "outline"} 
                className={`rounded-2xl h-14 px-10 font-black uppercase tracking-widest text-[12px] transition-all duration-300 ${activeSection === "books" ? 'shadow-xl shadow-primary/30 scale-105' : 'hover:bg-muted font-bold'}`}
                onClick={() => setActiveSection("books")}
              >
                <BookOpen className="h-5 w-5 mr-3" />
                Books & Question Bank
              </Button>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
              {activeSection === "notes" && (
                <section className="animate-fade-in space-y-12">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div className="space-y-4">
                      <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase font-sans text-foreground">Curriculum Units</h2>
                      <p className="text-muted-foreground font-medium opacity-60 max-w-xl">Systematic modular breakdown of the academic syllabus for deep vertical mastery.</p>
                    </div>
                    
                    {/* UNIT QUICK NAV BAR */}
                    <div className="flex flex-wrap gap-2 p-2 rounded-3xl bg-muted/20 border border-border/50">
                      <Button 
                        variant={!selectedUnitFilter || selectedUnitFilter === "all" ? "default" : "ghost"}
                        className={`h-12 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${(!selectedUnitFilter || selectedUnitFilter === "all") ? 'shadow-xl shadow-primary/20' : 'opacity-50 hover:opacity-100 hover:bg-primary/5'}`}
                        onClick={() => setSelectedUnitFilter("all")}
                      >
                        All Units
                      </Button>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <Button 
                          key={num}
                          variant={selectedUnitFilter === num.toString() ? "default" : "ghost"}
                          className={`h-12 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedUnitFilter === num.toString() ? 'shadow-xl shadow-primary/20 scale-105' : 'opacity-50 hover:opacity-100 hover:bg-primary/5'}`}
                          onClick={() => setSelectedUnitFilter(num.toString())}
                        >
                          UNIT {num}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {groupNotes().filter(([unit]) => !selectedUnitFilter || selectedUnitFilter === "all" || unit.replace('Unit ', '').trim() === selectedUnitFilter).length > 0 ? 
                     groupNotes()
                      .filter(([unit]) => !selectedUnitFilter || selectedUnitFilter === "all" || unit.replace('Unit ', '').trim() === selectedUnitFilter)
                      .map(([unit, group]) => (
                      <div key={unit} className="group p-8 rounded-[40px] bg-card border border-border hover:border-primary/40 hover:shadow-2xl transition-all relative overflow-hidden flex flex-col justify-between animate-in zoom-in-95 duration-500">
                        <div className="mb-8">
                          <div className="w-16 h-16 rounded-[24px] bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-xl shadow-primary/5 border border-primary/20 mb-8">
                            <Layers className="h-8 w-8" />
                          </div>
                          <h3 className="text-3xl font-black text-foreground mb-4 tracking-[-0.04em] uppercase font-sans">UNIT {unit.replace('Unit ', '')}</h3>
                          <p className="text-[13px] text-muted-foreground/80 leading-relaxed font-medium">Verified syllabus notes curated from top institutional lecture sessions.</p>
                        </div>
                        
                        <div className="space-y-4 shadow-sm p-2 rounded-3xl bg-muted/20">
                          <div className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] px-4 pt-2">Available Resources ({group.length})</div>
                          <div className="space-y-1">
                            {group.length > 0 ? group.map((res) => (
                              <button 
                                key={res.id}
                                className="w-full flex items-center justify-between p-4 rounded-[18px] bg-card hover:bg-primary/5 text-xs font-black text-foreground hover:text-primary transition-all border border-transparent hover:border-primary/10 group/item shadow-sm hover:translate-x-1"
                                onClick={() => setPreviewFile({ url: res.file_url, title: res.title, unit: res.unit })}
                              >
                                <span className="truncate pr-4 tracking-tight opacity-70 group-hover/item:opacity-100">{formatTitle(res.title)}</span>
                                <div className="flex items-center gap-2 opacity-30 group-hover/item:opacity-100 transition-all font-serif italic text-xs">
                                  <span>Review Asset</span>
                                  <Eye className="h-4 w-4" />
                                </div>
                              </button>
                            )) : (
                              <div className="p-8 rounded-[24px] bg-muted/10 border border-dashed border-border/60 flex flex-col items-center justify-center text-center gap-3 opacity-40">
                                <FileBox className="h-6 w-6" />
                                <span className="text-[9px] font-black uppercase tracking-widest">No resources uploaded</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="col-span-full py-20 text-center border border-dashed border-border rounded-[40px] bg-white/[0.01]">
                        <p className="text-muted-foreground font-medium">Lecture notes have not been uploaded for this subject yet.</p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {activeSection === "pyq" && (
                <section className="animate-fade-in">
                  <h2 className="text-2xl md:text-3xl font-black mb-10 border-b border-border pb-4 text-foreground">Examination Papers</h2>
                  <div className="rounded-[40px] bg-card border border-border overflow-hidden shadow-xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-muted text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                          <th className="py-6 px-8 border-b border-border/50">Academic Cycle</th>
                          <th className="py-6 px-8 border-b border-border/50 text-center">Batch Code</th>
                          <th className="py-6 px-8 border-b border-border/50 text-right">Resource Selection</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pyqResources.length > 0 ? Object.entries(groupPYQs()).map(([cycle, group]) => {
                          const [type, year] = cycle.split('_');
                          return (
                            <tr key={cycle} className="group border-b border-border/40 hover:bg-muted/10 transition-all">
                              <td className="py-10 px-8">
                                <div className="flex flex-col gap-2">
                                  <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-[24px] bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-500 shadow-xl shadow-primary/10 border border-primary/20">
                                      <FileText className="h-8 w-8" />
                                    </div>
                                        <div className="flex flex-col">
                                          <span className="text-2xl md:text-3xl font-black text-foreground tracking-tighter uppercase italic font-serif leading-none">
                                            {type.startsWith('cie') ? `CIE ${type.slice(3)}` : type.toUpperCase()} Archive • {year}
                                          </span>
                                          <span className="text-[11px] font-bold text-muted-foreground mt-2 uppercase tracking-[0.2em] opacity-60">
                                            {type === 'see' ? 'Semester End Examination' : `Continuous Internal Evaluation Phase ${type.slice(3)}`} • {year}
                                          </span>
                                        </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-10 px-8 text-center text-[11px] font-black text-muted-foreground uppercase tracking-widest bg-muted/5">
                                {subject?.code || 'EXAM'}-{year.slice(-2)}
                              </td>
                              <td className="py-10 px-8 text-right">
                                <div className="flex flex-col items-end gap-3">
                                  {group.map((res) => (
                                    <button 
                                      key={res.id}
                                      className="flex items-center justify-between gap-6 px-6 py-4 rounded-[20px] bg-muted/40 hover:bg-primary/10 text-sm font-black text-foreground hover:text-primary transition-all border border-transparent hover:border-primary/20 hover:scale-105 shadow-sm hover:shadow-lg min-w-[240px] group/item"
                                      onClick={() => setPreviewFile({ url: res.file_url, title: res.title, unit: res.unit })}
                                    >
                                      <span className="truncate pr-4 tracking-tight">{formatTitle(res.title)}</span>
                                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-40 group-hover/item:opacity-100 transition-opacity">
                                        <span>{res.type.startsWith('cie') ? `CIE ${res.type.slice(3)}` : res.type.toUpperCase()}</span>
                                        <Eye className="h-4 w-4" />
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          );
                        }) : (
                          <tr><td colSpan={3} className="py-12 text-center text-muted-foreground font-medium">No examination papers available for this subject.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {activeSection === "books" && (
                <section className="animate-fade-in">
                  <h2 className="text-2xl md:text-3xl font-black mb-10 border-b border-border pb-4 text-foreground">Textbooks & Reference</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {groupBooks().length > 0 ? groupBooks().map(([title, group]) => (
                      <div key={title} className="group relative p-10 rounded-[50px] bg-card border border-border hover:shadow-2xl transition-all overflow-hidden flex flex-col h-full shadow-lg">
                        <div className="aspect-[4/5] bg-muted/30 rounded-[35px] mb-8 flex items-center justify-center p-8 relative overflow-hidden shrink-0 border border-border/50">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-accent/10"></div>
                          <div className="relative z-10 w-full h-full border-4 border-foreground/5 p-6 flex flex-col justify-between items-center text-center">
                            <BookOpen className="h-12 w-12 text-foreground/5" />
                            <div className="w-20 h-1.5 bg-foreground/10 rounded-full"></div>
                            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground opacity-50 italic">Academic Proof</span>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col text-center md:text-left">
                          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 block">{group[0].year || 'Latest'} Edition</span>
                          <h3 className="text-2xl font-black text-foreground mb-8 leading-tight tracking-tight">{title}</h3>
                          
                          <div className="mt-auto space-y-3">
                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/50 pb-3 mb-6">Digital Access ({group.length})</div>
                            {group.map((res) => (
                              <button 
                                key={res.id}
                                className="w-full flex items-center justify-between px-6 py-4 rounded-[20px] bg-muted/40 hover:bg-primary/10 text-sm font-black text-foreground hover:text-primary transition-all border border-transparent hover:border-primary/20 group/item shadow-sm"
                                onClick={() => setPreviewFile({ url: res.file_url, title: res.title })}
                              >
                                <span className="truncate pr-4 tracking-tight">{formatTitle(res.title)}</span>
                                <div className="flex items-center gap-2 opacity-40 group-hover/item:opacity-100 transition-all">
                                  <span className="text-[10px] uppercase font-black">Open</span>
                                  <ExternalLink className="h-4 w-4" />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="col-span-full py-20 text-center border border-dashed border-border rounded-[40px] bg-white/[0.01]">
                        <p className="text-muted-foreground font-medium">Reference books are being curated for this subject.</p>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        )}
      </main>
      {/* Institutional Asset Preview Portal - 'The Immersive Reader' */}
      <Dialog open={!!previewFile} onOpenChange={() => setPreviewFile(null)}>
        <DialogContent className="max-w-[100vw] w-screen h-screen p-0 m-0 bg-background/95 backdrop-blur-2xl border-none rounded-none overflow-hidden flex flex-col gap-0 shadow-none animate-in fade-in zoom-in-100 duration-500 z-[100]">
          
          {/* Reader Header - 'Tactile Navigation' */}
          <header className="px-8 h-24 border-b border-border/40 flex items-center justify-between shrink-0 bg-card/60 relative z-[110]">
            <div className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-12 h-12 rounded-2xl bg-muted/40 hover:bg-primary/10 hover:text-primary transition-all border border-transparent hover:border-primary/20 rotate-180 group"
                onClick={() => setPreviewFile(null)}
              >
                <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <div className="flex flex-col">
                <DialogTitle className="text-2xl md:text-3xl font-black text-foreground font-serif tracking-tight leading-none mb-2 flex items-center gap-3">
                  {previewFile?.title}
                  <span className="px-2 py-0.5 rounded-lg bg-primary/10 border border-primary/20 text-[10px] font-black tracking-widest text-primary uppercase">
                    {previewFile ? getFileExtension(previewFile.url) : ''}
                  </span>
                </DialogTitle>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 italic font-serif">
                    {previewFile?.unit ? `Unit ${previewFile.unit.replace('Unit ', '')} Archival Asset` : 'Official Scholarly Asset'}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-primary/20"></span>
                  <span className="text-muted-foreground text-[9px] font-bold uppercase tracking-widest opacity-60">Verified Curated Master</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3 mr-4 p-1.5 rounded-2xl bg-muted/20 border border-border/50">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-xl h-10 px-5 text-[11px] font-black uppercase tracking-widest text-foreground/70 hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/10"
                  onClick={() => window.open(previewFile?.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Source
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="rounded-xl h-10 px-6 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                  onClick={() => window.open(previewFile?.url, '_blank')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-12 h-12 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all border border-transparent hover:border-border/40"
                onClick={() => setPreviewFile(null)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </header>
          
          {/* Immersive Viewport - 'Total Clarity' */}
          <div className="flex-1 w-full bg-muted/10 relative overflow-hidden flex flex-col items-center">
            
            {/* Elegant Background Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none overflow-hidden z-0">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-black font-serif italic text-foreground tracking-tighter leading-none opacity-10">
                 {previewFile?.title.charAt(0)}
               </div>
            </div>

            <div className="relative z-10 w-full h-full max-w-[1400px] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border-x border-border/50 flex flex-col bg-white overflow-hidden">
               {previewFile && (
                 <iframe 
                   key={previewFile.url}
                   src={
                     previewFile.url.toLowerCase().includes('drive.google.com') 
                       ? optimizeDriveUrl(previewFile.url) 
                       : (previewFile.url.toLowerCase().endsWith('.pdf')
                           ? `https://docs.google.com/viewer?url=${encodeURIComponent(previewFile.url)}&embedded=true`
                           : `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(previewFile.url)}`)
                   } 
                   className="w-full h-full border-none transition-opacity animate-in fade-in duration-1000 delay-300"
                   title="Institutional Asset Viewer"
                   loading="lazy"
                 />
               )}
            </div>

            {/* Context Footer (Mobile Only Sync) */}
            <div className="md:hidden w-full p-6 bg-card border-t border-border/40 flex items-center justify-between gap-4 z-[110]">
                <Button 
                  variant="outline" 
                  className="flex-1 h-12 rounded-2xl bg-muted/20 border-border text-[10px] font-black uppercase tracking-widest"
                  onClick={() => window.open(previewFile?.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2 text-primary" />
                  View Original
                </Button>
                <Button 
                  className="flex-1 h-12 rounded-2xl shadow-xl shadow-primary/20 text-[10px] font-black uppercase tracking-widest"
                  onClick={() => window.open(previewFile?.url, '_blank')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Save Locally
                </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
}
