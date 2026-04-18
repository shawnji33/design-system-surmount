'use client';

import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
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

// ─── cva ─────────────────────────────────────────────────────────────────────

const control = cva(
  [
    'relative inline-flex shrink-0 items-center justify-center overflow-hidden',
    'border transition-colors cursor-pointer',
    // Double focus ring via the hidden input's :focus-visible (Tailwind has-[...] requires v3.4+)
    'has-[:focus-visible]:shadow-[0_0_0_2px_var(--color-bg-primary),0_0_0_4px_var(--focus-ring)]',
    'has-[:disabled]:cursor-not-allowed',
  ],
  {
    variants: {
      type: {
        checkbox: '',
        radio: 'rounded-full',
      },
      size: {
        sm: 'size-xl',   // 16px — spacing-xl
        md: 'size-2xl',  // 20px — spacing-2xl
      },
    },
    compoundVariants: [
      { type: 'checkbox', size: 'sm', class: 'rounded-xs' },  // radius-xs = 4px
      { type: 'checkbox', size: 'md', class: 'rounded-sm' },  // radius-sm = 6px
    ],
    defaultVariants: { type: 'checkbox', size: 'sm' },
  },
);

// Icon area: ~12.5% inset on sm (icon = 12px), ~15% inset on md (icon = 14px)
const iconSizeClass: Record<'sm' | 'md', string> = {
  sm: 'size-lg',   // 12px — spacing-lg
  md: 'size-3-5',  // 14px — spacing-3-5
};

// Radio inner dot occupies 37.5% of the control (remainder of 31.25% inset each side for sm)
const radioDotInset: Record<'sm' | 'md', string> = {
  sm: 'inset-[31.25%]',  // ≈5px on each side → 6px dot
  md: 'inset-[30%]',     // 6px on each side → 8px dot
};

// ─── Prop types ───────────────────────────────────────────────────────────────

export type CheckboxProps = {
  type?: 'checkbox' | 'radio';
  size?: 'sm' | 'md';
  checked?: boolean;
  indeterminate?: boolean;
} & Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'size'>;

// ─── Component ───────────────────────────────────────────────────────────────

export function Checkbox({
  type = 'checkbox',
  size = 'sm',
  checked = false,
  indeterminate = false,
  disabled = false,
  className,
  ...props
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // `indeterminate` is a DOM property, not an HTML attribute — must be set via ref
  useEffect(() => {
    if (inputRef.current && type === 'checkbox') {
      inputRef.current.indeterminate = indeterminate && !checked;
    }
  }, [indeterminate, checked, type]);

  const isRadio = type === 'radio';
  // isActive: either checked, or indeterminate checkbox (both fill with brand solid)
  const isActive = checked || (!isRadio && indeterminate);

  return (
    <span
      className={cn(
        control({ type, size }),
        disabled
          ? 'bg-bg-disabled-subtle border-border-disabled'
          : isActive
          ? 'bg-bg-brand-solid border-0'
          : 'border-border-primary',
        className,
      )}
    >
      {/* Visually hidden native input: owns focus, keyboard nav, and form submission */}
      <input
        ref={inputRef}
        type={type}
        checked={checked}
        disabled={disabled}
        className="sr-only"
        {...props}
      />

      {/* Checkbox: check tick or minus (indeterminate) */}
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

      {/* Radio: centered circular dot */}
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
}
