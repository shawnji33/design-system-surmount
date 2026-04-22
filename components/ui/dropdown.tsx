'use client';

import { cva } from 'class-variance-authority';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ─── Icons (Phosphor REGULAR weight = stroke-based, NOT filled-outline paths) ─
// All icons share the same wrapper <svg> attrs: viewBox 0 0 256 256, no fill,
// stroke-width 16, round line caps/joins. Color is #414651.

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

function MagnifyingGlassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} {...SVG_REGULAR} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="112" cy="112" r="80" />
      <line x1="168.57" y1="168.57" x2="224" y2="224" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} {...SVG_REGULAR} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="128" cy="96" r="64" />
      <path d="M30.99,215.99a112.03,112.03,0,0,1,194.02,0" />
    </svg>
  );
}

function HelpCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} {...SVG_REGULAR} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="128" cy="128" r="96" />
      <path d="M100,108a28,28,0,1,1,40,25.32A16,16,0,0,0,128,144v8" />
      <circle cx="128" cy="180" r="10" fill="#414651" stroke="none" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type DropdownSize  = 'xs' | 'sm';
export type DropdownState = 'default' | 'placeholder' | 'focused' | 'open' | 'disabled';
export type DropdownType  = 'default' | 'icon-leading' | 'search' | 'country';

// ─── Trigger box (border + bg) ───────────────────────────────────────────────
// Padding (px-lg / py-md) is constant across xs and sm per Figma — only the
// inner content text size changes.

const dropdownTrigger = cva(
  [
    'inline-flex w-full items-center gap-md overflow-hidden',
    'rounded-md px-lg py-md',
    'transition-colors',
    'focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_var(--focus-ring)]',
  ],
  {
    variants: {
      state: {
        default:     'border border-border-primary bg-bg-primary',
        placeholder: 'border border-border-primary bg-bg-primary',
        focused:     'border-2 border-border-brand bg-bg-primary',
        open:        'border-2 border-border-brand bg-bg-primary',
        disabled:    'border border-border-primary bg-bg-disabled-subtle cursor-not-allowed',
      },
    },
    defaultVariants: { state: 'default' },
  },
);

// ─── Wrapper gap (label / input / hint) ──────────────────────────────────────
// xs uses gap-xs (4px); sm uses gap-sm (6px).

const wrapperGapCls: Record<DropdownSize, string> = {
  xs: 'gap-xs',
  sm: 'gap-sm',
};

// ─── Text size class for label / hint / value ────────────────────────────────

const textSizeCls: Record<DropdownSize, string> = {
  xs: 'text-text-xs',
  sm: 'text-text-sm',
};

// ─── Props ───────────────────────────────────────────────────────────────────

