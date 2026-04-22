'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge, type BadgeColor } from './badge';
import { Checkbox } from './checkbox';

// ─── Cell content union ───────────────────────────────────────────────────────

export type CellContent =
  | { type: 'text';         value: string; secondary?: string }
  | { type: 'lead-text';    primary: string; secondary: string }
  | { type: 'badge';        label: string; color: BadgeColor }
  | { type: 'badges';       items: Array<{ label: string; color: BadgeColor }> }
  | { type: 'trend';        value: number; suffix?: string }
  | { type: 'avatar';       src?: string; name: string; sub?: string }
  | { type: 'avatar-group'; avatars: Array<{ src?: string; name: string }>; max?: number }
  | { type: 'progress';     value: number; max?: number; label?: string }
  | { type: 'actions';      items: Array<{ label: string; onClick: () => void; destructive?: boolean }> }
  | { type: 'icon-actions'; items: Array<{ icon: React.ReactNode; label: string; onClick: () => void }> }
  | { type: 'custom';       render: () => React.ReactNode };

// ─── Column definition ────────────────────────────────────────────────────────

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: number | string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  cell: (row: T, index: number) => CellContent;
}

// ─── Table props ──────────────────────────────────────────────────────────────

export interface TableProps<T = Record<string, unknown>> {
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

// ─── AvatarCircle ─────────────────────────────────────────────────────────────

function AvatarCircle({
  src,
  name,
  size = 'md',
}: {
  src?: string;
  name: string;
  size?: 'sm' | 'md';
}) {
  const initial = name.charAt(0).toUpperCase();
  const sizeCls = size === 'sm' ? 'size-[26px] text-text-xxs' : 'size-[28px] text-text-xs';

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full overflow-hidden shrink-0',
        'bg-bg-secondary border border-border-primary',
        'font-body font-medium text-text-secondary-700',
        sizeCls,
      )}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        initial
      )}
    </span>
  );
}

// ─── ProgressBar ──────────────────────────────────────────────────────────────

function ProgressBar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="flex items-center gap-md w-full">
      <div className="flex-1 h-md rounded-full bg-utility-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-utility-brand-600 transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-body font-normal text-text-xs text-text-tertiary-600 min-w-[32px] text-right">
        {pct.toFixed(0)}%
      </span>
    </div>
  );
}

// ─── Tooltip (action button hover) ────────────────────────────────────────────

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <span
        role="tooltip"
        aria-hidden={!visible}
        className={cn(
          'absolute bottom-full left-1/2 -translate-x-1/2 mb-xs',
          'pointer-events-none whitespace-nowrap z-50',
          'rounded-sm px-md py-xxs',
          'bg-bg-primary-solid text-text-white',
          'font-body font-medium text-text-xs',
          'transition-opacity duration-[120ms]',
          visible ? 'opacity-100' : 'opacity-0',
        )}
      >
        {label}
      </span>
    </span>
  );
}

// ─── Action buttons ───────────────────────────────────────────────────────────

function ActionButton({
  label,
  onClick,
  destructive,
}: {
  label: string;
  onClick: () => void;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-md border px-md py-xs',
        'font-body font-medium text-text-sm whitespace-nowrap',
        'transition-colors duration-[120ms]',
        'focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_var(--focus-ring)]',
        destructive
          ? cn(
              'border-border-primary bg-bg-primary text-text-secondary-700',
              'hover:bg-bg-error-secondary hover:border-border-error-subtle hover:text-text-error-primary-600',
            )
          : cn(
              'border-border-primary bg-bg-primary text-text-secondary-700',
              'hover:bg-bg-primary-hover hover:text-text-secondary-hover',
            ),
      )}
    >
      {label}
    </button>
  );
}

function IconActionButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Tooltip label={label}>
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        className={cn(
          'inline-flex items-center justify-center size-[28px] rounded-md',
          'text-fg-tertiary-600 border border-transparent',
          'transition-colors duration-[120ms]',
          'hover:bg-bg-secondary hover:border-border-primary hover:text-fg-secondary-700',
          'focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_var(--focus-ring)]',
        )}
      >
        {icon}
      </button>
    </Tooltip>
  );
}

// ─── Sort icon (Phosphor regular CaretUpDown, stroke-based) ───────────────────

