import React from 'react';
import { cn } from './utils';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: React.CSSProperties;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, sx, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('', className)}
        style={sx}
        {...props}
      />
    );
  }
);
Box.displayName = 'Box';