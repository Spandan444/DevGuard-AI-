import React, { useState } from 'react';
import { TopBar } from '../components/navigation/TopBar';
import { Button } from '../components/ui/Button';
import { SeverityBadge, Pill } from '../components/ui/Badge';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import {
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  Terminal,
  Code2,
  FileCode2,
  CheckCircle2,
  Lock,
  GitBranch,
  Sparkles,
} from 'lucide-react';

export interface LandingPageProps {
  onNavigateLogin: () => void;
  onNavigateRegister: () => void;
  onExploreDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateLogin,
  onNavigateRegister,
  onExploreDemo,
}) => {
  const [activeSnippetTab, setActiveSnippetTab] = useState<'python' | 'typescript' | 'javascript'>('python');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sampleSnippets = {
    python: {
      title: 'Python FastAPI AST SQL Injection Sink',
      file: 'routers/checkout.py',
      cwe: 'CWE-89',
      severity: 'critical',
      code: `# AST Sink Detected: Raw f-string format in DB execution
@router.post("/query")
async def fetch_record(account_id: str, db: Session = Depends(get_db)):
    # ❌ Tainted parameter directly formatted into raw SQL
    res = db.execute(f"SELECT * FROM accounts WHERE id = '{account_id}'")
    return res.fetchall()`,
      fix: `# ✅ Gemini Remediated: Parameterized query binding
@router.post("/query")
async def fetch_record(account_id: str, db: Session = Depends(get_db)):
    stmt = text("SELECT * FROM accounts WHERE id = :id")
    res = db.execute(stmt, {"id": account_id})
    return res.fetchall()`,
    },
    typescript: {
      title: 'TypeScript OS Command Injection Sink',
      file: 'workers/runner.ts',
      cwe: 'CWE-78',
      severity: 'critical',
      code: `// ❌ Tainted child_process.exec invokes shell interpreter
import { exec } from 'node:child_process';

export function runScript(targetBranch: string) {
  exec(\`git fetch origin \${targetBranch}\`, (err, stdout) => {
    /* Vulnerable to command chaining: main; rm -rf / */
  });
}`,
      fix: `// ✅ Gemini Remediated: execFile without shell interpretation
import { execFile } from 'node:child_process';

export function runScript(targetBranch: string) {
  if (!/^[a-zA-Z0-9_.-]+$/.test(targetBranch)) throw new Error('Invalid branch');
  execFile('git', ['fetch', 'origin', targetBranch], { shell: false });
}`,
    },
    javascript: {
      title: 'JavaScript Catastrophic ReDoS Regex Backtracking',
      file: 'lib/validator.js',
      cwe: 'CWE-1333',
      severity: 'high',
      code: `// ❌ Catastrophic backtracking with nested quantifiers
const USERNAME_REGEX = /^([a-zA-Z0-9]+)+$/;

function checkUsername(name) {
  return USERNAME_REGEX.test(name); // Locks Node event loop on hostile input
}`,
      fix: `// ✅ Gemini Remediated: Linear length check and atomic matching
function checkUsername(name) {
  if (typeof name !== 'string' || name.length > 64) return false;
  return /^[a-zA-Z0-9]{3,64}$/.test(name);
}`,
    },
  };

  const activeSnippet = sampleSnippets[activeSnippetTab];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#DFE2F1]">
      <TopBar
        onNavigateLogin={onNavigateLogin}
        onNavigateRegister={onNavigateRegister}
        onScrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161F33] border border-white/10 text-xs font-mono text-[#A78BFA]">
              <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
              <span>Production-Grade Code Security Engine</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] text-balance">
              Automated Code Security Triage for Python, JavaScript & TypeScript
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
              DevGuard AI traverses your Abstract Syntax Trees to detect dataflow taint sinks,
              CWE vulnerabilities, and supply-chain weaknesses before production deployment.
              Remediate findings with authoritative, verified Gemini-generated patches.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={onExploreDemo}
                className="gap-2"
              >
                <span>Explore Interactive Audit Console</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={onNavigateRegister}
                className="gap-2"
              >
                Create Account
              </Button>
            </div>

            {/* Language Coverage indicators */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-xs text-[#94A3B8]">
              <span className="font-semibold text-[#DFE2F1]">Supported Ecosystems:</span>
              <div className="flex items-center gap-1.5 font-mono text-[#DFE2F1]">
                <FileCode2 className="w-4 h-4 text-[#7C3AED]" /> Python (FastAPI/Django)
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[#DFE2F1]">
                <Code2 className="w-4 h-4 text-[#38BDF8]" /> TypeScript (Node/Next)
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[#DFE2F1]">
                <Code2 className="w-4 h-4 text-[#F59E0B]" /> JavaScript (ES6/CommonJS)
              </div>
            </div>
          </div>

          {/* Right: Interactive AST Audit Code Sandbox Preview */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-white/[0.12] bg-[#0E1526] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.06)] overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#111827] border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]/60" />
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]/60" />
                  <div className="w-3 h-3 rounded-full bg-[#10B981]/60" />
                  <span className="font-mono text-xs text-[#94A3B8] ml-2">
                    ast_taint_analyzer.sh
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {(['python', 'typescript', 'javascript'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveSnippetTab(lang)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono capitalize transition-colors ${
                        activeSnippetTab === lang
                          ? 'bg-[#7C3AED]/20 text-[#D2BBFF] border border-[#7C3AED]/40'
                          : 'text-[#64748B] hover:text-[#DFE2F1]'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Code display */}
              <div className="p-4 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SeverityBadge severity={activeSnippet.severity} />
                    <span className="text-[#DFE2F1] font-semibold">{activeSnippet.cwe}</span>
                  </div>
                  <span className="text-[11px] text-[#64748B]">{activeSnippet.file}</span>
                </div>

                <div className="bg-[#0B0F19] rounded-lg p-3 border border-white/[0.04] text-[11px] overflow-x-auto">
                  <pre className="text-[#FECACA]">{activeSnippet.code}</pre>
                </div>

                <div className="p-2.5 rounded-lg bg-[#161F33] border border-violet-500/30 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#A78BFA] shrink-0 mt-0.5" />
                  <div className="text-[11px] text-[#DFE2F1]">
                    <span className="font-semibold text-[#A78BFA]">Gemini Auto-Remediation:</span>
                    <p className="text-[#94A3B8] mt-0.5">
                      Synthesized static AST patch replaces dynamic sink with bounded binding.
                    </p>
                  </div>
                </div>

                <div className="bg-[#0B0F19] rounded-lg p-3 border border-[#10B981]/30 text-[11px] overflow-x-auto">
                  <pre className="text-[#A7F3D0]">{activeSnippet.fix}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#7C3AED]">
            Enterprise Capabilities
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Comprehensive Static Analysis & Remediation Workflow
          </h2>
          <p className="text-sm text-[#94A3B8]">
            From local developer workbenches to GitHub Actions CI/CD gates, DevGuard AI
            enforces unyielding security invariants without breaking build pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#0E1526] border border-[#7C3AED]/30 flex items-center justify-center text-[#7C3AED]">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">AST Dataflow Taint Tracking</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Traces untrusted user inputs (HTTP headers, query params, form bodies) through
              variable assignments until they reach dangerous system sinks (SQL cursors, shell subprocesses, eval).
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#0E1526] border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Gemini 2.5 Security Synthesis</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Eliminates developer triage fatigue with authoritative vulnerability breakdowns,
              CVSS calculations, and contextual code replacement diffs that preserve business logic.
            </p>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#0E1526] border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">GitHub PR & ZIP Ingestion</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Seamlessly monitor GitHub repositories with automatic pull request auditing, or
              upload air-gapped ZIP source packages for instant on-demand security reviews.
            </p>
          </Card>
        </div>
      </section>

      {/* Architecture & Security Invariants */}
      <section id="architecture" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#38BDF8]">
              Production Architecture
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Zero-Trust Security Boundary Design
            </h2>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              DevGuard AI adheres to strict architectural isolation:
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#161F33] border border-white/[0.06]">
                <Lock className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Server-Only Credential Isolation</span>
                  <span className="text-[#94A3B8]">
                    Gemini API keys and Supabase service-role secrets execute strictly in Node.js server boundaries and are never exposed to browser bundles.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#161F33] border border-white/[0.06]">
                <CheckCircle2 className="w-4 h-4 text-[#7C3AED] mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Zod Strict Boundary Validation</span>
                  <span className="text-[#94A3B8]">
                    Every incoming HTTP request, repository webhook, and ZIP payload is strictly validated at runtime against strongly-typed Zod schemas.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#161F33] border border-white/[0.06]">
                <Layers className="w-4 h-4 text-[#38BDF8] mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Separation of Demo Data & Live DB</span>
                  <span className="text-[#94A3B8]">
                    Demo records for visual design development are isolated and explicitly tagged, preventing data contamination with live Supabase production tables.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#1E293B] bg-[#0E1526] p-6 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#DFE2F1]">
              System Specifications & Coverage
            </h3>
            <div className="divide-y divide-white/[0.06] text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#94A3B8]">AST Parser Engine</span>
                <span className="font-mono text-white">Tree-Sitter / Babel / Python ast</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#94A3B8]">Database Architecture</span>
                <span className="font-mono text-white">Supabase PostgreSQL + RLS</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#94A3B8]">AI Model</span>
                <span className="font-mono text-white">Gemini 2.5 Flash</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#94A3B8]">Security Standards</span>
                <span className="font-mono text-white">CWE Top 25 · OWASP Top 10</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#94A3B8]">Max Archive Payload</span>
                <span className="font-mono text-white">50 MB (.zip)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/[0.08] bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#7C3AED]" />
            <span className="font-semibold text-white">DevGuard AI</span>
            <span>· Mission-critical code security scanning</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={onNavigateLogin} className="hover:text-white">Sign In</button>
            <button onClick={onNavigateRegister} className="hover:text-white">Register</button>
            <button onClick={onExploreDemo} className="hover:text-white">Interactive Console</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
