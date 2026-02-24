import { ChevronRight } from "lucide-react";
import { useViewTransition } from "@/hooks/useViewTransition";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SemesterCardProps {
  id: number;
  name: string;
  order: number;
  index?: number;
}

export function SemesterCard({ id, name, order }: SemesterCardProps) {
  const navigate = useViewTransition();
  const queryClient = useQueryClient();
  
  const handleMouseEnter = () => {
    // Prefetch semester data
    queryClient.prefetchQuery({
      queryKey: ["semester", id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("semesters")
          .select("*")
          .eq("id", id)
          .maybeSingle();
        if (error) throw error;
        return data;
      },
      staleTime: 5 * 60 * 1000,
    });

    // Prefetch subjects data
    queryClient.prefetchQuery({
      queryKey: ["subjects", id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("subjects")
          .select("*")
          .eq("semester_id", id)
          .order("is_lab")
          .order("code");
        if (error) throw error;
        return data;
      },
      staleTime: 5 * 60 * 1000,
    });
  };

  return (
    <button
      onClick={() => navigate(`/semester/${id}`)}
      onMouseEnter={handleMouseEnter}
      className="group relative flex items-center justify-between p-4 sm:p-6 rounded-xl border border-border bg-card hover:bg-gradient-to-r hover:from-primary/5 hover:to-purple-500/5 hover:border-primary/40 hover:shadow-soft-lg hover:scale-[1.02] transition-all duration-300 w-full text-left"
    >
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            {order}
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              View subjects & resources
            </p>
          </div>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </button>
  );
}
