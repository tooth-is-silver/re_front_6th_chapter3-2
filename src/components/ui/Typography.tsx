import React from 'react';
import { cn } from './utils';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'subtitle1' | 'subtitle2';
  component?: React.ElementType;
  fontWeight?: 'normal' | 'bold' | number;
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  noWrap?: boolean;
  sx?: React.CSSProperties;
}

const variantStyles = {
  h1: 'text-6xl font-light leading-tight',
  h2: 'text-5xl font-light leading-tight',
  h3: 'text-4xl font-normal leading-tight',
  h4: 'text-3xl font-normal leading-tight',
  h5: 'text-2xl font-normal leading-tight',
  h6: 'text-xl font-medium leading-tight',
  body1: 'text-base leading-normal',
  body2: 'text-sm leading-normal',
  caption: 'text-xs leading-normal',
  subtitle1: 'text-base font-normal leading-normal',
  subtitle2: 'text-sm font-medium leading-normal',
};

const colorStyles = {
  inherit: 'text-inherit',
  primary: 'text-blue-600',
  secondary: 'text-purple-600',
  error: 'text-red-600',
  warning: 'text-yellow-600',
  info: 'text-blue-500',
  success: 'text-green-600',
};

const defaultComponents = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  subtitle1: 'h6',
  subtitle2: 'h6',
};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ 
    className, 
    variant = 'body1', 
    component, 
    fontWeight, 
    color = 'inherit', 
    noWrap = false, 
    sx, 
    ...props 
  }, ref) => {
    const Component = (component || defaultComponents[variant]) as React.ElementType;
    
    const fontWeightStyle = fontWeight ? { fontWeight } : {};
    const noWrapStyle = noWrap ? { whiteSpace: 'nowrap' as const, overflow: 'hidden', textOverflow: 'ellipsis' } : {};
    
    return (
      <Component
        ref={ref as any}
        className={cn(
          variantStyles[variant],
          colorStyles[color],
          className
        )}
        style={{ ...fontWeightStyle, ...noWrapStyle, ...sx }}
        {...props}
      />
    );
  }
);
Typography.displayName = 'Typography';