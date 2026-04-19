'use client';

import { cva } from 'class-variance-authority';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ─── Icons (Phosphor DuoTone, viewBox 0 0 256 256, color #414651) ─────────────

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path opacity="0.2" d="M232 96 128 200 24 96Z" fill="#414651" />
      <path
        d="M213.66 101.66a8 8 0 0 1-11.32 0L128 27.31l-74.34 74.35a8 8 0 0 1-11.32-11.32l80-80a8 8 0 0 1 11.32 0l80 80a8 8 0 0 1 0 11.32Z"
        fill="#414651"
        transform="rotate(180 128 128)"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M229.66 77.66 100.66 206.63a8 8 0 0 1-11.32 0l-65-65a8 8 0 0 1 11.32-11.32L95 189.37 218.34 66.34a8 8 0 0 1 11.32 11.32Z"
        fill="#414651"
      />
    </svg>
  );
}

function HelpCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path opacity="0.2" d="M224 128A96 96 0 1 1 128 32a96 96 0 0 1 96 96Z" fill="#414651" />
      <path
        d="M140 180a12 12 0 1 1-12-12 12 12 0 0 1 12 12Zm-12-112c-22.06 0-40 16.15-40 36v4a8 8 0 0 0 16 0v-4c0-11.03 10.77-20 24-20s24 8.97 24 20-10.77 20-24 20a8 8 0 0 0-8 8v8a8 8 0 0 0 16 0v-.72C148.91 141.48 168 124.1 168 108c0-19.85-17.94-36-40-36Z"
        fill="#414651"
      />
    </svg>
  );
}

// ─── Dropdown (trigger field) ─────────────────────────────────────────────────

