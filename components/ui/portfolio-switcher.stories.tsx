import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PortfolioSwitcher, type Portfolio } from './portfolio-switcher';

const FIGMA_URL =
  'https://www.figma.com/design/vr9mgx3CwlKmdGujGIumRK/Surmount-Design-System?node-id=23404-2127';

// ─── Avatar fixtures ──────────────────────────────────────────────────────────

function ImageAvatar({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" />;
}

function GridIcon() {
  return (
    <svg
      className="absolute inset-0 size-full p-[3px]"
      viewBox="0 0 256 256"
      fill="none"
      stroke="#414651"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="32" y="32" width="80" height="80" rx="8" />
      <rect x="144" y="32" width="80" height="80" rx="8" />
      <rect x="32" y="144" width="80" height="80" rx="8" />
      <rect x="144" y="144" width="80" height="80" rx="8" />
    </svg>
  );
}

const PORTFOLIOS: Portfolio[] = [
  { id: 'all',       name: 'All accounts',  avatar: <GridIcon /> },
  { id: 'cash',      name: 'Surmount Cash', avatar: <ImageAvatar src="brand-logos/brokers/surmount-icon.svg" alt="Surmount Cash" /> },
  { id: 'robinhood', name: 'Robinhood',     avatar: <ImageAvatar src="brand-logos/brokers/robinhood.png" alt="Robinhood" /> },
  { id: 'ibkr',      name: 'IBKR',          avatar: <ImageAvatar src="brand-logos/brokers/ibkr.png" alt="IBKR" /> },
  { id: 'schwab',    name: 'Schwab',         avatar: <ImageAvatar src="brand-logos/brokers/schwab.png" alt="Schwab" /> },
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

export const SelectedRobinhood: Story = {
  args: { selectedId: 'robinhood', open: false },
};

export const Open: Story = {
  args: { selectedId: 'all', open: true, onAddAccount: () => undefined },
};

export const OpenWithoutAddAccounts: Story = {
  args: { selectedId: 'robinhood', open: true },
};

// ─── All variants in one frame ───────────────────────────────────────────────

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8 p-6">
      <PortfolioSwitcher {...args} selectedId="all" open={false} />
      <PortfolioSwitcher {...args} selectedId="robinhood" open={false} />
      <PortfolioSwitcher {...args} selectedId="all" open onAddAccount={() => undefined} />
      <div className="pt-[320px]">
        <PortfolioSwitcher {...args} selectedId="robinhood" open={false} />
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
