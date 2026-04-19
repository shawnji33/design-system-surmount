import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, SelectMenuItem } from './dropdown';

const FIGMA_URL =
  'https://www.figma.com/design/vr9mgx3CwlKmdGujGIumRK/Surmount-Design-System?node-id=18-0';

// Placeholder icon matching the Phosphor viewBox convention
const Icon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="128" cy="128" r="88" stroke="#414651" strokeWidth="20" fill="none" />
  </svg>
);

// ─── Dropdown (trigger) meta ──────────────────────────────────────────────────

const meta: Meta<typeof Dropdown> = {
  title: 'UI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    size:  { control: 'select', options: ['xs', 'sm', 'md'] },
    state: { control: 'select', options: ['default', 'placeholder', 'focused', 'open', 'disabled'] },
  },
  args: {
    size: 'md',
    state: 'default',
    label: 'Label',
    placeholder: 'Select option',
    value: undefined,
    hintText: 'This is a hint text to help user.',
    required: false,
    helpIcon: false,
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// ─── Default / playground ────────────────────────────────────────────────────

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'Selected option', state: 'default' },
};

export const PlaceholderState: Story = {
  args: { state: 'placeholder', value: undefined },
};

export const FocusedState: Story = {
  args: { state: 'focused', value: 'Selected option' },
};

export const OpenState: Story = {
  args: { state: 'open', value: 'Selected option' },
};

export const DisabledState: Story = {
  args: { state: 'disabled', value: 'Disabled value' },
};

export const WithLeadingIcon: Story = {
  args: { iconLeading: <Icon />, value: 'Option with icon' },
};

export const WithHelpIcon: Story = {
  args: { helpIcon: true, required: true },
};

export const WithSupportingText: Story = {
  args: {
    value: 'San Francisco',
    supportingText: 'California, USA',
  },
};

export const NoLabelNoHint: Story = {
  args: { label: undefined, hintText: undefined, value: 'Standalone trigger' },
};

// ─── All sizes ───────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 max-w-sm">
      {(['xs', 'sm', 'md'] as const).map((size) => (
        <Dropdown
          key={size}
          size={size}
          label={`Size ${size}`}
          value={`${size} — selected value`}
          hintText="Hint text"
        />
      ))}
    </div>
  ),
};

// ─── All states ──────────────────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6 max-w-sm">
      {(['default', 'placeholder', 'focused', 'open', 'disabled'] as const).map((state) => (
        <Dropdown
          key={state}
          state={state}
          label={state.charAt(0).toUpperCase() + state.slice(1)}
          value={state !== 'placeholder' ? 'Selected value' : undefined}
          hintText="Hint text"
        />
      ))}
    </div>
  ),
};

// ─── All sizes × all states ──────────────────────────────────────────────────

