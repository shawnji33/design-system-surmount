import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, type CheckboxSize } from './checkbox';

const FIGMA_URL =
  'https://www.figma.com/design/vr9mgx3CwlKmdGujGIumRK/Surmount-Design-System?node-id=1097-63652';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['checkbox', 'radio'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'] satisfies CheckboxSize[],
    },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    supportingText: { control: 'text' },
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

// ─── Bare control states ─────────────────────────────────────────────────────

export const Checked:               Story = { args: { checked: true } };
export const Indeterminate:         Story = { args: { indeterminate: true } };
export const Disabled:              Story = { args: { disabled: true } };
export const CheckedDisabled:       Story = { args: { checked: true, disabled: true } };
export const IndeterminateDisabled: Story = { args: { indeterminate: true, disabled: true } };

// ─── Radio bare states ───────────────────────────────────────────────────────

export const Radio:                Story = { args: { type: 'radio' } };
export const RadioChecked:         Story = { args: { type: 'radio', checked: true } };
export const RadioDisabled:        Story = { args: { type: 'radio', disabled: true } };
export const RadioCheckedDisabled: Story = { args: { type: 'radio', checked: true, disabled: true } };

// ─── With text label + supporting text ───────────────────────────────────────

export const WithLabel: Story = {
  args: {
    label: 'Remember me',
    supportingText: 'Save my login details for next time.',
  },
};

export const WithLabelChecked: Story = {
  args: {
    checked: true,
    label: 'Remember me',
    supportingText: 'Save my login details for next time.',
  },
};

export const WithLabelDisabled: Story = {
  args: {
    disabled: true,
    label: 'Remember me',
    supportingText: 'Save my login details for next time.',
  },
};

export const WithLabelNoSupporting: Story = {
  args: { label: 'Remember me' },
};

// ─── Radio rows (xs is radio-only per spec) ──────────────────────────────────

export const RadioWithLabel: Story = {
  args: {
    type: 'radio',
    label: 'Remember me',
    supportingText: 'Save my login details for next time.',
  },
};

export const RadioXsWithLabel: Story = {
  args: {
    type: 'radio',
    size: 'xs',
    label: 'Remember me',
    supportingText: 'Save my login details for next time.',
  },
};

// ─── All sizes (bare control + with label) ───────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex items-center gap-6">
        {(['xs', 'sm', 'md'] as const).map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <span className="text-text-xs text-text-tertiary-600">{size}</span>
            <Checkbox type="radio" size={size} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 max-w-sm">
        {(['xs', 'sm', 'md'] as const).map((size) => (
          <Checkbox
            key={size}
            type="radio"
            size={size}
            label={`Size ${size} — Remember me`}
            supportingText="Save my login details for next time."
          />
        ))}
      </div>
    </div>
  ),
};

// ─── Full state matrix (bare controls) ───────────────────────────────────────

export const StateMatrix: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      {(['checkbox', 'radio'] as const).map((type) => (
        <div key={type} className="space-y-2">
          <span className="text-text-xs font-medium text-text-secondary-700">{type}</span>
          {(['sm', 'md'] as const).map((size) => (
            <div key={size} className="flex items-center gap-4">
              <span className="w-6 text-text-xs text-text-tertiary-600">{size}</span>
              <Checkbox type={type} size={size} />
              <Checkbox type={type} size={size} checked onChange={() => {}} />
              {type === 'checkbox' && (
                <Checkbox type={type} size={size} indeterminate onChange={() => {}} />
              )}
              <Checkbox type={type} size={size} disabled />
              <Checkbox type={type} size={size} checked disabled onChange={() => {}} />
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

// ─── Full label-row matrix (size × type × checked × disabled) ───────────────

export const LabelMatrix: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-x-8 gap-y-3 p-6 max-w-3xl">
      {(['checkbox', 'radio'] as const).flatMap((type) =>
        (type === 'radio' ? (['xs', 'sm', 'md'] as const) : (['sm', 'md'] as const)).flatMap((size) =>
          [
            <Checkbox
              key={`${type}-${size}-default`}
              type={type}
              size={size}
              label={`${type} • size ${size}`}
              supportingText="Save my login details for next time."
            />,
            <Checkbox
              key={`${type}-${size}-checked`}
              type={type}
              size={size}
              checked
              onChange={() => {}}
              label={`${type} • size ${size} • checked`}
              supportingText="Save my login details for next time."
            />,
          ],
        ),
      )}
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
      <div className="flex flex-col gap-3 max-w-sm">
        <Checkbox label="Remember me" supportingText="Save my login details for next time." />
        <Checkbox checked onChange={() => {}} label="Remember me" supportingText="Save my login details for next time." />
        <Checkbox type="radio" label="Remember me" supportingText="Save my login details for next time." />
      </div>
    </div>
  ),
};
