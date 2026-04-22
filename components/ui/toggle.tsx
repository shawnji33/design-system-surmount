'use client';

import { type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

// ─── Token notes ──────────────────────────────────────────────────────────────
// Default-type track widths (36px sm, 44px md) have no spacing token →
// implemented as w-[36px] / w-[44px] arbitrary values. All other dimensions
// are fully tokenized (h-xl/2xl/3xl, size-xl/2xl, translate-x-xl/2xl, etc.).
//
// Component-level toggle tokens are defined in tokens.css but not wired into
// tailwind.config.ts → referenced via var() arbitrary values:
//   --color-toggle-button-fg-disabled
//   --color-toggle-border
//   --color-toggle-slim-border-pressed
//   --color-toggle-slim-border-pressed-hover

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToggleProps = {
  /** Visual style — pill with elevated knob (default) or flat full-height knob (slim). */
  variant?: 'default' | 'slim';
  size?: 'sm' | 'md';
  /** Checked/on state. */
  checked?: boolean;
  /** Called with the next checked value when the user toggles. */
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
} & Omit<ComponentPropsWithoutRef<'button'>, 'children'>;

// ─── Toggle ───────────────────────────────────────────────────────────────────

export function Toggle({
  variant = 'default',
  size = 'sm',
  checked = false,
  onCheckedChange,
  disabled = false,
  onClick,
  className,
  ...props
}: ToggleProps) {
  const isSlim = variant === 'slim';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={(e) => {
        onClick?.(e);
        onCheckedChange?.(!checked);
      }}
      className={cn(
        // Structure
        'group relative inline-flex items-center rounded-full overflow-hidden',
        'transition-colors duration-200',
        // Focus ring: 2px white gap + 4px brand ring (matches design system pattern)
        'focus-visible:outline-none',
        'focus-visible:shadow-[0_0_0_2px_var(--color-bg-primary),0_0_0_4px_var(--focus-ring)]',
        // Cursor
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        // Track dimensions
        // sm: default=36×20px, slim=32×16px | md: default=44×24px, slim=40×20px
        size === 'sm'
          ? isSlim ? 'w-4xl h-xl' : 'w-[36px] h-2xl'
          : isSlim ? 'w-5xl h-2xl' : 'w-[44px] h-3xl',
        // Track background
        disabled
          ? 'bg-bg-disabled'
          : checked
            ? 'bg-bg-brand-solid hover:bg-bg-brand-solid-hover'
            : 'bg-bg-tertiary',
        className,
      )}
      {...props}
    >
      {/* Slim-only: inset border overlay on the track
          Off → subtle separator border; On → transparent; Disabled → muted border */}
      {isSlim && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-0 rounded-full border pointer-events-none transition-colors duration-200',
            disabled
              ? 'border-border-disabled-subtle'
              : checked
                ? 'border-transparent'
                : 'border-border-secondary',
          )}
        />
      )}

      {/* Knob */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute rounded-full transition-transform duration-200',
          // Knob dimensions: sm=16px, md=20px
          size === 'sm' ? 'size-xl' : 'size-2xl',
          // Knob start position
          // Default: inset by p-xxs (2px) from top-left corner
          // Slim: flush with top-left corner (knob = full track height)
          isSlim ? 'top-0 left-0' : 'top-xxs left-xxs',
          // Slide right when checked: sm=16px (translate-x-xl), md=20px (translate-x-2xl)
          checked && (size === 'sm' ? 'translate-x-xl' : 'translate-x-2xl'),
          // Knob fill
          disabled
            ? 'bg-[var(--color-toggle-button-fg-disabled)]'
            : 'bg-fg-white',
          // Both knob variants use shadow-card (the only elevation token).
          // Slim knob also gets a border that reflects pressed/hover state.
          isSlim
            ? cn(
                'shadow-card border',
                disabled
                  ? 'border-[var(--color-toggle-border)]'
                  : checked
                    ? cn(
                        'border-[var(--color-toggle-slim-border-pressed)]',
                        'group-hover:border-[var(--color-toggle-slim-border-pressed-hover)]',
                      )
                    : 'border-[var(--color-toggle-border)]',
              )
            : 'shadow-card',
        )}
      />
    </button>
  );
}
