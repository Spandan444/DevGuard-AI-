import React, { useState } from 'react';
import { connectGitHubRepoSchema, type ConnectGitHubRepoFormData } from '../../schemas/repository.schema';
import { RepositoryService, type RepositoryWithOrigin } from '../../services/repositoryService';
import { Dialog } from '../../components/ui/Dialog';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Github, GitBranch, Lock, ShieldCheck } from 'lucide-react';

export interface ConnectRepoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConnected: (repo: RepositoryWithOrigin) => void;
}

export const ConnectRepoDialog: React.FC<ConnectRepoDialogProps> = ({
  isOpen,
  onClose,
  onConnected,
}) => {
  const [formData, setFormData] = useState<ConnectGitHubRepoFormData>({
    repositoryUrl: '',
    branch: 'main',
    isPrivate: true,
    scanOnPush: true,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ConnectGitHubRepoFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = connectGitHubRepoSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ConnectGitHubRepoFormData, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as keyof ConnectGitHubRepoFormData] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsLoading(true);
      const repo = await RepositoryService.connectGitHubRepo(result.data);
      onConnected(repo);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Connect GitHub Repository"
      description="DevGuard AI installs AST webhooks to scan every pull request for Python, JavaScript and TypeScript vulnerabilities."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#DFE2F1] uppercase tracking-wider mb-1.5">
            GitHub Repository URL
          </label>
          <Input
            placeholder="https://github.com/organization/secure-api"
            value={formData.repositoryUrl}
            onChange={(e) => setFormData({ ...formData, repositoryUrl: e.target.value })}
            error={errors.repositoryUrl}
            icon={<Github className="w-4 h-4" />}
          />
          <span className="text-[11px] text-[#94A3B8] mt-1 block">
            Example: https://github.com/facebook/react or your organization's private repo
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#DFE2F1] uppercase tracking-wider mb-1.5">
              Default Target Branch
            </label>
            <Input
              placeholder="main"
              value={formData.branch}
              onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              error={errors.branch}
              icon={<GitBranch className="w-4 h-4" />}
            />
          </div>

          <div className="flex flex-col justify-end pb-1 space-y-2">
            <label className="flex items-center gap-2 text-xs text-[#DFE2F1] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPrivate}
                onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
                className="rounded bg-[#0E1526] border-[#1E293B] text-[#7C3AED] focus:ring-[#7C3AED]"
              />
              <Lock className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>Private Repository</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-[#DFE2F1] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.scanOnPush}
                onChange={(e) => setFormData({ ...formData, scanOnPush: e.target.checked })}
                className="rounded bg-[#0E1526] border-[#1E293B] text-[#7C3AED] focus:ring-[#7C3AED]"
              />
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Auto-scan on PR push</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/[0.08]">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isLoading}>
            Connect & Authorize
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
