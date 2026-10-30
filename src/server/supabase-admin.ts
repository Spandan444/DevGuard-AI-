/**
 * DevGuard AI - Server-side Supabase Admin Client
 * 
 * CRITICAL SECURITY INVARIANT:
 * This module is strictly server-only. It handles service-role operations such as
 * webhook verification, background scan workers, and tenant isolation policies.
 * 
 * Never expose SUPABASE_SERVICE_ROLE_KEY or database connection strings to the client browser.
 */

export interface SupabaseConfigStatus {
  isConfigured: boolean;
  hasUrl: boolean;
  hasAnonKey: boolean;
  hasServiceRoleKey: boolean;
  error?: string;
}

export function getServerSupabaseConfig(): SupabaseConfigStatus {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  return {
    isConfigured: Boolean(url && (anonKey || serviceRoleKey)),
    hasUrl: Boolean(url),
    hasAnonKey: Boolean(anonKey),
    hasServiceRoleKey: Boolean(serviceRoleKey),
    error: !url ? 'Missing SUPABASE_URL in environment' : undefined,
  };
}