const dropdownTrigger = cva(
  [
    'inline-flex w-full items-center justify-between rounded-md',
    'font-body font-normal',
    'transition-colors',
    'focus-visible:outline-none',
  ],
  {
    variants: {
      size: {
        xs: 'px-lg py-md text-text-xs',
        sm: 'px-lg py-md text-text-sm',
        md: 'px-3-5 py-2-5 text-text-md',
      },
      state: {
        default:     'border border-border-primary bg-bg-primary text-text-primary-900',
        placeholder: 'border border-border-primary bg-bg-primary text-text-placeholder',
        focused:     'border-2 border-border-brand bg-bg-primary text-text-primary-900 shadow-[0_0_0_4px_var(--focus-ring)]',
        open:        'border-2 border-border-brand bg-bg-primary text-text-primary-900 shadow-[0_0_0_4px_var(--focus-ring)]',
        disabled:    'border border-border-disabled-subtle bg-bg-disabled-subtle cursor-not-allowed text-text-disabled',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  },
);

const dropdownInnerGap = { xs: 'gap-xs', sm: 'gap-xs', md: 'gap-sm' } as const;

type DropdownState = 'default' | 'placeholder' | 'focused' | 'open' | 'disabled';

export type DropdownProps = {
  size?: 'xs' | 'sm' | 'md';
  state?: DropdownState;
  label?: ReactNode;
  required?: boolean;
  helpIcon?: boolean;
  hintText?: ReactNode;
  value?: ReactNode;
  supportingText?: ReactNode;
  iconLeading?: ReactNode;
  placeholder?: string;
} & Omit<ComponentPropsWithoutRef<'button'>, 'children'>;

export function Dropdown({
  size = 'md',
  state = 'default',
  label,
  required,
  helpIcon,
  hintText,
  value,
  supportingText,
  iconLeading,
  placeholder = 'Select option',
  disabled,
  className,
  ...props
}: DropdownProps) {
  const isDisabled = state === 'disabled' || disabled;
  const isOpen = state === 'open';
  const resolvedState: DropdownState = isDisabled ? 'disabled' : state;

  const iconSize    = size === 'md' ? 'size-2xl' : 'size-xl';
  const chevronSize = size === 'md' ? 'size-2xl' : 'size-xl';
  const metaSize    = size === 'xs' ? 'text-text-xs' : 'text-text-sm';
  const wrapperGap  = size === 'xs' ? 'gap-xs' : 'gap-sm';

  return (
    <div className={cn('flex flex-col', wrapperGap, className)}>
      {(label != null || helpIcon) && (
        <div className="flex items-center gap-xs">
          {label != null && (
            <span className={cn('font-body font-medium text-text-secondary-700', metaSize)}>
              {label}
              {required && (
                <span className="ml-xxs text-text-error-primary-600" aria-hidden="true">*</span>
              )}
            </span>
          )}
          {helpIcon && (
            <span className={cn('shrink-0 flex items-center justify-center text-fg-quaternary-400', iconSize)}>
              <HelpCircleIcon className="w-full h-full" />
            </span>
          )}
        </div>
      )}

      <button
        type="button"
        disabled={isDisabled}
        aria-expanded={isOpen}
        className={dropdownTrigger({ size, state: resolvedState })}
        {...props}
      >
        <span className={cn('flex items-center flex-1 min-w-0', dropdownInnerGap[size])}>
          {iconLeading != null && (
            <span className={cn('shrink-0 flex items-center justify-center', iconSize)} aria-hidden="true">
              {iconLeading}
            </span>
          )}
          <span className="flex-1 text-left min-w-0">
            <span className="block truncate">{value ?? placeholder}</span>
            {supportingText != null && (
              <span className={cn('block truncate text-text-tertiary-600', metaSize)}>
                {supportingText}
              </span>
            )}
          </span>
        </span>

        <span
          className={cn(
            'shrink-0 flex items-center justify-center transition-transform duration-200',
            chevronSize,
            isOpen && 'rotate-180',
          )}
          aria-hidden="true"
        >
          <ChevronDownIcon className="w-full h-full" />
        </span>
      </button>

      {hintText != null && (
        <p className={cn('text-text-tertiary-600', metaSize)}>{hintText}</p>
      )}
    </div>
  );
}

// ─── SelectMenuItem ───────────────────────────────────────────────────────────

const menuItemInner = cva(
  'flex w-full items-center rounded-sm font-body',
  {
    variants: {
      size: {
        xs: 'p-md gap-sm text-text-xs',
        sm: 'p-md gap-md text-text-sm',
        md: 'pl-md pr-2-5 py-2-5 gap-md text-text-md',
      },
      selected: {
        true:  'bg-bg-active',
        false: '',
      },
      disabled: {
        true:  'cursor-not-allowed text-text-disabled',
        false: 'cursor-pointer text-text-secondary-700 hover:bg-bg-primary-hover',
      },
    },
    defaultVariants: {
      size: 'md',
      selected: false,
      disabled: false,
    },
  },
);

export type SelectMenuItemProps = {
  size?: 'xs' | 'sm' | 'md';
  selected?: boolean;
  disabled?: boolean;
  supportingText?: ReactNode;
  iconLeading?: ReactNode;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

export function SelectMenuItem({
  size = 'md',
  selected = false,
  disabled = false,
  supportingText,
  iconLeading,
  children,
  className,
  ...props
}: SelectMenuItemProps) {
  const checkSize = 'size-xl'; // 16px for all sizes
  const iconSize  = 'size-xl';

  return (
    <div
      role="option"
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      className={cn('flex items-center px-sm py-[1px]', className)}
      {...props}
    >
      <div className={menuItemInner({ size, selected, disabled })}>
        {iconLeading != null && (
          <span className={cn('shrink-0 flex items-center justify-center', iconSize)} aria-hidden="true">
            {iconLeading}
          </span>
        )}
        <span className="flex-1 min-w-0">
          <span className="block truncate">{children}</span>
          {supportingText != null && (
            <span className="block truncate text-text-tertiary-600 text-text-xs">{supportingText}</span>
          )}
        </span>
        {selected && (
          <span className={cn('shrink-0 flex items-center justify-center ml-auto pl-sm', checkSize)} aria-hidden="true">
            <CheckIcon className="w-full h-full" />
          </span>
        )}
      </div>
    </div>
  );
}
