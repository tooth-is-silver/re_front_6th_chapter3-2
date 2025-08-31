import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 text-white hover:bg-blue-700',
        contained: 'bg-blue-600 text-white hover:bg-blue-700',
        outlined: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
        text: 'text-blue-600 hover:bg-blue-50',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        ghost: 'hover:bg-gray-100 hover:text-gray-900',
        link: 'underline-offset-4 hover:underline text-blue-600',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
      buttonColor: {
        default: '',
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-purple-600 text-white hover:bg-purple-700',
        error: 'bg-red-600 text-white hover:bg-red-700',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      buttonColor: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, 'buttonColor'> {
  color?: 'default' | 'primary' | 'secondary' | 'error';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, buttonColor: color, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';