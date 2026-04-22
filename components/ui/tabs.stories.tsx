import type { Meta, StoryObj } from '@storybook/react';
import { useState, type ComponentProps } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

const PersonIcon = () => (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path opacity="0.2" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 144a40 40 0 1 1 40-40 40 40 0 0 1-40 40Z" />
    <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24ZM74.08 197.5a64 64 0 0 1 107.84 0 87.83 87.83 0 0 1-107.84 0ZM96 120a32 32 0 1 1 32 32 32 32 0 0 1-32-32Zm97.76 66.41a79.66 79.66 0 0 0-36.06-28.75 48 48 0 1 0-59.4 0 79.66 79.66 0 0 0-36.06 28.75 88 88 0 1 1 131.52 0Z" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path opacity="0.2" d="M224 200H32V72l64 56 40-48 48 40 56-56v136Z" />
    <path d="M232 208H24a8 8 0 0 1 0-16h8V48a8 8 0 0 1 16 0v144h16V96a8 8 0 0 1 16 0v96h16v-64a8 8 0 0 1 16 0v64h16v-32a8 8 0 0 1 16 0v32h16v-80a8 8 0 0 1 16 0v80h8a8 8 0 0 1 0 16Z" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path opacity="0.2" d="M128 80a48 48 0 1 0 48 48 48 48 0 0 0-48-48Zm0 72a24 24 0 1 1 24-24 24 24 0 0 1-24 24Z" />
    <path d="M128 80a48 48 0 1 0 48 48 48.05 48.05 0 0 0-48-48Zm0 80a32 32 0 1 1 32-32 32 32 0 0 1-32 32Zm109.84-29.19a8 8 0 0 1 0 10.38l-21.12 24a8 8 0 0 1-5.94 2.69H184a8 8 0 0 1-6.94-4l-6.84-12.07a8 8 0 0 1 1.38-9.65l16.88-16.88a8 8 0 0 1 9.65-1.38l12.07 6.84A8 8 0 0 1 214.84 212Z" />
  </svg>
);

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof meta>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

type TabsVariantProps = Omit<ComponentProps<typeof Tabs>, 'value' | 'onValueChange' | 'children'>;

function ControlledTabs(props: TabsVariantProps) {
  const [value, setValue] = useState('tab1');
  return (
    <Tabs value={value} onValueChange={setValue} {...props}>
      <TabsList>
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-text-sm text-text-secondary-700 pt-xl">Overview panel content.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-text-sm text-text-secondary-700 pt-xl">Analytics panel content.</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-text-sm text-text-secondary-700 pt-xl">Reports panel content.</p>
      </TabsContent>
    </Tabs>
  );
}

