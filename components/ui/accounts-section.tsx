'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ─── Icons ────────────────────────────────────────────────────────────────────

const SVG_BASE = {
  viewBox: '0 0 256 256',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 16,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} {...SVG_BASE} aria-hidden="true">
      <polyline points="96 48 176 128 96 208" />
    </svg>
  );
}

function PlusCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} {...SVG_BASE} aria-hidden="true">
      <circle cx="128" cy="128" r="96" />
      <line x1="88" y1="128" x2="168" y2="128" />
      <line x1="128" y1="88" x2="128" y2="168" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type AccountKind = 'internal' | 'external' | 'savings';

export type Account = {
  id: string;
  name: string;
  /** Display value, e.g. "$85,420.54" */
  value: string;
  /** Avatar/logo content */
  logo: ReactNode;
  kind: AccountKind;
};

export type AccountsSectionProps = {
  accounts: Account[];
  onAccountClick?: (id: string) => void;
  onAddAccount?: () => void;
  className?: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const GROUP_LABELS: Record<AccountKind, string> = {
  internal: 'Brokerage',
  external: 'External brokerages',
  savings:  'Savings',
};

const KIND_ORDER: AccountKind[] = ['internal', 'external', 'savings'];

// ─── Sub-components ───────────────────────────────────────────────────────────

function LogoFrame({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 size-[40px] rounded-[10px] overflow-hidden border border-black/[0.08] bg-bg-secondary flex items-center justify-center"
    >
      {children}
    </span>
  );
}

function AccountRow({
  account,
  isLast,
  onClick,
}: {
  account: Account;
  isLast: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group w-full flex items-center gap-[14px] px-lg py-[14px] text-left',
        'transition-colors hover:bg-bg-primary-hover',
        'focus-visible:outline-none focus-visible:bg-bg-primary-hover',
        !isLast && 'border-b border-border-secondary',
      )}
    >
      <LogoFrame>{account.logo}</LogoFrame>

      <span className="flex-1 min-w-0">
        <span className="block font-body font-medium text-text-sm text-fg-primary-900 truncate leading-snug">
          {account.name}
        </span>
      </span>

      <span className="shrink-0 flex items-center gap-[6px]">
        <span className="font-body font-medium text-text-sm text-fg-primary-900 tabular-nums">
          {account.value}
        </span>
        <ChevronRightIcon className="size-[16px] text-fg-quaternary-400 transition-transform group-hover:translate-x-px" />
      </span>
    </button>
  );
}

function GroupCard({
  label,
  accounts,
  onAccountClick,
}: {
  label: string;
  accounts: Account[];
  onAccountClick?: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-[8px]">
      <span className="font-body font-medium text-text-xs text-fg-tertiary-600 px-[2px]">
        {label}
      </span>
      <div className="rounded-xl border border-border-secondary bg-bg-primary shadow-card overflow-hidden">
        {accounts.map((account, i) => (
          <AccountRow
            key={account.id}
            account={account}
            isLast={i === accounts.length - 1}
            onClick={() => onAccountClick?.(account.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AccountsSection({
  accounts,
  onAccountClick,
  onAddAccount,
  className,
}: AccountsSectionProps) {
  const groups = KIND_ORDER.reduce<Record<AccountKind, Account[]>>(
    (acc, kind) => {
      acc[kind] = accounts.filter((a) => a.kind === kind);
      return acc;
    },
    { internal: [], external: [], savings: [] },
  );

  return (
    <div className={cn('flex flex-col gap-[16px]', className)}>
      {KIND_ORDER.filter((kind) => groups[kind].length > 0).map((kind) => (
        <GroupCard
          key={kind}
          label={GROUP_LABELS[kind]}
          accounts={groups[kind]}
          onAccountClick={onAccountClick}
        />
      ))}

      {onAddAccount != null && (
        <button
          type="button"
          onClick={onAddAccount}
          className={cn(
            'flex items-center gap-[10px] px-[2px] py-[6px]',
            'font-body font-medium text-text-sm text-fg-tertiary-600',
            'hover:text-fg-secondary-700 transition-colors',
            'focus-visible:outline-none',
          )}
        >
          <PlusCircleIcon className="size-[18px] shrink-0" />
          Add another account
        </button>
      )}
    </div>
  );
}