export const SizeStateMatrix: Story = {
  render: () => (
    <div className="p-6 space-y-8">
      {(['xs', 'sm', 'md'] as const).map((size) => (
        <div key={size}>
          <p className="text-text-xs text-text-tertiary-600 mb-4 font-medium uppercase tracking-wide">
            Size: {size}
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            {(['default', 'placeholder', 'focused', 'open', 'disabled'] as const).map((state) => (
              <Dropdown
                key={state}
                size={size}
                state={state}
                label={state}
                value={state !== 'placeholder' ? 'Option label' : undefined}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// ─── SelectMenuItem meta ─────────────────────────────────────────────────────

const menuItemMeta: Meta<typeof SelectMenuItem> = {
  title: 'UI/SelectMenuItem',
  component: SelectMenuItem,
  tags: ['autodocs'],
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    size:     { control: 'select', options: ['xs', 'sm', 'md'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'md',
    selected: false,
    disabled: false,
    children: 'Menu item label',
  },
  decorators: [
    (Story) => (
      <div className="w-64 border border-border-primary rounded-md shadow-md bg-bg-primary p-xs">
        <Story />
      </div>
    ),
  ],
};

export const MenuItem_Default: StoryObj<typeof SelectMenuItem> = {
  ...menuItemMeta,
  render: (args) => <SelectMenuItem {...args} />,
} as StoryObj<typeof SelectMenuItem>;

export const MenuItem_Selected: StoryObj<typeof SelectMenuItem> = {
  ...menuItemMeta,
  args: { selected: true, children: 'Selected item' },
  render: (args) => <SelectMenuItem {...args} />,
} as StoryObj<typeof SelectMenuItem>;

export const MenuItem_Disabled: StoryObj<typeof SelectMenuItem> = {
  ...menuItemMeta,
  args: { disabled: true, children: 'Disabled item' },
  render: (args) => <SelectMenuItem {...args} />,
} as StoryObj<typeof SelectMenuItem>;

export const MenuItem_WithLeadingIcon: StoryObj<typeof SelectMenuItem> = {
  ...menuItemMeta,
  args: { iconLeading: <Icon />, children: 'Item with icon' },
  render: (args) => <SelectMenuItem {...args} />,
} as StoryObj<typeof SelectMenuItem>;

export const MenuItem_WithSupportingText: StoryObj<typeof SelectMenuItem> = {
  ...menuItemMeta,
  args: { children: 'San Francisco', supportingText: 'California, USA' },
  render: (args) => <SelectMenuItem {...args} />,
} as StoryObj<typeof SelectMenuItem>;

// ─── SelectMenuItem — all sizes ──────────────────────────────────────────────

export const MenuItem_AllSizes: StoryObj<typeof SelectMenuItem> = {
  ...menuItemMeta,
  render: () => (
    <div className="w-64 border border-border-primary rounded-md shadow-md bg-bg-primary p-xs space-y-0">
      {(['xs', 'sm', 'md'] as const).map((size) => (
        <SelectMenuItem key={size} size={size} iconLeading={<Icon />}>
          Size {size} item
        </SelectMenuItem>
      ))}
    </div>
  ),
} as StoryObj<typeof SelectMenuItem>;

// ─── SelectMenuItem — all states ─────────────────────────────────────────────

export const MenuItem_AllStates: StoryObj<typeof SelectMenuItem> = {
  ...menuItemMeta,
  render: () => (
    <div className="w-64 border border-border-primary rounded-md shadow-md bg-bg-primary p-xs space-y-0">
      <SelectMenuItem iconLeading={<Icon />}>Default item</SelectMenuItem>
      <SelectMenuItem iconLeading={<Icon />} selected>Selected item</SelectMenuItem>
      <SelectMenuItem iconLeading={<Icon />} disabled>Disabled item</SelectMenuItem>
    </div>
  ),
} as StoryObj<typeof SelectMenuItem>;

// ─── SelectMenuItem — size × state matrix ────────────────────────────────────

export const MenuItem_SizeStateMatrix: StoryObj<typeof SelectMenuItem> = {
  ...menuItemMeta,
  render: () => (
    <div className="p-6 space-y-6">
      {(['xs', 'sm', 'md'] as const).map((size) => (
        <div key={size} className="w-64 border border-border-primary rounded-md shadow-md bg-bg-primary p-xs">
          <p className="px-sm py-xs text-text-xs text-text-tertiary-600 font-medium">Size: {size}</p>
          <SelectMenuItem size={size} iconLeading={<Icon />}>Default</SelectMenuItem>
          <SelectMenuItem size={size} iconLeading={<Icon />} selected>Selected</SelectMenuItem>
          <SelectMenuItem size={size} iconLeading={<Icon />} disabled>Disabled</SelectMenuItem>
        </div>
      ))}
    </div>
  ),
} as StoryObj<typeof SelectMenuItem>;

// ─── Composed: trigger + menu ─────────────────────────────────────────────────

export const ComposedDropdown: Story = {
  render: () => (
    <div className="p-6 space-y-2 max-w-xs">
      <Dropdown label="City" value="San Francisco" hintText="Select your city" />
      <div className="border border-border-primary rounded-md shadow-md bg-bg-primary p-xs mt-1">
        {['San Francisco', 'New York', 'Los Angeles', 'Chicago'].map((city, i) => (
          <SelectMenuItem key={city} selected={i === 0} iconLeading={<Icon />}>
            {city}
          </SelectMenuItem>
        ))}
      </div>
    </div>
  ),
};
