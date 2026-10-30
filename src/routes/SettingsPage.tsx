import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Pill } from '../components/ui/Badge';
import { supabaseStatus } from '../services/supabaseClient';
import {
  ShieldCheck,
  Database,
  Lock,
  Cpu,
  Server,
  FileCheck2,
  Terminal,
  ExternalLink,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const schemaTables = [
    {
      name: 'profiles',
      description: 'User authentication profiles, organization associations, RBAC roles.',
      rls: 'Enabled: Users only read their organization profile',
    },
    {
      name: 'repositories',
      description: 'Monitored GitHub URLs, ZIP archives, default branches, primary languages.',
      rls: 'Enabled: Tenant-isolated repository queries',
    },
    {
      name: 'scans',
      description: 'AST audit execution runs, durations, commit SHAs, line metrics, scanner logs.',
      rls: 'Enabled: Scans linked to authorized repository IDs',
    },
    {
      name: 'findings',
      description: 'Taint-detected vulnerabilities, CWE references, line numbers, and Gemini patches.',
      rls: 'Enabled: Findings linked to authorized scan IDs',
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold tracking-tight text-[#DFE2F1]">
          Architecture, Database & Security Invariants
        </h2>
        <p className="text-xs text-[#94A3B8] mt-0.5">
          DevGuard AI production foundation status, Supabase schema definitions, and runtime security isolation boundaries.
        </p>
      </div>

      {/* Security Isolation Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#DFE2F1] flex items-center gap-2">
              <Database className="w-4 h-4 text-[#7C3AED]" />
              Supabase Database
            </span>
            {supabaseStatus.isAvailable ? (
              <Pill variant="live">LIVE POSTGRESQL</Pill>
            ) : (
              <Pill variant="demo">SANDBOX DEMO MODE</Pill>
            )}
          </div>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            {supabaseStatus.isAvailable
              ? `Connected to ${supabaseStatus.supabaseUrl}. All user sessions and AST findings persist with RLS policies.`
              : 'Using isolated in-memory and local mock models for visual development. Real queries are safely decoupled.'}
          </p>
          <div className="text-[11px] font-mono text-[#64748B] pt-2 border-t border-white/[0.04]">
            Env: VITE_SUPABASE_URL
          </div>
        </Card>

        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#DFE2F1] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#10B981]" />
              Zero Browser Secret Leakage
            </span>
            <Pill variant="neutral">ENFORCED</Pill>
          </div>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            `GEMINI_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are strictly segregated inside server modules.
            Browser clients never receive admin credentials or secret tokens.
          </p>
          <div className="text-[11px] font-mono text-[#64748B] pt-2 border-t border-white/[0.04]">
            Module: src/server/gemini.ts
          </div>
        </Card>

        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#DFE2F1] flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#38BDF8]" />
              AST Scanner Contract
            </span>
            <Pill variant="neutral">AUTHENTIC SPEC</Pill>
          </div>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Fake scanner functions are strictly banned. The engine is structured with deterministic
            AST dispatchers for Python AST, TypeScript compiler, and ESLint parse trees.
          </p>
          <div className="text-[11px] font-mono text-[#64748B] pt-2 border-t border-white/[0.04]">
            Contract: src/server/scanner-contract.ts
          </div>
        </Card>
      </div>

      {/* Supabase Schema Tables */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Supabase PostgreSQL Schema Catalog</CardTitle>
          <CardDescription>
            Normalized relational database structure defined in <code className="font-mono text-[#DFE2F1]">src/types/database.types.ts</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-white/[0.06] text-xs">
            {schemaTables.map((table) => (
              <div key={table.name} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-mono font-bold text-sm text-[#DFE2F1]">
                    {table.name}
                  </span>
                  <p className="text-[#94A3B8] text-xs mt-0.5">{table.description}</p>
                </div>
                <div className="font-mono text-[11px] text-[#34D399] bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-500/20 shrink-0">
                  {table.rls}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Structure Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Architectural Directory Organization</CardTitle>
          <CardDescription>
            Clean modular folder layout separating presentation, features, services, schemas, and server modules.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[#0E1526] border border-white/5 space-y-1">
              <div className="text-[#A78BFA] font-bold">src/routes/ & src/components/</div>
              <p className="text-[#94A3B8] font-sans text-[11px]">
                Public landing, auth screens, dashboard shell, reusable design system (buttons, tables, cards, dialogs, diff viewer).
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#0E1526] border border-white/5 space-y-1">
              <div className="text-[#38BDF8] font-bold">src/features/</div>
              <p className="text-[#94A3B8] font-sans text-[11px]">
                Domain-specific workflows: auth forms, repository connectors, ZIP uploader, scan triggers, findings inspection drawer.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#0E1526] border border-white/5 space-y-1">
              <div className="text-[#10B981] font-bold">src/services/ & src/schemas/</div>
              <p className="text-[#94A3B8] font-sans text-[11px]">
                Supabase client bridge, auth and repository services, Zod input validation schemas, and isolated visual mock datasets.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#0E1526] border border-white/5 space-y-1">
              <div className="text-[#FBBF24] font-bold">src/server/ & src/types/</div>
              <p className="text-[#94A3B8] font-sans text-[11px]">
                Server-only Gemini module, AST scanner contract, Supabase admin validator, and database TypeScript definitions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
