'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Padding note: Figma uses 10/14/18px which have no semantic token.
// Snapped to nearest: spacing-md(8)/spacing-xl(16)/spacing-2xl(20).
// Height deviation: md ≈ 36px (Figma 40), lg ≈ 48px (Figma 44).
const button = cva(
  [
    'inline-flex items-center justify-center overflow-hidden rounded-md',
    'font-body font-medium whitespace-nowrap select-none',
    'transition-colors',
    'focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_var(--focus-ring)]',
    'disabled:cursor-not-allowed disabled:shadow-none',
  ],
  {
    variants: {
      variant: {
        // 2px skeuomorphic border; --color-alpha-white-10 ≈ 9.8% (Figma 12%)
        primary: [
          'bg-bg-brand-solid border-2 border-[var(--color-alpha-white-10)] text-text-white',
          'hover:bg-bg-brand-solid-hover',
          'disabled:bg-bg-disabled disabled:border disabled:border-border-disabled-subtle disabled:text-fg-disabled',
        ],
        secondary: [
          'bg-bg-primary border border-border-primary text-text-secondary-700',
          'hover:bg-bg-primary-hover hover:text-text-secondary-hover',
          'disabled:bg-bg-disabled disabled:border-border-disabled-subtle disabled:text-fg-disabled',
        ],
        tertiary: [
          'bg-transparent text-text-tertiary-600',
          'hover:bg-bg-primary-hover hover:text-text-tertiary-hover',
          'disabled:bg-bg-disabled disabled:text-fg-disabled',
        ],
        'link-color': [
          'bg-transparent text-text-brand-secondary-700',
          'hover:text-text-brand-secondary-hover hover:underline',
          'disabled:text-text-disabled',
        ],
        'link-gray': [
          'bg-transparent text-text-tertiary-600',
          'hover:text-text-tertiary-hover',
          'disabled:text-text-disabled',
        ],
      },
      size: {
        xs: 'px-md py-md gap-xs text-text-xs',
        sm: 'px-lg py-md gap-xs text-text-sm',
        md: 'px-xl py-md gap-xs text-text-sm',
        lg: 'px-xl py-lg gap-sm text-text-md',
        xl: 'px-2xl py-lg gap-sm text-text-md',
      },
      iconOnly: {
        true: 'aspect-square',
        false: '',
      },
    },
    compoundVariants: [
      // Icon-only: symmetric (square) padding per size
      { iconOnly: true, size: 'xs', class: 'px-md py-md' },
      { iconOnly: true, size: 'sm', class: 'px-md py-md' },
      { iconOnly: true, size: 'md', class: 'px-md py-md' },
      { iconOnly: true, size: 'lg', class: 'px-lg py-lg' },
      { iconOnly: true, size: 'xl', class: 'px-lg py-lg' },
      // Link variants: strip all padding, remove radius, allow overflow
      // (compound variants are appended last so they win over base + size via tailwind-merge)
      { variant: 'link-color', class: 'px-0 py-0 rounded-none overflow-visible' },
      { variant: 'link-gray',  class: 'px-0 py-0 rounded-none overflow-visible' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      iconOnly: false,
    },
  },
);

// Icon wrapper size per button size; snapped to nearest spacing token
const iconSizeClass: Record<NonNullable<ButtonVariants['size']>, string> = {
  xs: 'size-lg',   // 12px  (Figma 14px; spacing-lg = 12)
  sm: 'size-xl',   // 16px  exact
  md: 'size-2xl',  // 20px  (Figma 18px; spacing-2xl = 20)
  lg: 'size-2xl',  // 20px  exact
  xl: 'size-2xl',  // 20px  exact
};

// Spinner: inline SVG + Tailwind animate-spin
function ButtonSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('animate-spin shrink-0', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

type ButtonVariants = VariantProps<typeof button>;

export type ButtonProps = {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  loading?: boolean;
  asChild?: boolean;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
  iconOnly?: boolean;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'button'>, 'children'>;

// Loading state shows the hover background for each hierarchy
const loadingBgClass: Partial<Record<NonNullable<ButtonVariants['variant']>, string>> = {
  primary:   'bg-bg-brand-solid-hover',
  secondary: 'bg-bg-primary-hover',
  tertiary:  'bg-bg-primary-hover',
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  asChild = false,
  iconLeading,
  iconTrailing,
  iconOnly = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  const sz = size ?? 'md';
  const vr = variant ?? 'primary';

  return (
    <Comp
      {...props}
      disabled={disabled}
      aria-busy={loading || undefined}
      className={cn(
        button({ variant: vr, size: sz, iconOnly }),
        loading && loadingBgClass[vr],
        loading && 'cursor-default pointer-events-none',
        className,
      )}
    >
      {loading ? (
        <>
          <ButtonSpinner className={iconSizeClass[sz]} />
          {!iconOnly && children != null && (
            <span className="flex items-center justify-center px-xxs">{children}</span>
          )}
        </>
      ) : iconOnly ? (
        <span
          className={cn('shrink-0 flex items-center justify-center', iconSizeClass[sz])}
          aria-hidden="true"
        >
          {iconLeading ?? children}
        </span>
      ) : (
        <>
          {iconLeading != null && (
            <span
              className={cn('shrink-0 flex items-center justify-center', iconSizeClass[sz])}
              aria-hidden="true"
            >
              {iconLeading}
            </span>
          )}
          {children != null && (
            <span className="flex items-center justify-center px-xxs">{children}</span>
          )}
          {iconTrailing != null && (
            <span
              className={cn('shrink-0 flex items-center justify-center', iconSizeClass[sz])}
              aria-hidden="true"
            >
              {iconTrailing}
            </span>
          )}
        </>
      )}
    </Comp>
  );
}
