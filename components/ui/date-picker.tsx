'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';
import { TextInput, type TextInputSize } from './text-input';

// ─── Phosphor caret + calendar icons ─────────────────────────────────────────
const CaretLeft = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <polyline points="160 208 80 128 160 48" />
  </svg>
);
const CaretRight = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <polyline points="96 48 176 128 96 208" />
  </svg>
);
const CaretDown = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <polyline points="208 96 128 176 48 96" />
  </svg>
);
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="40" y="40" width="176" height="176" rx="8" />
    <line x1="176" y1="24" x2="176" y2="56" />
    <line x1="80" y1="24" x2="80" y2="56" />
    <line x1="40" y1="88" x2="216" y2="88" />
  </svg>
);

// ─── Helpers ─────────────────────────────────────────────────────────────────

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export type DateValue = { y: number; m: number; d: number };

/** Parse `MM/DD/YYYY` (also accepts `-` and `.` as separators, ignores spaces). */
export function parseMDY(str: string): DateValue | null {
  if (!str) return null;
  const m = String(str).replace(/\s+/g, '').match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})$/);
  if (!m) return null;
  const mm = +m[1], dd = +m[2], yy = +m[3];
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31 || yy < 1900 || yy > 2100) return null;
  const dt = new Date(yy, mm - 1, dd);
  if (dt.getFullYear() !== yy || dt.getMonth() !== mm - 1 || dt.getDate() !== dd) return null;
  return { y: yy, m: mm - 1, d: dd };
}

/** Format a `DateValue` as `MM / DD / YYYY`. */
export function formatMDY(v: DateValue): string {
  return (
    String(v.m + 1).padStart(2, '0') +
    ' / ' + String(v.d).padStart(2, '0') +
    ' / ' + v.y
  );
}

/** Mask a free string into `MM / DD / YYYY` based on first 8 digits. */
function applyMask(raw: string): string {
  const d = raw.replace(/\D/g, '').slice(0, 8);
  let out = d.slice(0, 2);
  if (d.length > 2) out += ' / ' + d.slice(2, 4);
  if (d.length > 4) out += ' / ' + d.slice(4, 8);
  return out;
}

// ─── Validation helpers (consumer-overridable) ──────────────────────────────

export type DateValidator = (v: DateValue, raw: string) => string | null;

const defaultValidator: DateValidator = (v) => {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const dt = new Date(v.y, v.m, v.d);
  if (dt > today) return 'Date cannot be in the future.';
  if (v.y < 1900) return 'Please enter a year between 1900 and today.';
  return null;
};

// ─── Prop types ──────────────────────────────────────────────────────────────

export type DatePickerProps = {
  label?: ReactNode;
  helperText?: ReactNode;
  /**
   * Externally controlled error text. When set, takes precedence over the
   * internal validator and forces the field into the invalid state.
   */
  errorText?: ReactNode;
  /**
   * Called whenever the input parses to a valid (and validator-passing) date,
   * or null when the field is cleared/invalid.
   */
  onValueChange?: (v: DateValue | null) => void;
  /** Override the default validator (future-date + year>=1900). */
  validate?: DateValidator;
  /** Initial calendar view month/year when the field is empty. */
  defaultViewYear?: number;
  defaultViewMonth?: number;
  size?: TextInputSize;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
  defaultValue?: string;
  placeholder?: string;
};

export type DatePickerHandle = {
  /** Imperatively read the current parsed date (or null). */
  getValue: () => DateValue | null;
  /** Imperatively set the input + calendar to a date. */
  setValue: (v: DateValue | null) => void;
  /** Run validation now and return the error string (or null). */
  validate: () => string | null;
};

// ─── Component ───────────────────────────────────────────────────────────────

