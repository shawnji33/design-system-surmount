'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconHome({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path opacity="0.2" d="M218.83 103.77 128 29.65 37.17 103.77A8 8 0 0 0 32 111.12V208a8 8 0 0 0 8 8h56v-56h64v56h56a8 8 0 0 0 8-8v-96.88a8 8 0 0 0-5.17-7.35Z" fill="currentColor" />
      <path d="M240 208h-16v-97.23a16.06 16.06 0 0 0-5.84-12.37L134.73 22.45a15.92 15.92 0 0 0-20.48 0L30.58 98.37A16.07 16.07 0 0 0 24 110.79V208H8a8 8 0 0 0 0 16h232a8 8 0 0 0 0-16Zm-104 0h-16v-48h16Zm16 0v-48a16 16 0 0 0-16-16h-16a16 16 0 0 0-16 16v48H40v-97.23l93.13-75.05 89.58 72.17A.13.13 0 0 1 224 110.8V208Z" fill="currentColor" />
    </svg>
  );
}

function IconMarketplace({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path opacity="0.2" d="M224 96v16a96 96 0 0 1-192 0V96l16-64h160Z" fill="currentColor" />
      <path d="M235.58 84.19 219.6 20.76A16 16 0 0 0 204.07 8H51.93a16 16 0 0 0-15.52 12.76L20.42 84.19A8.07 8.07 0 0 0 20 86.4V112a107.42 107.42 0 0 0 44 86.29V208a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16v-9.71A107.42 107.42 0 0 0 236 112V86.4a8.07 8.07 0 0 0-.42-2.21ZM51.93 24h152.14l14.1 56H37.83ZM176 208H80v-17.55A106.82 106.82 0 0 0 128 200a106.82 106.82 0 0 0 48-9.55ZM128 184a92 92 0 1 1 92-92 92.1 92.1 0 0 1-92 92Z" fill="currentColor" />
    </svg>
  );
}

function IconCreate({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path opacity="0.2" d="M216 128a88 88 0 1 1-88-88 88 88 0 0 1 88 88Z" fill="currentColor" />
      <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm48-88a8 8 0 0 1-8 8h-32v32a8 8 0 0 1-16 0v-32H88a8 8 0 0 1 0-16h32V88a8 8 0 0 1 16 0v32h32a8 8 0 0 1 8 8Z" fill="currentColor" />
    </svg>
  );
}

function SurmountLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#7B78D6" />
      <path d="M8 20.5c0-1.1.9-2 2-2h12a2 2 0 0 1 0 4H10a2 2 0 0 1-2-2ZM8 11.5c0-1.1.9-2 2-2h12a2 2 0 0 1 0 4H10a2 2 0 0 1-2-2ZM8 16c0-1.1.9-2 2-2h6a2 2 0 0 1 0 4h-6a2 2 0 0 1-2-2Z" fill="white" />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type SidebarNavKey = 'home' | 'marketplace' | 'create';

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
  {
    key: 'home',
    label: 'Home',
    icon: <IconHome className="w-5 h-5" />,
    href: '/',
  },
  {
    key: 'marketplace',
    label: 'Marketplace',
    icon: <IconMarketplace className="w-5 h-5" />,
    href: '/marketplace',
  },
  {
    key: 'create',
    label: 'Create',
    icon: <IconCreate className="w-5 h-5" />,
    href: '/create',
  },
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
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-brand)]',
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

      {/* Tooltip — translateX driven by hover state (can't express exact offset in pure Tailwind) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 'calc(100% + 8px)',
          top: '50%',
          transform: `translateY(-50%) translateX(${showTooltip ? '0px' : '-4px'})`,
          opacity: showTooltip ? 1 : 0,
          transition: 'opacity 120ms ease, transform 120ms ease',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          background: '#0a0d12',
          color: '#ffffff',
          fontSize: '11px',
          fontWeight: 500,
          fontFamily: 'var(--font-family-body)',
          borderRadius: 'var(--radius-sm)',
          padding: '5px 8px',
          zIndex: 50,
        }}
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      aria-label="User avatar"
      className={cn(
        'flex items-center justify-center w-8 h-8 rounded-full',
        'border border-black/[0.08]',
        'transition-shadow duration-[120ms]',
        'focus-visible:outline-none',
      )}
      style={{
        background: '#F1F1F1',
        boxShadow: isHovered ? '0 0 0 3px rgba(123,120,214,0.2)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onAvatarClick}
    >
      <div
        className="flex items-center justify-center rounded-full text-text-white font-semibold"
        style={{
          width: 18,
          height: 18,
          background: '#7B78D6',
          fontSize: 10,
        }}
      >
        {userInitial}
      </div>
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
        'bg-bg-primary border-r border-border-primary',
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
