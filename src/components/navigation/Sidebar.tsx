import React from 'react';
import type { ViewRoute } from '../../types';
import { cn } from '../../utils/cn';
import {
  LayoutDashboard,
  GitFork,
  ShieldAlert,
  Sliders,
  ShieldCheck,
  PlusCircle,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../ui/Button';

export interface SidebarProps {
  currentRoute: ViewRoute;
  onRouteChange: (route: ViewRoute) => void;
  onOpenConnectRepo: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRoute,
  onRouteChange,
  onOpenConnectRepo,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems: { id: ViewRoute; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'dashboard',
      label: 'Security Overview',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'repositories',
      label: 'Repositories',
      icon: <GitFork className="w-4 h-4" />,
      badge: '4',
    },
    {
      id: 'scans',
      label: 'Scans & Findings',
      icon: <ShieldAlert className="w-4 h-4" />,
      badge: '5 Active',
    },
    {
      id: 'settings',
      label: 'Architecture & Engine',
      icon: <Sliders className="w-4 h-4" />,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-[#0B0F19]/80 backdrop-blur-sm md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-60 bg-[#0E1526] border-r border-white/[0.07] flex flex-col justify-between transition-transform duration-200 md:static md:translate-x-0',
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Header */}
        <div>
          <div className="h-14 px-5 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#161F33] border border-[#7C3AED]/40 flex items-center justify-center text-[#7C3AED]">
                <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <span className="font-bold text-sm tracking-tight text-[#DFE2F1]">
                DevGuard <span className="text-[#A78BFA]">AI</span>
              </span>
            </div>
          </div>

          {/* Quick CTA */}
          <div className="p-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onOpenConnectRepo();
                onCloseMobile();
              }}
              className="w-full text-xs gap-1.5 h-8 justify-start px-3"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Connect Repository</span>
            </Button>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1">
            <div className="px-2 pb-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-[#64748B]">
              Workspace
            </div>
            {navItems.map((item) => {
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onRouteChange(item.id);
                    onCloseMobile();
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left',
                    isActive
                      ? 'bg-[#161F33] text-[#DFE2F1] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'
                      : 'text-[#94A3B8] hover:text-[#DFE2F1] hover:bg-white/[0.03]'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-[#7C3AED]' : 'text-[#64748B]'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        'px-1.5 py-0.2 rounded font-mono text-[10px] tabular-nums',
                        isActive ? 'bg-[#7C3AED]/20 text-[#D2BBFF]' : 'bg-white/5 text-[#94A3B8]'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-white/[0.08] space-y-2">
          <div className="p-2.5 rounded-lg bg-[#0B0F19] border border-white/5 text-[11px] text-[#94A3B8]">
            <div className="flex items-center justify-between text-[#DFE2F1] font-semibold mb-1">
              <span>AST Engine v2.5</span>
              <span className="font-mono text-[10px] text-[#10B981]">READY</span>
            </div>
            <p className="text-[10px] text-[#64748B] leading-tight">
              Python, JS & TS taint sink analyzer active.
            </p>
          </div>

          <div className="text-[10px] text-[#64748B] flex items-center justify-between px-1">
            <span>DevGuard AI SaaS</span>
            <a
              href="https://cwe.mitre.org"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#94A3B8] flex items-center gap-0.5"
            >
              CWE Standards <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
