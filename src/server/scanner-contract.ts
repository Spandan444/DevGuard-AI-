/**
 * DevGuard AI - Scanner Engine Architecture & Invariants
 * 
 * Formal specification for AST-based code vulnerability analysis.
 * NOTE: As per architectural requirements, fake scanning routines are strictly avoided.
 * This contract establishes the pipeline interfaces for:
 * 1. AST Parser Dispatcher (tree-sitter / @typescript-eslint/parser / python ast)
 * 2. Taint & Dataflow Analyzer (Source -> Sanitizer -> Sink)
 * 3. Gemini Remediation Orchestration
 */

export interface ASTNodeLocation {
  filePath: string;
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
}

export interface SecurityRuleDefinition {
  ruleId: string;
  name: string;
  cwe: string;
  owaspCategory: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  languages: ('python' | 'javascript' | 'typescript')[];
  description: string;
  sinkPatterns: string[];
  sanitizerFunctions: string[];
}

export interface ASTScanResult {
  ruleId: string;
  cwe: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  location: ASTNodeLocation;
  codeSnippet: string;
  taintTrace?: {
    sourceVariable: string;
    sinkInvocation: string;
  };
}

export interface ScannerEngineContract {
  name: string;
  version: string;
  supportedLanguages: ('python' | 'javascript' | 'typescript')[];

  /**
   * Parses repository source files into memory and constructs semantic Abstract Syntax Trees.
   */
  parseAbstractSyntaxTree(files: { path: string; content: string }[]): Promise<void>;

  /**
   * Traverses AST for dangerous sinks (e.g., eval(), subprocess.Popen(shell=True), query formatters).
   */
  executeTaintAnalysis(rules: SecurityRuleDefinition[]): Promise<ASTScanResult[]>;

  /**
   * Verifies potential false positives before storing findings into Supabase.
   */
  filterFalsePositives(candidates: ASTScanResult[]): Promise<ASTScanResult[]>;
}
