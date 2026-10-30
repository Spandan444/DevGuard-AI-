import React from 'react';
import type { FindingWithMetadata } from '../../services/scanService';
import { SeverityBadge, Pill } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CodeDiffViewer } from '../../components/ui/CodeDiffViewer';
import { X, ExternalLink, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export interface FindingDetailDrawerProps {
  finding: FindingWithMetadata | null;
  onClose: () => void;
  onApplyPatch?: (id: string) => void;
}

export const FindingDetailDrawer: React.FC<FindingDetailDrawerProps> = ({
  finding,
  onClose,
  onApplyPatch,
}) => {
  if (!finding) return null;

  const cweNumeric = finding.cwe_id.replace(/\D/g, '');
  const cweMitreUrl = `https://cwe.mitre.org/data/definitions/${cweNumeric}.html`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <div className="relative w-full max-w-2xl bg-[#0E1526] border-l border-white/[0.08] h-full overflow-y-auto shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-10 flex flex-col">
        {/* Top Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-5 bg-[#161F33] border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <SeverityBadge severity={finding.severity} />
            <span className="font-mono text-xs font-semibold text-[#DFE2F1]">
              CVSS {finding.cvss_score.toFixed(1)}
            </span>
            {finding.isDemoData && (
              <Pill variant="demo">Demo Data</Pill>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#94A3B8] hover:text-white rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1">
          {/* Title and metadata */}
          <div>
            <h2 className="text-base font-bold text-[#DFE2F1] leading-snug">
              {finding.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#94A3B8]">
              <a
                href={cweMitreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] text-[#7C3AED] hover:text-[#8B5CF6] hover:underline"
              >
                {finding.cwe_id}
                <ExternalLink className="w-3 h-3" />
              </a>
              <span>·</span>
              <span className="font-mono text-[11px] text-[#DFE2F1]">
                {finding.file_path}
              </span>
              <span>·</span>
              <span className="font-mono text-[11px] uppercase">
                Lines {finding.line_start}-{finding.line_end}
              </span>
            </div>
          </div>

          {/* Gemini AI explanation box */}
          <div className="p-4 rounded-xl bg-[#161F33] border border-violet-500/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A78BFA] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-[#A78BFA]" />
              Gemini 2.5 Security Engine Triage
            </div>
            <p className="text-xs text-[#DFE2F1] leading-relaxed">
              {finding.explanation}
            </p>
          </div>

          {/* Code Diff Viewer */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                Code Vulnerability & AI Patch
              </span>
            </div>
            <CodeDiffViewer
              filePath={finding.file_path}
              language={finding.language}
              lineStart={finding.line_start}
              vulnerableCode={finding.vulnerable_code}
              remediatedCode={finding.remediated_code}
              onApplyRemediation={() => {
                if (onApplyPatch) onApplyPatch(finding.id);
              }}
            />
          </div>

          {/* Prevention checklist */}
          <div className="p-4 rounded-xl bg-[#0B0F19] border border-white/[0.06] space-y-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] block">
              Remediation Checklist
            </span>
            <div className="space-y-2 text-xs text-[#DFE2F1]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] mt-0.5 shrink-0" />
                <span>Replace string concatenation with parameterized argument binding.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] mt-0.5 shrink-0" />
                <span>Enforce input boundary schema validation using Zod or Pydantic.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] mt-0.5 shrink-0" />
                <span>Add automated integration test simulating hostile malicious payload.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="sticky bottom-0 p-4 bg-[#161F33] border-t border-white/[0.08] flex items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close Inspector
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                alert('Finding marked as accepted risk / suppressed in project security policy.');
                onClose();
              }}
            >
              Suppress Finding
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                if (onApplyPatch) onApplyPatch(finding.id);
                onClose();
              }}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Accept AI Remediation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
