import type { Scan, Finding, ScanFilterOptions } from '../types';
import type { TriggerScanFormData } from '../schemas/scan.schema';
import { DEMO_SCANS, DEMO_FINDINGS } from './mockData';

export interface FindingWithMetadata extends Finding {
  isDemoData: boolean;
  category?: string;
}

export interface ScanWithOrigin extends Scan {
  isDemoData: boolean;
}

const CUSTOM_SCANS_KEY = 'devguard_custom_scans';

export class ScanService {
  static getScans(): ScanWithOrigin[] {
    const customScans = this.getCustomScans();
    return [...customScans, ...DEMO_SCANS];
  }

  private static getCustomScans(): ScanWithOrigin[] {
    try {
      const stored = localStorage.getItem(CUSTOM_SCANS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore parsing error
    }
    return [];
  }

  static getScanById(id: string): ScanWithOrigin | undefined {
    return this.getScans().find((s) => s.id === id);
  }

  static getFindings(filterOptions?: ScanFilterOptions, scanId?: string): FindingWithMetadata[] {
    let list: FindingWithMetadata[] = DEMO_FINDINGS;

    if (scanId) {
      list = list.filter((f) => f.scan_id === scanId);
    }

    if (filterOptions?.severity && filterOptions.severity !== 'all') {
      list = list.filter((f) => f.severity === filterOptions.severity);
    }

    if (filterOptions?.language && filterOptions.language !== 'all') {
      list = list.filter((f) => f.language === filterOptions.language);
    }

    if (filterOptions?.searchQuery && filterOptions.searchQuery.trim().length > 0) {
      const q = filterOptions.searchQuery.toLowerCase().trim();
      list = list.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.cwe_id.toLowerCase().includes(q) ||
          f.file_path.toLowerCase().includes(q)
      );
    }

    return list;
  }

  static getFindingById(id: string): FindingWithMetadata | undefined {
    return DEMO_FINDINGS.find((f) => f.id === id);
  }

  /**
   * Triggers a new AST code scan run
   */
  static async triggerScan(config: TriggerScanFormData, repoName: string): Promise<ScanWithOrigin> {
    const newScan: ScanWithOrigin = {
      id: `scan_${Date.now()}`,
      repository_id: config.repositoryId,
      branch: config.branch,
      commit_sha: Math.random().toString(16).substring(2, 9),
      status: 'completed',
      languages_scanned: config.languages,
      files_scanned: 42,
      lines_analyzed: 5420,
      duration_seconds: 3.8,
      critical_count: 0,
      high_count: 1,
      medium_count: 1,
      low_count: 0,
      error_message: null,
      initiated_by: `Manual Trigger (${repoName})`,
      created_at: new Date().toISOString(),
      completed_at: new Date(Date.now() + 3800).toISOString(),
      isDemoData: false,
    };

    const current = this.getCustomScans();
    localStorage.setItem(CUSTOM_SCANS_KEY, JSON.stringify([newScan, ...current]));
    return newScan;
  }
}
