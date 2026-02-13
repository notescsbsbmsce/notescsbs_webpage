/**
 * Admin Utility Functions
 * Centralized helpers for the admin panel
 */

import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

// ============================================================
// TYPE DEFINITIONS
// ============================================================

export type ResourceType = Database["public"]["Enums"]["resource_type"];

export interface Resource {
  id: number;
  title: string;
  file_url: string;
  type: ResourceType;
  unit: string | null;
  year: number | null;
  subject_id: number;
  created_at: string;
}

export interface Subject {
  id: number;
  name: string;
  code: string;
  semester_id: number;
  is_lab: boolean;
}

export interface Semester {
  id: number;
  name: string;
  order: number;
}

export interface Unit {
  id: number;
  unit_number: number;
  unit_name: string;
  subject_id: number;
}

export interface ResourceInput {
  subject_id: number;
  title: string;
  file_url: string;
  type: ResourceType;
  unit?: string | null;
  year?: number | null;
}

// ============================================================
// GOOGLE DRIVE LINK UTILITIES
// ============================================================

/**
 * Validates if a URL is a Google Drive link
 */
export function isValidDriveLink(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  return (
    trimmed.includes("drive.google.com") ||
    trimmed.includes("docs.google.com")
  );
}

/**
 * Extracts the file ID from various Google Drive URL formats
 */
export function extractDriveFileId(url: string): string | null {
  if (!url) return null;

  // Format: /file/d/FILE_ID/...
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];

  // Format: ?id=FILE_ID or &id=FILE_ID
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];

  // Format: /document/d/FILE_ID/... (Google Docs)
  const docMatch = url.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
  if (docMatch) return docMatch[1];

  // Format: /presentation/d/FILE_ID/... (Google Slides)
  const slideMatch = url.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)/);
  if (slideMatch) return slideMatch[1];

  // Format: /spreadsheets/d/FILE_ID/... (Google Sheets)
  const sheetMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (sheetMatch) return sheetMatch[1];

  return null;
}

/**
 * Converts any Google Drive URL to the optimal preview format
 */
export function optimizeDriveUrl(url: string): string {
  const trimmed = url.trim();
  const fileId = extractDriveFileId(trimmed);

  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  return trimmed;
}

/**
 * Converts a Drive preview URL to a direct download URL
 */
export function getDriveDownloadUrl(url: string): string {
  const fileId = extractDriveFileId(url);
  if (fileId) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  return url;
}

/**
 * Gets the Drive view URL (for opening in browser)
 */
export function getDriveViewUrl(url: string): string {
  const fileId = extractDriveFileId(url);
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/view`;
  }
  return url;
}

// ============================================================
// VALIDATION UTILITIES
// ============================================================

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validates the resource form data before submission
 */
export function validateResourceForm(data: {
  subject_id?: number;
  title?: string;
  file_url?: string;
  type?: ResourceType;
}): ValidationResult {
  const errors: string[] = [];

  if (!data.subject_id) {
    errors.push("Please select a subject");
  }

  if (!data.title?.trim()) {
    errors.push("Title is required");
  }

  if (!data.file_url?.trim()) {
    errors.push("File URL is required");
  } else if (!data.file_url.startsWith("http")) {
    errors.push("Please enter a valid URL");
  }

  if (!data.type) {
    errors.push("Resource type is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates PDF file before upload
 */
export function isValidPDF(file: File): boolean {
  return (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  );
}

// ============================================================
// FORMATTING UTILITIES
// ============================================================

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
}

/**
 * Truncate a URL for display
 */
export function truncateUrl(url: string, maxLength = 40): string {
  if (url.length <= maxLength) return url;
  return url.substring(0, maxLength - 3) + "...";
}

/**
 * Get human-readable resource type label
 */
export function getResourceTypeLabel(type: ResourceType): string {
  const labels: Record<ResourceType, string> = {
    notes: "Notes",
    cie1: "CIE-1",
    cie2: "CIE-2",
    cie3: "CIE-3",
    see: "SEE",
    book: "Book",
  };
  return labels[type] || type;
}

/**
 * Get storage type from URL
 */
export function getStorageType(url: string): "drive" | "supabase" | "other" {
  if (url.includes("drive.google.com") || url.includes("docs.google.com")) {
    return "drive";
  }
  if (url.includes("supabase.co")) {
    return "supabase";
  }
  return "other";
}

// ============================================================
// RESOURCE STATISTICS
// ============================================================

export interface ResourceStats {
  total: number;
  notes: number;
  pyqs: number;
  books: number;
  byType: Record<ResourceType, number>;
  driveCount: number;
  supabaseCount: number;
}

/**
 * Compute statistics from a list of resources
 */
export function computeResourceStats(resources: Resource[]): ResourceStats {
  const byType: Record<ResourceType, number> = {
    notes: 0,
    cie1: 0,
    cie2: 0,
    cie3: 0,
    see: 0,
    book: 0,
  };

  let driveCount = 0;
  let supabaseCount = 0;

  for (const r of resources) {
    byType[r.type] = (byType[r.type] || 0) + 1;
    const storage = getStorageType(r.file_url);
    if (storage === "drive") driveCount++;
    if (storage === "supabase") supabaseCount++;
  }

  return {
    total: resources.length,
    notes: byType.notes,
    pyqs: byType.cie1 + byType.cie2 + byType.cie3 + byType.see,
    books: byType.book,
    byType,
    driveCount,
    supabaseCount,
  };
}

// ============================================================
// SUPABASE HELPER FUNCTIONS
// ============================================================

/**
 * Add a resource to the database
 */
export async function addResource(data: ResourceInput) {
  const { error } = await supabase.from("resources").insert(data);
  if (error) throw error;
  return true;
}

/**
 * Update a resource in the database
 */
export async function updateResource(
  id: number,
  data: Partial<ResourceInput>
) {
  const { error } = await supabase
    .from("resources")
    .update(data)
    .eq("id", id);
  if (error) throw error;
  return true;
}

/**
 * Delete a resource from the database
 */
export async function deleteResource(id: number) {
  const { error } = await supabase
    .from("resources")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return true;
}

/**
 * Fetch all resources for a subject
 */
export async function fetchResourcesBySubject(subjectId: number) {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("subject_id", subjectId)
    .order("type")
    .order("unit");
  if (error) throw error;
  return (data || []) as Resource[];
}

/**
 * Fetch all semesters
 */
export async function fetchSemesters() {
  const { data, error } = await supabase
    .from("semesters")
    .select("*")
    .order("order");
  if (error) throw error;
  return (data || []) as Semester[];
}

/**
 * Fetch subjects for a semester
 */
export async function fetchSubjectsBySemester(semesterId: number) {
  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .eq("semester_id", semesterId)
    .order("code");
  if (error) throw error;
  return (data || []) as Subject[];
}

/**
 * Check if user has admin role
 */
export async function checkIsAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error) return false;
  return data === true;
}
