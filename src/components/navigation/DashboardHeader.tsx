import React from 'react';
import type { AppUser, ViewRoute } from '../../types';
import { Pill } from '../ui/Badge';
import { Button } from '../ui/Button';
import { supabaseStatus } from '../../services/supabaseClient';
import { LogOut, Database, User, Menu } from 'lucide-react';

export interface DashboardHeaderProps {
  currentRoute: ViewRoute;
  user: AppUser | null;
  onLogout: () => void;
  onToggleSidebar?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  currentRoute,
  user,
  onLogout,
  onToggleSidebar,
}) => {
  const routeTitles: Record<ViewRoute, string> = {
    landing: 'Home',
    login: 'Sign In',
    register: 'Create Account',
    dashboard: 'Security Overview',
    repositories: 'Monitored Repositories',
    scans: 'AST Audit & Findings Backlog',
    'scan-detail': 'Inspection View',
    settings: 'Architecture & Engine Configuration',
  };

  return (
    <header className="sticky top-0 z-30 h-14 bg-[#0E1526] border-b border-white/[0.08] px-5 flex items-center justify-between gap-4">
      {/* Left: Hamburger + Breadcrumb */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-1.5 text-[#94A3B8] hover:text-[#DFE2F1] rounded-md hover:bg-white/5"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#94A3B8] hidden sm:inline">DevGuard AI</span>
          <span className="text-[#64748B] hidden sm:inline">/</span>
          <span className="font-semibold text-[#DFE2F1]">
            {routeTitles[currentRoute] || 'Dashboard'}
          </span>
        </div>
      </div>

      {/* Center: Live Supabase vs Visual Demo Sandbox Indicator */}
      <div className="hidden lg:flex items-center gap-2">
        {supabaseStatus.isAvailable ? (
          <Pill variant="live" className="gap-1.5 text-[11px]">
            <Database className="w-3 h-3 text-[#10B981]" />
            Live Supabase Connected
          </Pill>
        ) : (
          <Pill variant="demo" className="gap-1.5 text-[11px]">
            <Database className="w-3 h-3 text-amber-400" />
            Visual Sandbox (Demo Data Mode)
          </Pill>
        )}
      </div>

      {/* Right: User metadata & action */}
      <div className="flex items-center gap-3">
        {user && (
          <div className="flex items-center gap-2.5 pl-3 border-l border-white/[0.08]">
            <div className="w-7 h-7 rounded-full bg-[#161F33] border border-violet-500/30 flex items-center justify-center text-xs text-[#A78BFA] font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#DFE2F1] leading-none">
                {user.name}
              </span>
              <span className="text-[10px] font-mono text-[#94A3B8] uppercase mt-0.5">
                {user.role.replace('_', ' ')}
              </span>
            </div>
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="h-8 px-2 text-[#94A3B8] hover:text-[#F87171]"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};
