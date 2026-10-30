/**
 * DevGuard AI - Supabase PostgreSQL Database Type Definitions
 * 
 * Defines schema tables, column types, json fields, and relational mappings:
 * - profiles (user organization and account metadata)
 * - repositories (connected GitHub repos and uploaded archives)
 * - scans (execution metadata, language targets, AST scanner stats)
 * - findings (vulnerability occurrences, CWEs, line numbers, snippets, AI patches)
 * - scan_policies (custom security rules, thresholds, blocking triggers)
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          organization_name: string | null;
          role: 'admin' | 'security_engineer' | 'developer' | 'auditor';
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          organization_name?: string | null;
          role?: 'admin' | 'security_engineer' | 'developer' | 'auditor';
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          organization_name?: string | null;
          role?: 'admin' | 'security_engineer' | 'developer' | 'auditor';
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      repositories: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          full_name: string;
          source_type: 'github' | 'zip_archive';
          html_url: string | null;
          default_branch: string;
          primary_language: 'python' | 'javascript' | 'typescript' | 'polyglot';
          is_private: boolean;
          last_scanned_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          full_name: string;
          source_type: 'github' | 'zip_archive';
          html_url?: string | null;
          default_branch?: string;
          primary_language?: 'python' | 'javascript' | 'typescript' | 'polyglot';
          is_private?: boolean;
          last_scanned_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          full_name?: string;
          default_branch?: string;
          last_scanned_at?: string | null;
        };
      };
      scans: {
        Row: {
          id: string;
          repository_id: string;
          branch: string;
          commit_sha: string | null;
          status: 'queued' | 'scanning_ast' | 'analyzing_gemini' | 'completed' | 'failed';
          languages_scanned: string[];
          files_scanned: number;
          lines_analyzed: number;
          duration_seconds: number | null;
          critical_count: number;
          high_count: number;
          medium_count: number;
          low_count: number;
          error_message: string | null;
          initiated_by: string;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          repository_id: string;
          branch?: string;
          commit_sha?: string | null;
          status?: 'queued' | 'scanning_ast' | 'analyzing_gemini' | 'completed' | 'failed';
          languages_scanned?: string[];
          files_scanned?: number;
          lines_analyzed?: number;
          duration_seconds?: number | null;
          critical_count?: number;
          high_count?: number;
          medium_count?: number;
          low_count?: number;
          error_message?: string | null;
          initiated_by: string;
          created_at?: string;
          completed_at?: string | null;
        };
        Update: {
          status?: 'queued' | 'scanning_ast' | 'analyzing_gemini' | 'completed' | 'failed';
          duration_seconds?: number | null;
          critical_count?: number;
          high_count?: number;
          medium_count?: number;
          low_count?: number;
          error_message?: string | null;
          completed_at?: string | null;
        };
      };
      findings: {
        Row: {
          id: string;
          scan_id: string;
          repository_id: string;
          title: string;
          cwe_id: string; // e.g. "CWE-89", "CWE-79", "CWE-78"
          severity: 'critical' | 'high' | 'medium' | 'low';
          cvss_score: number;
          file_path: string;
          line_start: number;
          line_end: number;
          language: 'python' | 'javascript' | 'typescript';
          vulnerable_code: string;
          remediated_code: string | null;
          explanation: string;
          ai_remediation_status: 'available' | 'applied' | 'ignored';
          introduced_by_commit: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          scan_id: string;
          repository_id: string;
          title: string;
          cwe_id: string;
          severity: 'critical' | 'high' | 'medium' | 'low';
          cvss_score: number;
          file_path: string;
          line_start: number;
          line_end: number;
          language: 'python' | 'javascript' | 'typescript';
          vulnerable_code: string;
          remediated_code?: string | null;
          explanation: string;
          ai_remediation_status?: 'available' | 'applied' | 'ignored';
          introduced_by_commit?: string | null;
          created_at?: string;
        };
        Update: {
          ai_remediation_status?: 'available' | 'applied' | 'ignored';
          remediated_code?: string | null;
          explanation?: string;
        };
      };
    };
  };
}
