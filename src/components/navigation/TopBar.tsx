import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export interface TopBarProps {
  onNavigateLogin: () => void;
  onNavigateRegister: () => void;
  onScrollToSection: (id: string) => void;
}

/**
 * Top Bar Contract:
 * [Brand title, one line] — [4–5 nav links, 1–2 word labels, single-line] — [1 primary action]
 */
export const TopBar: React.FC<TopBarProps> = ({
  onNavigateLogin,
  onNavigateRegister,
  onScrollToSection,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0F19]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#161F33] border border-[#7C3AED]/50 flex items-center justify-center text-[#7C3AED] shadow-[0_0_12px_rgba(124,58,237,0.3)]">
            <ShieldCheck className="w-5 h-5 text-[#8B5CF6]" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#DFE2F1]">
            DevGuard <span className="text-[#A78BFA]">AI</span>
          </span>
        </div>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#94A3B8]">
          <button
            onClick={() => onScrollToSection('capabilities')}
            className="hover:text-[#DFE2F1] transition-colors whitespace-nowrap shrink-0"
          >
            Capabilities
          </button>
          <button
            onClick={() => onScrollToSection('languages')}
            className="hover:text-[#DFE2F1] transition-colors whitespace-nowrap shrink-0"
          >
            Languages
          </button>
          <button
            onClick={() => onScrollToSection('architecture')}
            className="hover:text-[#DFE2F1] transition-colors whitespace-nowrap shrink-0"
          >
            Architecture
          </button>
          <button
            onClick={() => onScrollToSection('security')}
            className="hover:text-[#DFE2F1] transition-colors whitespace-nowrap shrink-0"
          >
            Security Invariants
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onNavigateLogin}
            className="text-xs text-[#94A3B8] hover:text-[#DFE2F1]"
          >
            Sign In
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={onNavigateRegister}
            className="text-xs"
          >
            <span>Launch Platform</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
