'use client';

import {
  CheckCircle,
  Info,
  Warning,
  WarningCircle,
  X,
  type Icon,
} from '@phosphor-icons/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const alert = cva(
  [
    'relative flex w-full items-start gap-lg rounded-xl border p-xl',
    'font-body text-text-sm transition-colors shadow-card',
  ],
  {
    variants: {
      tone: {
        gray: [
          'bg-bg-secondary border-border-primary text-text-secondary-700',
          '[--alert-icon:var(--color-fg-tertiary-600)]',
          '[--alert-title:var(--color-text-primary-900)]',
          '[--alert-action:var(--color-text-primary-900)]',
        ],
        brand: [
          'bg-bg-brand-secondary border-border-brand text-text-brand-tertiary-600',
          '[--alert-icon:var(--color-fg-brand-primary-600)]',
          '[--alert-title:var(--color-text-brand-primary-900)]',
          '[--alert-action:var(--color-text-brand-secondary-700)]',
        ],
        success: [
          'bg-bg-success-secondary border-[var(--color-utility-success-200)] text-[color:var(--color-utility-success-700)]',
          '[--alert-icon:var(--color-fg-success-primary)]',
          '[--alert-title:var(--color-utility-success-900)]',
          '[--alert-action:var(--color-utility-success-700)]',
        ],
        warning: [
          'bg-bg-warning-secondary border-[var(--color-utility-warning-200)] text-[color:var(--color-utility-warning-700)]',
          '[--alert-icon:var(--color-fg-warning-primary)]',
          '[--alert-title:var(--color-utility-warning-900)]',
          '[--alert-action:var(--color-utility-warning-700)]',
        ],
        error: [
          'bg-bg-error-secondary border-border-error-subtle text-[color:var(--color-utility-error-700)]',
          '[--alert-icon:var(--color-fg-error-primary)]',
          '[--alert-title:var(--color-utility-error-900)]',
          '[--alert-action:var(--color-text-error-primary-600)]',
        ],
      },
    },
    defaultVariants: {
      tone: 'gray',
    },
  },
);

type AlertVariants = VariantProps<typeof alert>;

export type AlertTone = NonNullable<AlertVariants['tone']>;

export type AlertProps = {
  tone?: AlertTone;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
} & Omit<ComponentPropsWithoutRef<'div'>, 'title'>;

const defaultIconByTone: Record<AlertTone, Icon> = {
  gray: Info,
  brand: Info,
  success: CheckCircle,
  warning: Warning,
  error: WarningCircle,
};

export function Alert({
  tone = 'gray',
  title,
  description,
  icon,
  action,
  onDismiss,
  className,
  role = 'status',
  ...props
}: AlertProps) {
  const resolvedTone = tone ?? 'gray';
  const DefaultIcon = defaultIconByTone[resolvedTone];
  const hasText = title != null || description != null;

  return (
    <div
      role={role}
      className={cn(alert({ tone: resolvedTone }), className)}
      {...props}
    >
      <span
        className="flex size-2xl shrink-0 items-center justify-center text-[color:var(--alert-icon)]"
        aria-hidden="true"
      >
        {icon ?? <DefaultIcon className="size-full" />}
      </span>

      {hasText && (
        <div className="min-w-0 flex-1">
          {title != null && (
            <p className="m-0 font-medium text-text-sm text-[color:var(--alert-title)]">
              {title}
            </p>
          )}
          {description != null && (
            <div className={cn('text-text-sm font-normal', title != null && 'mt-xs')}>
              {description}
            </div>
          )}
          {action != null && (
            <div className="mt-lg flex flex-wrap items-center gap-xl text-text-sm font-medium text-[color:var(--alert-action)]">
              {action}
            </div>
          )}
        </div>
      )}

      {onDismiss != null && (
        <button
          type="button"
          onClick={onDismiss}
          className={cn(
            '-m-xs flex size-3xl shrink-0 items-center justify-center rounded-md p-xs text-fg-quaternary-400',
            'transition-colors hover:bg-bg-primary-hover hover:text-fg-quaternary-hover',
            'focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_var(--focus-ring)]',
          )}
          aria-label="Dismiss alert"
        >
          <X className="size-xl" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
