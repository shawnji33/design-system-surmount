import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, type DatePickerHandle, type DateValue, formatMDY } from './date-picker';

const meta: Meta<typeof DatePicker> = {
  title: 'UI/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Date picker built on top of `TextInput`. Click the field to open the calendar. ' +
          'Type `MM/DD/YYYY` (auto-masked from raw digits) and the calendar tracks. ' +
          'Pre-built validation: invalid format, future date, year < 1900. ' +
          'Pass a custom `validate` to enforce additional rules (e.g. minimum age).',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorText: { control: 'text' },
    defaultValue: { control: 'text' },
  },
  args: {
    label: 'Date of birth',
    placeholder: 'MM / DD / YYYY',
    size: 'lg',
  },
  decorators: [
    (Story) => (
      <div className="max-w-md p-6 min-h-[460px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// ─── Default / playground ────────────────────────────────────────────────────

export const Default: Story = {};

export const WithHelperText: Story = {
  args: {
    helperText: 'You must be at least 18 years old to open an account.',
  },
};

export const Prefilled: Story = {
  args: {
    defaultValue: '04 / 10 / 1995',
  },
};

// ─── Invalid (controlled-error) ──────────────────────────────────────────────

export const ExternallyInvalid: Story = {
  args: {
    defaultValue: '02 / 30 / 1990',
    errorText: 'Invalid date. Please check the month and day.',
  },
};

export const InvalidFutureDate: Story = {
  args: {
    defaultValue: '01 / 01 / 2099',
  },
};

// ─── Custom validator (e.g. minimum age 18) ──────────────────────────────────

export const MinimumAge: Story = {
  render: () => {
    const minAge = 18;
    const validate = (v: DateValue): string | null => {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const dt = new Date(v.y, v.m, v.d);
      if (dt > today) return 'Date cannot be in the future.';
      if (v.y < 1900) return 'Please enter a year between 1900 and today.';
      const age = today.getFullYear() - v.y -
        (today.getMonth() < v.m || (today.getMonth() === v.m && today.getDate() < v.d) ? 1 : 0);
      if (age < minAge) return `You must be at least ${minAge} years old.`;
      return null;
    };
    return (
      <DatePicker
        label="Date of birth"
        helperText="You must be at least 18 years old."
        validate={validate}
      />
    );
  },
};

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: '04 / 10 / 1995',
  },
};

// ─── Controlled (parent reads value via callback) ────────────────────────────

export const Controlled: Story = {
  render: () => {
    const Comp = () => {
      const [value, setValue] = useState<DateValue | null>(null);
      return (
        <div className="flex flex-col gap-md">
          <DatePicker
            label="Date of birth"
            onValueChange={setValue}
          />
          <p className="text-text-sm text-text-tertiary-600">
            Parent value: {value ? formatMDY(value) : '—'}
          </p>
        </div>
      );
    };
    return <Comp />;
  },
};

// ─── Imperative API (validate-on-submit pattern) ─────────────────────────────

export const ImperativeValidate: Story = {
  render: () => {
    const Comp = () => {
      const dp = useRef<DatePickerHandle>(null);
      const [submitted, setSubmitted] = useState<string | null>(null);
      return (
        <div className="flex flex-col gap-md">
          <DatePicker ref={dp} label="Date of birth" />
          <button
            type="button"
            onClick={() => {
              const err = dp.current?.validate();
              if (!err) {
                const v = dp.current?.getValue();
                setSubmitted(v ? formatMDY(v) : null);
              } else {
                setSubmitted(null);
              }
            }}
            className="self-start inline-flex items-center justify-center px-xl py-2-5 rounded-md bg-fg-primary-900 text-text-white text-text-md font-medium"
          >
            Submit
          </button>
          {submitted && (
            <p className="text-text-sm text-text-tertiary-600">Submitted: {submitted}</p>
          )}
        </div>
      );
    };
    return <Comp />;
  },
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <DatePicker key={s} size={s} label={`Size ${s}`} />
      ))}
    </div>
  ),
};

// ─── Dark mode ───────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="bg-bg-primary p-6 max-w-md min-h-[460px]">
      <DatePicker label="Date of birth" />
    </div>
  ),
};
