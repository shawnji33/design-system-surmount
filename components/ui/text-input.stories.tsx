import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextInput, type TextInputSize } from './text-input';

const meta: Meta<typeof TextInput> = {
  title: 'UI/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Text input with label, helper text, error state, and optional leading/trailing icons. ' +
          'Follows Carbon Design System input principles: invalid state takes precedence over helper text, ' +
          'error message is announced via role="alert", and disabled inputs are non-interactive.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] satisfies TextInputSize[],
    },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
  },
  args: {
    size: 'lg',
    invalid: false,
    disabled: false,
    label: 'Email address',
    placeholder: 'you@example.com',
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

// Phosphor icons used in stories.
const MailIcon = () => (
  <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" className="size-2xl">
    <rect x="32" y="48" width="192" height="160" rx="8" />
    <polyline points="224 56 128 144 32 56" />
  </svg>
);
const CalendarIcon = () => (
  <svg viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" className="size-2xl">
    <rect x="40" y="40" width="176" height="176" rx="8" />
    <line x1="176" y1="24" x2="176" y2="56" />
    <line x1="80" y1="24" x2="80" y2="56" />
    <line x1="40" y1="88" x2="216" y2="88" />
  </svg>
);

// ─── Default / playground ────────────────────────────────────────────────────

export const Default: Story = {};

// ─── State stories ───────────────────────────────────────────────────────────

export const WithHelperText: Story = {
  args: {
    helperText: "We'll send your receipts here.",
  },
};

export const Filled: Story = {
  args: {
    defaultValue: 'shawn@surmount.app',
  },
};

export const Invalid: Story = {
  args: {
    defaultValue: 'not-a-valid-email',
    invalid: true,
    errorText: 'Enter a valid email address.',
  },
};

export const InvalidEmpty: Story = {
  args: {
    invalid: true,
    errorText: 'This field is required.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledFilled: Story = {
  args: {
    disabled: true,
    defaultValue: 'shawn@surmount.app',
  },
};

// ─── With icons ──────────────────────────────────────────────────────────────

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <MailIcon />,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    label: 'Date of birth',
    placeholder: 'MM / DD / YYYY',
    trailingIcon: <CalendarIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    leadingIcon: <MailIcon />,
    trailingIcon: <CalendarIcon />,
  },
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md p-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <TextInput
          key={size}
          size={size}
          label={`Size ${size}`}
          placeholder="Type something…"
        />
      ))}
    </div>
  ),
};

// ─── Live error validation example ───────────────────────────────────────────

export const LiveValidation: Story = {
  render: () => {
    const Comp = () => {
      const [value, setValue] = useState('');
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const showError = value.length > 0 && !isValid;
      return (
        <div className="max-w-md p-4">
          <TextInput
            label="Email address"
            placeholder="you@example.com"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            invalid={showError}
            errorText={showError ? 'Enter a valid email address.' : undefined}
            helperText={!showError ? "We'll never share your email." : undefined}
          />
        </div>
      );
    };
    return <Comp />;
  },
};

// ─── Full state matrix ───────────────────────────────────────────────────────

export const StateMatrix: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-x-8 gap-y-6 p-6 max-w-3xl">
      <TextInput label="Default" placeholder="Type something…" />
      <TextInput label="With helper" placeholder="Type something…" helperText="Helper text below" />
      <TextInput label="Filled" defaultValue="Shawn" />
      <TextInput label="Disabled" disabled placeholder="Disabled" />
      <TextInput label="Disabled filled" disabled defaultValue="Locked value" />
      <TextInput
        label="Invalid"
        defaultValue="not-an-email"
        invalid
        errorText="Enter a valid email address."
      />
      <TextInput
        label="Invalid empty"
        invalid
        errorText="This field is required."
      />
      <TextInput
        label="With trailing icon"
        placeholder="MM / DD / YYYY"
        trailingIcon={<CalendarIcon />}
      />
    </div>
  ),
};

// ─── Dark mode ───────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="bg-bg-primary p-6 max-w-md flex flex-col gap-4">
      <TextInput label="Default" placeholder="Type something…" />
      <TextInput label="Filled" defaultValue="Shawn" />
      <TextInput
        label="Invalid"
        defaultValue="not-an-email"
        invalid
        errorText="Enter a valid email address."
      />
      <TextInput label="Disabled" disabled defaultValue="Locked value" />
    </div>
  ),
};
