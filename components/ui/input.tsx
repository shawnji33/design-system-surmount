'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

const shell = cva(
  [
    'flex items-center gap-md w-full',
    'bg-bg-primary border border-border-primary',
    'transition-colors',
    'focus-within:border-border-focus',
    'focus-within:shadow-[0_0_0_3px_var(--focus-ring-subtle)]',
  ],
  {
    variants: {
      size: {
        sm: 'min-h-[40px] px-lg py-md rounded-md',
        md: 'min-h-[52px] px-xl py-2-5 rounded-xl',
        lg: 'min-h-[64px] px-xl py-xl rounded-xl',
      },
      error: {
        true: 'border-border-error focus-within:border-border-error focus-within:shadow-[0_0_0_3px_var(--focus-ring-error)]',
        false: '',
      },
      disabled: {
        true: 'bg-bg-disabled border-border-disabled-subtle cursor-not-allowed focus-within:border-border-disabled-subtle focus-within:shadow-none',
        false: '',
      },
    },
    defaultVariants: { size: 'md', error: false, disabled: false },
  },
);

type InputVariants = VariantProps<typeof shell>;

export type InputProps = {
  size?: InputVariants['size'];
  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  error?: boolean;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'input'>, 'size'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'md',
    label,
    helperText,
    errorText,
    error = false,
    iconLeading,
    iconTrailing,
    className,
    disabled = false,
    id: idProp,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hasMessage = Boolean((error && errorText) || helperText);
  const messageId = hasMessage ? `${id}-message` : undefined;
  const message = error && errorText ? errorText : helperText;

  return (
    <div className={cn('flex flex-col gap-xs w-full', className)}>
      <label className={shell({ size, error, disabled })} htmlFor={id}>
        {iconLeading != null && (
          <span
            className="shrink-0 flex items-center justify-center w-2xl h-2xl text-fg-tertiary-600"
            aria-hidden="true"
          >
            {iconLeading}
          </span>
        )}
        <div className="flex flex-col flex-1 min-w-0">
          {label != null && (
            <span className="text-text-sm font-medium text-fg-tertiary-600 leading-[var(--line-height-text-sm)] select-none">
              {label}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={error || undefined}
            aria-describedby={messageId}
            className={cn(
              'w-full bg-transparent outline-none p-0',
              'font-body font-medium text-text-md text-fg-primary-900',
              'placeholder:text-text-placeholder placeholder:font-normal',
              'disabled:text-fg-disabled-subtle disabled:cursor-not-allowed',
            )}
            {...props}
          />
        </div>
        {iconTrailing != null && (
          <span
            className="shrink-0 flex items-center justify-center w-2xl h-2xl text-fg-tertiary-600"
            aria-hidden="true"
          >
            {iconTrailing}
          </span>
        )}
      </label>
      {hasMessage && (
        <span
          id={messageId}
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
});
