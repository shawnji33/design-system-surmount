import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, SelectMenu, SelectMenuItem, type DropdownSize, type DropdownState, type DropdownType } from './dropdown';

const FIGMA_URL =
  'https://www.figma.com/design/vr9mgx3CwlKmdGujGIumRK/Surmount-Design-System?node-id=23554-20502';

// ─── Phosphor regular icons (stroke-based, NOT filled-outline paths) ─────────

const SVG_REGULAR = {
  viewBox: '0 0 256 256',
  fill: 'none',
  stroke: '#414651',
  strokeWidth: 16,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

function FlagIcon() {
  return (
    <svg {...SVG_REGULAR} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="48" y1="232" x2="48" y2="56" />
      <path d="M48,56s48-40,80-8c0,0,32,32,80,8V176c-48,24-80-8-80-8-32-32-80,8-80,8" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg {...SVG_REGULAR} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="128" cy="96" r="64" />
      <path d="M30.99,215.99a112.03,112.03,0,0,1,194.02,0" />
    </svg>
  );
}

const TEAM = [
  { name: 'Phoenix Baker',   handle: '@phoenix' },
  { name: 'Olivia Rhye',     handle: '@olivia' },
  { name: 'Lana Steiner',    handle: '@lana' },
  { name: 'Demi Wilkinson',  handle: '@demi' },
  { name: 'Candice Wu',      handle: '@candice' },
  { name: 'Natali Craig',    handle: '@natali' },
  { name: 'Drew Cano',       handle: '@drew' },
];

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Dropdown> = {
  title: 'UI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: { design: { type: 'figma', url: FIGMA_URL } },
  argTypes: {
    size:  { control: 'select', options: ['xs', 'sm'] satisfies DropdownSize[] },
    state: { control: 'select', options: ['default', 'placeholder', 'focused', 'open', 'disabled'] satisfies DropdownState[] },
    type:  { control: 'select', options: ['default', 'icon-leading', 'search', 'country'] satisfies DropdownType[] },
    // ReactNode props can't be sensibly edited in Storybook's controls panel —
    // disable the "Set object" control which tries to assign `{}` and crashes React.
    label:          { control: 'text' },
    hintText:       { control: 'text' },
    value:          { control: 'text' },
    supportingText: { control: 'text' },
    placeholder:    { control: 'text' },
    iconLeading:    { control: false },
    shortcut:       { control: false },
  },
  args: {
    size: 'sm',
    state: 'default',
    type: 'default',
    label: 'Team member',
    placeholder: 'Select team member',
    value: 'Olivia Rhye',
    supportingText: '@olivia',
    hintText: 'This is a hint text to help user.',
    required: true,
    helpIcon: true,
  },
  decorators: [
    (Story) => <div style={{ width: 320 }}><Story /></div>,
  ],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// ─── Single-variant stories ──────────────────────────────────────────────────

export const Default: Story = {};
export const PlaceholderState: Story = { args: { state: 'placeholder' } };
export const FocusedState:    Story = { args: { state: 'focused' } };
export const DisabledState:   Story = { args: { state: 'disabled' } };

export const IconLeading: Story = { args: { type: 'icon-leading' } };

export const Search: Story = {
  args: {
    type: 'search',
    label: 'Search',
    placeholder: 'Search',
    value: undefined,
    supportingText: undefined,
  },
};

export const SearchWithValue: Story = {
  args: {
    type: 'search',
    label: 'Search',
    value: 'Olivia Rhye',
    supportingText: '@olivia',
  },
};

export const Country: Story = {
  args: {
    type: 'country',
    label: 'Country',
    placeholder: 'Country',
    value: 'Canada',
    supportingText: undefined,
    iconLeading: <FlagIcon />,
  },
};

// ─── Open state with rendered menu ───────────────────────────────────────────

export const OpenWithMenu: Story = {
  args: { state: 'open' },
  render: (args) => (
    <div className="relative">
      <Dropdown {...args} />
      <div className="mt-xs">
        <SelectMenu>
          {TEAM.map((p, i) => (
            <SelectMenuItem
              key={p.handle}
              size={args.size}
              selected={i === 1}
              supportingText={p.handle}
            >
              {p.name}
            </SelectMenuItem>
          ))}
        </SelectMenu>
      </div>
    </div>
  ),
};

export const OpenSearchWithMenu: Story = {
  args: {
    state: 'open',
    type: 'search',
    label: 'Search',
    value: 'Olivia Rhye',
    supportingText: '@olivia',
  },
  render: (args) => (
    <div className="relative">
      <Dropdown {...args} />
      <div className="mt-xs">
        <SelectMenu>
          {TEAM.map((p, i) => (
            <SelectMenuItem
              key={p.handle}
              size={args.size}
              selected={i === 1}
              supportingText={p.handle}
            >
              {p.name}
            </SelectMenuItem>
          ))}
        </SelectMenu>
      </div>
    </div>
  ),
};

export const OpenIconLeadingWithMenu: Story = {
  args: { state: 'open', type: 'icon-leading' },
  render: (args) => (
    <div className="relative">
      <Dropdown {...args} />
      <div className="mt-xs">
        <SelectMenu>
          {TEAM.map((p, i) => (
            <SelectMenuItem
              key={p.handle}
              size={args.size}
              selected={i === 1}
              iconLeading={<UserIcon />}
              supportingText={p.handle}
            >
              {p.name}
            </SelectMenuItem>
          ))}
        </SelectMenu>
      </div>
    </div>
  ),
};

// ─── All sizes ───────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      {(['xs', 'sm'] as const).map((size) => (
        <Dropdown
          key={size}
          size={size}
          label={`Size ${size}`}
          value="Olivia Rhye"
          supportingText="@olivia"
          hintText="Hint text"
          required
          helpIcon
        />
      ))}
    </div>
  ),
};

