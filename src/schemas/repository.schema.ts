import { z } from 'zod';

export const connectGitHubRepoSchema = z.object({
  repositoryUrl: z
    .string()
    .url('Must be a valid URL')
    .regex(/^https:\/\/github\.com\/[\w-]+\/[\w.-]+$/, 'Must be a valid GitHub repository URL (e.g. https://github.com/org/repo)'),
  branch: z.string().min(1, 'Branch name is required').default('main'),
  isPrivate: z.boolean().default(true),
  scanOnPush: z.boolean().default(true),
});

export type ConnectGitHubRepoFormData = z.infer<typeof connectGitHubRepoSchema>;

export const uploadZipSchema = z.object({
  projectName: z
    .string()
    .min(2, 'Project name must be at least 2 characters')
    .max(50, 'Project name too long')
    .regex(/^[\w.-]+$/, 'Project name can only contain letters, numbers, hyphens, and dots'),
  primaryLanguage: z.enum(['python', 'javascript', 'typescript', 'polyglot']),
  fileName: z
    .string()
    .min(1, 'Archive file must be selected')
    .regex(/\.zip$/i, 'Archive must be a .zip file'),
  fileSizeBytes: z
    .number()
    .max(50 * 1024 * 1024, 'ZIP file must not exceed 50 MB'),
});

export type UploadZipFormData = z.infer<typeof uploadZipSchema>;
