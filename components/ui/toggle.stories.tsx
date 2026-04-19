import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './toggle';

const FIGMA_URL =
  'https://www.figma.com/design/vr9mgx3CwlKmdGujGIumRK/Surmount-Design-System?node-id=122-3294';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    variant:  { control: 'select', options: ['default', 'slim'] },
    size:     { control: 'select', options: ['sm', 'md'] },
    checked:  { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'default',
    size: 'sm',
    checked: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

// ─── Default / playground ─────────────────────────────────────────────────────

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const DisabledOff: Story = {
  args: { disabled: true, checked: false },
};

export const DisabledOn: Story = {
  args: { disabled: true, checked: true },
};

export const SlimVariant: Story = {
  args: { variant: 'slim' },
};

export const SlimChecked: Story = {
  args: { variant: 'slim', checked: true },
};

// ─── Interactive (controlled) ─────────────────────────────────────────────────

export const Interactive: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex items-center gap-md p-6">
        <Toggle {...args} checked={checked} onCheckedChange={setChecked} />
        <span className="text-text-sm text-text-tertiary-600">
          {checked ? 'On' : 'Off'}
        </span>
      </div>
    );
  },
};

// ─── All states ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-xl p-6">
      {[
        { label: 'Off',          props: { checked: false } },
        { label: 'On',           props: { checked: true  } },
        { label: 'Disabled off', props: { checked: false, disabled: true } },
        { label: 'Disabled on',  props: { checked: true,  disabled: true } },
      ].map(({ label, props }) => (
        <div key={label} className="flex flex-col items-center gap-xs">
          <Toggle {...args} {...props} />
          <span className="text-text-xs text-text-tertiary-600 whitespace-nowrap">{label}</span>
        </div>
      ))}
    </div>
  ),
};

// ─── Size × variant matrix ────────────────────────────────────────────────────

export const SizeVariantMatrix: Story = {
  render: () => (
    <div className="p-6 space-y-6">
      {(['default', 'slim'] as const).map((variant) => (
        <div key={variant}>
          <p className="text-text-xs text-text-tertiary-600 font-medium mb-4 uppercase tracking-wide">
            Variant: {variant}
          </p>
          <div className="space-y-4">
            {(['sm', 'md'] as const).map((size) => (
              <div key={size} className="flex flex-wrap items-center gap-xl">
                <span className="w-8 text-text-xs text-text-tertiary-600 font-medium">{size}</span>
                <div className="flex items-center gap-xl">
                  {[
                    { label: 'Off',          props: { checked: false } },
                    { label: 'On',           props: { checked: true  } },
                    { label: 'Disabled off', props: { checked: false, disabled: true } },
                    { label: 'Disabled on',  props: { checked: true,  disabled: true } },
                  ].map(({ label, props }) => (
                    <div key={label} className="flex flex-col items-center gap-xs">
                      <Toggle variant={variant} size={size} {...props} />
                      <span className="text-text-xxs text-text-tertiary-600 whitespace-nowrap">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Full matrix: size × variant × state ──────────────────────────────────────

export const FullMatrix: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      {(['sm', 'md'] as const).map((size) => (
        <div key={size}>
          <p className="text-text-xs text-text-tertiary-600 font-medium mb-4 uppercase tracking-wide">
            Size: {size}
          </p>
          <div className="flex gap-12">
            {(['default', 'slim'] as const).map((variant) => (
              <div key={variant} className="space-y-3">
                <p className="text-text-xxs text-text-tertiary-600">{variant}</p>
                {[
                  { label: 'Off',          checked: false, disabled: false },
                  { label: 'On',           checked: true,  disabled: false },
                  { label: 'Disabled off', checked: false, disabled: true  },
                  { label: 'Disabled on',  checked: true,  disabled: true  },
                ].map(({ label, checked, disabled }) => (
                  <div key={label} className="flex items-center gap-sm">
                    <Toggle variant={variant} size={size} checked={checked} disabled={disabled} />
                    <span className="text-text-xxs text-text-tertiary-600 whitespace-nowrap">{label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── Dark mode ────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="bg-bg-primary p-6 space-y-4">
      <div className="flex flex-wrap items-center gap-xl">
        {(['default', 'slim'] as const).map((variant) =>
          (['sm', 'md'] as const).map((size) =>
            [false, true].map((checked) => (
              <Toggle
                key={`${variant}-${size}-${checked}`}
                variant={variant}
                size={size}
                checked={checked}
              />
            ))
          )
        )}
      </div>
      <div className="flex flex-wrap items-center gap-xl">
        {(['default', 'slim'] as const).map((variant) =>
          (['sm', 'md'] as const).map((size) =>
            [false, true].map((checked) => (
              <Toggle
                key={`${variant}-${size}-${checked}-disabled`}
                variant={variant}
                size={size}
                checked={checked}
                disabled
              />
            ))
          )
        )}
      </div>
    </div>
  ),
};
