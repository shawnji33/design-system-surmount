'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

// ─── Design tokens (dynamic inline style values) ──────────────────────────────

const T = {
  bgPrimary:          'var(--color-bg-primary)',
  bgSecondary:        'var(--color-bg-secondary)',
  borderDefault:      'var(--color-border-primary)',
  borderRow:          'rgba(0,0,0,0.06)',
  textPrimary:        'var(--color-fg-primary-900)',
  textSecondary:      'rgba(10,13,18,0.7)',
  textTertiary:       'var(--color-fg-tertiary-600)',
  textTertiaryHover:  'var(--color-fg-secondary-700)',
  textSuccess:        'var(--color-utility-success-700)',
  textError:          'var(--color-utility-error-700)',
  textBrand:          'var(--color-text-brand-secondary-700)',
  badgeBrandBg:       'var(--color-utility-brand-50)',
  badgeBrandBorder:   'var(--color-utility-brand-200)',
  badgeBrandText:     'var(--color-utility-brand-700)',
  badgeSuccessBg:     'var(--color-utility-success-50)',
  badgeSuccessBorder: 'var(--color-utility-success-200)',
  badgeSuccessText:   'var(--color-utility-success-700)',
  badgeErrorBg:       'var(--color-utility-error-50)',
  badgeErrorBorder:   'var(--color-utility-error-200)',
  badgeErrorText:     'var(--color-utility-error-700)',
  badgeWarningBg:     'var(--color-utility-warning-50)',
  badgeWarningBorder: 'var(--color-utility-warning-200)',
  badgeWarningText:   'var(--color-utility-warning-700)',
  badgeGrayBg:        'var(--color-bg-secondary)',
  badgeGrayBorder:    'var(--color-border-primary)',
  badgeGrayText:      'var(--color-fg-secondary-700)',
  radiusXl:           'var(--radius-xl)',
  radiusFull:         'var(--radius-full)',
  cellPaddingV:       'var(--spacing-xl)',
  cellPaddingH:       'var(--spacing-2xl)',
  headerPaddingV:     'var(--spacing-lg)',
  cellHeight:         54,
  headerHeight:       42,
  fontBody:           'var(--font-family-body)',
  textXs:             'var(--font-size-text-xs)',
  textSm:             'var(--font-size-text-sm)',
  leadingXs:          'var(--line-height-text-xs)',
  leadingSm:          'var(--line-height-text-sm)',
  fw400:              400,
  fw500:              500,
} as const;

// ─── Cell content union ───────────────────────────────────────────────────────

export type BadgeVariantColor = 'brand' | 'success' | 'error' | 'warning' | 'gray';

export type CellContent =
  | { type: 'text'; value: string; secondary?: string }
  | { type: 'lead-text'; primary: string; secondary: string }
  | { type: 'badge'; label: string; color: BadgeVariantColor }
  | { type: 'badges'; items: Array<{ label: string; color: BadgeVariantColor }> }
  | { type: 'trend'; value: number; suffix?: string }
  | { type: 'avatar'; src?: string; name: string; sub?: string }
  | { type: 'avatar-group'; avatars: Array<{ src?: string; name: string }>; max?: number }
  | { type: 'progress'; value: number; max?: number; label?: string }
  | { type: 'actions'; items: Array<{ label: string; onClick: () => void; destructive?: boolean }> }
  | { type: 'icon-actions'; items: Array<{ icon: React.ReactNode; label: string; onClick: () => void }> }
  | { type: 'custom'; render: () => React.ReactNode };

// ─── Column definition ────────────────────────────────────────────────────────

export interface TableColumn<T extends Record<string, unknown> = Record<string, unknown>> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: number | string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  cell: (row: T, index: number) => CellContent;
}

// ─── Table props ──────────────────────────────────────────────────────────────

