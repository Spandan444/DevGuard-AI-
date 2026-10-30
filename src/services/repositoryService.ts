import type { Repository } from '../types';
import type { ConnectGitHubRepoFormData, UploadZipFormData } from '../schemas/repository.schema';
import { DEMO_REPOSITORIES, type DemoRepository } from './mockData';
import { supabaseStatus } from './supabaseClient';

const CUSTOM_REPOS_KEY = 'devguard_custom_repositories';

export interface RepositoryWithOrigin extends Repository {
  isDemoData: boolean;
  openIssuesCount?: number;
}

export class RepositoryService {
  /**
   * Retrieves list of repositories with clear separation of demo data vs user additions
   */
  static getRepositories(): RepositoryWithOrigin[] {
    const customRepos = this.getCustomRepositories();
    
    // In live Supabase mode without demo data, only return customRepos
    if (supabaseStatus.isAvailable && customRepos.length > 0) {
      return customRepos;
    }

    // Visual development mode returns realistic demo repos + any custom connected in this session
    return [...customRepos, ...DEMO_REPOSITORIES];
  }

  private static getCustomRepositories(): RepositoryWithOrigin[] {
    try {
      const stored = localStorage.getItem(CUSTOM_REPOS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore JSON parse errors
    }
    return [];
  }

  /**
   * Connects a new GitHub repository
   */
  static async connectGitHubRepo(data: ConnectGitHubRepoFormData): Promise<RepositoryWithOrigin> {
    const parts = data.repositoryUrl.replace('https://github.com/', '').split('/');
    const repoName = parts[1] || 'repository';
    const fullName = parts.join('/');

    const newRepo: RepositoryWithOrigin = {
      id: `repo_gh_${Date.now()}`,
      user_id: 'usr_current',
      name: repoName,
      full_name: fullName,
      source_type: 'github',
      html_url: data.repositoryUrl,
      default_branch: data.branch,
      primary_language: 'polyglot',
      is_private: data.isPrivate,
      last_scanned_at: null,
      created_at: new Date().toISOString(),
      isDemoData: false, // Explicitly not demo data
      openIssuesCount: 0,
    };

    const current = this.getCustomRepositories();
    localStorage.setItem(CUSTOM_REPOS_KEY, JSON.stringify([newRepo, ...current]));
    return newRepo;
  }

  /**
   * Handles ZIP project upload
   */
  static async uploadZipArchive(data: UploadZipFormData): Promise<RepositoryWithOrigin> {
    const newRepo: RepositoryWithOrigin = {
      id: `repo_zip_${Date.now()}`,
      user_id: 'usr_current',
      name: data.projectName,
      full_name: `local-upload/${data.projectName}`,
      source_type: 'zip_archive',
      html_url: null,
      default_branch: 'archive-main',
      primary_language: data.primaryLanguage,
      is_private: true,
      last_scanned_at: null,
      created_at: new Date().toISOString(),
      isDemoData: false, // User-uploaded real archive
      openIssuesCount: 0,
    };

    const current = this.getCustomRepositories();
    localStorage.setItem(CUSTOM_REPOS_KEY, JSON.stringify([newRepo, ...current]));
    return newRepo;
  }

  static getRepositoryById(id: string): RepositoryWithOrigin | undefined {
    return this.getRepositories().find((r) => r.id === id);
  }
}
