'use client';

import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// X icon (Phosphor X, DuoTone, viewBox 0 0 256 256, currentColor)
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        opacity="0.2"
        d="M224 56 200 32 128 104 56 32 32 56l72 72-72 72 24 24 72-72 72 72 24-24-72-72Z"
        fill="currentColor"
      />
      <path
        d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type BadgeSize    = 'xs' | 'sm' | 'md' | 'lg';
export type BadgeVariant = 'pill' | 'badge';
export type BadgeColor   =
  | 'gray' | 'brand' | 'error' | 'warning' | 'success'
  | 'gray-blue' | 'indigo' | 'purple' | 'pink';

// ─── Color classes ────────────────────────────────────────────────────────────
// gray-blue, indigo, pink are defined in tokens.css but not wired into
// tailwind.config.ts — referenced directly via var() arbitrary values.

const colorCls: Record<BadgeColor, string> = {
  gray:
    'bg-utility-gray-50 border border-utility-gray-200 text-utility-gray-700',
  brand:
    'bg-utility-brand-50 border border-utility-brand-200 text-utility-brand-700',
  error:
    'bg-utility-error-50 border border-utility-error-200 text-utility-error-700',
  warning:
    'bg-utility-warning-50 border border-utility-warning-200 text-utility-warning-700',
  success:
    'bg-utility-success-50 border border-utility-success-200 text-utility-success-700',
  'gray-blue':
    'bg-[var(--color-utility-gray-blue-50)] border border-[var(--color-utility-gray-blue-200)] text-[color:var(--color-utility-gray-blue-700)]',
  indigo:
    'bg-[var(--color-utility-indigo-50)] border border-[var(--color-utility-indigo-200)] text-[color:var(--color-utility-indigo-700)]',
  purple:
    'bg-utility-purple-50 border border-utility-purple-200 text-utility-purple-700',
  pink:
    'bg-[var(--color-utility-pink-50)] border border-[var(--color-utility-pink-200)] text-[color:var(--color-utility-pink-700)]',
};

// ─── Size → font + vertical padding ──────────────────────────────────────────

const sizeTextPy: Record<BadgeSize, string> = {
  xs: 'text-text-xxs py-xxs',
  sm: 'text-text-xs  py-xxs',
  md: 'text-text-sm  py-xxs',
  lg: 'text-text-sm  py-xs',
};

// ─── Horizontal padding tables ────────────────────────────────────────────────
// fullPx: applied to sides with no adjacent icon.
const fullPx: Record<BadgeSize, Record<BadgeVariant, string>> = {
  xs: { pill: 'px-sm',  badge: 'px-sm'  },
  sm: { pill: 'px-md',  badge: 'px-sm'  },
  md: { pill: 'px-2-5', badge: 'px-md'  },
  lg: { pill: 'px-lg',  badge: 'px-2-5' },
};

// reducedPx: applied to sides that have an adjacent icon (2px less than full,
// except xs where pill and badge share the same value).
const reducedPx: Record<BadgeSize, Record<BadgeVariant, string>> = {
  xs: { pill: 'px-sm',  badge: 'px-sm'  },
  sm: { pill: 'px-sm',  badge: 'px-xs'  },
  md: { pill: 'px-md',  badge: 'px-sm'  },
  lg: { pill: 'px-2-5', badge: 'px-md'  },
};

// iconOnlyPad: uniform padding for the icon-only variant.
// sm uses p-xs (4px) — Figma specifies 5px which has no token; deviation = 1px
// per side. xs/sm/md/lg icon sizes are all 12px (size-lg) for icon-only.
const iconOnlyPad: Record<BadgeSize, string> = {
  xs: 'p-xxs',  // 2px → 16px total (target ~17px, off by 1px)
  sm: 'p-xs',   // 4px → 20px total (target 22px, off by 2px — no 5px token)
  md: 'p-sm',   // 6px → 24px total ✓
  lg: 'p-md',   // 8px → 28px total ✓
};

