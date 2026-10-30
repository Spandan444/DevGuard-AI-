import React from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 p-1 bg-[#0E1526] border border-[#1E293B] rounded-lg select-none',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 whitespace-nowrap shrink-0',
              isActive
                ? 'bg-[#161F33] text-[#DFE2F1] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] border border-white/10'
                : 'text-[#94A3B8] hover:text-[#DFE2F1] hover:bg-white/[0.03]'
            )}
          >
            {tab.icon && <span className="w-3.5 h-3.5">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  'px-1.5 py-0.2 rounded font-mono text-[10px] tabular-nums',
                  isActive ? 'bg-[#7C3AED]/20 text-[#D2BBFF]' : 'bg-white/5 text-[#94A3B8]'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
