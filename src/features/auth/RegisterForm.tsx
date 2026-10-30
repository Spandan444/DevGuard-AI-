import React, { useState } from 'react';
import { registerSchema, type RegisterFormData } from '../../schemas/auth.schema';
import { AuthService } from '../../services/authService';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { UserCheck, Shield, Building, Mail, Lock } from 'lucide-react';
import type { AppUser } from '../../types';

export interface RegisterFormProps {
  onSuccess: (user: AppUser) => void;
  onNavigateToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onNavigateToLogin }) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    organizationName: '',
    role: 'security_engineer',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const validation = registerSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof RegisterFormData, string>> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof RegisterFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsLoading(true);
      const { user } = await AuthService.register(validation.data);
      onSuccess(user);
    } catch (err: any) {
      setServerError(err?.message || 'Registration failed. Please check inputs.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-[#161F33] border border-white/[0.08] rounded-2xl shadow-[0_20px_40px_-8px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.05)]">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#0E1526] border border-[#7C3AED]/40 flex items-center justify-center text-[#7C3AED] mb-3 shadow-[0_0_20px_rgba(124,58,237,0.25)]">
          <Shield className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-[#DFE2F1]">Create DevGuard Account</h2>
        <p className="text-xs text-[#94A3B8] mt-1">
          Deploy automated AST vulnerability triage for your engineering team
        </p>
      </div>

      {serverError && (
        <div className="mb-4 p-3 rounded-lg bg-[#450A0A] border border-[#EF4444] text-[#F87171] text-xs">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#DFE2F1] uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <Input
              placeholder="Alex Rivera"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              error={errors.fullName}
              icon={<UserCheck className="w-4 h-4" />}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#DFE2F1] uppercase tracking-wider mb-1.5">
              Work Email
            </label>
            <Input
              type="email"
              placeholder="alex@apex-cyber.io"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              icon={<Mail className="w-4 h-4" />}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#DFE2F1] uppercase tracking-wider mb-1.5">
              Organization Name
            </label>
            <Input
              placeholder="Apex Cyber Systems"
              value={formData.organizationName}
              onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
              error={errors.organizationName}
              icon={<Building className="w-4 h-4" />}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#DFE2F1] uppercase tracking-wider mb-1.5">
              Primary Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
              className="w-full h-9 bg-[#0E1526] border border-[#1E293B] rounded-md px-3 text-xs text-[#F8FAFC] focus:border-[#7C3AED] focus:outline-none"
            >
              <option value="security_engineer">Security Engineer (SecOps)</option>
              <option value="developer">Software Developer</option>
              <option value="admin">Engineering Director / Admin</option>
              <option value="auditor">Compliance Auditor</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#DFE2F1] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <Input
              type="password"
              placeholder="Min 8 chars, 1 uppercase, 1 digit"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              icon={<Lock className="w-4 h-4" />}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#DFE2F1] uppercase tracking-wider mb-1.5">
              Confirm Password
            </label>
            <Input
              type="password"
              placeholder="Repeat password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
              icon={<Lock className="w-4 h-4" />}
            />
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full h-10 mt-3" isLoading={isLoading}>
          Create Organization Workspace
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-white/[0.06] text-center text-xs text-[#94A3B8]">
        Already registered?{' '}
        <button
          type="button"
          onClick={onNavigateToLogin}
          className="text-[#7C3AED] hover:text-[#8B5CF6] font-semibold hover:underline"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};
