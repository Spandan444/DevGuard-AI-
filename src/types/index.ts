import type { Database } from './database.types';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Repository = Database['public']['Tables']['repositories']['Row'];
export type Scan = Database['public']['Tables']['scans']['Row'];
export type Finding = Database['public']['Tables']['findings']['Row'];

export type SupportedLanguage = 'python' | 'javascript' | 'typescript' | 'polyglot';
export type ScanStatus = 'queued' | 'scanning_ast' | 'analyzing_gemini' | 'completed' | 'failed';

export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'security_engineer' | 'developer' | 'auditor';
  organization: string;
  avatarUrl?: string;
}

export type ViewRoute = 
  | 'landing'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'repositories'
  | 'scans'
  | 'scan-detail'
  | 'settings';

export interface ScanFilterOptions {
  severity?: 'all' | 'critical' | 'high' | 'medium' | 'low';
  language?: 'all' | 'python' | 'javascript' | 'typescript';
  searchQuery?: string;
}

export interface MetricSummary {
  criticalVulnerabilities: number;
  criticalDelta: string;
  highVulnerabilities: number;
  highDelta: string;
  totalRepositories: number;
  cleanRepositories: number;
  averageFixTime: string;
  lastScanTime: string;
}
