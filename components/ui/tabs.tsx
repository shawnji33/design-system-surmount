'use client';

import {
  createContext,
  useContext,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

// ─── Public types ─────────────────────────────────────────────────────────────

export type TabsType =
  | 'button-brand'
  | 'button-gray'
  | 'button-border'
  | 'button-minimal'
  | 'underline'
  | 'underline-gray';

export type TabsSize = 'sm' | 'md';

// ─── Context ──────────────────────────────────────────────────────────────────

type TabsCtx = {
  value: string;
  onValueChange: (v: string) => void;
  type: TabsType;
  size: TabsSize;
  fullWidth: boolean;
};

const TabsContext = createContext<TabsCtx | null>(null);

function useTabsCtx(): TabsCtx {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs compound components must be rendered inside <Tabs>');
  return ctx;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const listCls: Record<TabsType, string> = {
  'button-brand':   'flex items-center gap-xs',
  'button-gray':    'flex items-center gap-xs',
  'button-border':  'flex items-center gap-xs bg-bg-tertiary border border-border-secondary rounded-lg p-xs',
  'button-minimal': 'flex items-center gap-xxs bg-bg-secondary border border-border-secondary rounded-md p-xxs',
  'underline':      'flex items-center border-b border-border-secondary gap-lg',
  'underline-gray': 'flex items-center border-b border-border-secondary gap-lg',
};

const triggerBaseCls: Record<TabsType, string> = {
  'button-brand':
    'inline-flex items-center justify-center gap-xs rounded-sm font-body font-medium whitespace-nowrap select-none transition-colors focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-50',
  'button-gray':
    'inline-flex items-center justify-center gap-xs rounded-sm font-body font-medium whitespace-nowrap select-none transition-colors focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-50',
  'button-border':
    'inline-flex items-center justify-center gap-xs rounded-sm font-body font-medium whitespace-nowrap select-none transition-colors focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-50',
  'button-minimal':
    'inline-flex items-center justify-center gap-xs rounded-md font-body font-medium whitespace-nowrap select-none transition-colors focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-50',
  'underline':
    'inline-flex items-center justify-center gap-xs font-body font-medium whitespace-nowrap select-none transition-colors focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-50 px-xs pb-md',
  'underline-gray':
    'inline-flex items-center justify-center gap-xs font-body font-medium whitespace-nowrap select-none transition-colors focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-50 px-xs pb-md',
};

// h-[36px]/h-[44px] — no 36px or 44px spacing token exists; using arbitrary values
const triggerSizeCls: Record<TabsType, Record<TabsSize, string>> = {
  'button-brand':   { sm: 'h-[36px] px-lg text-text-sm', md: 'h-[44px] px-xl text-text-sm' },
  'button-gray':    { sm: 'h-[36px] px-lg text-text-sm', md: 'h-[44px] px-xl text-text-sm' },
  'button-border':  { sm: 'h-[36px] px-lg text-text-sm', md: 'h-[44px] px-xl text-text-sm' },
  'button-minimal': { sm: 'h-[36px] px-lg text-text-sm', md: 'h-[44px] px-xl text-text-sm' },
  'underline':      { sm: 'h-[32px] text-text-sm', md: 'h-[36px] text-text-sm' },
  'underline-gray': { sm: 'h-[32px] text-text-sm', md: 'h-[36px] text-text-sm' },
};

const triggerActiveCls: Record<TabsType, string> = {
  'button-brand':   'bg-bg-brand-primary text-text-brand-secondary-700',
  'button-gray':    'bg-bg-active text-text-secondary-700',
  'button-border':  'bg-bg-primary shadow-card text-text-secondary-700',
  'button-minimal': 'bg-bg-primary border border-border-primary shadow-card text-text-secondary-700',
  // -mb-px drops the tab 1px so its border-b-2 covers the list's 1px border-b
  'underline':      '-mb-px border-b-2 border-fg-brand-primary-alt text-text-brand-secondary-700',
  'underline-gray': '-mb-px border-b-2 border-fg-quaternary-400 text-text-primary-900',
};

const triggerInactiveCls: Record<TabsType, string> = {
  'button-brand':   'text-text-quaternary-500 hover:bg-bg-primary-hover hover:text-text-secondary-700',
  'button-gray':    'text-text-quaternary-500 hover:bg-bg-primary-hover hover:text-text-secondary-700',
  'button-border':  'text-text-quaternary-500 hover:bg-bg-primary-hover hover:text-text-secondary-700',
  'button-minimal': 'text-text-quaternary-500 hover:bg-bg-primary-hover hover:text-text-secondary-700',
  'underline':      'text-text-quaternary-500 hover:text-text-secondary-700',
  'underline-gray': 'text-text-quaternary-500 hover:text-text-secondary-700',
};

const badgeActiveCls: Record<TabsType, string> = {
  'button-brand':   'bg-bg-brand-secondary text-text-brand-secondary-700',
  'button-gray':    'bg-bg-secondary text-text-secondary-700',
  'button-border':  'bg-bg-secondary text-text-secondary-700',
  'button-minimal': 'bg-bg-secondary text-text-secondary-700',
  'underline':      'bg-bg-brand-secondary text-text-brand-secondary-700',
  'underline-gray': 'bg-bg-secondary text-text-secondary-700',
};

const badgeInactiveCls = 'bg-bg-tertiary text-text-quaternary-500';

// ─── Tabs ─────────────────────────────────────────────────────────────────────

export type TabsProps = {
  value: string;
  onValueChange: (value: string) => void;
  type?: TabsType;
  size?: TabsSize;
  fullWidth?: boolean;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

export function Tabs({
  value,
  onValueChange,
  type = 'button-gray',
  size = 'md',
  fullWidth = false,
  children,
  className,
  ...props
}: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange, type, size, fullWidth }}>
      <div className={cn('flex flex-col', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// ─── TabsList ─────────────────────────────────────────────────────────────────

export type TabsListProps = {
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

export function TabsList({ children, className, ...props }: TabsListProps) {
  const { type, fullWidth } = useTabsCtx();
  return (
    <div
      role="tablist"
      className={cn(listCls[type], fullWidth && 'w-full', className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── TabsTrigger ──────────────────────────────────────────────────────────────

export type TabsTriggerProps = {
  value: string;
  iconLeading?: ReactNode;
  avatar?: ReactNode;
  badge?: number | string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'value'>;

export function TabsTrigger({
  value,
  iconLeading,
  avatar,
  badge,
  children,
  disabled,
  className,
  ...props
}: TabsTriggerProps) {
  const { value: activeValue, onValueChange, type, size, fullWidth } = useTabsCtx();
  const isActive = activeValue === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => onValueChange(value)}
      className={cn(
        triggerBaseCls[type],
        triggerSizeCls[type][size],
        isActive ? triggerActiveCls[type] : triggerInactiveCls[type],
        fullWidth && 'flex-1',
        className,
      )}
      {...props}
    >
      {avatar != null && (
        <span
          className="shrink-0 size-[22px] rounded-full overflow-hidden flex items-center justify-center"
          aria-hidden="true"
        >
          {avatar}
        </span>
      )}
      {iconLeading != null && (
        <span className="shrink-0 size-2xl flex items-center justify-center" aria-hidden="true">
          {iconLeading}
        </span>
      )}
      <span>{children}</span>
      {badge != null && (
        <span
          className={cn(
            'inline-flex items-center justify-center min-w-[18px] h-[18px] px-xs rounded-full text-text-xs font-medium leading-none',
            isActive ? badgeActiveCls[type] : badgeInactiveCls,
          )}
          aria-label={`${badge} items`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

// ─── TabsContent ──────────────────────────────────────────────────────────────

export type TabsContentProps = {
  value: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

export function TabsContent({ value, children, className, ...props }: TabsContentProps) {
  const { value: activeValue } = useTabsCtx();
  if (activeValue !== value) return null;
  return (
    <div role="tabpanel" className={className} {...props}>
      {children}
    </div>
  );
}
