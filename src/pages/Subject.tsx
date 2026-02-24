import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ResourceCard } from "@/components/ResourceCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, BookOpen, FileText, Award, ArrowLeft, GraduationCap, Library, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function Subject() {
  const { id } = useParams<{ id: string }>();
  const subjectId = parseInt(id || "0");
  const [selectedCategory, setSelectedCategory] = useState<"notes" | "pyq" | "books" | null>(null);
  const [openUnits, setOpenUnits] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const { data: subject, isLoading: subjectLoading, error: subjectError } = useQuery({
    queryKey: ["subject", subjectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subjects")
        .select("*, semesters(name)")
        .eq("id", subjectId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: units, isLoading: unitsLoading, error: unitsError } = useQuery({
    queryKey: ["units", subjectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("units")
        .select("*")
        .eq("subject_id", subjectId)
        .order("unit_number");
      if (error) throw error;
      return data;
    },
  });

  const { data: resources, isLoading: resourcesLoading, error: resourcesError } = useQuery({
    queryKey: ["resources", subjectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("subject_id", subjectId)
        .order("year", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const isLoading = subjectLoading || unitsLoading || resourcesLoading;
  const hasError = subjectError || unitsError || resourcesError;

  const getUnitName = (unitNumber: number) => {
    return units?.find(u => u.unit_number === unitNumber)?.unit_name || null;
  };

  const getNotesByUnit = (unitNumber: number) => {
    return resources?.filter(r => r.type === "notes" && r.unit === `Unit ${unitNumber}`) || [];
  };

  const getCIE1Papers = () => {
    return resources?.filter(r => r.type === "cie1") || [];
  };

  const getCIE2Papers = () => {
    return resources?.filter(r => r.type === "cie2") || [];
  };

  const getCIE3Papers = () => {
    return resources?.filter(r => r.type === "cie3") || [];
  };

  const getSEEPapers = () => {
    return resources?.filter(r => r.type === "see") || [];
  };

  const getBooks = () => {
    return resources?.filter(r => r.type === "book") || [];
  };

  const toggleUnit = (unit: number) => {
    setOpenUnits(prev => ({ ...prev, [unit]: !prev[unit] }));
  };

  const hasUnits = units && units.length > 0;
  const cie1Papers = getCIE1Papers();
  const cie2Papers = getCIE2Papers();
  const cie3Papers = getCIE3Papers();
  const seePapers = getSEEPapers();
  const books = getBooks();

  const handleCategorySelect = (category: "notes" | "pyq" | "books") => {
    // Use view transition if supported
    if (!document.startViewTransition) {
      setSelectedCategory(category);
      return;
    }

    document.startViewTransition(() => {
      setSelectedCategory(category);
    });
  };

  const handleBackToCategories = () => {
    // Use view transition if supported
    if (!document.startViewTransition) {
      setSelectedCategory(null);
      return;
    }

    document.startViewTransition(() => {
      setSelectedCategory(null);
    });
  };

  const renderCategorySelection = () => (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-10 sm:mt-12 animate-slide-up">
      <div 
        onClick={() => handleCategorySelect("notes")}
        className="group relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="p-5 rounded-2xl bg-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-blue-500/10">
            <BookOpen className="h-10 w-10" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Notes</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Comprehensive study notes organized unit-wise for easy learning.
            </p>
          </div>
        </div>
      </div>

      <div 
        onClick={() => handleCategorySelect("pyq")}
        className="group relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-200/50 dark:border-purple-800/50 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden text-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="p-5 rounded-2xl bg-purple-500/20 text-purple-600 dark:text-purple-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-lg shadow-purple-500/10">
            <GraduationCap className="h-10 w-10" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">PYQs</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Past CIE and SEE question papers to help you practice and excel.
            </p>
          </div>
        </div>
      </div>

      <div 
        onClick={() => handleCategorySelect("books")}
        className="group relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-200/50 dark:border-amber-800/50 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden text-center sm:col-span-2 md:col-span-1"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="p-5 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-amber-500/10">
            <Library className="h-10 w-10" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Resources</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Textbooks, reference books, and curated curriculum resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/20 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 max-w-5xl pb-24">
        <div className="flex flex-col gap-6">
          <Breadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: subject?.semesters?.name || "Semester", href: `/semester/${subject?.semester_id}` },
              { label: subject?.name || "Loading...", href: selectedCategory ? undefined : window.location.pathname },
              ...(selectedCategory ? [{ label: selectedCategory === "pyq" ? "PYQ" : selectedCategory === "books" ? "Books & KB" : "Notes" }] : [])
            ]} 
          />

          {hasError ? (
            <div className="text-center py-16 px-6 border border-dashed border-destructive/50 rounded-3xl bg-destructive/5 animate-in fade-in duration-500">
              <div className="p-4 rounded-full bg-destructive/10 w-fit mx-auto mb-6">
                <FileText className="h-10 w-10 text-destructive" />
              </div>
              <h2 className="text-2xl font-bold text-destructive mb-3">Failed to load resource data</h2>
              <div className="text-sm text-muted-foreground mb-8 max-w-md mx-auto space-y-2">
                <p className="font-mono text-[11px] bg-destructive/10 p-2 rounded border border-destructive/10 shadow-inner">
                  {(subjectError as Error)?.message || (unitsError as Error)?.message || (resourcesError as Error)?.message || "Data fetch error"}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  onClick={() => window.location.reload()} 
                  className="gap-2 rounded-xl h-11 px-8 shadow-lg shadow-primary/20"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry
                </Button>
                <Button asChild variant="outline" className="rounded-xl h-11 px-8">
                  <a href={`/semester/${subject?.semester_id}`}>Back to Semester</a>
                </Button>
              </div>
            </div>
          ) : isLoading ? (
            <div className="space-y-10 animate-pulse">
              <div className="p-8 rounded-3xl bg-muted/30 h-48 border border-border/50" />
              <div className="grid gap-6 md:grid-cols-3">
                <div className="h-40 bg-muted/30 rounded-3xl" />
                <div className="h-40 bg-muted/30 rounded-3xl" />
                <div className="h-40 bg-muted/30 rounded-3xl" />
              </div>
            </div>
          ) : (
            <>
              {selectedCategory && (
                <Button 
                  variant="outline" 
                  className="w-fit -ml-2 gap-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 group rounded-xl border-border/50"
                  onClick={handleBackToCategories}
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Categories
                </Button>
              )}

              {/* Subject Header with Badge */}
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/20 shadow-xl shadow-primary/5 animate-fade-in text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                  <span className="w-fit px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20">
                    {subject?.code}
                  </span>
                  <span className="w-fit px-4 py-1.5 rounded-full bg-background/50 backdrop-blur-sm border border-border text-muted-foreground text-xs font-bold uppercase tracking-widest">
                    {subject?.semesters?.name}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-tight leading-tight">
                  {subject?.name}
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  Everything you need to master this course. Access high-quality notes, past question papers, and recommended textbooks.
                </p>
              </div>
            </>
          )}
        </div>

        {!selectedCategory ? (
          renderCategorySelection()
        ) : (
          <div className="space-y-8 mt-8">
            {/* SECTION 1: NOTES BY UNIT */}
            {selectedCategory === "notes" && (
              <section className="p-6 rounded-xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-200/20 dark:border-blue-800/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Notes</h2>
                </div>
                {hasUnits ? (
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((unitNum) => {
                      const unitNotes = getNotesByUnit(unitNum);
                      const unitName = getUnitName(unitNum);
                      if (!unitName) return null;

                      return (
                        <Collapsible
                          key={unitNum}
                          open={openUnits[unitNum]}
                          onOpenChange={() => toggleUnit(unitNum)}
                        >
                          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-border bg-card/50 backdrop-blur-sm px-4 py-3.5 text-left hover:bg-accent/50 hover:border-primary/40 transition-all duration-200 group">
                            <div className="flex items-center gap-3 flex-1">
                              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                                {unitNum}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                                  {unitName}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  {unitNotes.length} {unitNotes.length === 1 ? 'file' : 'files'}
                                </div>
                              </div>
                            </div>
                            <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${openUnits[unitNum] ? 'rotate-90' : ''}`} />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pt-2 pb-1">
                            {unitNotes.length > 0 ? (
                              <div className="space-y-2 pl-6">
                                {unitNotes.map((resource) => (
                                  <ResourceCard
                                    key={resource.id}
                                    id={resource.id}
                                    title={resource.title}
                                    fileUrl={resource.file_url}
                                    year={resource.year}
                                    type={resource.type}
                                  />
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground py-4 px-6">
                                No files available for this unit
                              </p>
                            )}
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 border border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">No notes available yet.</p>
                  </div>
                )}
              </section>
            )}

            {/* SECTION 2: EXAM PAPERS */}
            {selectedCategory === "pyq" && (
              <section className="p-6 rounded-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-200/20 dark:border-purple-800/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Question Papers</h2>
                </div>
                
                {(cie1Papers.length > 0 || cie2Papers.length > 0 || cie3Papers.length > 0 || seePapers.length > 0) ? (
                  <div className="space-y-6">
                    {/* CIE-1 Papers */}
                    {cie1Papers.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-blue-500"></span>
                          CIE-1 Papers
                        </h3>
                        <div className="space-y-2">
                          {cie1Papers.map((resource) => (
                            <ResourceCard
                              key={resource.id}
                              id={resource.id}
                              title={resource.title}
                              fileUrl={resource.file_url}
                              year={resource.year}
                              type={resource.type}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CIE-2 Papers */}
                    {cie2Papers.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-purple-500"></span>
                          CIE-2 Papers
                        </h3>
                        <div className="space-y-2">
                          {cie2Papers.map((resource) => (
                            <ResourceCard
                              key={resource.id}
                              id={resource.id}
                              title={resource.title}
                              fileUrl={resource.file_url}
                              year={resource.year}
                              type={resource.type}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CIE-3 Papers */}
                    {cie3Papers.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-pink-500"></span>
                          CIE-3 Papers
                        </h3>
                        <div className="space-y-2">
                          {cie3Papers.map((resource) => (
                            <ResourceCard
                              key={resource.id}
                              id={resource.id}
                              title={resource.title}
                              fileUrl={resource.file_url}
                              year={resource.year}
                              type={resource.type}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SEE Papers */}
                    {seePapers.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-green-500"></span>
                          SEE Papers
                        </h3>
                        <div className="space-y-2">
                          {seePapers.map((resource) => (
                            <ResourceCard
                              key={resource.id}
                              id={resource.id}
                              title={resource.title}
                              fileUrl={resource.file_url}
                              year={resource.year}
                              type={resource.type}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 border border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">No question papers available yet.</p>
                  </div>
                )}
              </section>
            )}

            {/* SECTION 3: REFERENCE BOOKS */}
            {selectedCategory === "books" && (
              <section className="p-6 rounded-xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-200/20 dark:border-amber-800/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <Library className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-foreground">Reference Books & Question Banks</h2>
                  </div>
                </div>
                {books.length > 0 ? (
                  <div className="space-y-2">
                    {books.map((resource) => (
                      <ResourceCard
                        key={resource.id}
                        id={resource.id}
                        title={resource.title}
                        fileUrl={resource.file_url}
                        year={resource.year}
                        type={resource.type}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">No reference books available yet.</p>
                  </div>
                )}
              </section>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
