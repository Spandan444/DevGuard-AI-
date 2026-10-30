import React from 'react';
import { cn } from '../../utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rect' | 'circle' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rect',
  ...props
}) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-[#1E293B]/70',
        variant === 'circle' && 'rounded-full',
        variant === 'text' && 'h-3.5 rounded',
        variant === 'rect' && 'rounded-md',
        className
      )}
      {...props}
    />
  );
};
