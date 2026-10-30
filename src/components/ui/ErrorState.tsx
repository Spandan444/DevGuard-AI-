import React from 'react';
import { cn } from '../../utils/cn';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Security Engine Diagnostic Alert',
  message,
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        'p-5 bg-[#450A0A]/40 border border-[#7F1D1D] rounded-xl flex items-start gap-4 text-left',
        className
      )}
    >
      <div className="w-9 h-9 rounded-lg bg-[#450A0A] border border-[#EF4444] flex items-center justify-center text-[#F87171] shrink-0">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h4 className="text-xs font-semibold text-[#F87171] uppercase tracking-wide">
          {title}
        </h4>
        <p className="text-xs text-[#FECACA] mt-1 leading-relaxed">{message}</p>
        {onRetry && (
          <div className="mt-3">
            <Button
              variant="destructive"
              size="sm"
              onClick={onRetry}
              className="h-7 text-[11px] gap-1.5"
            >
              <RefreshCw className="w-3 h-3" />
              Retry Diagnostic
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
