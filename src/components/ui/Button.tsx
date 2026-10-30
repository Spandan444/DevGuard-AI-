import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'ai';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap shrink-0 active:scale-[0.99] select-none';

    const variants = {
      primary:
        'bg-[#7C3AED] hover:bg-[#8B5CF6] active:bg-[#6D28D9] text-white border border-[#8B5CF6] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]',
      secondary:
        'bg-[#161F33] hover:bg-[#1E293B] active:bg-[#24324D] text-[#F1F5F9] border border-white/10 hover:border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]',
      outline:
        'bg-transparent hover:bg-[#161F33] text-[#DFE2F1] border border-[#1E293B] hover:border-white/20',
      ghost:
        'bg-transparent hover:bg-[#161F33] text-[#DFE2F1] hover:text-white',
      destructive:
        'bg-[#450A0A] hover:bg-[#7F1D1D] text-[#F87171] hover:text-[#FEF2F2] border border-[#7F1D1D]',
      ai:
        'bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] hover:from-[#8B5CF6] hover:to-[#60A5FA] text-white border border-violet-400/30 shadow-[0_0_15px_rgba(124,58,237,0.35)]',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs rounded-md gap-1.5',
      md: 'h-9 px-4 text-xs font-semibold rounded-md gap-2',
      lg: 'h-11 px-5 text-sm font-semibold rounded-lg gap-2.5',
      icon: 'h-9 w-9 rounded-md',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
