/**
 * Custom hooks for admin resource management
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Resource, ResourceInput, Subject, Semester, Unit } from "@/lib/admin-utils";

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
      const { data, error } = await supabase
        .from("semesters")
        .select("*")
        .order("order");
      if (error) throw error;
      return data as Semester[];
    },
    staleTime: 10 * 60 * 1000, // 10 min cache
  });
}

/**
 * Hook to fetch subjects for a given semester
 */
export function useSubjects(semesterId: string) {
  return useQuery({
    queryKey: ["subjects", semesterId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subjects")
        .select("*")
        .eq("semester_id", parseInt(semesterId))
        .order("code");
      if (error) throw error;
      return data as Subject[];
    },
    enabled: !!semesterId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch units for a given subject
 */
export function useUnits(subjectId: string) {
  return useQuery({
    queryKey: ["units", subjectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("units")
        .select("*")
        .eq("subject_id", parseInt(subjectId))
        .order("unit_number");
      if (error) throw error;
      return data as Unit[];
    },
    enabled: !!subjectId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch resources for a given subject
 */
export function useResources(subjectId: string) {
  return useQuery({
    queryKey: ["resources", subjectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("subject_id", parseInt(subjectId))
        .order("type")
        .order("unit");
      if (error) throw error;
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
      const { data, error } = await supabase
        .from("resources")
        .select("*, subjects(code, name, semester_id)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
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
export function useAddResource(subjectId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (resources: ResourceInput[]) => {
      for (const res of resources) {
        const { error } = await supabase.from("resources").insert(res);
        if (error) throw error;
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
export function useDeleteResource(subjectId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (resourceId: number) => {
      const { error } = await supabase
        .from("resources")
        .delete()
        .eq("id", resourceId);
      if (error) throw error;
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
export function useUpdateResource(subjectId: string) {
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
      const { error } = await supabase
        .from("resources")
        .update(data)
        .eq("id", id);
      if (error) throw error;
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
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { isAuthenticated: false, isAdmin: false, user: null };

      const { data } = await supabase.rpc("has_role", {
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
