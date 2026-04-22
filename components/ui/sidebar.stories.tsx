import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './sidebar';

const FIGMA_URL =
  'https://www.figma.com/design/vr9mgx3CwlKmdGujGIumRK/Surmount-Design-System?node-id=23487-11641';

const meta: Meta<typeof Sidebar> = {
  title: 'UI/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: FIGMA_URL,
    },
  },
  argTypes: {
    active: {
      control: 'select',
      options: ['home', 'marketplace', 'create'],
    },
    userInitial: { control: 'text' },
  },
  args: {
    active: 'home',
    userInitial: 'S',
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { active: 'home' },
};

// ─── Marketplace ─────────────────────────────────────────────────────────────

export const Marketplace: Story = {
  args: { active: 'marketplace' },
};

// ─── Create ──────────────────────────────────────────────────────────────────

export const Create: Story = {
  args: { active: 'create' },
};

// ─── All States ──────────────────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-row bg-bg-primary" style={{ height: '100vh' }}>
      <Sidebar active="home" userInitial="S" />
      <Sidebar active="marketplace" userInitial="M" />
      <Sidebar active="create" userInitial="C" />
    </div>
  ),
};

// ─── Dark Mode ───────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="bg-bg-primary" style={{ height: '100vh', display: 'flex' }}>
      <Sidebar active="home" userInitial="S" />
    </div>
  ),
};