export interface TableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T, index: number) => string;
  selectable?: boolean;
  selectedKeys?: Set<string>;
  onSelectionChange?: (keys: Set<string>) => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  striped?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  stickyHeader?: boolean;
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function Badge({ label, color }: { label: string; color: BadgeVariantColor }) {
  const bgMap: Record<BadgeVariantColor, string> = {
    brand:   T.badgeBrandBg,
    success: T.badgeSuccessBg,
    error:   T.badgeErrorBg,
    warning: T.badgeWarningBg,
    gray:    T.badgeGrayBg,
  };
  const borderMap: Record<BadgeVariantColor, string> = {
    brand:   T.badgeBrandBorder,
    success: T.badgeSuccessBorder,
    error:   T.badgeErrorBorder,
    warning: T.badgeWarningBorder,
    gray:    T.badgeGrayBorder,
  };
  const textMap: Record<BadgeVariantColor, string> = {
    brand:   T.badgeBrandText,
    success: T.badgeSuccessText,
    error:   T.badgeErrorText,
    warning: T.badgeWarningText,
    gray:    T.badgeGrayText,
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: bgMap[color],
        border: `1px solid ${borderMap[color]}`,
        color: textMap[color],
        borderRadius: T.radiusFull,
        padding: '2px 8px',
        fontSize: T.textXs,
        lineHeight: T.leadingXs,
        fontWeight: T.fw500,
        fontFamily: T.fontBody,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

// ─── AvatarCircle ─────────────────────────────────────────────────────────────

function AvatarCircle({
  src,
  name,
  size = 28,
  style,
}: {
  src?: string;
  name: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        background: T.bgSecondary,
        border: `1px solid ${T.borderDefault}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: 11,
        fontWeight: T.fw500,
        color: T.textSecondary,
        fontFamily: T.fontBody,
        ...style,
      }}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        initial
      )}
    </div>
  );
}

// ─── ProgressBar ─────────────────────────────────────────────────────────────

function ProgressBar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
      <div
        style={{
          flex: 1,
          height: 6,
          borderRadius: T.radiusFull,
          background: T.bgSecondary,
          border: `1px solid ${T.borderDefault}`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            borderRadius: T.radiusFull,
            background: T.textBrand,
            transition: 'width 300ms ease',
          }}
        />
      </div>
      <span
        style={{
          fontSize: T.textXs,
          lineHeight: T.leadingXs,
          color: T.textTertiary,
          fontFamily: T.fontBody,
          fontWeight: T.fw400,
          minWidth: 32,
          textAlign: 'right',
        }}
      >
        {pct.toFixed(0)}%
      </span>
    </div>
  );
}

// ─── Tooltip (for action buttons) ────────────────────────────────────────────

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 6px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#0a0d12',
            color: '#fff',
            fontSize: 11,
            fontWeight: T.fw500,
            fontFamily: T.fontBody,
            borderRadius: 'var(--radius-sm)',
            padding: '4px 8px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 100,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

// ─── ActionButton ─────────────────────────────────────────────────────────────

function ActionButton({
  label,
  onClick,
  destructive,
}: {
  label: string;
  onClick: () => void;
  destructive?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const hoverBg = destructive ? T.bgSecondary : T.bgSecondary;
  const hoverBorder = destructive
    ? `1px solid ${T.borderDefault}`
    : `1px solid ${T.borderDefault}`;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 10px',
        borderRadius: 'var(--radius-md)',
        border: hovered && destructive
          ? `1px solid var(--color-border-error-subtle)`
          : `1px solid ${T.borderDefault}`,
        background: hovered
          ? destructive
            ? 'var(--color-bg-error-primary)'
            : T.bgSecondary
          : T.bgPrimary,
        color: hovered && destructive
          ? 'var(--color-utility-error-700)'
          : T.textSecondary,
        fontSize: T.textSm,
        lineHeight: T.leadingSm,
        fontFamily: T.fontBody,
        fontWeight: T.fw500,
        cursor: 'pointer',
        transition: 'background 120ms ease, border-color 120ms ease, color 120ms ease',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  );
}

// ─── IconActionButton ─────────────────────────────────────────────────────────

function IconActionButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Tooltip label={label}>
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 28,
          height: 28,
          borderRadius: 'var(--radius-md)',
          border: hovered
            ? `1px solid var(--color-border-primary)`
            : `1px solid transparent`,
          background: hovered ? 'var(--color-bg-secondary)' : 'transparent',
          color: T.textTertiary,
          cursor: 'pointer',
          transition: 'background 120ms ease, border-color 120ms ease',
        }}
      >
        {icon}
      </button>
    </Tooltip>
  );
}

// ─── Sort icon ────────────────────────────────────────────────────────────────

function SortIcon({
  direction,
  active,
}: {
  direction?: 'asc' | 'desc';
  active: boolean;
}) {
  const color = active ? T.textPrimary : T.textTertiary;

  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M6 2L3 5h6L6 2Z"
        fill={direction === 'asc' && active ? color : T.textTertiary}
        opacity={direction === 'desc' && active ? 0.3 : 1}
      />
      <path
        d="M6 10L3 7h6l-3 3Z"
        fill={direction === 'desc' && active ? color : T.textTertiary}
        opacity={direction === 'asc' && active ? 0.3 : 1}
      />
    </svg>
  );
}

// ─── TableHeaderCell ──────────────────────────────────────────────────────────

function TableHeaderCell({
  column,
  isActive,
  sortDirection,
  onSort,
}: {
  column: TableColumn<Record<string, unknown>>;
  isActive: boolean;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
}) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (!column.sortable || !onSort) return;
    const next = isActive && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(column.key, next);
  };

  return (
    <th
      style={{
        padding: `${T.headerPaddingV} ${T.cellPaddingH}`,
        height: T.headerHeight,
        background: T.bgSecondary,
        borderBottom: `1px solid ${T.borderDefault}`,
        textAlign: column.align ?? 'left',
        width: column.width,
        minWidth: column.minWidth,
        cursor: column.sortable ? 'pointer' : 'default',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          color: hovered && column.sortable ? T.textTertiaryHover : T.textTertiary,
          fontSize: T.textXs,
          lineHeight: T.leadingXs,
          fontFamily: T.fontBody,
          fontWeight: T.fw500,
          transition: 'color 120ms ease',
        }}
      >
        {column.header}
        {column.sortable && (
          <SortIcon direction={sortDirection} active={isActive} />
        )}
      </div>
    </th>
  );
}

// ─── Cell renderer ────────────────────────────────────────────────────────────

function renderCell(content: CellContent): React.ReactNode {
  switch (content.type) {
    case 'text':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span
            style={{
              fontSize: T.textSm,
              lineHeight: T.leadingSm,
              color: T.textPrimary,
              fontWeight: T.fw500,
              fontFamily: T.fontBody,
            }}
          >
            {content.value}
          </span>
          {content.secondary && (
            <span
              style={{
                fontSize: T.textXs,
                lineHeight: T.leadingXs,
                color: T.textTertiary,
                fontWeight: T.fw400,
                fontFamily: T.fontBody,
              }}
            >
              {content.secondary}
            </span>
          )}
        </div>
      );

    case 'lead-text':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span
            style={{
              fontSize: T.textSm,
              lineHeight: T.leadingSm,
              color: T.textPrimary,
              fontWeight: T.fw500,
              fontFamily: T.fontBody,
            }}
          >
            {content.primary}
          </span>
          <span
            style={{
              fontSize: T.textXs,
              lineHeight: T.leadingXs,
              color: T.textTertiary,
              fontWeight: T.fw400,
              fontFamily: T.fontBody,
            }}
          >
            {content.secondary}
          </span>
        </div>
      );

    case 'badge':
      return <Badge label={content.label} color={content.color} />;

    case 'badges':
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {content.items.map((item, i) => (
            <Badge key={i} label={item.label} color={item.color} />
          ))}
        </div>
      );

    case 'trend': {
      const isPositive = content.value >= 0;
      const sign = isPositive ? '+' : '';
      return (
        <span
          style={{
            fontSize: T.textSm,
            lineHeight: T.leadingSm,
            fontFamily: T.fontBody,
            fontWeight: T.fw500,
            color: isPositive ? T.textSuccess : T.textError,
          }}
        >
          {sign}{content.value.toFixed(2)}{content.suffix ?? '%'}
        </span>
      );
    }

    case 'avatar':
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <AvatarCircle src={content.src} name={content.name} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span
              style={{
                fontSize: T.textSm,
                lineHeight: T.leadingSm,
                color: T.textPrimary,
                fontWeight: T.fw500,
                fontFamily: T.fontBody,
              }}
            >
              {content.name}
            </span>
            {content.sub && (
              <span
                style={{
                  fontSize: T.textXs,
                  lineHeight: T.leadingXs,
                  color: T.textTertiary,
                  fontWeight: T.fw400,
                  fontFamily: T.fontBody,
                }}
              >
                {content.sub}
              </span>
            )}
          </div>
        </div>
      );

    case 'avatar-group': {
      const max = content.max ?? 3;
      const visible = content.avatars.slice(0, max);
      const overflow = content.avatars.length - max;
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {visible.map((av, i) => (
            <AvatarCircle
              key={i}
              src={av.src}
              name={av.name}
              size={26}
              style={{ marginLeft: i === 0 ? 0 : -8, zIndex: max - i }}
            />
          ))}
          {overflow > 0 && (
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: T.bgSecondary,
                border: `1px solid ${T.borderDefault}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: T.fw500,
                color: T.textTertiary,
                fontFamily: T.fontBody,
                marginLeft: -8,
              }}
            >
              +{overflow}
            </div>
          )}
        </div>
      );
    }

    case 'progress':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
          {content.label && (
            <span
              style={{
                fontSize: T.textXs,
                color: T.textTertiary,
                fontFamily: T.fontBody,
                fontWeight: T.fw400,
              }}
            >
              {content.label}
            </span>
          )}
          <ProgressBar value={content.value} max={content.max} />
        </div>
      );

    case 'actions':
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {content.items.map((item, i) => (
            <ActionButton
              key={i}
              label={item.label}
              onClick={item.onClick}
              destructive={item.destructive}
            />
          ))}
        </div>
      );

    case 'icon-actions':
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {content.items.map((item, i) => (
            <IconActionButton
              key={i}
              icon={item.icon}
              label={item.label}
              onClick={item.onClick}
            />
          ))}
        </div>
      );

    case 'custom':
      return content.render();

    default:
      return null;
  }
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