function SortIcon({ direction, active }: { direction?: 'asc' | 'desc'; active: boolean }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 256 256"
      fill="none" stroke="currentColor"
      strokeWidth={20} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <polyline points="80 176 128 224 176 176" opacity={active && direction === 'desc' ? 1 : 0.4} />
      <polyline points="80 80 128 32 176 80"   opacity={active && direction === 'asc'  ? 1 : 0.4} />
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
  column: TableColumn<unknown>;
  isActive: boolean;
  sortDirection?: 'asc' | 'desc';
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
}) {
  const handleClick = () => {
    if (!column.sortable || !onSort) return;
    onSort(column.key, isActive && sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <th
      onClick={handleClick}
      style={{ width: column.width, minWidth: column.minWidth, textAlign: column.align ?? 'left' }}
      className={cn(
        'h-[42px] px-2xl py-lg whitespace-nowrap select-none',
        'bg-bg-secondary border-b border-border-primary',
        column.sortable ? 'cursor-pointer' : 'cursor-default',
      )}
    >
      <span
        className={cn(
          'inline-flex items-center gap-xs',
          'font-body font-medium text-text-xs',
          'text-text-tertiary-600 transition-colors duration-[120ms]',
          column.sortable && 'hover:text-text-secondary-700',
          isActive && 'text-text-primary-900',
        )}
      >
        {column.header}
        {column.sortable && <SortIcon direction={sortDirection} active={isActive} />}
      </span>
    </th>
  );
}

// ─── Cell renderer ────────────────────────────────────────────────────────────

function renderCell(content: CellContent): React.ReactNode {
  switch (content.type) {
    case 'text':
      return (
        <div className="flex flex-col gap-xxs">
          <span className="font-body font-medium text-text-sm text-text-primary-900">
            {content.value}
          </span>
          {content.secondary && (
            <span className="font-body font-normal text-text-xs text-text-tertiary-600">
              {content.secondary}
            </span>
          )}
        </div>
      );

    case 'lead-text':
      return (
        <div className="flex flex-col gap-xxs">
          <span className="font-body font-medium text-text-sm text-text-primary-900">
            {content.primary}
          </span>
          <span className="font-body font-normal text-text-xs text-text-tertiary-600">
            {content.secondary}
          </span>
        </div>
      );

    case 'badge':
      return <Badge size="sm" color={content.color}>{content.label}</Badge>;

    case 'badges':
      return (
        <div className="flex flex-wrap gap-xs">
          {content.items.map((item, i) => (
            <Badge key={i} size="sm" color={item.color}>{item.label}</Badge>
          ))}
        </div>
      );

    case 'trend': {
      const isPositive = content.value >= 0;
      return (
        <span
          className={cn(
            'font-body font-medium text-text-sm',
            isPositive ? 'text-text-success-primary-600' : 'text-text-error-primary-600',
          )}
        >
          {isPositive ? '+' : ''}{content.value.toFixed(2)}{content.suffix ?? '%'}
        </span>
      );
    }

    case 'avatar':
      return (
        <div className="flex items-center gap-md">
          <AvatarCircle src={content.src} name={content.name} />
          <div className="flex flex-col gap-xxs">
            <span className="font-body font-medium text-text-sm text-text-primary-900">
              {content.name}
            </span>
            {content.sub && (
              <span className="font-body font-normal text-text-xs text-text-tertiary-600">
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
        <div className="flex items-center">
          {visible.map((av, i) => (
            <span
              key={i}
              className={cn(i > 0 && '-ml-md')}
              style={{ zIndex: max - i, position: 'relative' }}
            >
              <AvatarCircle src={av.src} name={av.name} size="sm" />
            </span>
          ))}
          {overflow > 0 && (
            <span
              className={cn(
                'inline-flex items-center justify-center size-[26px] -ml-md rounded-full',
                'bg-bg-secondary border border-border-primary',
                'font-body font-medium text-text-xxs text-text-tertiary-600',
              )}
            >
              +{overflow}
            </span>
          )}
        </div>
      );
    }

    case 'progress':
      return (
        <div className="flex flex-col gap-xs w-full">
          {content.label && (
            <span className="font-body font-normal text-text-xs text-text-tertiary-600">
              {content.label}
            </span>
          )}
          <ProgressBar value={content.value} max={content.max} />
        </div>
      );

    case 'actions':
      return (
        <div className="flex items-center gap-sm">
          {content.items.map((item, i) => (
            <ActionButton key={i} label={item.label} onClick={item.onClick} destructive={item.destructive} />
          ))}
        </div>
      );

    case 'icon-actions':
      return (
        <div className="flex items-center gap-xxs">
          {content.items.map((item, i) => (
            <IconActionButton key={i} icon={item.icon} label={item.label} onClick={item.onClick} />
          ))}
        </div>
      );

    case 'custom':
      return content.render();

    default:
      return null;
  }
}


// ─── Table ────────────────────────────────────────────────────────────────────

export function Table<T>({
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
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selectedKeys?.has(k));
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
      className={cn(
        'w-full overflow-auto rounded-xl border border-border-primary bg-bg-primary shadow-card',
        className,
      )}
    >
      <table className="w-full border-collapse font-body">
        <thead className={stickyHeader ? 'sticky top-0 z-10' : undefined}>
          <tr>
            {selectable && (
              <th className="w-[44px] h-[42px] px-2xl py-lg text-center bg-bg-secondary border-b border-border-primary">
                <Checkbox
                  size="sm"
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map((col) => (
              <TableHeaderCell
                key={col.key}
                column={col as TableColumn<unknown>}
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
                className="px-2xl py-4xl text-center font-body text-text-sm text-text-tertiary-600"
              >
                {emptyState ?? 'No data available'}
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
                  className={cn(
                    'border-b border-border-secondary-alt last:border-b-0 transition-colors duration-[100ms]',
                    isSelected
                      ? 'bg-utility-brand-50'
                      : isStriped
                      ? 'bg-bg-secondary-subtle'
                      : 'bg-bg-primary',
                  )}
                >
                  {selectable && (
                    <td className="w-[44px] h-[54px] px-2xl py-xl text-center align-middle">
                      <Checkbox
                        size="sm"
                        checked={isSelected}
                        onChange={(e) => handleSelectRow(key, e.target.checked)}
                        aria-label={`Select row ${rowIdx + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{ textAlign: col.align ?? 'left' }}
                      className="h-[54px] px-2xl py-xl align-middle"
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
