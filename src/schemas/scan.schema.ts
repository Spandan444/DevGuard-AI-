import { z } from 'zod';

export const triggerScanSchema = z.object({
  repositoryId: z.string().uuid('Valid repository ID required'),
  branch: z.string().min(1, 'Target branch is required'),
  languages: z
    .array(z.enum(['python', 'javascript', 'typescript']))
    .min(1, 'Select at least one language to analyze'),
  depth: z.enum(['shallow_ast', 'deep_ast_and_gemini', 'full_dependency_and_ast']).default('deep_ast_and_gemini'),
  blockOnSeverity: z.enum(['critical', 'high', 'none']).default('high'),
});

export type TriggerScanFormData = z.infer<typeof triggerScanSchema>;
