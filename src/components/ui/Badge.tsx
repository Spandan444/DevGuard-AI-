import React from 'react';
import { cn } from '../../utils/cn';
import { getSeverityStyle, type SeverityLevel } from '../../utils/severity';

export interface SeverityBadgeProps {
  severity: SeverityLevel | string;
  showDot?: boolean;
  className?: string;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  severity,
  showDot = true,
  className,
}) => {
  const style = getSeverityStyle(severity);
  const isCritical = severity.toLowerCase() === 'critical';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[11px] font-semibold tracking-wider uppercase border select-none shrink-0',
        className
      )}
      style={{
        backgroundColor: style.badgeBg,
        color: style.textColor,
        borderColor: style.borderColor,
      }}
    >
      {showDot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full shrink-0',
            isCritical && 'animate-pulse'
          )}
          style={{ backgroundColor: style.dotColor }}
        />
      )}
      {style.label}
    </span>
  );
};

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'violet' | 'cyan' | 'demo' | 'live';
}

export const Pill: React.FC<PillProps> = ({
  variant = 'neutral',
  className,
  children,
  ...props
}) => {
  const variants = {
    neutral: 'bg-[#161F33] text-[#DFE2F1] border-white/10',
    violet: 'bg-[#7C3AED]/20 text-[#D2BBFF] border-[#7C3AED]/40',
    cyan: 'bg-[#38BDF8]/15 text-[#7BD0FF] border-[#38BDF8]/30',
    demo: 'bg-amber-950/70 text-amber-300 border-amber-500/50',
    live: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border select-none whitespace-nowrap shrink-0',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
