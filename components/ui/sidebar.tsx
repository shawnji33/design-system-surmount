'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// ─── Icons (Phosphor REGULAR weight = stroke-based, NOT filled-outline paths) ─

const SVG_REGULAR = {
  viewBox: '0 0 256 256',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 16,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

function IconHome({ className }: { className?: string }) {
  return (
    <svg className={className} {...SVG_REGULAR} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M152,208V160a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v48a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V115.55a8,8,0,0,1,2.62-5.92l88-79.99a8,8,0,0,1,10.77,0l88,79.99a8,8,0,0,1,2.62,5.92V208a8,8,0,0,1-8,8H160A8,8,0,0,1,152,208Z" />
    </svg>
  );
}

function IconMarketplace({ className }: { className?: string }) {
  return (
    <svg className={className} {...SVG_REGULAR} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M40,112V200a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V112" />
      <path d="M54.86,32H201.14a8,8,0,0,1,7.75,6L224,96H32L47.11,38A8,8,0,0,1,54.86,32Z" />
      <path d="M96,96v16a32,32,0,0,1-64,0V96" />
      <path d="M160,96v16a32,32,0,0,1-64,0V96" />
      <path d="M224,96v16a32,32,0,0,1-64,0V96" />
    </svg>
  );
}

function IconMagicWand({ className }: { className?: string }) {
  return (
    <svg className={className} {...SVG_REGULAR} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="48" y1="208" x2="160" y2="96" />
      <line x1="136" y1="72" x2="184" y2="120" />
      <polyline points="170 24 178 40 194 48 178 56 170 72 162 56 146 48 162 40 170 24" />
      <polyline points="224 104 232 120 248 128 232 136 224 152 216 136 200 128 216 120 224 104" />
    </svg>
  );
}

function IconClients({ className }: { className?: string }) {
  return (
    <svg className={className} {...SVG_REGULAR} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="108" cy="100" r="60" />
      <line x1="40" y1="216" x2="65.61" y2="172" />
      <line x1="176" y1="216" x2="150.39" y2="172" />
      <circle cx="180" cy="180" r="36" />
      <line x1="206" y1="206" x2="232" y2="232" />
    </svg>
  );
}

function SurmountLogo({ className }: { className?: string }) {
  // Brand-tinted square containing a link/chain glyph — matches the active-app
  // affordance shown in the reference. Uses the brand utility palette.
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="var(--color-utility-brand-100)" />
      <path
        d="M11.05 18.95a3 3 0 1 0 0-4.24L9.64 16.12a1 1 0 1 0 1.41 1.41l1.41-1.41a1 1 0 1 1 1.41 1.41l-2.83 2.83a3 3 0 1 1-4.24-4.24l2.83-2.83a3 3 0 0 1 4.24 0l1.41 1.41a1 1 0 1 1-1.41 1.41l-1.41-1.41a1 1 0 0 0-1.41 0L8.21 17.54a1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0Z"
        fill="var(--color-utility-brand-600)"
      />
      <path
        d="M20.95 13.05a3 3 0 1 0 0 4.24l1.41-1.41a1 1 0 1 0-1.41-1.41l-1.41 1.41a1 1 0 1 1-1.41-1.41l2.83-2.83a3 3 0 1 1 4.24 4.24l-2.83 2.83a3 3 0 0 1-4.24 0l-1.41-1.41a1 1 0 1 1 1.41-1.41l1.41 1.41a1 1 0 0 0 1.41 0l2.83-2.83a1 1 0 0 0 0-1.41 1 1 0 0 0-1.41 0Z"
        fill="var(--color-utility-brand-600)"
      />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type SidebarNavKey = 'home' | 'marketplace' | 'create' | 'clients';

export interface SidebarNavItem {
  key: SidebarNavKey;
  label: string;
  icon: React.ReactNode;
  href?: string;
}

export interface SidebarProps {
  active?: SidebarNavKey;
  userInitial?: string;
  onNavigate?: (key: SidebarNavKey, href?: string) => void;
  onAvatarClick?: () => void;
}

// ─── Default nav items ────────────────────────────────────────────────────────

const DEFAULT_NAV_ITEMS: SidebarNavItem[] = [
  { key: 'home',        label: 'Home',        icon: <IconHome        className="w-5 h-5" />, href: '/' },
  { key: 'marketplace', label: 'Marketplace', icon: <IconMarketplace className="w-5 h-5" />, href: '/marketplace' },
  { key: 'create',      label: 'Create',      icon: <IconMagicWand   className="w-5 h-5" />, href: '/create' },
  { key: 'clients',     label: 'Clients',     icon: <IconClients     className="w-5 h-5" />, href: '/clients' },
];

// ─── NavButton ────────────────────────────────────────────────────────────────

function NavButton({
  item,
  isActive,
  onNavigate,
}: {
  item: SidebarNavItem;
  isActive: boolean;
  onNavigate?: SidebarProps['onNavigate'];
}) {
  const [isHovered, setIsHovered] = useState(false);
  const showTooltip = isHovered;

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        aria-label={item.label}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'flex items-center justify-center w-9 h-9 rounded-md',
          'transition-[background,color] duration-[120ms]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-brand',
          isActive || isHovered
            ? 'bg-utility-gray-200 text-fg-primary-900'
            : 'bg-transparent text-fg-quaternary-400',
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onNavigate?.(item.key, item.href)}
      >
        {item.icon}
      </button>

      {/* Tooltip — uses design-system tokens (text-xs = 12px from approved scale) */}
      <div
        role="tooltip"
        aria-hidden={!showTooltip}
        className={cn(
          'absolute left-full top-1/2 -translate-y-1/2 ml-md',
          'pointer-events-none whitespace-nowrap z-50',
          'rounded-sm px-md py-xxs',
          'bg-bg-primary-solid text-text-white',
          'font-body font-medium text-text-xs',
          'transition-[opacity,transform] duration-[120ms] ease-out',
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1',
        )}
      >
        {item.label}
      </div>
    </div>
  );
}

// ─── AvatarButton ─────────────────────────────────────────────────────────────

function AvatarButton({
  userInitial,
  onAvatarClick,
}: {
  userInitial: string;
  onAvatarClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label="User avatar"
      onClick={onAvatarClick}
      className={cn(
        'flex items-center justify-center w-8 h-8 rounded-full',
        'bg-utility-brand-600 text-text-white',
        'font-body font-medium text-text-xs',
        'transition-shadow duration-[120ms]',
        'hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-brand',
      )}
    >
      {userInitial}
    </button>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export function Sidebar({
  active = 'home',
  userInitial = 'S',
  onNavigate,
  onAvatarClick,
}: SidebarProps) {
  return (
    <nav
      className={cn(
        'flex flex-col items-center justify-between',
        'w-14 h-screen py-3xl',
        'bg-bg-primary',
      )}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <SurmountLogo className="w-8 h-8 shrink-0" />

      {/* Nav items */}
      <div className="flex flex-col items-center gap-xs">
        {DEFAULT_NAV_ITEMS.map((item) => (
          <NavButton
            key={item.key}
            item={item}
            isActive={active === item.key}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      {/* Avatar */}
      <AvatarButton userInitial={userInitial} onAvatarClick={onAvatarClick} />
    </nav>
  );
}
