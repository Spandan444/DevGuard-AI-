import React, { useState } from 'react';
import { uploadZipSchema, type UploadZipFormData } from '../../schemas/repository.schema';
import { RepositoryService, type RepositoryWithOrigin } from '../../services/repositoryService';
import { Dialog } from '../../components/ui/Dialog';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Upload, FileArchive, CheckCircle2 } from 'lucide-react';
import { formatBytes } from '../../utils/formatters';

export interface UploadZipDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUploaded: (repo: RepositoryWithOrigin) => void;
}

export const UploadZipDialog: React.FC<UploadZipDialogProps> = ({
  isOpen,
  onClose,
  onUploaded,
}) => {
  const [projectName, setProjectName] = useState('');
  const [primaryLanguage, setPrimaryLanguage] = useState<'python' | 'javascript' | 'typescript' | 'polyglot'>('python');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof UploadZipFormData, string>>>({});
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!projectName) {
        setProjectName(file.name.replace(/\.zip$/i, ''));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const payload: UploadZipFormData = {
      projectName,
      primaryLanguage,
      fileName: selectedFile?.name || '',
      fileSizeBytes: selectedFile?.size || 0,
    };

    const result = uploadZipSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof UploadZipFormData, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as keyof UploadZipFormData] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsUploading(true);
      const repo = await RepositoryService.uploadZipArchive(result.data);
      onUploaded(repo);
      onClose();
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Upload ZIP Source Archive"
      description="Upload a local Python, JavaScript, or TypeScript codebase package for air-gapped AST analysis."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#DFE2F1] uppercase tracking-wider mb-1.5">
            Project / Package Name
          </label>
          <Input
            placeholder="e.g. backend-microservice"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            error={errors.projectName}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#DFE2F1] uppercase tracking-wider mb-1.5">
            Primary Target Language
          </label>
          <select
            value={primaryLanguage}
            onChange={(e) => setPrimaryLanguage(e.target.value as any)}
            className="w-full h-9 bg-[#0E1526] border border-[#1E293B] rounded-md px-3 text-xs text-[#F8FAFC] focus:border-[#7C3AED] focus:outline-none"
          >
            <option value="python">Python (FastAPI, Flask, Django AST)</option>
            <option value="typescript">TypeScript (Node.js, Next.js, Express)</option>
            <option value="javascript">JavaScript (ES6, CommonJS, Browser)</option>
            <option value="polyglot">Polyglot Multi-language Monorepo</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#DFE2F1] uppercase tracking-wider mb-1.5">
            Archive File (.zip, max 50MB)
          </label>
          <div className="relative border-2 border-dashed border-[#1E293B] hover:border-violet-400/50 rounded-xl p-6 text-center bg-[#0E1526]/60 transition-colors">
            <input
              type="file"
              accept=".zip"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center pointer-events-none">
              {selectedFile ? (
                <>
                  <CheckCircle2 className="w-8 h-8 text-[#10B981] mb-2" />
                  <span className="font-mono text-xs font-semibold text-[#DFE2F1]">
                    {selectedFile.name}
                  </span>
                  <span className="text-[11px] text-[#94A3B8] mt-0.5">
                    {formatBytes(selectedFile.size)} · Ready to inspect
                  </span>
                </>
              ) : (
                <>
                  <FileArchive className="w-8 h-8 text-[#7C3AED] mb-2" />
                  <span className="text-xs font-semibold text-[#DFE2F1]">
                    Drag and drop your project .zip archive here
                  </span>
                  <span className="text-[11px] text-[#94A3B8] mt-1">
                    or click to browse local files (max 50 MB)
                  </span>
                </>
              )}
            </div>
          </div>
          {errors.fileName && <p className="mt-1 text-[11px] text-[#F87171]">{errors.fileName}</p>}
        </div>

        <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/[0.08]">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isUploading}>
            <Upload className="w-3.5 h-3.5" />
            Upload & Queue AST Analysis
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
