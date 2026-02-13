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
import { ChevronRight, BookOpen, FileText, Award, ArrowLeft, GraduationCap, Library } from "lucide-react";
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

  const { data: subject } = useQuery({
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

  const { data: units } = useQuery({
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

  const { data: resources } = useQuery({
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
    return resources?.filter(r => (r.type === "book" || r.type === "question_bank")) || [];
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

  const renderCategorySelection = () => (
    <div className="grid gap-6 md:grid-cols-3 mt-8">
      <div 
        onClick={() => setSelectedCategory("notes")}
        className="group relative p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 flex flex-col items-center text-center gap-4">
          <div className="p-4 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
            <BookOpen className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Notes</h3>
          <p className="text-sm text-muted-foreground">
            Comprehensive study notes organized by units
          </p>
        </div>
      </div>

      <div 
        onClick={() => setSelectedCategory("pyq")}
        className="group relative p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 flex flex-col items-center text-center gap-4">
          <div className="p-4 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Previous Year Questions</h3>
          <p className="text-sm text-muted-foreground">
            CIE and SEE question papers for practice
          </p>
        </div>
      </div>

      <div 
        onClick={() => setSelectedCategory("books")}
        className="group relative p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-200/50 dark:border-amber-800/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 flex flex-col items-center text-center gap-4">
          <div className="p-4 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300">
            <Library className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Books & Question Bank</h3>
          <p className="text-sm text-muted-foreground">
            Textbooks and question banks
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/20 flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 max-w-5xl pb-24">
        <div className="flex flex-col gap-4">
          <Breadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: subject?.semesters?.name || "Semester", href: `/semester/${subject?.semester_id}` },
              { label: subject?.name || "Loading...", href: selectedCategory ? undefined : window.location.pathname },
              ...(selectedCategory ? [{ label: selectedCategory === "pyq" ? "PYQ" : selectedCategory === "books" ? "Books & KB" : "Notes" }] : [])
            ]} 
          />

          {selectedCategory && (
            <Button 
              variant="ghost" 
              className="w-fit -ml-2 gap-2 text-muted-foreground hover:text-foreground"
              onClick={() => setSelectedCategory(null)}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Categories
            </Button>
          )}

          {/* Subject Header with Gradient */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/20">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {subject?.name || "Loading..."}
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
              <span className="font-mono px-2 py-1 bg-primary/20 text-primary rounded">{subject?.code}</span>
              <span>•</span>
              <span>{subject?.semesters?.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedCategory 
                ? `Showing ${selectedCategory === "pyq" ? "Question Papers" : selectedCategory === "books" ? "Books & Question Banks" : "Notes"}`
                : "Select a category to view resources"}
            </p>
          </div>
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
