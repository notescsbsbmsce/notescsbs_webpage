import { ChevronRight, FlaskConical } from "lucide-react";
import { useViewTransition } from "@/hooks/useViewTransition";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SubjectCardProps {
  id: number;
  name: string;
  code: string;
  isLab: boolean;
  index?: number;
}

export function SubjectCard({ id, name, code, isLab }: SubjectCardProps) {
  const navigate = useViewTransition();
  const queryClient = useQueryClient();
  
  const handleMouseEnter = () => {
    // Prefetch subject details
    queryClient.prefetchQuery({
      queryKey: ["subject", id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("subjects")
          .select("*, semesters(name)")
          .eq("id", id)
          .maybeSingle();
        if (error) throw error;
        return data;
      },
      staleTime: 5 * 60 * 1000,
    });

    // Prefetch units
    queryClient.prefetchQuery({
      queryKey: ["units", id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("units")
          .select("*")
          .eq("subject_id", id)
          .order("unit_number");
        if (error) throw error;
        return data;
      },
      staleTime: 5 * 60 * 1000,
    });

    // Prefetch resources
    queryClient.prefetchQuery({
      queryKey: ["resources", id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("resources")
          .select("*")
          .eq("subject_id", id)
          .order("year", { ascending: false });
        if (error) throw error;
        return data;
      },
      staleTime: 5 * 60 * 1000,
    });
  };

  return (
    <button
      onClick={() => navigate(`/subject/${id}`)}
      onMouseEnter={handleMouseEnter}
      className="group flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/40 hover:shadow-soft transition-all duration-200 w-full text-left"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
          {isLab ? (
            <FlaskConical className="h-4 w-4" />
          ) : (
            <span className="text-sm font-semibold">
              {code.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-xs text-muted-foreground mb-0.5">{code}</div>
          <div className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
            {name}
          </div>
        </div>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
    </button>
  );
}