function TableCheckbox({
  checked,
  indeterminate,
  onChange,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      aria-label={label}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className={cn(
        'w-4 h-4 rounded-sm cursor-pointer',
        'border border-border-primary',
        'accent-[var(--color-bg-brand-solid)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-brand)]',
      )}
    />
  );
}

// ─── Table ────────────────────────────────────────────────────────────────────

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  selectable,
  selectedKeys,
  onSelectionChange,
  sortKey,
  sortDirection,
  onSort,
  striped,
  emptyState,
  className,
  stickyHeader,
}: TableProps<T>) {
  const allKeys = data.map((row, i) => rowKey(row, i));
  const allSelected =
    allKeys.length > 0 && allKeys.every((k) => selectedKeys?.has(k));
  const someSelected = !allSelected && allKeys.some((k) => selectedKeys?.has(k));

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return;
    onSelectionChange(checked ? new Set(allKeys) : new Set());
  };

  const handleSelectRow = (key: string, checked: boolean) => {
    if (!onSelectionChange || !selectedKeys) return;
    const next = new Set(selectedKeys);
    if (checked) next.add(key);
    else next.delete(key);
    onSelectionChange(next);
  };

  return (
    <div
      className={cn('w-full overflow-auto rounded-xl border border-border-primary shadow-sm', className)}
      style={{ background: T.bgPrimary }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: T.fontBody,
        }}
      >
        <thead
          style={
            stickyHeader
              ? { position: 'sticky', top: 0, zIndex: 10 }
              : undefined
          }
        >
          <tr>
            {selectable && (
              <th
                style={{
                  width: 44,
                  padding: `${T.headerPaddingV} ${T.cellPaddingH}`,
                  height: T.headerHeight,
                  background: T.bgSecondary,
                  borderBottom: `1px solid ${T.borderDefault}`,
                  textAlign: 'center',
                }}
              >
                <TableCheckbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={handleSelectAll}
                  label="Select all rows"
                />
              </th>
            )}
            {columns.map((col) => (
              <TableHeaderCell
                key={col.key}
                column={col as TableColumn<Record<string, unknown>>}
                isActive={sortKey === col.key}
                sortDirection={sortKey === col.key ? sortDirection : undefined}
                onSort={onSort}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                style={{
                  padding: '40px 24px',
                  textAlign: 'center',
                  color: T.textTertiary,
                  fontSize: T.textSm,
                  fontFamily: T.fontBody,
                }}
              >
                {emptyState ?? (
                  <span style={{ color: T.textTertiary }}>No data available</span>
                )}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => {
              const key = rowKey(row, rowIdx);
              const isSelected = selectedKeys?.has(key) ?? false;
              const isStriped = striped && rowIdx % 2 === 1;

              return (
                <tr
                  key={key}
                  style={{
                    background: isSelected
                      ? 'var(--color-utility-brand-50)'
                      : isStriped
                      ? 'var(--color-gray-lm-25)'
                      : T.bgPrimary,
                    borderBottom: `1px solid ${T.borderRow}`,
                    transition: 'background 100ms ease',
                  }}
                >
                  {selectable && (
                    <td
                      style={{
                        padding: `${T.cellPaddingV} ${T.cellPaddingH}`,
                        height: T.cellHeight,
                        textAlign: 'center',
                        verticalAlign: 'middle',
                      }}
                    >
                      <TableCheckbox
                        checked={isSelected}
                        onChange={(checked) => handleSelectRow(key, checked)}
                        label={`Select row ${rowIdx + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        padding: `${T.cellPaddingV} ${T.cellPaddingH}`,
                        height: T.cellHeight,
                        verticalAlign: 'middle',
                        textAlign: col.align ?? 'left',
                      }}
                    >
                      {renderCell(col.cell(row, rowIdx))}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
