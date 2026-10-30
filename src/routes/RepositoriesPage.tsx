import React, { useState } from 'react';
import { RepositoryService, type RepositoryWithOrigin } from '../services/repositoryService';
import { RepoCard } from '../features/repositories/RepoCard';
import { ConnectRepoDialog } from '../features/repositories/ConnectRepoDialog';
import { UploadZipDialog } from '../features/repositories/UploadZipDialog';
import { TriggerScanDialog } from '../features/scans/TriggerScanDialog';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { PlusCircle, Upload, Search, GitFork } from 'lucide-react';
import type { ScanWithOrigin } from '../services/scanService';

export interface RepositoriesPageProps {
  onScanComplete: (scan: ScanWithOrigin) => void;
  onViewScans: (repo: RepositoryWithOrigin) => void;
}

export const RepositoriesPage: React.FC<RepositoriesPageProps> = ({
  onScanComplete,
  onViewScans,
}) => {
  const [repositories, setRepositories] = useState<RepositoryWithOrigin[]>(() =>
    RepositoryService.getRepositories()
  );
  const [search, setSearch] = useState('');
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedRepoForScan, setSelectedRepoForScan] = useState<RepositoryWithOrigin | null>(null);

  const filtered = repositories.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.full_name.toLowerCase().includes(search.toLowerCase()) ||
      r.primary_language.toLowerCase().includes(search.toLowerCase())
  );

  const handleRepoAdded = (newRepo: RepositoryWithOrigin) => {
    setRepositories([newRepo, ...repositories]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#DFE2F1]">
            Monitored Code Repositories
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Connect GitHub repositories or upload air-gapped source ZIP files for static AST vulnerability scanning.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsUploadOpen(true)}
            className="text-xs gap-1.5"
          >
            <Upload className="w-3.5 h-3.5 text-[#38BDF8]" />
            Upload ZIP
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsConnectOpen(true)}
            className="text-xs gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Connect GitHub Repo
          </Button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-3">
        <div className="w-full sm:max-w-xs">
          <Input
            placeholder="Search repository name, language..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="text-xs font-mono text-[#94A3B8]">
          Showing {filtered.length} of {repositories.length} repositories
        </div>
      </div>

      {/* Grid of repositories */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((repo) => (
            <RepoCard
              key={repo.id}
              repo={repo}
              onTriggerScan={(r) => setSelectedRepoForScan(r)}
              onViewScans={onViewScans}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No repositories found"
          description="No connected repositories matched your search query. Connect a GitHub repository or upload a project ZIP."
          icon={<GitFork className="w-6 h-6 text-[#7C3AED]" />}
          actionLabel="Connect GitHub Repo"
          onAction={() => setIsConnectOpen(true)}
        />
      )}

      {/* Modals */}
      <ConnectRepoDialog
        isOpen={isConnectOpen}
        onClose={() => setIsConnectOpen(false)}
        onConnected={handleRepoAdded}
      />

      <UploadZipDialog
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploaded={handleRepoAdded}
      />

      <TriggerScanDialog
        isOpen={Boolean(selectedRepoForScan)}
        onClose={() => setSelectedRepoForScan(null)}
        repository={selectedRepoForScan}
        onScanComplete={onScanComplete}
      />
    </div>
  );
};
