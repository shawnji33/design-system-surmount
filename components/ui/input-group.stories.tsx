import type { Meta, StoryObj } from '@storybook/react';
import { InputGroup } from './input-group';
import { Input } from './input';

const FIGMA_URL =
  'https://www.figma.com/design/vr9mgx3CwlKmdGujGIumRK/Surmount-Design-System';

const meta: Meta<typeof InputGroup> = {
  title: 'UI/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
  },
  argTypes: {
    error: { control: 'boolean' },
  },
  args: {
    error: false,
  },
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

// ─── Default / playground ────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <div className="max-w-md">
      <InputGroup {...args}>
        <Input label="Street, City, State" placeholder="1600 Amphitheatre Pkwy" />
        <Input label="Apt/Unit #" placeholder="Suite 200" />
      </InputGroup>
    </div>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="max-w-md">
      <InputGroup {...args} label="Residential address">
        <Input label="Street, City, State" placeholder="1600 Amphitheatre Pkwy" />
        <Input label="Apt/Unit #" placeholder="Suite 200" />
      </InputGroup>
    </div>
  ),
};

export const WithHelperText: Story = {
  render: (args) => (
    <div className="max-w-md">
      <InputGroup
        {...args}
        label="Residential address"
        helperText="Apt/Unit is optional."
      >
        <Input label="Street, City, State" placeholder="1600 Amphitheatre Pkwy" />
        <Input label="Apt/Unit #" placeholder="Suite 200" />
      </InputGroup>
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="max-w-md">
      <InputGroup
        error
        label="Residential address"
        errorText="Enter a valid US address."
      >
        <Input label="Street, City, State" defaultValue="bad address" />
        <Input label="Apt/Unit #" placeholder="Suite 200" />
      </InputGroup>
    </div>
  ),
};

// ─── Multiple fields (stress test) ───────────────────────────────────────────

export const ThreeFields: Story = {
  render: () => (
    <div className="max-w-md">
      <InputGroup label="Contact">
        <Input label="Full name" placeholder="Jane Doe" />
        <Input label="Email" placeholder="jane@surmount.com" />
        <Input label="Phone" placeholder="(555) 000-0000" />
      </InputGroup>
    </div>
  ),
};

// ─── Dark mode ───────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="bg-bg-primary p-6">
      <div className="max-w-md">
        <InputGroup label="Residential address" helperText="Apt/Unit is optional.">
          <Input label="Street, City, State" placeholder="1600 Amphitheatre Pkwy" />
          <Input label="Apt/Unit #" placeholder="Suite 200" />
        </InputGroup>
      </div>
    </div>
  ),
};
