import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../../components/ui/Card';
import { Pill } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Github, FileArchive, GitBranch, Shield, Play } from 'lucide-react';
import { formatRelativeTime } from '../../utils/formatters';
import type { RepositoryWithOrigin } from '../../services/repositoryService';

export interface RepoCardProps {
  repo: RepositoryWithOrigin;
  onTriggerScan: (repo: RepositoryWithOrigin) => void;
  onViewScans: (repo: RepositoryWithOrigin) => void;
}

export const RepoCard: React.FC<RepoCardProps> = ({
  repo,
  onTriggerScan,
  onViewScans,
}) => {
  const isGithub = repo.source_type === 'github';

  return (
    <Card hoverable className="flex flex-col justify-between">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0E1526] border border-white/10 flex items-center justify-center text-[#DFE2F1]">
              {isGithub ? <Github className="w-4 h-4" /> : <FileArchive className="w-4 h-4 text-[#38BDF8]" />}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#DFE2F1] truncate max-w-[200px]">
                {repo.name}
              </h4>
              <p className="text-[11px] font-mono text-[#94A3B8] truncate max-w-[220px]">
                {repo.full_name}
              </p>
            </div>
          </div>

          <div>
            {repo.isDemoData ? (
              <Pill variant="demo">Demo Data</Pill>
            ) : (
              <Pill variant="live">Live Connected</Pill>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-3 space-y-3">
        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <span className="inline-flex items-center gap-1 font-mono text-[11px] bg-[#0E1526] px-2 py-0.5 rounded border border-white/5 text-[#DFE2F1]">
            <GitBranch className="w-3 h-3 text-[#7C3AED]" />
            {repo.default_branch}
          </span>
          <span className="font-mono text-[11px] uppercase text-[#94A3B8]">
            {repo.primary_language}
          </span>
          {repo.is_private && (
            <span className="text-[11px] text-[#94A3B8]">· Private</span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs pt-1 border-t border-white/[0.04]">
          <span className="text-[#94A3B8]">Last AST Audit:</span>
          <span className="font-mono text-[11px] text-[#DFE2F1]">
            {repo.last_scanned_at ? formatRelativeTime(repo.last_scanned_at) : 'Never scanned'}
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-3 flex items-center justify-between gap-2 border-t border-white/[0.06]">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onViewScans(repo)}
          className="flex-1 text-[11px]"
        >
          <Shield className="w-3 h-3" />
          Findings & History
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onTriggerScan(repo)}
          className="text-[11px]"
        >
          <Play className="w-3 h-3 fill-current" />
          Run Scan
        </Button>
      </CardFooter>
    </Card>
  );
};
