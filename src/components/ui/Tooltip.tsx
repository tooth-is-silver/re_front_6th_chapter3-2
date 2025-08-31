import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from './utils';

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md border bg-gray-900 px-3 py-1.5 text-xs text-white animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Main Tooltip component for compatibility with Material-UI API
export interface TooltipProps {
  title: React.ReactNode;
  children: React.ReactElement;
  open?: boolean;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

export const Tooltip = ({ title, children, open, placement = 'top', className }: TooltipProps) => {
  return (
    <TooltipProvider>
      <TooltipRoot open={open}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={placement} className={className}>
          {title}
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
};

export { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent };