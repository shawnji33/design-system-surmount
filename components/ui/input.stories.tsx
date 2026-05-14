import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const MailIcon = () => (
  <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" className="size-2xl" aria-hidden="true">
    <rect x="32" y="48" width="192" height="160" rx="8" />
    <polyline points="224 56 128 144 32 56" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" className="size-2xl" aria-hidden="true">
    <circle cx="112" cy="112" r="80" />
    <line x1="168.57" y1="168.57" x2="224" y2="224" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" className="size-2xl" aria-hidden="true">
    <rect x="40" y="40" width="176" height="176" rx="8" />
    <line x1="176" y1="24" x2="176" y2="56" />
    <line x1="80" y1="24" x2="80" y2="56" />
    <line x1="40" y1="88" x2="216" y2="88" />
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
    docs: {
      description: {
        component:
          'Floating-label input with helper text, error state, and optional leading/trailing icons. ' +
          'The label animates from resting (vertically centred) to floated (top) on focus or when the field has a value. ' +
          'Error state takes precedence over helper text; the error message is announced via `role="alert"`. ' +
          'Follows Carbon Design System input principles.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
  },
  args: {
    label: 'Email',
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
  args: { label: undefined, placeholder: 'Search…' },
};

// ─── State stories ───────────────────────────────────────────────────────────

export const WithHelperText: Story = {
  args: {
    helperText: "We'll never share this with anyone.",
  },
};

export const Filled: Story = {
  args: {
    defaultValue: 'you@surmount.com',
  },
};

export const Error: Story = {
  args: {
    error: true,
    errorText: 'Enter a valid email address.',
    defaultValue: 'notanemail',
  },
};

export const ErrorEmpty: Story = {
  args: {
    error: true,
    errorText: 'This field is required.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Unavailable',
  },
};

export const DisabledFilled: Story = {
  args: {
    disabled: true,
    defaultValue: 'you@surmount.com',
  },
};

// ─── Icon slots ──────────────────────────────────────────────────────────────

export const WithLeadingIcon: Story = {
  args: {
    iconLeading: <MailIcon />,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    label: 'Date of birth',
    placeholder: 'MM / DD / YYYY',
    iconTrailing: <CalendarIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    iconLeading: <MailIcon />,
    iconTrailing: <SearchIcon />,
  },
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 p-4 max-w-md">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Input key={size} {...args} size={size} label={`Size: ${size}`} />
      ))}
    </div>
  ),
};

// ─── Live validation ─────────────────────────────────────────────────────────

export const LiveValidation: Story = {
  render: () => {
    const Comp = () => {
      const [value, setValue] = useState('');
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const showError = value.length > 0 && !isValid;
      return (
        <div className="max-w-md p-4">
          <Input
            label="Email address"
            placeholder="you@example.com"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            error={showError}
            errorText={showError ? 'Enter a valid email address.' : undefined}
            helperText={!showError ? "We'll never share your email." : undefined}
          />
        </div>
      );
    };
    return <Comp />;
  },
};

// ─── State matrix ─────────────────────────────────────────────────────────────

export const StateMatrix: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-x-8 gap-y-6 p-6 max-w-3xl">
      <Input label="Default" placeholder="Type something…" />
      <Input label="With helper" placeholder="Type something…" helperText="Helper text below." />
      <Input label="Filled" defaultValue="Shawn Ji" />
      <Input label="Disabled" disabled placeholder="Disabled" />
      <Input label="Disabled filled" disabled defaultValue="Locked value" />
      <Input label="Error" error errorText="Enter a valid email address." defaultValue="not-an-email" />
      <Input label="Error (empty)" error errorText="This field is required." />
      <Input label="Date of birth" placeholder="MM / DD / YYYY" iconTrailing={<CalendarIcon />} />
      <Input label="With leading icon" iconLeading={<MailIcon />} placeholder="you@example.com" />
      <Input label="No label" placeholder="Search…" />
    </div>
  ),
};

// ─── Dark mode ───────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="bg-bg-primary p-6 space-y-4 max-w-md">
      <Input label="Default" />
      <Input label="Filled" defaultValue="Shawn Ji" />
      <Input label="Error" error errorText="Enter a valid email address." defaultValue="bad" />
      <Input label="Disabled filled" disabled defaultValue="Disabled" />
    </div>
  ),
};
