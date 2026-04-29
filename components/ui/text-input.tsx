'use client';

import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─── Phosphor warning circle, used for the error helper line ────────────────
function WarningIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M128,24A104,104,0,1,0,232,128,104.13,104.13,0,0,0,128,24Zm-8,80a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,72a12,12,0,1,1,12-12A12,12,0,0,1,128,176Z" />
    </svg>
  );
}

// ─── Shell (the visible bordered box that wraps the input + icons) ───────────

const shell = cva(
  [
    'flex items-center gap-md w-full font-body cursor-text',
    'bg-bg-primary border rounded-xl',
    'transition-[border-color,box-shadow,background-color] duration-150',
  ],
  {
    variants: {
      size: {
        sm: 'min-h-[36px] px-md',
        md: 'min-h-[44px] px-lg',
        lg: 'min-h-[52px] px-xl',
      },
      state: {
        default: [
          'border-border-primary',
          'focus-within:[border-color:rgba(10,13,18,0.24)]',
          'focus-within:shadow-[0_0_0_3px_rgba(10,13,18,0.08)]',
        ],
        error: [
          'border-border-error',
          'focus-within:shadow-[0_0_0_3px_rgba(203,111,104,0.18)]',
        ],
        disabled: ['bg-bg-disabled-subtle border-border-primary cursor-not-allowed'],
      },
    },
    defaultVariants: { size: 'lg', state: 'default' },
  },
);

// ─── Prop types ──────────────────────────────────────────────────────────────

export type TextInputSize = 'sm' | 'md' | 'lg';

export type TextInputProps = {
  /** Field label rendered above the input. */
  label?: ReactNode;
  /** Helper text shown below the input in the resting/valid state. */
  helperText?: ReactNode;
  /** Error message shown below the input when `invalid` is true. */
  errorText?: ReactNode;
  /** When true (and `errorText` is set), the input renders the error state. */
  invalid?: boolean;
  size?: TextInputSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'input'>, 'size'>;

// ─── Component ───────────────────────────────────────────────────────────────

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    label,
    helperText,
    errorText,
    invalid = false,
    size = 'lg',
    leadingIcon,
    trailingIcon,
    disabled,
    id,
    className,
    ...props
  },
  ref,
) {
  const reactId = useId();
  const inputId = id ?? `ti-${reactId}`;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const isInvalid = invalid && !!errorText;
  const state = disabled ? 'disabled' : isInvalid ? 'error' : 'default';
  const inputFontSize = size === 'sm' ? 'text-text-sm' : 'text-text-md';

  return (
    <div className={cn('flex flex-col gap-sm font-body w-full', className)}>
      {label != null && (
        <label
          htmlFor={inputId}
          className={cn(
            'pl-xxs text-text-sm font-medium',
            disabled ? 'text-text-disabled' : 'text-fg-tertiary-600',
          )}
        >
          {label}
        </label>
      )}

      <span className={shell({ size, state })}>
        {leadingIcon != null && (
          <span
            className={cn(
              'inline-flex shrink-0 items-center justify-center size-2xl',
              disabled ? 'text-fg-disabled' : 'text-fg-tertiary-600',
            )}
            aria-hidden="true"
          >
            {leadingIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={isInvalid || undefined}
          aria-describedby={
            isInvalid ? errorId : helperText != null ? helperId : undefined
          }
          className={cn(
            'flex-1 min-w-0 bg-transparent border-0 outline-none p-0',
            'font-medium',
            inputFontSize,
            'placeholder:font-normal placeholder:text-text-placeholder',
            disabled
              ? 'text-text-disabled cursor-not-allowed'
              : 'text-text-primary-900',
          )}
          {...props}
        />
        {trailingIcon != null && (
          <span
            className={cn(
              'inline-flex shrink-0 items-center justify-center size-2xl',
              disabled ? 'text-fg-disabled' : 'text-fg-tertiary-600',
            )}
            aria-hidden="true"
          >
            {trailingIcon}
          </span>
        )}
      </span>

      {isInvalid ? (
        <span
          id={errorId}
          role="alert"
          className="inline-flex items-center gap-xs pl-xxs text-text-sm font-normal text-text-error-primary-600"
        >
          <WarningIcon className="size-2xl shrink-0" />
          <span>{errorText}</span>
        </span>
      ) : helperText != null ? (
        <span
          id={helperId}
          className={cn(
            'pl-xxs text-text-sm font-normal',
            disabled ? 'text-text-disabled' : 'text-text-tertiary-600',
          )}
        >
          {helperText}
        </span>
      ) : null}
    </div>
  );
});
