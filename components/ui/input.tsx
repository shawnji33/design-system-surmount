'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import {
  useEffect,
  useState,
  forwardRef,
  useId,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type FocusEvent,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M128,24A104,104,0,1,0,232,128,104.13,104.13,0,0,0,128,24Zm-8,80a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,72a12,12,0,1,1,12-12A12,12,0,0,1,128,176Z" />
    </svg>
  );
}

const shell = cva(
  [
    'relative flex items-center gap-md w-full overflow-hidden cursor-text',
    'bg-bg-primary border border-border-primary',
    'transition-[background-color,border-color,box-shadow] duration-200 ease-out',
    'focus-within:border-border-focus',
    'focus-within:shadow-[0_0_0_3px_var(--focus-ring-subtle)]',
  ],
  {
    variants: {
      size: {
        sm: 'min-h-[56px] px-lg py-md rounded-lg',
        md: 'min-h-[72px] px-xl py-lg rounded-xl',
        lg: 'min-h-[84px] px-xl py-xl rounded-xl',
      },
      error: {
        true: 'border-border-error focus-within:border-border-error focus-within:shadow-[0_0_0_3px_var(--focus-ring-error)]',
        false: '',
      },
      disabled: {
        true: 'bg-bg-disabled border-border-disabled-subtle cursor-not-allowed focus-within:border-border-disabled-subtle focus-within:shadow-none',
        false: '',
      },
    },
    defaultVariants: { size: 'md', error: false, disabled: false },
  },
);

type InputVariants = VariantProps<typeof shell>;
export type InputSize = NonNullable<InputVariants['size']>;

const fieldMinHeight: Record<InputSize, string> = {
  sm: 'min-h-[38px]',
  md: 'min-h-[48px]',
  lg: 'min-h-[56px]',
};

const restingLabelStyle: Record<InputSize, CSSProperties> = {
  sm: {
    fontSize: 'var(--font-size-text-md)',
    lineHeight: 'var(--line-height-text-md)',
  },
  md: {
    fontSize: 'var(--font-size-text-lg)',
    lineHeight: 'var(--line-height-text-lg)',
  },
  lg: {
    fontSize: 'var(--font-size-text-xl)',
    lineHeight: 'var(--line-height-text-xl)',
  },
};

const floatedLabelStyle: Record<InputSize, CSSProperties> = {
  sm: {
    fontSize: 'var(--font-size-text-xs)',
    lineHeight: 'var(--line-height-text-xs)',
  },
  md: {
    fontSize: 'var(--font-size-text-sm)',
    lineHeight: 'var(--line-height-text-sm)',
  },
  lg: {
    fontSize: 'var(--font-size-text-md)',
    lineHeight: 'var(--line-height-text-md)',
  },
};

const inputText: Record<InputSize, string> = {
  sm: 'pt-[18px]',
  md: 'pt-[22px]',
  lg: 'pt-[26px]',
};

const inputTextStyle: Record<InputSize, CSSProperties> = {
  sm: {
    fontSize: 'var(--font-size-text-md)',
    lineHeight: 'var(--line-height-text-md)',
  },
  md: {
    fontSize: 'var(--font-size-text-lg)',
    lineHeight: 'var(--line-height-text-lg)',
  },
  lg: {
    fontSize: 'var(--font-size-text-xl)',
    lineHeight: 'var(--line-height-text-xl)',
  },
};

function hasInputValue(value: unknown) {
  if (Array.isArray(value)) return value.length > 0;
  return value != null && String(value).length > 0;
}

export type InputProps = {
  size?: InputVariants['size'];
  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: ReactNode;
  error?: boolean;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'input'>, 'size'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'md',
    label,
    helperText,
    errorText,
    error = false,
    iconLeading,
    iconTrailing,
    className,
    disabled = false,
    id: idProp,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hasMessage = Boolean((error && errorText) || helperText);
  const messageId = hasMessage ? `${id}-message` : undefined;
  const message = error && errorText ? errorText : helperText;
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(() => hasInputValue(value ?? defaultValue));
  const hasFloatingLabel = label != null;
  const isFloated = hasFloatingLabel && (focused || hasValue);
  const resolvedSize = size ?? 'md';

  useEffect(() => {
    if (value !== undefined) setHasValue(hasInputValue(value));
  }, [value]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (value === undefined) setHasValue(hasInputValue(event.currentTarget.value));
    onChange?.(event);
  }

  function handleFocus(event: FocusEvent<HTMLInputElement>) {
    setFocused(true);
    onFocus?.(event);
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    setFocused(false);
    setHasValue(hasInputValue(event.currentTarget.value));
    onBlur?.(event);
  }

  return (
    <div className={cn('flex flex-col gap-xs w-full', className)}>
      <label className={shell({ size: resolvedSize, error, disabled })} htmlFor={id}>
        {iconLeading != null && (
          <span
            className="inline-flex shrink-0 items-center justify-center size-2xl text-fg-tertiary-600"
            aria-hidden="true"
          >
            {iconLeading}
          </span>
        )}
        <div className={cn('relative flex flex-col flex-1 min-w-0 justify-center', hasFloatingLabel && fieldMinHeight[resolvedSize])}>
          {label != null && (
            <span
              style={isFloated ? floatedLabelStyle[resolvedSize] : restingLabelStyle[resolvedSize]}
              className={cn(
                'pointer-events-none absolute left-0 font-medium text-fg-tertiary-600 select-none',
                'transition-[top,transform,font-size,line-height,color] duration-200 ease-out',
                isFloated
                  ? 'top-0 translate-y-0'
                  : 'top-1/2 -translate-y-1/2',
              )}
            >
              {label}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            style={hasFloatingLabel ? inputTextStyle[resolvedSize] : undefined}
            disabled={disabled}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-invalid={error || undefined}
            aria-describedby={messageId}
            placeholder={hasFloatingLabel ? (isFloated ? placeholder : '') : placeholder}
            className={cn(
              'w-full bg-transparent outline-none p-0',
              'font-body font-medium text-fg-primary-900',
              hasFloatingLabel ? inputText[resolvedSize] : 'text-text-md',
              hasFloatingLabel && 'transition-[opacity,transform] duration-200 ease-out',
              hasFloatingLabel && (isFloated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'),
              'placeholder:text-text-placeholder placeholder:font-normal',
              'disabled:text-fg-disabled-subtle disabled:cursor-not-allowed',
            )}
            {...props}
          />
        </div>
        {iconTrailing != null && (
          <span className="inline-flex shrink-0 items-center justify-center size-2xl text-fg-tertiary-600">
            {iconTrailing}
          </span>
        )}
      </label>
      {hasMessage && (
        error ? (
          <span
            id={messageId}
            role="alert"
            className="inline-flex items-center gap-xs px-xs text-text-xs font-normal text-fg-error-primary"
          >
            <WarningIcon className="size-[14px] shrink-0" />
            <span>{message}</span>
          </span>
        ) : (
          <span
            id={messageId}
            className="px-xs text-text-xs font-normal text-fg-tertiary-600"
          >
            {message}
          </span>
        )
      )}
    </div>
  );
});
