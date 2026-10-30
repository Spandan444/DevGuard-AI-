import React from 'react';
import { cn } from '../../utils/cn';
import { ShieldCheck } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-12 bg-[#0E1526]/50 border border-dashed border-[#1E293B] rounded-xl',
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-[#161F33] border border-white/10 flex items-center justify-center text-[#7C3AED] mb-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
        {icon || <ShieldCheck className="w-6 h-6 text-[#10B981]" />}
      </div>
      <h3 className="text-sm font-semibold text-[#DFE2F1] mb-1">{title}</h3>
      <p className="text-xs text-[#94A3B8] max-w-sm mb-5 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
