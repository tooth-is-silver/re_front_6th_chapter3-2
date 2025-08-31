import React from 'react';
import { cn } from './utils';

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  size?: 'small' | 'medium';
  margin?: 'none' | 'normal' | 'dense';
}

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, fullWidth = false, error = false, disabled = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-2',
          fullWidth && 'w-full',
          disabled && 'opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);
FormControl.displayName = 'FormControl';

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, error = false, disabled = false, required = false, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-sm font-medium text-gray-700',
          error && 'text-red-600',
          disabled && 'text-gray-400',
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    );
  }
);
FormLabel.displayName = 'FormLabel';

export interface FormControlLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  control: React.ReactElement;
  label: React.ReactNode;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  disabled?: boolean;
}

export const FormControlLabel = React.forwardRef<HTMLLabelElement, FormControlLabelProps>(
  ({ className, control, label, labelPlacement = 'end', disabled = false, ...props }, ref) => {
    const clonedControl = React.cloneElement(control, { disabled } as any);
    
    const isHorizontal = labelPlacement === 'start' || labelPlacement === 'end';
    const isReversed = labelPlacement === 'start' || labelPlacement === 'top';
    
    return (
      <label
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2 cursor-pointer',
          !isHorizontal && 'flex-col',
          isReversed && 'flex-row-reverse',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {clonedControl}
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </label>
    );
  }
);
FormControlLabel.displayName = 'FormControlLabel';