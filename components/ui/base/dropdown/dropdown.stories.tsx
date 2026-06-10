import type { Meta, StoryObj } from '@storybook/react';
import { Gear, Question, SignOut, User } from '@phosphor-icons/react';
import { Button } from 'react-aria-components';
import { Dropdown } from './dropdown';
import { cx } from '@/utils/cx';

const triggerCls = cx(
  'inline-flex items-center justify-center gap-1 rounded-md border border-border-primary',
  'bg-bg-primary px-3 py-1.5 text-sm font-medium text-secondary cursor-pointer',
  'hover:bg-bg-primary-hover transition-colors outline-none',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
);

const meta: Meta = {
  title: 'UI/Base/Dropdown',
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Dropdown.Root>
      <Button className={triggerCls}>Open menu</Button>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item label="Profile" icon={User} />
          <Dropdown.Item label="Settings" icon={Gear} />
          <Dropdown.Item label="Help" icon={Question} />
          <Dropdown.Separator />
          <Dropdown.Item label="Log out" icon={SignOut} />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

export const WithCheckboxSelection: Story = {
  render: () => (
    <Dropdown.Root>
      <Button className={triggerCls}>Filter options</Button>
      <Dropdown.Popover>
        <Dropdown.Menu selectionMode="multiple">
          <Dropdown.Item label="Equities" selectionIndicator="checkbox" />
          <Dropdown.Item label="Fixed income" selectionIndicator="checkbox" />
          <Dropdown.Item label="Alternatives" selectionIndicator="checkbox" />
          <Dropdown.Item label="Real estate" selectionIndicator="checkbox" />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

export const DotsButton: Story = {
  render: () => (
    <Dropdown.Root>
      <Dropdown.DotsButton />
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item label="View details" />
          <Dropdown.Item label="Edit" />
          <Dropdown.Separator />
          <Dropdown.Item label="Delete" />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};
