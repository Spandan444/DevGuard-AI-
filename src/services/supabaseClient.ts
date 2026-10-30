/**
 * DevGuard AI - Supabase Client Bridge
 * 
 * Safely initialises the client-side Supabase client using public environment variables.
 * In accordance with application constraints:
 * - Never exposes secret service role keys to the browser.
 * - Detects whether live Supabase credentials (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) are provided.
 * - Gracefully reports connection state to the UI so developers can see real DB status vs demo data.
 */

export interface SupabaseClientStatus {
  isAvailable: boolean;
  supabaseUrl: string | null;
  mode: 'live_supabase' | 'visual_development_mode';
}

const supabaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || '';
const supabaseAnonKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || '';

export const supabaseStatus: SupabaseClientStatus = {
  isAvailable: Boolean(supabaseUrl && supabaseAnonKey),
  supabaseUrl: supabaseUrl || null,
  mode: supabaseUrl && supabaseAnonKey ? 'live_supabase' : 'visual_development_mode',
};

export function getClientConnectionInfo() {
  return {
    ...supabaseStatus,
    statusText: supabaseStatus.isAvailable
      ? 'Connected to live Supabase project'
      : 'Visual Development Sandbox (Demo data enabled; configure VITE_SUPABASE_URL to connect live backend)',
  };
}