function ControlledTabsWithBadges(props: TabsVariantProps) {
  const [value, setValue] = useState('tab1');
  return (
    <Tabs value={value} onValueChange={setValue} {...props}>
      <TabsList>
        <TabsTrigger value="tab1" badge={3}>Overview</TabsTrigger>
        <TabsTrigger value="tab2" badge={12}>Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Reports</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

function ControlledTabsWithIcons(props: TabsVariantProps) {
  const [value, setValue] = useState('tab1');
  return (
    <Tabs value={value} onValueChange={setValue} {...props}>
      <TabsList>
        <TabsTrigger value="tab1" iconLeading={<PersonIcon />}>Profile</TabsTrigger>
        <TabsTrigger value="tab2" iconLeading={<ChartIcon />}>Analytics</TabsTrigger>
        <TabsTrigger value="tab3" iconLeading={<SettingsIcon />}>Settings</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

function ControlledTabsWithDisabled(props: TabsVariantProps) {
  const [value, setValue] = useState('tab1');
  return (
    <Tabs value={value} onValueChange={setValue} {...props}>
      <TabsList>
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2" disabled>Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Reports</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

// ─── Variant stories ──────────────────────────────────────────────────────────

export const ButtonBrand: Story = {
  render: () => <ControlledTabs type="button-brand" />,
};

export const ButtonGray: Story = {
  render: () => <ControlledTabs type="button-gray" />,
};

export const ButtonBorder: Story = {
  render: () => <ControlledTabs type="button-border" />,
};

export const ButtonMinimal: Story = {
  render: () => <ControlledTabs type="button-minimal" />,
};

export const Underline: Story = {
  render: () => <ControlledTabs type="underline" />,
};

export const UnderlineGray: Story = {
  render: () => <ControlledTabs type="underline-gray" />,
};

// ─── Size stories ─────────────────────────────────────────────────────────────

export const SizeSm: Story = {
  name: 'Size — sm',
  render: () => (
    <div className="flex flex-col gap-4xl">
      {(['button-brand', 'button-gray', 'button-border', 'button-minimal', 'underline', 'underline-gray'] as const).map(type => (
        <div key={type} className="flex flex-col gap-xs">
          <span className="text-text-xs text-text-quaternary-500 font-body">{type}</span>
          <ControlledTabs type={type} size="sm" />
        </div>
      ))}
    </div>
  ),
};

export const SizeMd: Story = {
  name: 'Size — md',
  render: () => (
    <div className="flex flex-col gap-4xl">
      {(['button-brand', 'button-gray', 'button-border', 'button-minimal', 'underline', 'underline-gray'] as const).map(type => (
        <div key={type} className="flex flex-col gap-xs">
          <span className="text-text-xs text-text-quaternary-500 font-body">{type}</span>
          <ControlledTabs type={type} size="md" />
        </div>
      ))}
    </div>
  ),
};

// ─── Feature stories ──────────────────────────────────────────────────────────

export const WithBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-4xl">
      {(['button-brand', 'button-gray', 'button-border', 'button-minimal', 'underline', 'underline-gray'] as const).map(type => (
        <div key={type} className="flex flex-col gap-xs">
          <span className="text-text-xs text-text-quaternary-500 font-body">{type}</span>
          <ControlledTabsWithBadges type={type} />
        </div>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4xl">
      {(['button-brand', 'button-gray', 'button-border', 'button-minimal', 'underline', 'underline-gray'] as const).map(type => (
        <div key={type} className="flex flex-col gap-xs">
          <span className="text-text-xs text-text-quaternary-500 font-body">{type}</span>
          <ControlledTabsWithIcons type={type} />
        </div>
      ))}
    </div>
  ),
};

export const WithAvatar: Story = {
  render: () => {
    const AvatarSm = () => (
      <div className="w-full h-full bg-bg-brand-solid flex items-center justify-center text-text-white text-text-xxs font-medium">
        SJ
      </div>
    );
    function ControlledTabsWithAvatar(props: TabsVariantProps) {
      const [value, setValue] = useState('tab1');
      return (
        <Tabs value={value} onValueChange={setValue} {...props}>
          <TabsList>
            <TabsTrigger value="tab1" avatar={<AvatarSm />}>Shawn</TabsTrigger>
            <TabsTrigger value="tab2">Analytics</TabsTrigger>
            <TabsTrigger value="tab3">Reports</TabsTrigger>
          </TabsList>
        </Tabs>
      );
    }
    return (
      <div className="flex flex-col gap-4xl">
        {(['button-brand', 'button-gray', 'button-border', 'button-minimal'] as const).map(type => (
          <div key={type} className="flex flex-col gap-xs">
            <span className="text-text-xs text-text-quaternary-500 font-body">{type}</span>
            <ControlledTabsWithAvatar type={type} />
          </div>
        ))}
      </div>
    );
  },
};

export const FullWidth: Story = {
  render: () => (
    <div className="flex flex-col gap-4xl" style={{ maxWidth: 480 }}>
      {(['button-brand', 'button-gray', 'button-border', 'button-minimal'] as const).map(type => (
        <div key={type} className="flex flex-col gap-xs">
          <span className="text-text-xs text-text-quaternary-500 font-body">{type} fullWidth</span>
          <ControlledTabs type={type} fullWidth />
        </div>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4xl">
      {(['button-brand', 'button-gray', 'button-border', 'button-minimal', 'underline', 'underline-gray'] as const).map(type => (
        <div key={type} className="flex flex-col gap-xs">
          <span className="text-text-xs text-text-quaternary-500 font-body">{type}</span>
          <ControlledTabsWithDisabled type={type} />
        </div>
      ))}
    </div>
  ),
};

// ─── Matrix ───────────────────────────────────────────────────────────────────

export const AllTypes: Story = {
  name: 'All types — md',
  render: () => (
    <div className="flex flex-col gap-5xl">
      {(['button-brand', 'button-gray', 'button-border', 'button-minimal', 'underline', 'underline-gray'] as const).map(type => (
        <div key={type} className="flex flex-col gap-xs">
          <span className="text-text-xs text-text-quaternary-500 font-body">{type}</span>
          <ControlledTabs type={type} />
        </div>
      ))}
    </div>
  ),
};

export const AllTypesWithBadgesAndIcons: Story = {
  name: 'All types — badges + icons',
  render: () => (
    <div className="flex flex-col gap-5xl">
      {(['button-brand', 'button-gray', 'button-border', 'button-minimal', 'underline', 'underline-gray'] as const).map(type => {
        const [value, setValue] = useState('tab1');
        return (
          <div key={type} className="flex flex-col gap-xs">
            <span className="text-text-xs text-text-quaternary-500 font-body">{type}</span>
            <Tabs value={value} onValueChange={setValue} type={type}>
              <TabsList>
                <TabsTrigger value="tab1" iconLeading={<PersonIcon />} badge={2}>Profile</TabsTrigger>
                <TabsTrigger value="tab2" iconLeading={<ChartIcon />} badge={9}>Analytics</TabsTrigger>
                <TabsTrigger value="tab3" iconLeading={<SettingsIcon />}>Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        );
      })}
    </div>
  ),
};
