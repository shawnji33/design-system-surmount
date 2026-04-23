'use client';

import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ─── Icons (Phosphor REGULAR weight = stroke-based, NOT filled-outline paths) ─

const SVG_REGULAR = {
  viewBox: '0 0 256 256',
  fill: 'none',
  stroke: '#414651',
  strokeWidth: 16,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} {...SVG_REGULAR} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polyline points="208 96 128 176 48 96" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} {...SVG_REGULAR} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polyline points="216 72 104 184 48 128" />
    </svg>
  );
}

function PlusCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} {...SVG_REGULAR} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="128" cy="128" r="96" />
      <line x1="88" y1="128" x2="168" y2="128" />
      <line x1="128" y1="88" x2="128" y2="168" />
    </svg>
  );
}

// ─── Avatar wrapper ──────────────────────────────────────────────────────────

function AvatarFrame({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="relative shrink-0 size-2xl rounded-full overflow-hidden border-[0.5px] border-black/10"
    >
      {children}
    </span>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

export type Portfolio = {
  id: string;
  name: string;
  /** Visual content for the 20×20 avatar slot (img, fallback, etc.). */
  avatar?: ReactNode;
};

export type PortfolioSwitcherProps = {
  portfolios: Portfolio[];
  selectedId: string;
  /** When true, renders the dropdown menu beneath the trigger. */
  open?: boolean;
  /** Click handler for the trigger (typically toggles `open`). */
  onToggle?: () => void;
  /** Called with a portfolio id when a menu item is chosen. */
  onSelect?: (id: string) => void;
  /** When provided, renders an "Add accounts" item at the bottom of the menu. */
  onAddAccount?: () => void;
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onSelect' | 'onToggle'>;

// ─── Component ───────────────────────────────────────────────────────────────

export function PortfolioSwitcher({
  portfolios,
  selectedId,
  open = false,
  onToggle,
  onSelect,
  onAddAccount,
  className,
  ...props
}: PortfolioSwitcherProps) {
  const selected = portfolios.find((p) => p.id === selectedId) ?? portfolios[0];

  return (
    <div className={cn('relative inline-flex', className)}>
      <button
        type="button"
        onClick={onToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'relative inline-flex items-center gap-md rounded-full px-md py-sm',
          'bg-bg-secondary border transition-colors',
          'font-body font-medium text-text-sm text-text-secondary-700',
          'whitespace-nowrap select-none',
          'focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_var(--focus-ring)]',
          open
            ? 'border-border-primary shadow-card'
            : 'border-border-secondary shadow-card hover:border-border-primary',
        )}
        {...props}
      >
        {selected?.avatar != null && <AvatarFrame>{selected.avatar}</AvatarFrame>}
        <span>{selected?.name}</span>
        <span
          className={cn(
            'shrink-0 flex items-center justify-center size-2xl transition-transform duration-200',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        >
          <ChevronDownIcon className="w-full h-full" />
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Portfolios"
          className={cn(
            'absolute left-0 right-0 top-[calc(100%+var(--spacing-xs))] z-10',
            'rounded-xl border border-border-secondary bg-bg-primary shadow-card',
            'py-sm flex flex-col gap-xxs',
          )}
        >
          {portfolios.map((p) => {
            const isSelected = p.id === selected?.id;
            return (
              <button
                key={p.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => onSelect?.(p.id)}
                className={cn(
                  'flex items-center gap-md mx-sm rounded-sm p-md text-left min-w-0',
                  'font-body font-medium text-text-sm text-text-secondary-700',
                  'hover:bg-bg-primary-hover transition-colors',
                  'focus-visible:outline-none focus-visible:bg-bg-primary-hover',
                )}
              >
                {p.avatar != null && <AvatarFrame>{p.avatar}</AvatarFrame>}
                <span className="flex-1 min-w-0 truncate">{p.name}</span>
                <span
                  className={cn(
                    'shrink-0 flex items-center justify-center size-xl ml-md',
                    !isSelected && 'invisible',
                  )}
                  aria-hidden="true"
                >
                  <CheckIcon className="w-full h-full" />
                </span>
              </button>
            );
          })}

          {onAddAccount != null && (
            <button
              type="button"
              onClick={onAddAccount}
              className={cn(
                'flex items-center gap-md mx-sm rounded-sm p-md text-left min-w-0',
                'font-body font-medium text-text-sm text-text-secondary-700',
                'hover:bg-bg-primary-hover transition-colors',
                'focus-visible:outline-none focus-visible:bg-bg-primary-hover',
              )}
            >
              <span className="shrink-0 flex items-center justify-center size-2xl" aria-hidden="true">
                <PlusCircleIcon className="w-full h-full" />
              </span>
              <span>Add accounts</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
