import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PortfolioSwitcher, type Portfolio } from './portfolio-switcher';

const FIGMA_URL =
  'https://www.figma.com/design/vr9mgx3CwlKmdGujGIumRK/Surmount-Design-System?node-id=23404-2127';

// ─── Avatar fixtures ──────────────────────────────────────────────────────────

function CircleAvatar({ bg, label }: { bg: string; label?: string }) {
  return (
    <span
      className="absolute inset-0 flex items-center justify-center text-text-xxs font-medium text-text-white"
      style={{ background: bg }}
    >
      {label}
    </span>
  );
}

function ImageAvatar({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" />;
}

const PORTFOLIOS: Portfolio[] = [
  { id: 'all',       name: 'All Portfolios', avatar: <CircleAvatar bg="#e0e0e0" label="A" /> },
  { id: 'coinbase',  name: 'Coinbase',       avatar: <CircleAvatar bg="#1652f0" label="C" /> },
  { id: 'robinhood', name: 'Robinhood',      avatar: <ImageAvatar src="avatars/broker-robinhood.png" alt="Robinhood" /> },
  { id: 'surmount',  name: 'Surmount',       avatar: <ImageAvatar src="avatars/broker-surmount.png" alt="Surmount" /> },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof PortfolioSwitcher> = {
  title: 'UI/PortfolioSwitcher',
  component: PortfolioSwitcher,
  tags: ['autodocs'],
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    layout: 'padded',
  },
  argTypes: {
    // These hold ReactNode/object/function values — Storybook's "Set object"
    // control tries to assign `{}` and crashes React.
    portfolios:   { control: false },
    onToggle:     { control: false },
    onSelect:     { control: false },
    onAddAccount: { control: false },
  },
  args: {
    portfolios: PORTFOLIOS,
    selectedId: 'all',
    open: false,
  },
};

export default meta;
type Story = StoryObj<typeof PortfolioSwitcher>;

// ─── Static variant snapshots ────────────────────────────────────────────────

export const Default: Story = {
  args: { selectedId: 'all', open: false },
};

export const SelectedCoinbase: Story = {
  args: { selectedId: 'coinbase', open: false },
};

export const Open: Story = {
  args: { selectedId: 'all', open: true, onAddAccount: () => undefined },
};

export const OpenWithoutAddAccounts: Story = {
  args: { selectedId: 'coinbase', open: true },
};

// ─── All variants in one frame ───────────────────────────────────────────────

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8 p-6">
      <PortfolioSwitcher {...args} selectedId="all" open={false} />
      <PortfolioSwitcher {...args} selectedId="all" open onAddAccount={() => undefined} />
      <div className="pt-[280px]">
        <PortfolioSwitcher {...args} selectedId="coinbase" open={false} />
      </div>
    </div>
  ),
};

// ─── Interactive (controlled) ────────────────────────────────────────────────

export const Interactive: Story = {
  render: (args) => {
    const [selectedId, setSelectedId] = useState('all');
    const [open, setOpen] = useState(false);
    return (
      <PortfolioSwitcher
        {...args}
        selectedId={selectedId}
        open={open}
        onToggle={() => setOpen((o) => !o)}
        onSelect={(id) => {
          setSelectedId(id);
          setOpen(false);
        }}
        onAddAccount={() => alert('Add accounts')}
      />
    );
  },
};

// ─── Dark mode ───────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: (args) => (
    <div data-theme="dark" className="bg-bg-primary p-6 flex flex-col gap-8">
      <PortfolioSwitcher {...args} selectedId="all" open={false} />
      <PortfolioSwitcher {...args} selectedId="all" open onAddAccount={() => undefined} />
    </div>
  ),
};
