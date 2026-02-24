import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase, getSupabaseClient } from "@/integrations/supabase/client";
import { fetchSemesterById, fetchSubjectsBySemester } from "@/lib/admin-utils";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SubjectCard } from "@/components/SubjectCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookMarked, FlaskConical, RefreshCw } from "lucide-react";

const Semester = () => {
  const { id } = useParams<{ id: string }>();
  const semesterId = parseInt(id || "0");

  const { data: semester, isLoading: semesterLoading, error: semesterError } = useQuery({
    queryKey: ["semester", semesterId],
    queryFn: async () => {
      return await fetchSemesterById(semesterId);
    },
    retry: 1, // Only retry once
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: subjects, isLoading: subjectsLoading, error: subjectsError } = useQuery({
    queryKey: ["subjects", semesterId],
    queryFn: async () => {
      if (!semester) return [];
      return await fetchSubjectsBySemester(semesterId, (semester as any).order);
    },
    enabled: !!semester,
    retry: 1, // Only retry once
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const isLoading = semesterLoading || subjectsLoading;
  const hasError = semesterError || subjectsError;

  const theorySubjects = subjects?.filter(s => !s.is_lab) || [];
  const labSubjects = subjects?.filter(s => s.is_lab) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/20 flex flex-col">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 max-w-5xl pb-24">
        <Breadcrumb 

          items={[
            { label: "Home", href: "/" },
            { label: semester?.name || "Loading..." }
          ]}
        />

        {/* Semester Header with Gradient */}
        <div className="mb-10 mt-8 p-8 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200/20 dark:border-indigo-800/20 shadow-lg shadow-indigo-500/5 animate-fade-in text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
            {semester?.name || "Loading..."}
          </h1>
          <p className="text-base text-muted-foreground max-w-xl">
            High-quality study materials, organized for your success. Select a subject below to explore resources.
          </p>
        </div>

        {hasError ? (
          <div className="text-center py-16 px-6 border border-dashed border-destructive/50 rounded-3xl bg-destructive/5 animate-in fade-in duration-500">
            <div className="p-4 rounded-full bg-destructive/10 w-fit mx-auto mb-6">
              <BookMarked className="h-10 w-10 text-destructive" />
            </div>
            <h2 className="text-2xl font-bold text-destructive mb-3">Failed to load subjects</h2>
            <div className="text-sm text-muted-foreground mb-8 max-w-md mx-auto space-y-2">
              <p>
                {semesterError ? 'We couldn\'t find the semester information. ' : ''}
                {subjectsError ? 'The list of subjects could not be retrieved. ' : ''}
              </p>
              <p className="font-mono text-[11px] bg-destructive/10 p-2 rounded border border-destructive/10">
                {(semesterError as Error)?.message || (subjectsError as Error)?.message || "Unknown data error"}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={() => window.location.reload()} 
                className="gap-2 rounded-xl h-11 px-8 shadow-lg shadow-primary/20"
              >
                <RefreshCw className="h-4 w-4" />
                Retry Loading
              </Button>
              <Button asChild variant="outline" className="rounded-xl h-11 px-8">
                <a href="/">Go to Home</a>
              </Button>
            </div>
          </div>
        ) : isLoading ? (
          <div className="space-y-8">
            {/* Show layout-preserving skeleton */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-200/20 dark:border-blue-800/20">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        ) : subjects && subjects.length > 0 ? (
          <div className="space-y-8">
            {/* Theory Subjects */}
            {theorySubjects.length > 0 && (
              <section className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-200/20 dark:border-blue-800/20 shadow-inner animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-blue-500/10 shadow-lg shadow-blue-500/10">
                    <BookMarked className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl font-extrabold text-foreground">Theory Subjects</h2>
                </div>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                  {theorySubjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      id={subject.id}
                      name={subject.name}
                      code={subject.code}
                      isLab={subject.is_lab}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Lab Subjects */}
            {labSubjects.length > 0 && (
              <section className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-200/20 dark:border-purple-800/20 shadow-inner animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-purple-500/10 shadow-lg shadow-purple-500/10">
                    <FlaskConical className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-xl font-extrabold text-foreground">Lab Subjects</h2>
                </div>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                  {labSubjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      id={subject.id}
                      name={subject.name}
                      code={subject.code}
                      isLab={subject.is_lab}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-border rounded-xl">
            <p className="text-sm text-muted-foreground">
              No subjects available for this semester
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Semester;
