import React from 'react';
import { cn } from './utils';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  error?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  slotProps?: {
    htmlInput?: React.InputHTMLAttributes<HTMLInputElement>;
  };
}

const sizeStyles = {
  small: 'h-9 px-3 py-2 text-sm',
  medium: 'h-10 px-3 py-2 text-base',
};

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, size = 'medium', fullWidth = false, error = false, variant = 'outlined', slotProps, ...props }, ref) => {
    const inputProps = slotProps?.htmlInput || {};
    
    return (
      <input
        ref={ref}
        className={cn(
          'flex rounded-md border border-gray-300 bg-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          sizeStyles[size],
          fullWidth && 'w-full',
          error && 'border-red-500 focus-visible:ring-red-500',
          className
        )}
        {...inputProps}
        {...props}
      />
    );
  }
);
TextField.displayName = 'TextField';