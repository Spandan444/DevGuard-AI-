import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-[#64748B] pointer-events-none flex items-center">
              {icon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              'w-full h-9 bg-[#0E1526] border border-[#1E293B] rounded-md px-3 text-xs text-[#F8FAFC] placeholder-[#475569] transition-all duration-150',
              'focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED] focus:shadow-[0_0_12px_rgba(124,58,237,0.25)]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              icon && 'pl-9',
              error && 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-[11px] text-[#F87171]">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
