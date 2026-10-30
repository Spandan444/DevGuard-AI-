import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Sparkles, Copy, Check } from 'lucide-react';
import { Button } from './Button';

export interface CodeDiffViewerProps {
  filePath: string;
  language: 'python' | 'javascript' | 'typescript';
  lineStart: number;
  vulnerableCode: string;
  remediatedCode: string | null;
  onApplyRemediation?: () => void;
  className?: string;
}

export const CodeDiffViewer: React.FC<CodeDiffViewerProps> = ({
  filePath,
  language,
  lineStart,
  vulnerableCode,
  remediatedCode,
  onApplyRemediation,
  className,
}) => {
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('unified');
  const [copied, setCopied] = useState(false);

  const vulnLines = vulnerableCode.trim().split('\n');
  const fixedLines = (remediatedCode || '').trim().split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(remediatedCode || vulnerableCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'rounded-xl border border-white/[0.08] bg-[#0E1526] overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]',
        className
      )}
    >
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#111827] border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-medium text-[#DFE2F1] bg-[#161F33] px-2.5 py-1 rounded border border-white/10">
            {filePath}
          </span>
          <span className="text-[11px] font-mono text-[#94A3B8] uppercase">
            {language} · Line {lineStart}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {remediatedCode && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[10px] font-semibold tracking-wider uppercase bg-[#7C3AED] text-white border border-violet-400/40">
              <Sparkles className="w-3 h-3 text-white" />
              AI AUTO-FIX AVAILABLE
            </span>
          )}

          <div className="inline-flex rounded-md border border-[#1E293B] bg-[#0B0F19] p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('unified')}
              className={cn(
                'px-2 py-1 rounded text-[11px] font-medium transition-colors',
                viewMode === 'unified' ? 'bg-[#1E293B] text-white' : 'text-[#94A3B8] hover:text-white'
              )}
            >
              Unified
            </button>
            <button
              type="button"
              onClick={() => setViewMode('split')}
              className={cn(
                'px-2 py-1 rounded text-[11px] font-medium transition-colors',
                viewMode === 'split' ? 'bg-[#1E293B] text-white' : 'text-[#94A3B8] hover:text-white'
              )}
            >
              Split
            </button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2 text-[11px] text-[#94A3B8] hover:text-white"
          >
            {copied ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
          </Button>

          {remediatedCode && onApplyRemediation && (
            <Button
              variant="primary"
              size="sm"
              onClick={onApplyRemediation}
              className="h-7 text-[11px]"
            >
              Apply Patch
            </Button>
          )}
        </div>
      </div>

      {/* Code diff container */}
      <div className="overflow-x-auto text-xs font-mono">
        {viewMode === 'unified' ? (
          <div className="divide-y divide-white/[0.02]">
            {/* Vulnerable removed lines */}
            {vulnLines.map((line, idx) => (
              <div
                key={`vuln-${idx}`}
                className="flex items-stretch bg-[#EF4444]/[0.10] border-l-[3px] border-l-[#EF4444] text-[#FECACA] hover:bg-[#EF4444]/[0.15]"
              >
                <div className="w-12 py-1 px-2.5 text-right bg-[#0B0F19] text-[#64748B] select-none border-r border-white/[0.04] shrink-0 tabular-nums">
                  {lineStart + idx}
                </div>
                <div className="w-6 py-1 text-center text-[#EF4444] select-none shrink-0 font-bold">-</div>
                <pre className="py-1 px-3 overflow-x-auto whitespace-pre font-mono text-[12px]">{line}</pre>
              </div>
            ))}

            {/* AI Remediated lines */}
            {fixedLines.map((line, idx) => (
              <div
                key={`fixed-${idx}`}
                className="flex items-stretch bg-[#10B981]/[0.10] border-l-[3px] border-l-[#10B981] text-[#A7F3D0] hover:bg-[#10B981]/[0.15]"
              >
                <div className="w-12 py-1 px-2.5 text-right bg-[#0B0F19] text-[#64748B] select-none border-r border-white/[0.04] shrink-0 tabular-nums">
                  {lineStart + idx}
                </div>
                <div className="w-6 py-1 text-center text-[#10B981] select-none shrink-0 font-bold">+</div>
                <pre className="py-1 px-3 overflow-x-auto whitespace-pre font-mono text-[12px]">{line}</pre>
              </div>
            ))}
          </div>
        ) : (
          /* Split View */
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
            {/* Left: Vulnerable */}
            <div className="bg-[#0B0F19]/40">
              <div className="px-3 py-1.5 text-[10px] font-mono text-[#F87171] uppercase tracking-wider bg-[#EF4444]/10 border-b border-white/[0.04]">
                Detected AST Vulnerability
              </div>
              {vulnLines.map((line, idx) => (
                <div
                  key={`split-v-${idx}`}
                  className="flex items-stretch bg-[#EF4444]/[0.08] text-[#FECACA]"
                >
                  <div className="w-10 py-1 px-2 text-right bg-[#0B0F19] text-[#64748B] select-none border-r border-white/[0.04] shrink-0 tabular-nums">
                    {lineStart + idx}
                  </div>
                  <pre className="py-1 px-3 overflow-x-auto whitespace-pre font-mono text-[12px]">{line}</pre>
                </div>
              ))}
            </div>

            {/* Right: Remediated */}
            <div className="bg-[#0B0F19]/40">
              <div className="px-3 py-1.5 text-[10px] font-mono text-[#34D399] uppercase tracking-wider bg-[#10B981]/10 border-b border-white/[0.04]">
                Gemini Secure Patch
              </div>
              {fixedLines.map((line, idx) => (
                <div
                  key={`split-f-${idx}`}
                  className="flex items-stretch bg-[#10B981]/[0.08] text-[#A7F3D0]"
                >
                  <div className="w-10 py-1 px-2 text-right bg-[#0B0F19] text-[#64748B] select-none border-r border-white/[0.04] shrink-0 tabular-nums">
                    {lineStart + idx}
                  </div>
                  <pre className="py-1 px-3 overflow-x-auto whitespace-pre font-mono text-[12px]">{line}</pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
