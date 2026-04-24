'use client';

import { useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─── Phosphor icons (viewBox 0 0 256 256, fill="currentColor") ───────────────

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z" />
    </svg>
  );
}

// ─── Control (the visible square/circle) ─────────────────────────────────────

const control = cva(
  [
    'relative inline-flex shrink-0 items-center justify-center overflow-hidden',
    'border transition-colors cursor-pointer',
    // Double focus ring via the hidden input's :focus-visible (form-control family: 3px × subtle)
    'has-[:focus-visible]:shadow-[0_0_0_2px_var(--color-bg-primary),0_0_0_3px_var(--focus-ring-subtle)]',
    'has-[:disabled]:cursor-not-allowed',
  ],
  {
    variants: {
      type: {
        checkbox: '',
        radio: 'rounded-full',
      },
      // xs and sm share the 16px control size; only label sizing differs.
      size: {
        xs: 'size-xl',   // 16px
        sm: 'size-xl',   // 16px
        md: 'size-2xl',  // 20px
      },
    },
    compoundVariants: [
      { type: 'checkbox', size: 'xs', class: 'rounded-xs' },
      { type: 'checkbox', size: 'sm', class: 'rounded-xs' },
      { type: 'checkbox', size: 'md', class: 'rounded-sm' },
    ],
    defaultVariants: { type: 'checkbox', size: 'sm' },
  },
);

const iconSizeClass: Record<CheckboxSize, string> = {
  xs: 'size-lg',   // 12px
  sm: 'size-lg',   // 12px
  md: 'size-3-5',  // 14px
};

const radioDotInset: Record<CheckboxSize, string> = {
  xs: 'inset-[31.25%]',  // 6px dot
  sm: 'inset-[31.25%]',  // 6px dot
  md: 'inset-[30%]',     // 8px dot
};

// ─── Label/text typography (Text=True variants) ──────────────────────────────

const labelGap: Record<CheckboxSize, string> = {
  xs: 'gap-sm',  // 6px
  sm: 'gap-md',  // 8px
  md: 'gap-lg',  // 12px
};

const labelTextSize: Record<CheckboxSize, string> = {
  xs: 'text-text-xs',
  sm: 'text-text-sm',
  md: 'text-text-md',
};

// md spec uses gap-xxs (2px) between label and supporting text; xs/sm stack flush
const labelStackGap: Record<CheckboxSize, string> = {
  xs: 'gap-0',
  sm: 'gap-0',
  md: 'gap-xxs',
};

// ─── Prop types ───────────────────────────────────────────────────────────────

export type CheckboxSize = 'xs' | 'sm' | 'md';

export type CheckboxProps = {
  type?: 'checkbox' | 'radio';
  /** xs is intended for radio rows; checkbox controls visually equal sm at xs. */
  size?: CheckboxSize;
  checked?: boolean;
  indeterminate?: boolean;
  /** Optional row label. When set, the control + text render side-by-side inside a <label>. */
  label?: ReactNode;
  /** Secondary line below the label. Requires `label`. */
  supportingText?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'size'>;

// ─── Component ───────────────────────────────────────────────────────────────

export function Checkbox({
  type = 'checkbox',
  size = 'sm',
  checked = false,
  indeterminate = false,
  disabled = false,
  label,
  supportingText,
  className,
  ...props
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // `indeterminate` is a DOM property — must be set via ref
  useEffect(() => {
    if (inputRef.current && type === 'checkbox') {
      inputRef.current.indeterminate = indeterminate && !checked;
    }
  }, [indeterminate, checked, type]);

  const isRadio = type === 'radio';
  const isActive = checked || (!isRadio && indeterminate);

  const controlNode = (
    <span
      className={cn(
        control({ type, size }),
        disabled
          ? 'bg-bg-disabled-subtle border-border-disabled'
          : isActive
          ? 'bg-fg-primary-900 border-0'
          : 'border-border-primary',
        // Only apply consumer className to the bare control when there's no label;
        // when wrapped in a label, the className goes on the <label> wrapper instead.
        label == null && className,
      )}
    >
      <input
        ref={inputRef}
        type={type}
        checked={checked}
        disabled={disabled}
        className="sr-only"
        {...props}
      />

      {!isRadio && isActive && (
        <span
          className={cn(
            'pointer-events-none shrink-0 flex items-center justify-center',
            iconSizeClass[size],
            disabled ? 'text-fg-disabled-subtle' : 'text-fg-white',
          )}
          aria-hidden="true"
        >
          {indeterminate
            ? <MinusIcon className="size-full" />
            : <CheckIcon className="size-full" />}
        </span>
      )}

      {isRadio && checked && (
        <span
          className={cn(
            'absolute rounded-full pointer-events-none',
            radioDotInset[size],
            disabled ? 'bg-fg-disabled-subtle' : 'bg-fg-white',
          )}
          aria-hidden="true"
        />
      )}
    </span>
  );

  // No label → return the bare control (preserves existing API used by Table)
  if (label == null) return controlNode;

  // With label → wrap in <label> for click-to-toggle, render text column
  return (
    <label
      className={cn(
        'inline-flex items-start font-body',
        labelGap[size],
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      {/* pt-xxs (2px) lifts the control to align with the label cap-height baseline */}
      <span className="flex items-center justify-center pt-xxs shrink-0">
        {controlNode}
      </span>
      <span className={cn('flex flex-col flex-1 min-w-0', labelStackGap[size])}>
        <span
          className={cn(
            'font-medium',
            labelTextSize[size],
            disabled ? 'text-text-disabled' : 'text-text-secondary-700',
          )}
        >
          {label}
        </span>
        {supportingText != null && (
          <span
            className={cn(
              'font-normal',
              labelTextSize[size],
              disabled ? 'text-text-disabled' : 'text-text-tertiary-600',
            )}
          >
            {supportingText}
          </span>
        )}
      </span>
    </label>
  );
}
