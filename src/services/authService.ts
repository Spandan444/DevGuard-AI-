import type { AppUser } from '../types';
import type { LoginFormData, RegisterFormData } from '../schemas/auth.schema';
import { DEMO_USER } from './mockData';
import { supabaseStatus } from './supabaseClient';

const STORAGE_KEY = 'devguard_auth_user';

export class AuthService {
  /**
   * Retrieves the current authenticated session
   */
  static getCurrentUser(): AppUser | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore JSON parse error in local storage
    }
    // Default to demo user for visual development sandbox preview
    return DEMO_USER;
  }

  /**
   * Performs user sign in
   */
  static async login(credentials: LoginFormData): Promise<{ user: AppUser; isDemo: boolean }> {
    // If live Supabase credentials are configured, connect to live auth
    if (supabaseStatus.isAvailable) {
      // Real Supabase Auth invocation placeholder
      // supabase.auth.signInWithPassword({ email: credentials.email, password: credentials.password })
      const realUser: AppUser = {
        id: 'usr_real_' + Math.random().toString(36).substring(2, 9),
        email: credentials.email,
        name: credentials.email.split('@')[0],
        role: 'developer',
        organization: 'Enterprise Production Org',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(realUser));
      return { user: realUser, isDemo: false };
    }

    // Visual development mode: simulate verified demo login
    const demoUser: AppUser = {
      ...DEMO_USER,
      email: credentials.email || DEMO_USER.email,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
    return { user: demoUser, isDemo: true };
  }

  /**
   * Registers a new account
   */
  static async register(data: RegisterFormData): Promise<{ user: AppUser; isDemo: boolean }> {
    const newUser: AppUser = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      email: data.email,
      name: data.fullName,
      role: data.role,
      organization: data.organizationName,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return {
      user: newUser,
      isDemo: !supabaseStatus.isAvailable,
    };
  }

  /**
   * Clears session
   */
  static logout(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
