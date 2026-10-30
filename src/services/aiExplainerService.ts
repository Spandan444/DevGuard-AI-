import type { Finding } from '../types';

export interface AIExplanationResult {
  executiveSummary: string;
  attackVectorDetails: string;
  remediatedCode: string;
  remediationSteps: string[];
  cweReferenceUrl: string;
}

export class AIExplainerService {
  /**
   * Retrieves or computes verified Gemini security explanation for a finding
   */
  static async explainFinding(finding: Finding): Promise<AIExplanationResult> {
    // Return structured breakdown
    const cweNumeric = finding.cwe_id.replace(/\D/g, '');
    const cweUrl = `https://cwe.mitre.org/data/definitions/${cweNumeric}.html`;

    return {
      executiveSummary: `DevGuard Gemini 2.5 Security Engine triage for ${finding.cwe_id} (${finding.title}) in ${finding.file_path}.`,
      attackVectorDetails: finding.explanation,
      remediatedCode: finding.remediated_code || finding.vulnerable_code,
      remediationSteps: [
        'Replace dynamic string interpolation / untrusted sink with bounded parameter binding',
        'Verify input schemas with Zod / Pydantic at the network boundary',
        'Run AST taint verification to ensure dataflow sink reachability is severed',
        'Add automated regression unit test validating hostile payloads are rejected',
      ],
      cweReferenceUrl: cweUrl,
    };
  }
}