// ─── Icon slot sizes ──────────────────────────────────────────────────────────
// Leading/trailing icons: 12px (xs/sm) or 14px (md/lg).
const iconSlotCls: Record<BadgeSize, string> = {
  xs: 'size-lg',   // 12px
  sm: 'size-lg',   // 12px
  md: 'size-3-5',  // 14px
  lg: 'size-3-5',  // 14px
};

// ─── Props ────────────────────────────────────────────────────────────────────

export type BadgeProps = {
  size?: BadgeSize;
  variant?: BadgeVariant;
  color?: BadgeColor;
  /** Show colored dot indicator before the label. */
  dot?: boolean;
  /** Icon rendered before the label. Also used as the icon in `iconOnly` mode. */
  iconLeading?: ReactNode;
  /** Icon rendered after the label. */
  iconTrailing?: ReactNode;
  /** Show only the icon (no label). Uses `iconLeading` if provided, else `children`. */
  iconOnly?: boolean;
  /** When provided, renders an X close button and calls this on click. */
  onRemove?: () => void;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'span'>, 'children' | 'color'>;

// ─── Badge ────────────────────────────────────────────────────────────────────

export function Badge({
  size = 'sm',
  variant = 'pill',
  color = 'gray',
  dot = false,
  iconLeading,
  iconTrailing,
  iconOnly = false,
  onRemove,
  children,
  className,
  ...props
}: BadgeProps) {
  const shape = variant === 'pill' ? 'rounded-full' : 'rounded-sm';

  const hasLeft  = !iconOnly && (dot || iconLeading != null);
  const hasRight = !iconOnly && (iconTrailing != null || onRemove != null);

  // Compute horizontal padding
  let padCls: string;
  if (iconOnly) {
    padCls = iconOnlyPad[size];
  } else if (onRemove) {
    // Full padding left; right is minimal — the close button's p-xxs provides
    // the visual breathing room at the badge edge (Figma: pr=[3px], no token).
    padCls = cn(fullPx[size][variant].replace('px-', 'pl-'), 'pr-xxs');
  } else {
    const lPad = hasLeft  ? reducedPx[size][variant] : fullPx[size][variant];
    const rPad = hasRight ? reducedPx[size][variant] : fullPx[size][variant];
    padCls = lPad === rPad
      ? lPad
      : cn(lPad.replace('px-', 'pl-'), rPad.replace('px-', 'pr-'));
  }

  const gapCls = (hasLeft || hasRight) ? (dot ? 'gap-xs' : 'gap-xxs') : '';
  const iconCls = cn('shrink-0 flex items-center justify-center', iconSlotCls[size]);

  return (
    <span
      className={cn(
        'inline-flex items-center font-body font-medium whitespace-nowrap select-none',
        shape,
        sizeTextPy[size],
        colorCls[color],
        padCls,
        gapCls,
        className,
      )}
      {...props}
    >
      {/* Colored dot — 8px outer / 6px inner colored circle */}
      {dot && !iconOnly && (
        <span className="shrink-0 flex items-center justify-center size-md" aria-hidden="true">
          <span className="rounded-full size-sm bg-current" />
        </span>
      )}

      {/* Leading icon */}
      {!dot && iconLeading != null && !iconOnly && (
        <span className={iconCls} aria-hidden="true">{iconLeading}</span>
      )}

      {/* Icon-only — always size-lg (12px) */}
      {iconOnly ? (
        <span className="shrink-0 flex items-center justify-center size-lg" aria-hidden="true">
          {iconLeading ?? children}
        </span>
      ) : (
        <span>{children}</span>
      )}

      {/* Trailing icon */}
      {!iconOnly && iconTrailing != null && onRemove == null && (
        <span className={iconCls} aria-hidden="true">{iconTrailing}</span>
      )}

      {/* X close button */}
      {!iconOnly && onRemove != null && (
        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 flex items-center justify-center rounded-full p-xxs hover:bg-black/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current transition-colors"
          aria-label="Remove"
        >
          <XIcon className="size-lg" />
        </button>
      )}
    </span>
  );
}
