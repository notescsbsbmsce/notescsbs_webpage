import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { SemesterCard } from "@/components/SemesterCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Footer } from "@/components/Footer";
import { BookOpen, GraduationCap } from "lucide-react";

const Index = () => {
  const { data: semesters, isLoading, error } = useQuery({
    queryKey: ["semesters"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("semesters")
        .select("*")
        .order("order");
      if (error) throw error;
      return data;
    },
  });

  // Show error if query fails
  if (error) {
    console.error('Error loading semesters:', error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-500/5 to-pink-500/10 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 max-w-7xl pb-24 md:pb-12">
        {/* Hero Section */}
        <div className="mb-10 sm:mb-16 text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/20 shadow-xl shadow-primary/5 animate-fade-in">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight">
            <span className="text-foreground">Notes </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-600">CSBS</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your premium, one-stop platform for CSBS academic resources at BMSCE. Fully organized and easy to access.
          </p>
        </div>

        {/* Info Card */}
        <div className="mb-12 sm:mb-16 p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-200/20 dark:border-blue-800/20 shadow-inner animate-slide-up">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="p-4 rounded-2xl bg-primary/10 shadow-lg shadow-primary/10">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-foreground mb-3 text-lg sm:text-xl">What You'll Find Here</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Study materials, exam papers (CIE & SEE), lab resources, and reference books – meticulously organized semester-wise to help you excel in your academics.
              </p>
            </div>
          </div>
        </div>

        {/* Semesters Section */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-8 sm:mb-10">
            <div className="p-3 rounded-xl bg-primary/10">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Select Your Semester</h2>
          </div>
          
          {isLoading ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-xl" />
              ))}
            </div>
          ) : semesters && semesters.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {semesters.map((semester, index) => (
                <SemesterCard
                  key={semester.id}
                  id={semester.id}
                  name={semester.name}
                  order={semester.order}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-border rounded-xl">
              <p className="text-sm text-muted-foreground">
                No semesters available. Check back soon!
              </p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-purple-500/5 border border-primary/20 text-center">
          <p className="text-sm text-muted-foreground">
            💙 Built with love for BMSCE CSBS students
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
