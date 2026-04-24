'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

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
        // Primary is a neutral dark gray (fg-secondary), not brand blue
        primary: [
          'bg-fg-secondary-700 border-2 border-[var(--color-alpha-white-12)] text-text-white',
          'hover:bg-fg-secondary-hover',
          'disabled:bg-fg-disabled disabled:border disabled:border-border-disabled-subtle disabled:text-fg-disabled-subtle',
        ],
        secondary: [
          'bg-bg-primary border border-border-primary text-text-secondary-700',
          'hover:bg-bg-primary-hover hover:text-text-secondary-hover',
          'focus-visible:bg-bg-secondary',
          'disabled:border-border-disabled-subtle disabled:text-fg-disabled',
        ],
        tertiary: [
          'bg-transparent text-text-tertiary-600',
          'hover:bg-bg-primary-hover hover:text-text-tertiary-hover',
          'focus-visible:bg-bg-secondary',
          'disabled:text-fg-disabled',
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
        xs: 'px-2-5 py-md gap-xs text-text-xs',
        sm: 'px-lg py-md gap-xs text-text-sm',
        md: 'px-3-5 py-2-5 gap-xs text-text-sm',
        lg: 'px-xl py-2-5 gap-sm text-text-md',
        xl: 'px-4-5 py-lg gap-sm text-text-md',
      },
      iconOnly: {
        true: 'aspect-square',
        false: '',
      },
    },
    compoundVariants: [
      // Icon-only: symmetric padding per size (sm=8, md=10, lg=12, xl=14).
      // xs × iconOnly is deprecated in Figma; keep as a runtime fallback.
      { iconOnly: true, size: 'xs', class: 'px-md py-md' },
      { iconOnly: true, size: 'sm', class: 'px-md py-md' },
      { iconOnly: true, size: 'md', class: 'p-2-5' },
      { iconOnly: true, size: 'lg', class: 'px-lg py-lg' },
      { iconOnly: true, size: 'xl', class: 'p-3-5' },
      // Link variants: strip padding, remove radius, allow overflow
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

// Inline icons size to match the text cap-height of each size step.
const iconSizeClass: Record<NonNullable<ButtonVariants['size']>, string> = {
  xs: 'size-3-5',  // 14px
  sm: 'size-xl',   // 16px
  md: 'size-4-5',  // 18px
  lg: 'size-2xl',  // 20px
  xl: 'size-2xl',  // 20px
};

// Icon-only icons are uniformly 20px for sm/md/lg/xl in Figma — larger than
// the inline size at sm (16) and md (18). xs has no Figma coverage.
const iconOnlyIconSizeClass: Record<NonNullable<ButtonVariants['size']>, string> = {
  xs: 'size-3-5',  // fallback — no Figma coverage
  sm: 'size-2xl',
  md: 'size-2xl',
  lg: 'size-2xl',
  xl: 'size-2xl',
};

// Loading spinner: padded variants use the "Button loading icon" size (20/24),
// link variants reuse the inline-icon table since they have no padding.
const paddedSpinnerSizeClass: Record<NonNullable<ButtonVariants['size']>, string> = {
  xs: 'size-2xl',  // 20px
  sm: 'size-2xl',  // 20px
  md: 'size-2xl',  // 20px
  lg: 'size-3xl',  // 24px
  xl: 'size-3xl',  // 24px
};

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

const loadingBgClass: Partial<Record<NonNullable<ButtonVariants['variant']>, string>> = {
  primary:   'bg-fg-secondary-hover',
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
  const isLink = vr === 'link-color' || vr === 'link-gray';
  const spinnerClass = isLink ? iconSizeClass[sz] : paddedSpinnerSizeClass[sz];
  const renderedIconSize = iconOnly ? iconOnlyIconSizeClass[sz] : iconSizeClass[sz];

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
          <ButtonSpinner className={spinnerClass} />
          {!iconOnly && children != null && (
            <span className="flex items-center justify-center px-xxs">{children}</span>
          )}
        </>
      ) : iconOnly ? (
        <span
          className={cn('shrink-0 flex items-center justify-center', renderedIconSize)}
          aria-hidden="true"
        >
          {iconLeading ?? children}
        </span>
      ) : (
        <>
          {iconLeading != null && (
            <span
              className={cn('shrink-0 flex items-center justify-center', renderedIconSize)}
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
              className={cn('shrink-0 flex items-center justify-center', renderedIconSize)}
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
