import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['checkbox', 'radio'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    type: 'checkbox',
    size: 'sm',
    checked: false,
    indeterminate: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ─── Default / playground ────────────────────────────────────────────────────

export const Default: Story = {};

// ─── Checkbox states ─────────────────────────────────────────────────────────

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const CheckedDisabled: Story = {
  args: { checked: true, disabled: true },
};

export const IndeterminateDisabled: Story = {
  args: { indeterminate: true, disabled: true },
};

// ─── Radio states ─────────────────────────────────────────────────────────────

export const Radio: Story = {
  args: { type: 'radio' },
};

export const RadioChecked: Story = {
  args: { type: 'radio', checked: true },
};

export const RadioDisabled: Story = {
  args: { type: 'radio', disabled: true },
};

export const RadioCheckedDisabled: Story = {
  args: { type: 'radio', checked: true, disabled: true },
};

// ─── All sizes ───────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-6 p-4">
      {(['sm', 'md'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <span className="text-text-xs text-text-tertiary-600">{size}</span>
          <Checkbox {...args} size={size} />
        </div>
      ))}
    </div>
  ),
};

// ─── State matrix (all states × 2 sizes × 2 types) ──────────────────────────

export const StateMatrix: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      {(['checkbox', 'radio'] as const).map((type) => (
        <div key={type} className="space-y-2">
          <span className="text-text-xs font-medium text-text-secondary-700">{type}</span>
          {(['sm', 'md'] as const).map((size) => (
            <div key={size} className="flex items-center gap-4">
              <span className="w-6 text-text-xs text-text-tertiary-600">{size}</span>
              {/* Default unchecked */}
              <Checkbox type={type} size={size} />
              {/* Checked */}
              <Checkbox type={type} size={size} checked onChange={() => {}} />
              {/* Indeterminate (checkbox only) */}
              {type === 'checkbox' && (
                <Checkbox type={type} size={size} indeterminate onChange={() => {}} />
              )}
              {/* Disabled unchecked */}
              <Checkbox type={type} size={size} disabled />
              {/* Disabled checked */}
              <Checkbox type={type} size={size} checked disabled onChange={() => {}} />
              {/* Disabled indeterminate (checkbox only) */}
              {type === 'checkbox' && (
                <Checkbox type={type} size={size} indeterminate disabled onChange={() => {}} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

// ─── Dark mode ───────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: (args) => (
    <div data-theme="dark" className="bg-bg-primary p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Checkbox {...args} />
        <Checkbox {...args} checked onChange={() => {}} />
        <Checkbox {...args} indeterminate onChange={() => {}} />
        <Checkbox {...args} disabled />
        <Checkbox {...args} checked disabled onChange={() => {}} />
        <Checkbox {...args} indeterminate disabled onChange={() => {}} />
      </div>
      <div className="flex items-center gap-4">
        <Checkbox {...args} type="radio" />
        <Checkbox {...args} type="radio" checked onChange={() => {}} />
        <Checkbox {...args} type="radio" disabled />
        <Checkbox {...args} type="radio" checked disabled onChange={() => {}} />
      </div>
    </div>
  ),
};
