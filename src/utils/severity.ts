/**
 * Semantic Vulnerability & Status Matrix according to Obsidian Sentinel specification:
 * - Critical Severity: Crimson Accent (#EF4444)
 * - High Severity: Amber Flame (#F59E0B)
 * - Medium Severity: Sand Gold (#EAB308)
 * - Low / Info: Ice Cyan (#38BDF8)
 * - Secure / Clean / Pass: Emerald Shield (#10B981)
 */

export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'secure';

export interface SeverityStyle {
  label: string;
  badgeBg: string;
  textColor: string;
  borderColor: string;
  dotColor?: string;
  pillBg: string;
}

export const SEVERITY_CONFIG: Record<SeverityLevel, SeverityStyle> = {
  critical: {
    label: 'CRITICAL',
    badgeBg: 'rgba(69, 10, 10, 0.6)',
    textColor: '#F87171',
    borderColor: '#EF4444',
    dotColor: '#EF4444',
    pillBg: 'bg-red-950/60 text-red-400 border-red-500/80',
  },
  high: {
    label: 'HIGH',
    badgeBg: 'rgba(69, 26, 3, 0.6)',
    textColor: '#FBBF24',
    borderColor: '#F59E0B',
    dotColor: '#F59E0B',
    pillBg: 'bg-amber-950/60 text-amber-300 border-amber-500/80',
  },
  medium: {
    label: 'MEDIUM',
    badgeBg: 'rgba(66, 32, 6, 0.5)',
    textColor: '#FEF08A',
    borderColor: '#EAB308',
    dotColor: '#EAB308',
    pillBg: 'bg-yellow-950/40 text-yellow-200 border-yellow-500/80',
  },
  low: {
    label: 'LOW',
    badgeBg: 'rgba(8, 47, 73, 0.5)',
    textColor: '#38BDF8',
    borderColor: '#0284C7',
    dotColor: '#38BDF8',
    pillBg: 'bg-sky-950/50 text-sky-300 border-sky-500/80',
  },
  secure: {
    label: 'SECURE',
    badgeBg: 'rgba(6, 78, 59, 0.5)',
    textColor: '#34D399',
    borderColor: '#10B981',
    dotColor: '#10B981',
    pillBg: 'bg-emerald-950/50 text-emerald-300 border-emerald-500/80',
  },
};

export function getSeverityStyle(severity: string): SeverityStyle {
  const normalized = severity.toLowerCase() as SeverityLevel;
  return SEVERITY_CONFIG[normalized] || SEVERITY_CONFIG.low;
}

export function cvssToSeverity(score: number): SeverityLevel {
  if (score >= 9.0) return 'critical';
  if (score >= 7.0) return 'high';
  if (score >= 4.0) return 'medium';
  if (score > 0.0) return 'low';
  return 'secure';
}
