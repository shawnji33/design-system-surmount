import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const MailIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="32"
      y="48"
      width="192"
      height="160"
      rx="8"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M224 56l-96 88L32 56"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="112" cy="112" r="80" stroke="currentColor" strokeWidth="16" />
    <line
      x1="168.57"
      y1="168.57"
      x2="224"
      y2="224"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FIGMA_URL =
  'https://www.figma.com/design/vr9mgx3CwlKmdGujGIumRK/Surmount-Design-System';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {
    label: 'Email',
    placeholder: 'you@surmount.com',
    size: 'md',
    disabled: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ─── Default / playground ────────────────────────────────────────────────────

export const Default: Story = {};

export const NoLabel: Story = {
  args: { label: undefined, placeholder: 'Search' },
};

export const WithHelperText: Story = {
  args: {
    helperText: "We'll never share this with anyone.",
  },
};

export const WithIcons: Story = {
  args: {
    iconLeading: <MailIcon />,
    iconTrailing: <SearchIcon />,
  },
};

export const Error: Story = {
  args: {
    error: true,
    errorText: 'Enter a valid email address.',
    defaultValue: 'notanemail',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'you@surmount.com',
  },
};

export const Filled: Story = {
  args: {
    defaultValue: 'you@surmount.com',
  },
};

// ─── All sizes ───────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 p-4 max-w-md">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Input key={size} {...args} size={size} label={`Size: ${size}`} />
      ))}
    </div>
  ),
};

// ─── States matrix ───────────────────────────────────────────────────────────

export const StateMatrix: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4 max-w-3xl">
      <Input label="Default" placeholder="Placeholder" />
      <Input label="Filled" defaultValue="Hello world" />
      <Input label="With helper" placeholder="Placeholder" helperText="This is helper text." />
      <Input label="Error" error errorText="Something is wrong" defaultValue="bad value" />
      <Input label="Disabled" disabled placeholder="Can't type" />
      <Input label="With icons" iconLeading={<MailIcon />} iconTrailing={<SearchIcon />} placeholder="Search" />
    </div>
  ),
};

// ─── Dark mode ───────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="bg-bg-primary p-6 space-y-4 max-w-md">
      <Input label="Default" placeholder="Placeholder" />
      <Input label="Filled" defaultValue="Hello world" />
      <Input label="Error" error errorText="Something is wrong" defaultValue="bad" />
      <Input label="Disabled" disabled defaultValue="Disabled" />
    </div>
  ),
};
