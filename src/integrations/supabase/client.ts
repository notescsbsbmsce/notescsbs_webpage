// This file handles Supabase client orchestration
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// First, we check for primary credentials (Old or Default)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL_OLD || import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY_OLD || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

// Then, we check if a second project exists for split hosting (Semesters 4-8)
const SUPABASE_URL_NEW = import.meta.env.VITE_SUPABASE_URL_NEW || '';
const SUPABASE_KEY_NEW = import.meta.env.VITE_SUPABASE_KEY_NEW || '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Fatal: Primary Supabase credentials missing from Environment Variables.');
}

// Global Auth Configuration to maintain single session persistence
const authConfig = {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
};

/**
 * ORCHESTRATION LOGIC:
 * If the user has provided a NEW Supabase project, we create a second client.
 * If not, we reuse the primary client to avoid "Multiple GoTrueClient instances" warnings
 * and ensure that all data is fetched from the primary project.
 */
export const supabaseOld = createClient<Database>(SUPABASE_URL, SUPABASE_KEY, authConfig);

// Only create a second instance if a distinct URL is provided
export const supabaseNew = (SUPABASE_URL_NEW && SUPABASE_URL_NEW !== SUPABASE_URL) 
  ? createClient<Database>(SUPABASE_URL_NEW, SUPABASE_KEY_NEW, authConfig)
  : supabaseOld;

// Default export for generic auth and common queries
export const supabase = supabaseOld;

/**
 * Get the appropriate Supabase client based on the semester.
 * This ensures that data is fetched from the correct project while preventing
 * redundant client initialization when only one project is used.
 */
export function getSupabaseClient(semester: number | string) {
  const semNum = typeof semester === 'string' ? parseInt(semester) : semester;

  // Utilize the secondary project client for semesters 4-8 if configured
  if (semNum >= 4) {
    return supabaseNew;
  }

  // Fallback to primary project client
  return supabaseOld;
}
