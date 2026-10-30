import React from 'react';
import { cn } from '../../utils/cn';

export interface ScanProgressBarProps {
  progress?: number; // 0 to 100
  isIndeterminate?: boolean;
  label?: string;
  className?: string;
}

export const ScanProgressBar: React.FC<ScanProgressBarProps> = ({
  progress = 0,
  isIndeterminate = false,
  label,
  className,
}) => {
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mb-1.5">
          <span>{label}</span>
          {!isIndeterminate && <span className="tabular-nums">{Math.round(progress)}%</span>}
        </div>
      )}

      {/* Track: Height 6px, bg #1E293B, rounded-full */}
      <div className="h-1.5 w-full bg-[#1E293B] rounded-full overflow-hidden relative">
        {isIndeterminate ? (
          <div className="h-full w-1/3 bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] rounded-full animate-scan" />
        ) : (
          <div
            className="h-full bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        )}
      </div>
    </div>
  );
};
