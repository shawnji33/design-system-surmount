import type { Meta, StoryObj } from '@storybook/react';
import { AccountsSection, type Account } from './accounts-section';

// ─── Logo helpers ─────────────────────────────────────────────────────────────

function BrokerLogo({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="size-full object-cover" />;
}

// ─── Fixture data ─────────────────────────────────────────────────────────────

const ACCOUNTS: Account[] = [
  {
    id: 'surmount',
    name: 'Surmount',
    value: '$85,420.54',
    logo: <BrokerLogo src="brand-logos/brokers/surmount-icon.svg" alt="Surmount" />,
    kind: 'internal',
  },
  {
    id: 'ibkr',
    name: 'Interactive Brokers',
    value: '$142,350.30',
    logo: <BrokerLogo src="brand-logos/brokers/ibkr.png" alt="Interactive Brokers" />,
    kind: 'external',
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    value: '$45,180.90',
    logo: <BrokerLogo src="brand-logos/brokers/coinbase.webp" alt="Coinbase" />,
    kind: 'external',
  },
  {
    id: 'kraken',
    name: 'Kraken',
    value: '$28,650.00',
    logo: <BrokerLogo src="brand-logos/brokers/kraken.png" alt="Kraken" />,
    kind: 'external',
  },
  {
    id: 'schwab',
    name: 'Schwab',
    value: '$31,200.50',
    logo: <BrokerLogo src="brand-logos/brokers/schwab.png" alt="Schwab" />,
    kind: 'external',
  },
];

const ACCOUNTS_WITH_SAVINGS: Account[] = [
  ...ACCOUNTS,
  {
    id: 'hyc',
    name: 'Surmount Cash',
    value: '$12,500.00',
    logo: <BrokerLogo src="brand-logos/brokers/surmount.png" alt="Surmount Cash" />,
    kind: 'savings',
  },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof AccountsSection> = {
  title: 'UI/AccountsSection',
  component: AccountsSection,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    accounts:        { control: false },
    onAccountClick:  { control: false },
    onAddAccount:    { control: false },
  },
  args: {
    accounts: ACCOUNTS,
  },
};

export default meta;
type Story = StoryObj<typeof AccountsSection>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    accounts: ACCOUNTS,
    onAddAccount: () => undefined,
  },
};

export const WithSavings: Story = {
  name: 'With savings account',
  args: {
    accounts: ACCOUNTS_WITH_SAVINGS,
    onAddAccount: () => undefined,
  },
};

export const NoAddButton: Story = {
  args: {
    accounts: ACCOUNTS,
  },
};

export const InternalOnly: Story = {
  args: {
    accounts: ACCOUNTS.filter((a) => a.kind === 'internal'),
    onAddAccount: () => undefined,
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div data-theme="dark" className="bg-bg-primary p-6">
      <AccountsSection {...args} onAddAccount={() => undefined} />
    </div>
  ),
  args: { accounts: ACCOUNTS },
};
