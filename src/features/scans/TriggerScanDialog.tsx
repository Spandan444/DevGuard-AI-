import React, { useState } from 'react';
import { triggerScanSchema, type TriggerScanFormData } from '../../schemas/scan.schema';
import { ScanService, type ScanWithOrigin } from '../../services/scanService';
import type { RepositoryWithOrigin } from '../../services/repositoryService';
import { Dialog } from '../../components/ui/Dialog';
import { Button } from '../../components/ui/Button';
import { ScanProgressBar } from './ScanProgressBar';
import { Shield, Cpu, Layers } from 'lucide-react';

export interface TriggerScanDialogProps {
  isOpen: boolean;
  onClose: () => void;
  repository: RepositoryWithOrigin | null;
  onScanComplete: (scan: ScanWithOrigin) => void;
}

export const TriggerScanDialog: React.FC<TriggerScanDialogProps> = ({
  isOpen,
  onClose,
  repository,
  onScanComplete,
}) => {
  const [languages, setLanguages] = useState<('python' | 'javascript' | 'typescript')[]>(['python', 'typescript']);
  const [depth, setDepth] = useState<'shallow_ast' | 'deep_ast_and_gemini' | 'full_dependency_and_ast'>('deep_ast_and_gemini');
  const [blockOnSeverity, setBlockOnSeverity] = useState<'critical' | 'high' | 'none'>('high');
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepLabel, setStepLabel] = useState('');

  if (!repository) return null;

  const toggleLanguage = (lang: 'python' | 'javascript' | 'typescript') => {
    if (languages.includes(lang)) {
      if (languages.length > 1) {
        setLanguages(languages.filter((l) => l !== lang));
      }
    } else {
      setLanguages([...languages, lang]);
    }
  };

  const handleStartScan = async () => {
    const payload: TriggerScanFormData = {
      repositoryId: repository.id,
      branch: repository.default_branch,
      languages,
      depth,
      blockOnSeverity,
    };

    const validated = triggerScanSchema.safeParse(payload);
    if (!validated.success) return;

    setIsScanning(true);
    setProgress(15);
    setStepLabel('Parsing Abstract Syntax Trees across files...');

    setTimeout(() => {
      setProgress(55);
      setStepLabel('Running dataflow sink & source taint analysis...');
    }, 900);

    setTimeout(() => {
      setProgress(85);
      setStepLabel('Synthesizing AST AST findings with Gemini 2.5 Security Engine...');
    }, 1800);

    setTimeout(async () => {
      setProgress(100);
      setStepLabel('Audit complete! Storing results...');
      const completedScan = await ScanService.triggerScan(validated.data, repository.name);
      setIsScanning(false);
      onScanComplete(completedScan);
      onClose();
    }, 2800);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => !isScanning && onClose()}
      title={`Run AST Security Scan on ${repository.name}`}
      description="Configure AST static rule sets and Gemini remediation depth for this audit."
    >
      <div className="space-y-4">
        {/* Languages Selection */}
        <div>
          <label className="block text-xs font-semibold text-[#DFE2F1] uppercase tracking-wider mb-2">
            Target Languages
          </label>
          <div className="flex flex-wrap gap-2">
            {(['python', 'typescript', 'javascript'] as const).map((lang) => {
              const selected = languages.includes(lang);
              return (
                <button
                  key={lang}
                  type="button"
                  disabled={isScanning}
                  onClick={() => toggleLanguage(lang)}
                  className={`px-3 py-1.5 rounded-md font-mono text-xs font-medium border transition-all duration-150 capitalize ${
                    selected
                      ? 'bg-[#7C3AED]/20 text-[#D2BBFF] border-[#7C3AED]'
                      : 'bg-[#0E1526] text-[#94A3B8] border-white/10 hover:border-white/20'
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scan Depth */}
        <div>
          <label className="block text-xs font-semibold text-[#DFE2F1] uppercase tracking-wider mb-1.5">
            Analysis Depth
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div
              onClick={() => !isScanning && setDepth('deep_ast_and_gemini')}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                depth === 'deep_ast_and_gemini'
                  ? 'bg-[#161F33] border-[#7C3AED] shadow-[0_0_12px_rgba(124,58,237,0.2)]'
                  : 'bg-[#0E1526] border-white/10'
              }`}
            >
              <div className="flex items-center gap-1.5 font-semibold text-[#DFE2F1] mb-1">
                <Cpu className="w-3.5 h-3.5 text-[#7C3AED]" />
                AST Taint + Gemini Remediation
              </div>
              <p className="text-[11px] text-[#94A3B8]">
                Deep sink analysis with automated diff patches.
              </p>
            </div>

            <div
              onClick={() => !isScanning && setDepth('shallow_ast')}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                depth === 'shallow_ast'
                  ? 'bg-[#161F33] border-[#7C3AED]'
                  : 'bg-[#0E1526] border-white/10'
              }`}
            >
              <div className="flex items-center gap-1.5 font-semibold text-[#DFE2F1] mb-1">
                <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
                Fast Lint AST Only
              </div>
              <p className="text-[11px] text-[#94A3B8]">
                Rapid syntax & pattern rules without LLM triage.
              </p>
            </div>
          </div>
        </div>

        {/* Severity gate */}
        <div>
          <label className="block text-xs font-semibold text-[#DFE2F1] uppercase tracking-wider mb-1.5">
            CI/CD Gate Blocking Threshold
          </label>
          <select
            disabled={isScanning}
            value={blockOnSeverity}
            onChange={(e) => setBlockOnSeverity(e.target.value as any)}
            className="w-full h-9 bg-[#0E1526] border border-[#1E293B] rounded-md px-3 text-xs text-[#F8FAFC] focus:border-[#7C3AED] focus:outline-none"
          >
            <option value="critical">Block only on CRITICAL findings (CVSS &ge; 9.0)</option>
            <option value="high">Block on HIGH and CRITICAL findings (CVSS &ge; 7.0)</option>
            <option value="none">Permissive (Advisory audit only, do not block)</option>
          </select>
        </div>

        {/* Scanning progress display */}
        {isScanning && (
          <div className="p-4 rounded-xl bg-[#0E1526] border border-white/10 space-y-2">
            <ScanProgressBar progress={progress} label={stepLabel} />
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/[0.08]">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isScanning}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            isLoading={isScanning}
            onClick={handleStartScan}
          >
            <Shield className="w-3.5 h-3.5" />
            Initiate AST Code Scan
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