// ─── All states (sm size, Default type) ──────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      {(['default', 'placeholder', 'focused', 'open', 'disabled'] as const).map((state) => (
        <Dropdown
          key={state}
          state={state}
          label={state.charAt(0).toUpperCase() + state.slice(1)}
          value="Olivia Rhye"
          supportingText="@olivia"
          placeholder="Select team member"
          hintText="Hint text"
          required
          helpIcon
        />
      ))}
    </div>
  ),
};

// ─── All types (sm size, Default state) ──────────────────────────────────────

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <Dropdown type="default"      label="Default"      value="Olivia Rhye" supportingText="@olivia" />
      <Dropdown type="icon-leading" label="Icon leading" value="Olivia Rhye" supportingText="@olivia" />
      <Dropdown type="search"       label="Search"       value="Olivia Rhye" supportingText="@olivia" />
      <Dropdown type="country"      label="Country"      value="Canada"      iconLeading={<FlagIcon />} />
    </div>
  ),
};

// ─── Full type × size × state matrix ─────────────────────────────────────────

const TYPES:  DropdownType[]  = ['default', 'icon-leading', 'search', 'country'];
const SIZES:  DropdownSize[]  = ['xs', 'sm'];
const STATES: DropdownState[] = ['default', 'placeholder', 'focused', 'open', 'disabled'];

export const TypeSizeStateMatrix: Story = {
  parameters: { layout: 'fullscreen' },
  // Override the meta-level 320px width decorator — this matrix needs full width.
  decorators: [(Story) => <Story />],
  render: () => (
    <div className="p-8 space-y-12">
      {TYPES.map((type) => (
        <div key={type} className="space-y-6">
          <p className="text-text-md font-medium text-text-primary-900">Type: {type}</p>
          {SIZES.map((size) => (
            <div key={size} className="space-y-3">
              <p className="text-text-xs font-medium text-text-tertiary-600">Size: {size}</p>
              <div className="grid grid-cols-5 gap-6">
                {STATES.map((state) => (
                  <Dropdown
                    key={state}
                    type={type}
                    size={size}
                    state={state}
                    label={state}
                    value={type === 'country' ? 'Canada' : 'Olivia Rhye'}
                    supportingText={type !== 'country' ? '@olivia' : undefined}
                    placeholder={type === 'search' ? 'Search' : type === 'country' ? 'Country' : 'Select option'}
                    iconLeading={type === 'country' ? <FlagIcon /> : undefined}
                    required
                    helpIcon
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

// ─── Dark mode ───────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="bg-bg-primary p-6 space-y-6">
      <Dropdown label="Default" value="Olivia Rhye" supportingText="@olivia" required helpIcon />
      <Dropdown type="icon-leading" label="Icon leading" value="Olivia Rhye" supportingText="@olivia" />
      <Dropdown type="search" label="Search" value="Olivia Rhye" supportingText="@olivia" />
      <Dropdown type="country" label="Country" value="Canada" iconLeading={<FlagIcon />} />
    </div>
  ),
};

// ─── SelectMenuItem stories ──────────────────────────────────────────────────

export const MenuItemAllStates: Story = {
  render: () => (
    <div className="w-80">
      <SelectMenu>
        <SelectMenuItem supportingText="@phoenix">Phoenix Baker</SelectMenuItem>
        <SelectMenuItem supportingText="@olivia" selected>Olivia Rhye</SelectMenuItem>
        <SelectMenuItem supportingText="@lana">Lana Steiner</SelectMenuItem>
        <SelectMenuItem supportingText="@demi" disabled>Demi Wilkinson</SelectMenuItem>
      </SelectMenu>
    </div>
  ),
};
