import React from 'react';
import { cn } from '../../utils/cn';

export interface StatCardProps {
  label: string;
  value: string | number;
  deltaText?: string;
  deltaType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  subtext?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  deltaText,
  deltaType = 'neutral',
  icon,
  subtext,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-[#161F33] border border-white/[0.08] rounded-xl p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] flex flex-col justify-between',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
          {label}
        </span>
        {icon && <span className="text-[#94A3B8]">{icon}</span>}
      </div>

      <div className="my-3">
        <div className="text-3xl font-bold font-mono tracking-tight text-[#DFE2F1] tabular-nums">
          {value}
        </div>
      </div>

      {(deltaText || subtext) && (
        <div className="flex items-center justify-between text-xs text-[#94A3B8] pt-1">
          {deltaText && (
            <span
              className={cn(
                'inline-flex items-center gap-1 font-mono text-[11px] font-semibold px-1.5 py-0.5 rounded border',
                deltaType === 'positive' && 'bg-emerald-950/50 text-[#34D399] border-emerald-500/40',
                deltaType === 'negative' && 'bg-red-950/50 text-[#F87171] border-red-500/40',
                deltaType === 'neutral' && 'bg-white/5 text-[#94A3B8] border-white/10'
              )}
            >
              {deltaText}
            </span>
          )}
          {subtext && <span className="text-[11px] text-[#94A3B8] ml-auto">{subtext}</span>}
        </div>
      )}
    </div>
  );
};
