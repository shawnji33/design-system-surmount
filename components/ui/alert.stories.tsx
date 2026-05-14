import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { Alert, type AlertTone } from './alert';

const FIGMA_URL =
  'https://www.figma.com/design/vr9mgx3CwlKmdGujGIumRK/Surmount-Design-System';

const ALL_TONES: AlertTone[] = ['gray', 'brand', 'success', 'warning', 'error'];

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component:
          'Surmount-tokenized alert component using Untitled UI icons. Supports neutral, brand, success, warning, and error tones, optional actions, and dismiss controls.',
      },
    },
  },
  argTypes: {
    tone: { control: 'select', options: ALL_TONES },
    title: { control: 'text' },
    description: { control: 'text' },
    onDismiss: { action: 'dismissed' },
  },
  args: {
    tone: 'brand',
    title: 'Strategy created',
    description: 'Your portfolio strategy is ready to review.',
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    title: 'Connect your account',
    description: 'Link an investment account to unlock automated portfolio monitoring.',
    action: (
      <>
        <Button size="sm" variant="primary">Connect account</Button>
        <Button size="sm" variant="link-gray">Learn more</Button>
      </>
    ),
  },
};

export const Dismissible: Story = {
  args: {
    onDismiss: () => {},
  },
};

export const DescriptionOnly: Story = {
  args: {
    title: undefined,
    description: 'We updated your risk profile using your latest answers.',
  },
};

export const ToneMatrix: Story = {
  render: (args) => (
    <div className="flex max-w-2xl flex-col gap-lg p-6">
      {ALL_TONES.map((tone) => (
        <Alert
          key={tone}
          {...args}
          tone={tone}
          title={`${tone[0].toUpperCase()}${tone.slice(1)} alert`}
          description="This alert is mapped to Surmount semantic background, border, text, and foreground tokens."
        />
      ))}
    </div>
  ),
};

export const DismissibleMatrix: Story = {
  render: (args) => (
    <div className="flex max-w-2xl flex-col gap-lg p-6">
      {ALL_TONES.map((tone) => (
        <Alert
          key={tone}
          {...args}
          tone={tone}
          title={`${tone[0].toUpperCase()}${tone.slice(1)} alert`}
          description="Dismiss controls inherit Surmount focus and hover treatment."
          onDismiss={() => {}}
        />
      ))}
    </div>
  ),
};
