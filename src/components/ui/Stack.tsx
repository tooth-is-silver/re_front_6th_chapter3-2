import React from 'react';
import { cn } from './utils';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  spacing?: number;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  flex?: number | string;
  sx?: React.CSSProperties;
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction = 'column', spacing = 0, alignItems, justifyContent, flex, sx, children, ...props }, ref) => {
    const gapValue = spacing * 8; // 8px base unit like MUI
    
    const stackStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: direction,
      gap: `${gapValue}px`,
      alignItems,
      justifyContent,
      flex,
      ...sx
    };

    return (
      <div
        ref={ref}
        className={cn('', className)}
        style={stackStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Stack.displayName = 'Stack';