export const DatePicker = forwardRef<DatePickerHandle, DatePickerProps>(function DatePicker(
  {
    label = 'Date',
    helperText,
    errorText: errorTextProp,
    onValueChange,
    validate: validateProp = defaultValidator,
    defaultViewYear,
    defaultViewMonth,
    size = 'lg',
    disabled,
    id,
    name,
    className,
    defaultValue = '',
    placeholder = 'MM / DD / YYYY',
  },
  ref,
) {
  const reactId = useId();
  const fieldId = id ?? `dp-${reactId}`;

  const [raw, setRaw] = useState(defaultValue);
  const [internalError, setInternalError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Calendar view defaults: 25 years before today (sensible for DOB pickers).
  const initial = useMemo(() => {
    const t = new Date();
    return {
      y: defaultViewYear ?? t.getFullYear() - 25,
      m: defaultViewMonth ?? t.getMonth(),
    };
  }, [defaultViewYear, defaultViewMonth]);
  const [viewY, setViewY] = useState(initial.y);
  const [viewM, setViewM] = useState(initial.m);
  const [sel, setSel] = useState<DateValue | null>(() => parseMDY(defaultValue));

  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const errorText = errorTextProp ?? internalError;
  const isInvalid = !!errorText;

  // Run validation and store the resulting message internally.
  const runValidate = useCallback(
    (str: string): string | null => {
      const digits = str.replace(/\D/g, '');
      if (!str || digits.length < 8) return null;
      const parsed = parseMDY(str);
      if (!parsed) return 'Invalid date. Please check the month and day.';
      return validateProp(parsed, str);
    },
    [validateProp],
  );

  // Imperative API for parents that need to read/write programmatically.
  useImperativeHandle(ref, () => ({
    getValue: () => sel,
    setValue: (v) => {
      if (v) {
        setRaw(formatMDY(v));
        setSel(v);
        setViewY(v.y);
        setViewM(v.m);
        setInternalError(null);
      } else {
        setRaw('');
        setSel(null);
        setInternalError(null);
      }
    },
    validate: () => {
      const msg = runValidate(raw);
      setInternalError(msg);
      return msg;
    },
  }), [sel, raw, runValidate]);

  // Click-outside / Escape close.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Two-way sync: typing into the input drives the calendar view + selection.
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const masked = applyMask(e.target.value);
    setRaw(masked);
    const parsed = parseMDY(masked);
    if (parsed) {
      setSel(parsed);
      setViewY(parsed.y);
      setViewM(parsed.m);
    } else if (masked.length === 0) {
      setSel(null);
    }
    const msg = runValidate(masked);
    setInternalError(msg);
    if (parsed && !msg) onValueChange?.(parsed);
    else if (masked.length === 0) onValueChange?.(null);
  }

  function handleBlur() {
    setInternalError(runValidate(raw));
  }

  function pickDay(v: DateValue) {
    setSel(v);
    setViewY(v.y);
    setViewM(v.m);
    setRaw(formatMDY(v));
    const msg = runValidate(formatMDY(v));
    setInternalError(msg);
    if (!msg) onValueChange?.(v);
    setOpen(false);
  }

  function shiftMonth(delta: number) {
    let y = viewY, m = viewM + delta;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setViewY(y); setViewM(m);
  }

  // Build the 6-week grid for the current view.
  const cells = useMemo(() => {
    const firstDow = new Date(viewY, viewM, 1).getDay();
    const dim = new Date(viewY, viewM + 1, 0).getDate();
    const dimPrev = new Date(viewY, viewM, 0).getDate();
    const out: { v: DateValue; other: boolean }[] = [];
    for (let i = 0; i < 42; i++) {
      let y: number, m: number, d: number, other = false;
      if (i < firstDow) {
        d = dimPrev - firstDow + 1 + i;
        m = viewM === 0 ? 11 : viewM - 1;
        y = viewM === 0 ? viewY - 1 : viewY;
        other = true;
      } else if (i >= firstDow + dim) {
        d = i - firstDow - dim + 1;
        m = viewM === 11 ? 0 : viewM + 1;
        y = viewM === 11 ? viewY + 1 : viewY;
        other = true;
      } else {
        d = i - firstDow + 1; m = viewM; y = viewY;
      }
      out.push({ v: { y, m, d }, other });
    }
    return out;
  }, [viewY, viewM]);

  return (
    <div ref={wrapRef} className={cn('relative w-full font-body', className)}>
      <TextInput
        ref={inputRef}
        id={fieldId}
        name={name}
        size={size}
        label={label}
        placeholder={placeholder}
        helperText={helperText}
        errorText={errorText ?? undefined}
        invalid={isInvalid}
        disabled={disabled}
        autoComplete="bday"
        inputMode="numeric"
        value={raw}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() => !disabled && setOpen(true)}
        onClick={() => !disabled && setOpen(true)}
        trailingIcon={<CalendarIcon className="size-2xl" />}
      />

      <div
        role="dialog"
        aria-label="Choose date"
        data-open={open}
        className={cn(
          'absolute left-0 z-10 mt-md w-[296px] origin-top-left',
          'bg-bg-primary border border-border-primary rounded-xl p-lg',
          'shadow-[0_12px_28px_-4px_rgba(10,13,18,0.12),0_4px_6px_-2px_rgba(10,13,18,0.06)]',
          'transition-[opacity,transform] duration-150',
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-1 pointer-events-none',
        )}
        // Anchor the popover below the field. The shell label adds a stack of
        // its own children (label + shell + helper), so absolute top:100% relative
        // to the wrapper places it correctly under the helper-text row.
        style={{ top: '100%' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-md">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); shiftMonth(-1); }}
            aria-label="Previous month"
            className="size-7 inline-flex items-center justify-center rounded-md text-fg-secondary-700 hover:bg-bg-primary-hover hover:text-fg-primary-900 transition-colors"
          >
            <CaretLeft className="size-3-5" />
          </button>
          <div className="inline-flex items-center gap-sm text-text-sm font-medium text-fg-primary-900 [letter-spacing:-0.2px]">
            <span className="inline-flex items-center gap-xxs px-sm py-xxs rounded-md">
              {MONTHS[viewM]}
              <CaretDown className="size-3 text-fg-tertiary-600" />
            </span>
            <span>{viewY}</span>
          </div>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); shiftMonth(1); }}
            aria-label="Next month"
            className="size-7 inline-flex items-center justify-center rounded-md text-fg-secondary-700 hover:bg-bg-primary-hover hover:text-fg-primary-900 transition-colors"
          >
            <CaretRight className="size-3-5" />
          </button>
        </div>

        {/* Day-of-week labels */}
        <div className="grid grid-cols-7 gap-[2px] pb-xs" aria-hidden="true">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <span
              key={d}
              className="text-center text-[11px] font-medium text-fg-tertiary-600 py-xxs"
            >
              {d}
            </span>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-[2px]" role="grid">
          {cells.map(({ v, other }, i) => {
            const isSel = sel && sel.y === v.y && sel.m === v.m && sel.d === v.d;
            return (
              <button
                key={i}
                type="button"
                onClick={() => pickDay(v)}
                className={cn(
                  'aspect-square inline-flex items-center justify-center rounded-md',
                  'text-[13px] transition-colors',
                  isSel
                    ? 'bg-fg-primary-900 text-text-white font-medium'
                    : other
                    ? 'text-fg-quaternary-400 hover:bg-bg-primary-hover'
                    : 'text-fg-primary-900 hover:bg-bg-primary-hover',
                )}
              >
                {v.d}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});
