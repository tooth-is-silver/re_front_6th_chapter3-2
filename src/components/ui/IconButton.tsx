import React from 'react';
import { cn } from './utils';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  color?: 'inherit' | 'default' | 'primary' | 'secondary' | 'error';
}

const sizeStyles = {
  small: 'h-8 w-8 p-1',
  medium: 'h-10 w-10 p-2',
  large: 'h-12 w-12 p-3',
};

const colorStyles = {
  inherit: 'text-inherit hover:bg-gray-100',
  default: 'text-gray-600 hover:bg-gray-100',
  primary: 'text-blue-600 hover:bg-blue-50',
  secondary: 'text-purple-600 hover:bg-purple-50',
  error: 'text-red-600 hover:bg-red-50',
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = 'medium', color = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none',
          sizeStyles[size],
          colorStyles[color],
          className
        )}
        {...props}
      />
    );
  }
);
IconButton.displayName = 'IconButton';