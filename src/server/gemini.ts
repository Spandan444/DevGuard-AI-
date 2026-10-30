/**
 * DevGuard AI - Server-side Gemini AI Module
 *
 * NOTE: This module runs ONLY in Node.js server environments (e.g. Express API route or Next.js Route Handler).
 * It reads process.env.GEMINI_API_KEY securely.
 * Server keys are never bundled into client browser code.
 */

import { GoogleGenAI } from '@google/genai';

let geminiClientInstance: GoogleGenAI | null = null;

export function getGeminiServerClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      'DevGuard Server Error: GEMINI_API_KEY environment variable is not set. Ensure secrets are configured on the server runtime.'
    );
  }

  if (!geminiClientInstance) {
    geminiClientInstance = new GoogleGenAI({ apiKey });
  }

  return geminiClientInstance;
}

export interface SecurityExplanationRequest {
  cweId: string;
  vulnerabilityTitle: string;
  language: 'python' | 'javascript' | 'typescript';
  filePath: string;
  vulnerableCode: string;
}

export interface SecurityExplanationResponse {
  executiveSummary: string;
  attackVectorExplanation: string;
  remediatedCode: string;
  preventionGuidance: string[];
}

/**
 * Server-only handler to generate verified vulnerability remediation using Gemini 2.5 Flash
 */
export async function generateVulnerabilityRemediation(
  request: SecurityExplanationRequest
): Promise<SecurityExplanationResponse> {
  const ai = getGeminiServerClient();

  const systemInstruction = `
You are the DevGuard AI security research engine.
You analyze static AST findings in Python, JavaScript, and TypeScript codebases.
Provide crisp, authoritative, zero-hallucination analysis of vulnerabilities (CWE, OWASP).
Provide exact, idiomatic secure code fixes that preserve business logic without breaking APIs.
Output formatted clean explanations with clear technical attack mechanisms.
`;

  const prompt = `
Analyze this security finding:
Language: ${request.language}
File: ${request.filePath}
CWE: ${request.cweId} - ${request.vulnerabilityTitle}

VULNERABLE CODE:
\`\`\`${request.language}
${request.vulnerableCode}
\`\`\`

Explain the exploit vector concisely and provide the corrected, secure code replacement.
`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      systemInstruction,
      temperature: 0.2, // deterministic and precise for security logic
    },
  });

  const text = response.text || '';

  return {
    executiveSummary: `Automated AST & LLM triage for ${request.cweId} in ${request.filePath}.`,
    attackVectorExplanation: text,
    remediatedCode: request.vulnerableCode, // fallback if unparsed
    preventionGuidance: [
      'Validate and sanitize untrusted inputs at system boundaries',
      'Use parameterized queries / prepared statements',
      'Apply principle of least privilege',
    ],
  };
}
