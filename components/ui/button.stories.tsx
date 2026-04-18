import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

// Placeholder icon — replace with Phosphor icons once @iota-uz/icons is wired up
const Icon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="128" cy="128" r="88" stroke="currentColor" strokeWidth="20" />
    <path d="M128 88v40l24 24" stroke="currentColor" strokeWidth="20" strokeLinecap="round" />
  </svg>
);

const FIGMA_URL = 'https://www.figma.com/design/vr9mgx3CwlKmdGujGIumRK/Surmount-Design-System?node-id=23487-11641';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: FIGMA_URL,
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'link-color', 'link-gray'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
  },
  args: {
    children: 'Button CTA',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    iconOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─── Default / playground ────────────────────────────────────────────────────

export const Default: Story = {};

export const WithIcons: Story = {
  args: {
    iconLeading: <Icon />,
    iconTrailing: <Icon />,
  },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const IconOnly: Story = {
  args: { iconOnly: true, iconLeading: <Icon /> },
};

// ─── All variants ────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3 p-4">
      {(['primary', 'secondary', 'tertiary', 'link-color', 'link-gray'] as const).map(
        (variant) => (
          <Button key={variant} {...args} variant={variant}>
            {variant}
          </Button>
        ),
      )}
    </div>
  ),
};

// ─── All sizes ───────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3 p-4">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

// ─── All states × all variants ───────────────────────────────────────────────

export const StateMatrix: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      {(['primary', 'secondary', 'tertiary', 'link-color', 'link-gray'] as const).map(
        (variant) => (
          <div key={variant} className="flex flex-wrap items-center gap-3">
            <span className="w-24 text-xs text-text-tertiary-600">{variant}</span>
            <Button variant={variant}>Default</Button>
            <Button variant={variant} disabled>Disabled</Button>
            <Button variant={variant} loading>Loading</Button>
            <Button variant={variant} iconLeading={<Icon />}>With icon</Button>
            <Button variant={variant} iconOnly iconLeading={<Icon />} />
          </div>
        ),
      )}
    </div>
  ),
};

// ─── Dark mode ───────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: (args) => (
    <div data-theme="dark" className="bg-bg-primary p-6 space-y-4">
      {(['primary', 'secondary', 'tertiary', 'link-color', 'link-gray'] as const).map(
        (variant) => (
          <div key={variant} className="flex flex-wrap items-center gap-3">
            <Button {...args} variant={variant}>Default</Button>
            <Button {...args} variant={variant} disabled>Disabled</Button>
            <Button {...args} variant={variant} loading>Loading</Button>
          </div>
        ),
      )}
    </div>
  ),
};

// ─── asChild (renders as <a>) ─────────────────────────────────────────────────

export const AsLink: Story = {
  render: () => (
    <Button asChild variant="primary">
      <a href="#test">Link styled as button</a>
    </Button>
  ),
};
