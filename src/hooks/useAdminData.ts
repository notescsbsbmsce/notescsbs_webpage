/**
 * Custom hooks for admin resource management
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, getSupabaseClient } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Resource, ResourceInput, Subject, Semester, Unit } from "@/lib/admin-utils";
import { fetchSemesters } from "@/lib/admin-utils";

// ============================================================
// DATA FETCHING HOOKS
// ============================================================

/**
 * Hook to fetch all semesters
 */
export function useSemesters() {
  return useQuery({
    queryKey: ["semesters"],
    queryFn: async () => {
      return await fetchSemesters();
    },
    staleTime: 10 * 60 * 1000, // 10 min cache
  });
}

/**
 * Hook to fetch subjects for a given semester
 */
export function useSubjects(semesterId: string, semesterNumber?: number) {
  return useQuery({
    queryKey: ["subjects", semesterId],
    queryFn: async () => {
      const client = getSupabaseClient(semesterNumber || 1);
      const { data, error } = await client
        .from("subjects")
        .select("*")
        .eq("semester_id", parseInt(semesterId))
        .order("code");
      if (error) {
        console.error("Supabase Error (useSubjects):", error);
        throw error;
      }
      return data as Subject[];
    },
    enabled: !!semesterId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch units for a given subject
 */
export function useUnits(subjectId: string, semesterNumber?: number) {
  return useQuery({
    queryKey: ["units", subjectId],
    queryFn: async () => {
      const client = getSupabaseClient(semesterNumber || 1);
      const { data, error } = await client
        .from("units")
        .select("*")
        .eq("subject_id", parseInt(subjectId))
        .order("unit_number");
      if (error) {
        console.error("Supabase Error (useUnits):", error);
        throw error;
      }
      return data as Unit[];
    },
    enabled: !!subjectId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch resources for a given subject
 */
export function useResources(subjectId: string, semesterNumber?: number) {
  return useQuery({
    queryKey: ["resources", subjectId],
    queryFn: async () => {
      const client = getSupabaseClient(semesterNumber || 1);
      const { data, error } = await client
        .from("resources")
        .select("*")
        .eq("subject_id", parseInt(subjectId))
        .order("type")
        .order("unit");
      if (error) {
        console.error("Supabase Error (useResources):", error);
        throw error;
      }
      return data as Resource[];
    },
    enabled: !!subjectId,
    staleTime: 2 * 60 * 1000,
  });
}

/**
 * Hook to fetch ALL resources (for analytics)
 */
export function useAllResources() {
  return useQuery({
    queryKey: ["all-resources"],
    queryFn: async () => {
      // Aggregating from both databases for analytics
      try {
        const [oldRes, newRes] = await Promise.all([
          getSupabaseClient(1).from("resources").select("*, subjects(code, name, semester_id)").order("created_at", { ascending: false }),
          getSupabaseClient(4).from("resources").select("*, subjects(code, name, semester_id)").order("created_at", { ascending: false })
        ]);

        const combinedData = [
          ...(oldRes.data || []),
          ...(newRes.data || [])
        ];

        return combinedData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      } catch (error) {
        console.error("Supabase Error (useAllResources):", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}

// ============================================================
// MUTATION HOOKS
// ============================================================

/**
 * Hook to add a single or multiple resources
 */
export function useAddResource(subjectId: string, semesterNumber: number) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (resources: ResourceInput[]) => {
      const client = getSupabaseClient(semesterNumber);
      for (const res of resources) {
        const { error } = await client.from("resources").insert(res);
        if (error) {
          console.error("Supabase Error (useAddResource):", error);
          throw error;
        }
      }
    },
    onSuccess: () => {
      toast({
        title: "✅ Resource Added!",
        description: "Students can now access this resource.",
      });
      queryClient.invalidateQueries({ queryKey: ["resources", subjectId] });
      queryClient.invalidateQueries({ queryKey: ["all-resources"] });
    },
    onError: (error: Error) => {
      toast({
        title: "❌ Error",
        description: error.message || "Failed to add resource",
        variant: "destructive",
      });
    },
  });
}

/**
 * Hook to delete a resource
 */
export function useDeleteResource(subjectId: string, semesterNumber: number) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (resourceId: number) => {
      const client = getSupabaseClient(semesterNumber);
      const { error } = await client
        .from("resources")
        .delete()
        .eq("id", resourceId);
      if (error) {
        console.error("Supabase Error (useDeleteResource):", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "🗑️ Deleted",
        description: "Resource removed successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["resources", subjectId] });
      queryClient.invalidateQueries({ queryKey: ["all-resources"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete resource",
        variant: "destructive",
      });
    },
  });
}

/**
 * Hook to update a resource
 */
export function useUpdateResource(subjectId: string, semesterNumber: number) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<ResourceInput>;
    }) => {
      const client = getSupabaseClient(semesterNumber);
      const { error } = await client
        .from("resources")
        .update(data)
        .eq("id", id);
      if (error) {
        console.error("Supabase Error (useUpdateResource):", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "✅ Updated",
        description: "Resource updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["resources", subjectId] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update resource",
        variant: "destructive",
      });
    },
  });
}

// ============================================================
// AUTH HOOKS
// ============================================================

/**
 * Hook to check if current user is admin
 */
export function useAdminAuth() {
  return useQuery({
    queryKey: ["admin-auth"],
    queryFn: async () => {
      // Auth usually resides in the primary (old) database
      const client = getSupabaseClient(1);
      const {
        data: { user },
      } = await client.auth.getUser();
      if (!user) return { isAuthenticated: false, isAdmin: false, user: null };

      const { data } = await client.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });

      return {
        isAuthenticated: true,
        isAdmin: data === true,
        user,
      };
    },
    staleTime: 30 * 60 * 1000, // 30 min cache
  });
}
