import React from 'react';
import { StatCard } from '../components/ui/StatCard';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { SeverityBadge, Pill } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { DEMO_METRICS, DEMO_SCANS, DEMO_FINDINGS } from '../services/mockData';
import { supabaseStatus } from '../services/supabaseClient';
import { formatRelativeTime, formatDuration } from '../utils/formatters';
import type { FindingWithMetadata } from '../services/scanService';
import {
  ShieldAlert,
  ShieldCheck,
  Cpu,
  Clock,
  ArrowRight,
  Database,
  PlusCircle,
  Play,
} from 'lucide-react';

export interface DashboardPageProps {
  onSelectFinding: (finding: FindingWithMetadata) => void;
  onNavigateToRepositories: () => void;
  onNavigateToScans: () => void;
  onOpenConnectRepo: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onSelectFinding,
  onNavigateToRepositories,
  onNavigateToScans,
  onOpenConnectRepo,
}) => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner: Database & Environment Connection Status */}
      <div className="p-4 rounded-xl bg-[#161F33] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#0E1526] border border-white/10 flex items-center justify-center text-[#7C3AED]">
            <Database className="w-4 h-4 text-[#A78BFA]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#DFE2F1]">
                Database & Architecture Status:
              </span>
              {supabaseStatus.isAvailable ? (
                <Pill variant="live">Live Supabase Connected</Pill>
              ) : (
                <Pill variant="demo">Visual Development Sandbox (Demo Data)</Pill>
              )}
            </div>
            <p className="text-[11px] text-[#94A3B8] mt-0.5">
              {supabaseStatus.isAvailable
                ? 'Queries and scans persist directly to your PostgreSQL database with Row Level Security.'
                : 'Demo datasets are active for UI verification. Realistic AST vulnerabilities in Python, JS, and TS are loaded.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="secondary" size="sm" onClick={onOpenConnectRepo} className="gap-1.5 text-xs">
            <PlusCircle className="w-3.5 h-3.5" />
            Connect Repo
          </Button>
          <Button variant="primary" size="sm" onClick={onNavigateToScans} className="gap-1.5 text-xs">
            <Play className="w-3.5 h-3.5 fill-current" />
            Explore Scans
          </Button>
        </div>
      </div>

      {/* 4 Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Critical Vulnerabilities"
          value={DEMO_METRICS.criticalVulnerabilities}
          deltaText={DEMO_METRICS.criticalDelta}
          deltaType="positive"
          icon={<ShieldAlert className="w-4 h-4 text-[#EF4444]" />}
          subtext="Blocking CI gates"
        />
        <StatCard
          label="High Risk Findings"
          value={DEMO_METRICS.highVulnerabilities}
          deltaText={DEMO_METRICS.highDelta}
          deltaType="negative"
          icon={<ShieldAlert className="w-4 h-4 text-[#F59E0B]" />}
          subtext="Requires review"
        />
        <StatCard
          label="Monitored Repositories"
          value={DEMO_METRICS.totalRepositories}
          deltaText={`${DEMO_METRICS.cleanRepositories} clean`}
          deltaType="positive"
          icon={<Cpu className="w-4 h-4 text-[#38BDF8]" />}
          subtext="Python & TS"
        />
        <StatCard
          label="Avg Remediation Time"
          value={DEMO_METRICS.averageFixTime}
          deltaText="-40% with Gemini"
          deltaType="positive"
          icon={<Clock className="w-4 h-4 text-[#10B981]" />}
          subtext="AST auto-patch"
        />
      </div>

      {/* Top Critical Findings Backlog */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#DFE2F1]">
              Critical Findings Requiring Immediate Triage
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Click any finding row to open the AST code inspector, CVSS telemetry, and Gemini remediation patch.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onNavigateToScans}
            className="text-xs text-[#7C3AED] hover:text-[#8B5CF6] gap-1"
          >
            <span>View all findings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Severity</TableHead>
              <TableHead>Vulnerability & CWE</TableHead>
              <TableHead>File Location</TableHead>
              <TableHead>Language</TableHead>
              <TableHead className="text-right">CVSS 3.1</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEMO_FINDINGS.slice(0, 4).map((f) => (
              <TableRow key={f.id} onClick={() => onSelectFinding(f)}>
                <TableCell>
                  <SeverityBadge severity={f.severity} />
                </TableCell>
                <TableCell>
                  <div className="font-semibold text-[#DFE2F1] text-xs">
                    {f.title}
                  </div>
                  <div className="font-mono text-[11px] text-[#7C3AED] mt-0.5">
                    {f.cwe_id} · {f.category}
                  </div>
                </TableCell>
                <TableCell className="font-mono text-[11px] text-[#94A3B8]">
                  {f.file_path}:{f.line_start}
                </TableCell>
                <TableCell className="font-mono text-[11px] uppercase text-[#DFE2F1]">
                  {f.language}
                </TableCell>
                <TableCell className="font-mono text-xs font-semibold text-right tabular-nums text-[#DFE2F1]">
                  {f.cvss_score.toFixed(1)}
                </TableCell>
                <TableCell className="text-right">
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase font-semibold text-[#A78BFA] bg-[#7C3AED]/20 px-2 py-0.5 rounded border border-violet-500/30">
                    AI Fix Ready
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Recent Scans Pipeline */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-[#DFE2F1]">Recent AST Security Scans</h3>
            <p className="text-xs text-[#94A3B8]">
              Automated audit runs across connected repositories and uploaded source archives.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onNavigateToRepositories}
            className="text-xs text-[#94A3B8] hover:text-[#DFE2F1]"
          >
            Manage Repositories
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Target Repository</TableHead>
              <TableHead>Branch / Commit</TableHead>
              <TableHead>Execution Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Lines Analyzed</TableHead>
              <TableHead className="text-right">Findings Summary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEMO_SCANS.map((scan) => (
              <TableRow key={scan.id} onClick={onNavigateToScans}>
                <TableCell className="font-mono text-xs font-semibold text-[#DFE2F1]">
                  {scan.repository_id}
                </TableCell>
                <TableCell className="font-mono text-[11px] text-[#94A3B8]">
                  {scan.branch} @ {scan.commit_sha}
                </TableCell>
                <TableCell className="text-xs text-[#94A3B8]">
                  {formatRelativeTime(scan.created_at)}
                </TableCell>
                <TableCell className="font-mono text-xs tabular-nums text-[#DFE2F1]">
                  {formatDuration(scan.duration_seconds || 0)}
                </TableCell>
                <TableCell className="font-mono text-xs tabular-nums text-[#DFE2F1]">
                  {scan.lines_analyzed.toLocaleString()} lines
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex items-center gap-1.5 font-mono text-[11px]">
                    {scan.critical_count > 0 && (
                      <span className="text-[#F87171]">{scan.critical_count} Crit</span>
                    )}
                    {scan.high_count > 0 && (
                      <span className="text-[#FBBF24]">{scan.high_count} High</span>
                    )}
                    {scan.critical_count === 0 && scan.high_count === 0 && (
                      <span className="text-[#34D399]">Clean Pass</span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