export type DropdownProps = {
  size?: DropdownSize;
  state?: DropdownState;
  type?: DropdownType;

  /** Form-style label rendered above the trigger. */
  label?: ReactNode;
  /** Adds a brand-colored asterisk after the label. */
  required?: boolean;
  /** Renders a help-circle icon at the end of the label row. */
  helpIcon?: boolean;
  /** Hint text rendered below the trigger. */
  hintText?: ReactNode;

  /** Selected value (text or rich content). */
  value?: ReactNode;
  /** Optional secondary text rendered next to `value`. */
  supportingText?: ReactNode;
  /** Placeholder shown when no value is set. */
  placeholder?: string;

  /** Leading icon. Auto-defaults: `icon-leading`→user, `search`→magnifying glass. */
  iconLeading?: ReactNode;
  /** Keyboard shortcut hint. Defaults to "⌘K" for `search`/`country`; pass false to suppress. */
  shortcut?: ReactNode | boolean;
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'type' | 'value'>;

// ─── Component ───────────────────────────────────────────────────────────────

export function Dropdown({
  size = 'sm',
  state = 'default',
  type = 'default',
  label,
  required = false,
  helpIcon = false,
  hintText,
  value,
  supportingText,
  placeholder = 'Select option',
  iconLeading,
  shortcut,
  disabled,
  className,
  ...props
}: DropdownProps) {
  const isDisabled = state === 'disabled' || disabled;
  const isOpen     = state === 'open';
  const resolvedState: DropdownState = isDisabled ? 'disabled' : state;

  // Per-type defaults
  const showChevron = type !== 'search';
  const defaultShortcutVisible = type === 'search' || type === 'country';
  const showShortcut =
    typeof shortcut === 'boolean' ? shortcut : (shortcut ?? (defaultShortcutVisible ? '⌘K' : null)) != null;
  const shortcutNode =
    typeof shortcut === 'boolean' ? '⌘K' : (shortcut ?? (defaultShortcutVisible ? '⌘K' : null));

  const resolvedLeadingIcon =
    iconLeading ??
    (type === 'icon-leading' ? <UserIcon className="w-full h-full" /> :
     type === 'search'       ? <MagnifyingGlassIcon className="w-full h-full" /> :
     null);

  const showValue       = state !== 'placeholder' && value != null;
  const valueText       = showValue ? value : placeholder;
  const valueColorCls   = isDisabled       ? 'text-text-disabled' :
                          state === 'placeholder' ? 'text-text-placeholder' :
                          'text-text-primary-900';
  const supportingColor = isDisabled ? 'text-text-disabled' : 'text-text-tertiary-600';

  return (
    <div className={cn('flex flex-col w-full', wrapperGapCls[size], className)}>
      {(label != null || helpIcon) && (
        <div className="flex items-center gap-xxs">
          {label != null && (
            <span className={cn('font-body font-medium text-text-secondary-700', textSizeCls[size])}>
              {label}
              {required && (
                <span className="ml-xxs text-text-brand-tertiary-600" aria-hidden="true">*</span>
              )}
            </span>
          )}
          {helpIcon && (
            <span className="shrink-0 flex items-center justify-center size-xl text-fg-quaternary-400" aria-hidden="true">
              <HelpCircleIcon className="w-full h-full" />
            </span>
          )}
        </div>
      )}

      <button
        type="button"
        disabled={isDisabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={dropdownTrigger({ state: resolvedState })}
        {...props}
      >
        <span className="flex items-center flex-1 min-w-0 gap-md">
          {resolvedLeadingIcon != null && (
            <span className="shrink-0 flex items-center justify-center size-2xl" aria-hidden="true">
              {resolvedLeadingIcon}
            </span>
          )}
          <span className={cn(
            'flex items-center gap-md min-w-0 flex-1 font-body font-normal text-left',
            textSizeCls[size],
          )}>
            <span className={cn('truncate', valueColorCls)}>{valueText}</span>
            {showValue && supportingText != null && (
              <span className={cn('truncate', supportingColor)}>{supportingText}</span>
            )}
          </span>
        </span>

        {showShortcut && shortcutNode != null && (
          <span
            className={cn(
              'shrink-0 inline-flex items-center rounded-xs border border-border-secondary px-xs py-px',
              'font-body font-medium text-text-xs text-text-quaternary-500',
            )}
            aria-hidden="true"
          >
            {shortcutNode}
          </span>
        )}

        {showChevron && (
          <span
            className={cn(
              'shrink-0 flex items-center justify-center size-xl transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
            aria-hidden="true"
          >
            <ChevronDownIcon className="w-full h-full" />
          </span>
        )}
      </button>

      {hintText != null && (
        <p className={cn('font-body font-normal text-text-tertiary-600', textSizeCls[size])}>
          {hintText}
        </p>
      )}
    </div>
  );
}

// ─── SelectMenuItem ───────────────────────────────────────────────────────────
// Used inside the menu rendered when state="open". Selected items get
// bg-active; the check icon appears at the right edge.

const menuItemInner = cva(
  'flex w-full items-center rounded-sm font-body',
  {
    variants: {
      size: {
        xs: 'p-md gap-md text-text-xs',
        sm: 'p-md gap-md text-text-sm',
      },
      selected: { true: 'bg-bg-active', false: '' },
      disabled: {
        true:  'cursor-not-allowed text-text-disabled',
        false: 'cursor-pointer text-text-primary-900 hover:bg-bg-primary-hover',
      },
    },
    defaultVariants: { size: 'sm', selected: false, disabled: false },
  },
);

export type SelectMenuItemProps = {
  size?: DropdownSize;
  selected?: boolean;
  disabled?: boolean;
  /** Secondary text (e.g. "@olivia") rendered after the primary label. */
  supportingText?: ReactNode;
  iconLeading?: ReactNode;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

export function SelectMenuItem({
  size = 'sm',
  selected = false,
  disabled = false,
  supportingText,
  iconLeading,
  children,
  className,
  ...props
}: SelectMenuItemProps) {
  return (
    <div
      role="option"
      aria-selected={selected}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      className={cn('flex items-center px-sm py-px', className)}
      {...props}
    >
      <div className={menuItemInner({ size, selected, disabled })}>
        {iconLeading != null && (
          <span className="shrink-0 flex items-center justify-center size-xl" aria-hidden="true">
            {iconLeading}
          </span>
        )}
        <span className="flex-1 min-w-0 flex items-center gap-md">
          <span className="truncate font-medium">{children}</span>
          {supportingText != null && (
            <span className="truncate font-normal text-text-tertiary-600">{supportingText}</span>
          )}
        </span>
        {selected && (
          <span className="shrink-0 flex items-center justify-center size-xl ml-md" aria-hidden="true">
            <CheckIcon className="w-full h-full" />
          </span>
        )}
      </div>
    </div>
  );
}

// ─── SelectMenu (shell that wraps menu items) ────────────────────────────────
// Matches the open-state menu container per Figma 23554:20675:
// rounded-md, border-secondary-alt, bg-primary, py-xs, custom subtle shadow.

export type SelectMenuProps = {
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

export function SelectMenu({ children, className, ...props }: SelectMenuProps) {
  return (
    <div
      role="listbox"
      className={cn(
        'flex flex-col rounded-md border border-border-secondary-alt bg-bg-primary py-xs',
        'shadow-card',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
