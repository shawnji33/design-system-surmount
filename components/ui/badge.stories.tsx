import type { Meta, StoryObj } from '@storybook/react';
import { Badge, type BadgeColor, type BadgeSize, type BadgeVariant } from './badge';

const FIGMA_URL =
  'https://www.figma.com/design/vr9mgx3CwlKmdGujGIumRK/Surmount-Design-System?node-id=1046-3819';

// Placeholder icon (Phosphor-style, viewBox 0 0 256 256)
const Icon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm40-68a28 28 0 0 1-28 28 8 8 0 0 1 0-16 12 12 0 0 0 12-12V88a8 8 0 0 1 16 0Z"
      fill="currentColor"
    />
  </svg>
);

const ALL_COLORS: BadgeColor[] = [
  'gray', 'brand', 'error', 'warning', 'success',
  'gray-blue', 'indigo', 'purple', 'pink',
];
const ALL_SIZES: BadgeSize[]    = ['xs', 'sm', 'md', 'lg'];
const ALL_VARIANTS: BadgeVariant[] = ['pill', 'badge'];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    size:     { control: 'select', options: ALL_SIZES },
    variant:  { control: 'select', options: ALL_VARIANTS },
    color:    { control: 'select', options: ALL_COLORS },
    dot:      { control: 'boolean' },
    iconOnly: { control: 'boolean' },
  },
  args: {
    size: 'sm',
    variant: 'pill',
    color: 'brand',
    children: 'Label',
    dot: false,
    iconOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ─── Default / playground ─────────────────────────────────────────────────────

export const Default: Story = {};

export const WithDot: Story = {
  args: { dot: true },
};

export const WithLeadingIcon: Story = {
  args: { iconLeading: <Icon /> },
};

export const WithTrailingIcon: Story = {
  args: { iconTrailing: <Icon /> },
};

export const WithBothIcons: Story = {
  args: { iconLeading: <Icon />, iconTrailing: <Icon /> },
};

export const WithRemove: Story = {
  args: { onRemove: () => alert('removed') },
};

export const IconOnly: Story = {
  args: { iconOnly: true, iconLeading: <Icon /> },
};

export const BadgeType: Story = {
  args: { variant: 'badge' },
};

// ─── All colors ───────────────────────────────────────────────────────────────

export const AllColors: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3 p-6">
      {ALL_COLORS.map((color) => (
        <Badge key={color} {...args} color={color}>
          {color}
        </Badge>
      ))}
    </div>
  ),
};

export const AllColorsWithDot: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3 p-6">
      {ALL_COLORS.map((color) => (
        <Badge key={color} {...args} color={color} dot>
          {color}
        </Badge>
      ))}
    </div>
  ),
};

// ─── All sizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3 p-6">
      {ALL_SIZES.map((size) => (
        <Badge key={size} {...args} size={size}>
          {size}
        </Badge>
      ))}
    </div>
  ),
};

// ─── Pill vs Badge (type comparison) ─────────────────────────────────────────

export const TypeComparison: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 p-6">
      {ALL_VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-3">
          <span className="w-12 text-text-xs text-text-tertiary-600 font-medium">{variant}</span>
          {ALL_SIZES.map((size) => (
            <Badge key={size} {...args} variant={variant} size={size}>
              {size}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

// ─── Icon variants ────────────────────────────────────────────────────────────

export const IconVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 p-6">
      {[
        { label: 'No icon',        props: {} },
        { label: 'Dot',            props: { dot: true } },
        { label: 'Icon leading',   props: { iconLeading: <Icon /> } },
        { label: 'Icon trailing',  props: { iconTrailing: <Icon /> } },
        { label: 'Both icons',     props: { iconLeading: <Icon />, iconTrailing: <Icon /> } },
        { label: 'X close',        props: { onRemove: () => {} } },
        { label: 'Icon only',      props: { iconOnly: true, iconLeading: <Icon /> } },
      ].map(({ label, props }) => (
        <div key={label} className="flex flex-wrap items-center gap-3">
          <span className="w-24 shrink-0 text-text-xs text-text-tertiary-600">{label}</span>
          {ALL_SIZES.map((size) => (
            <Badge key={size} {...args} {...props} size={size}>
              Label
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

// ─── Color × type matrix ──────────────────────────────────────────────────────

export const ColorTypeMatrix: Story = {
  render: () => (
    <div className="p-6 space-y-3">
      {ALL_COLORS.map((color) => (
        <div key={color} className="flex flex-wrap items-center gap-3">
          <span className="w-20 text-text-xs text-text-tertiary-600">{color}</span>
          <Badge color={color} variant="pill">Pill</Badge>
          <Badge color={color} variant="pill" dot>Pill dot</Badge>
          <Badge color={color} variant="pill" onRemove={() => {}}>Pill ×</Badge>
          <Badge color={color} variant="pill" iconLeading={<Icon />}>Pill icon</Badge>
          <Badge color={color} variant="badge">Badge</Badge>
          <Badge color={color} variant="badge" dot>Badge dot</Badge>
          <Badge color={color} variant="badge" onRemove={() => {}}>Badge ×</Badge>
          <Badge color={color} variant="badge" iconLeading={<Icon />}>Badge icon</Badge>
        </div>
      ))}
    </div>
  ),
};

// ─── Size × variant × icon full matrix ───────────────────────────────────────

export const SizeVariantMatrix: Story = {
  render: () => (
    <div className="p-6 space-y-6">
      {ALL_SIZES.map((size) => (
        <div key={size}>
          <p className="text-text-xs text-text-tertiary-600 font-medium mb-3">Size: {size}</p>
          <div className="flex flex-col gap-3">
            {ALL_VARIANTS.map((variant) => (
              <div key={variant} className="flex flex-wrap items-center gap-3">
                <span className="w-12 text-text-xs text-text-tertiary-600">{variant}</span>
                <Badge size={size} variant={variant} color="brand">Label</Badge>
                <Badge size={size} variant={variant} color="brand" dot>Dot</Badge>
                <Badge size={size} variant={variant} color="brand" iconLeading={<Icon />}>Leading</Badge>
                <Badge size={size} variant={variant} color="brand" iconTrailing={<Icon />}>Trailing</Badge>
                <Badge size={size} variant={variant} color="brand" onRemove={() => {}}>Remove</Badge>
                <Badge size={size} variant={variant} color="brand" iconOnly iconLeading={<Icon />} />
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
    <div data-theme="dark" className="bg-bg-primary p-6 flex flex-wrap gap-3">
      {ALL_COLORS.map((color) => (
        <Badge key={color} color={color} variant="pill" dot>
          {color}
        </Badge>
      ))}
      {ALL_COLORS.map((color) => (
        <Badge key={color + '-badge'} color={color} variant="badge">
          {color}
        </Badge>
      ))}
    </div>
  ),
};
