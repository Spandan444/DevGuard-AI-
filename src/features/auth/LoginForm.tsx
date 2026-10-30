import React, { useState } from 'react';
import { loginSchema, type LoginFormData } from '../../schemas/auth.schema';
import { AuthService } from '../../services/authService';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ShieldAlert, KeyRound, Mail, Sparkles } from 'lucide-react';
import type { AppUser } from '../../types';

export interface LoginFormProps {
  onSuccess: (user: AppUser) => void;
  onNavigateToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onNavigateToRegister }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof LoginFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsLoading(true);
      const { user } = await AuthService.login(validation.data);
      onSuccess(user);
    } catch (err: any) {
      setServerError(err?.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setFormData({
      email: 'lead.secops@devguard.ai',
      password: 'DevGuard@Security2026',
    });
    setErrors({});
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-[#161F33] border border-white/[0.08] rounded-2xl shadow-[0_20px_40px_-8px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.05)]">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#0E1526] border border-[#7C3AED]/40 flex items-center justify-center text-[#7C3AED] mb-3 shadow-[0_0_20px_rgba(124,58,237,0.25)]">
          <KeyRound className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-[#DFE2F1]">Welcome to DevGuard AI</h2>
        <p className="text-xs text-[#94A3B8] mt-1">
          Sign in to access your AST security audit console and triage pipeline
        </p>
      </div>

      {serverError && (
        <div className="mb-4 p-3 rounded-lg bg-[#450A0A] border border-[#EF4444] text-[#F87171] text-xs flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#DFE2F1] uppercase tracking-wider mb-1.5">
            Work Email
          </label>
          <Input
            type="email"
            placeholder="developer@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            icon={<Mail className="w-4 h-4" />}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-[#DFE2F1] uppercase tracking-wider">
              Password
            </label>
            <span className="text-[11px] text-[#94A3B8] hover:text-[#7C3AED] cursor-pointer">
              Forgot password?
            </span>
          </div>
          <Input
            type="password"
            placeholder="••••••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
            icon={<KeyRound className="w-4 h-4" />}
          />
        </div>

        <Button type="submit" variant="primary" className="w-full h-10 mt-2" isLoading={isLoading}>
          Sign In to DevGuard
        </Button>

        {/* Demo Fast Fill */}
        <Button
          type="button"
          variant="secondary"
          onClick={handleFillDemo}
          className="w-full h-9 text-xs gap-1.5 border-dashed border-white/20 hover:border-violet-400/40"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
          Fill Visual Demo Credentials
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-white/[0.06] text-center text-xs text-[#94A3B8]">
        Don't have an organization account?{' '}
        <button
          type="button"
          onClick={onNavigateToRegister}
          className="text-[#7C3AED] hover:text-[#8B5CF6] font-semibold hover:underline"
        >
          Register for free
        </button>
      </div>
    </div>
  );
};
