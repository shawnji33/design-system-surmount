'use client';

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

export type InputGroupProps = {
  /** Optional label rendered above the group shell. */
  label?: ReactNode;
  /** Optional helper text rendered below the group shell. */
  helperText?: ReactNode;
  /** Renders errorText (if provided) below the group, swaps the group border to error. */
  error?: boolean;
  errorText?: ReactNode;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

/**
 * Composition wrapper that groups multiple form controls (typically <Input>s)
 * inside a single bordered shell. When any child receives focus, the outer
 * shell lights up with the shared focus treatment. Mirrors the "address group"
 * pattern used by the B2C onboarding prototypes.
 */
export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup(
    {
      label,
      helperText,
      errorText,
      error = false,
      children,
      className,
      ...props
    },
    ref,
  ) {
    const hasMessage = Boolean((error && errorText) || helperText);
    const message = error && errorText ? errorText : helperText;

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-xs w-full', className)}
        {...props}
      >
        {label && (
          <span className="text-text-sm font-medium text-fg-tertiary-600 px-xs">
            {label}
          </span>
        )}
        <div
          role="group"
          aria-invalid={error || undefined}
          className={cn(
            'flex flex-col gap-lg p-lg',
            'bg-transparent border rounded-2xl',
            'transition-colors',
            'focus-within:shadow-[0_0_0_3px_var(--focus-ring-subtle)]',
            error
              ? 'border-border-error focus-within:border-border-error focus-within:shadow-[0_0_0_3px_var(--focus-ring-error)]'
              : 'border-border-primary focus-within:border-border-focus',
          )}
        >
          {children}
        </div>
        {hasMessage && (
          <span
            className={cn(
              'text-text-xs font-normal px-xs',
              error ? 'text-fg-error-primary' : 'text-fg-tertiary-600',
            )}
          >
            {message}
          </span>
        )}
      </div>
    );
  },
);
