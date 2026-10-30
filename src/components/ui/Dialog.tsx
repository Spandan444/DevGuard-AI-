import React, { useEffect } from 'react';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'lg',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Level 4 Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B0F19]/80 backdrop-blur-md transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Dialog Surface Level 4 */}
      <div
        className={cn(
          'relative w-full bg-[#161F33] border border-[#7C3AED]/40 rounded-xl p-6 shadow-[0_20px_40px_-8px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.08)] z-10 animate-in fade-in zoom-in-95 duration-150',
          maxWidthClasses[maxWidth]
        )}
      >
        <div className="flex items-start justify-between pb-4 border-b border-white/[0.08] mb-5">
          <div>
            <h2 className="text-base font-semibold text-[#DFE2F1]">{title}</h2>
            {description && <p className="text-xs text-[#94A3B8] mt-1">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#94A3B8] hover:text-white rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};
