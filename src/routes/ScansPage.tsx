import React, { useState } from 'react';
import { ScanService, type FindingWithMetadata } from '../services/scanService';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table';
import { SeverityBadge, Pill } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { FindingDetailDrawer } from '../features/findings/FindingDetailDrawer';
import { EmptyState } from '../components/ui/EmptyState';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  ExternalLink,
  Code2,
  FileCode2,
  ShieldCheck,
  Check,
} from 'lucide-react';

export interface ScansPageProps {
  initialFinding?: FindingWithMetadata | null;
}

export const ScansPage: React.FC<ScansPageProps> = ({ initialFinding }) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFinding, setActiveFinding] = useState<FindingWithMetadata | null>(
    initialFinding || null
  );
  const [appliedPatches, setAppliedPatches] = useState<Set<string>>(new Set());

  const findings = ScanService.getFindings({
    severity: selectedSeverity as any,
    language: selectedLanguage as any,
    searchQuery,
  });

  const handleApplyPatch = (findingId: string) => {
    setAppliedPatches((prev) => new Set(prev).add(findingId));
  };

  const severityTabs = [
    { id: 'all', label: 'All Severities' },
    { id: 'critical', label: 'Critical' },
    { id: 'high', label: 'High' },
    { id: 'medium', label: 'Medium' },
    { id: 'low', label: 'Low' },
  ];

  const languageTabs = [
    { id: 'all', label: 'All Languages' },
    { id: 'python', label: 'Python' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'javascript', label: 'JavaScript' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#DFE2F1]">
            AST Security Findings & Remediation Triage
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Static Abstract Syntax Tree taint analysis results cross-referenced with CWE definitions and Gemini auto-fixes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Pill variant="violet" className="gap-1.5 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
            Gemini 2.5 Auto-Fix Available
          </Pill>
        </div>
      </div>

      {/* Filter and Search Bar with Syntax Chips */}
      <div className="space-y-3 p-4 bg-[#161F33] border border-white/[0.08] rounded-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="w-full flex-1">
            <Input
              placeholder="Search findings (e.g. SQL Injection, CWE-89, filename...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <Tabs
              tabs={severityTabs}
              activeTab={selectedSeverity}
              onChange={setSelectedSeverity}
            />
            <Tabs
              tabs={languageTabs}
              activeTab={selectedLanguage}
              onChange={setSelectedLanguage}
            />
          </div>
        </div>

        {/* Quick query syntax helper */}
        <div className="flex items-center gap-2 text-[11px] text-[#94A3B8]">
          <span className="font-semibold text-[#DFE2F1]">Filter syntax presets:</span>
          <button
            onClick={() => setSearchQuery('CWE-89')}
            className="font-mono bg-[#0E1526] hover:bg-[#1E293B] px-1.5 py-0.5 rounded border border-white/5 text-[#A78BFA]"
          >
            cwe:89
          </button>
          <button
            onClick={() => setSearchQuery('Injection')}
            className="font-mono bg-[#0E1526] hover:bg-[#1E293B] px-1.5 py-0.5 rounded border border-white/5 text-[#38BDF8]"
          >
            category:injection
          </button>
          <button
            onClick={() => setSelectedSeverity('critical')}
            className="font-mono bg-[#0E1526] hover:bg-[#1E293B] px-1.5 py-0.5 rounded border border-white/5 text-[#EF4444]"
          >
            is:critical
          </button>
          {(searchQuery || selectedSeverity !== 'all' || selectedLanguage !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSeverity('all');
                setSelectedLanguage('all');
              }}
              className="text-[#94A3B8] hover:text-white underline ml-auto"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Findings Table */}
      {findings.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Severity</TableHead>
              <TableHead>Vulnerability & CWE</TableHead>
              <TableHead>File Path & Lines</TableHead>
              <TableHead>Language</TableHead>
              <TableHead className="text-right">CVSS 3.1</TableHead>
              <TableHead className="text-right">Remediation Status</TableHead>
              <TableHead className="text-right w-28">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {findings.map((finding) => {
              const isPatched = appliedPatches.has(finding.id);

              return (
                <TableRow
                  key={finding.id}
                  onClick={() => setActiveFinding(finding)}
                  className="hover:bg-[#161F33]"
                >
                  <TableCell>
                    <SeverityBadge severity={finding.severity} />
                  </TableCell>

                  <TableCell>
                    <div className="font-semibold text-[#DFE2F1] text-xs">
                      {finding.title}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-[11px] text-[#7C3AED]">
                        {finding.cwe_id}
                      </span>
                      {finding.isDemoData && (
                        <span className="text-[10px] text-[#F59E0B] font-mono">
                          · [DEMO DATA]
                        </span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="font-mono text-[11px] text-[#94A3B8]">
                    <span>{finding.file_path}</span>
                    <span className="text-[#64748B] block mt-0.5">
                      Lines {finding.line_start}-{finding.line_end}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#DFE2F1] uppercase">
                      {finding.language === 'python' ? (
                        <FileCode2 className="w-3.5 h-3.5 text-[#7C3AED]" />
                      ) : (
                        <Code2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                      )}
                      <span>{finding.language}</span>
                    </div>
                  </TableCell>

                  <TableCell className="font-mono text-xs font-semibold text-right tabular-nums text-[#DFE2F1]">
                    {finding.cvss_score.toFixed(1)}
                  </TableCell>

                  <TableCell className="text-right">
                    {isPatched ? (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase font-semibold text-[#34D399] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                        <Check className="w-3 h-3 text-[#34D399]" />
                        Patch Applied
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase font-semibold text-[#A78BFA] bg-[#7C3AED]/20 px-2 py-0.5 rounded border border-violet-500/30">
                        <Sparkles className="w-3 h-3 text-[#A78BFA]" />
                        Auto-Fix Ready
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setActiveFinding(finding)}
                      className="h-7 text-[11px] px-2.5"
                    >
                      Inspect & Diff
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <EmptyState
          title="No security findings match your filter"
          description="Try broadening your severity or language filters, or reset search terms to view all reported AST vulnerabilities."
          icon={<ShieldCheck className="w-6 h-6 text-[#10B981]" />}
          actionLabel="Reset All Filters"
          onAction={() => {
            setSelectedSeverity('all');
            setSelectedLanguage('all');
            setSearchQuery('');
          }}
        />
      )}

      {/* Finding Detail Inspection Drawer */}
      <FindingDetailDrawer
        finding={activeFinding}
        onClose={() => setActiveFinding(null)}
        onApplyPatch={handleApplyPatch}
      />
    </div>
  );
};
