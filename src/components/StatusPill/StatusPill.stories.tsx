import type { Meta, StoryObj } from '@storybook/react';

import StatusPill from './index';

const meta = {
  title: 'Pending Review/StatusPill',
  component: StatusPill,
  tags: ['autodocs'],
} satisfies Meta<typeof StatusPill>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: 'Default',
  },
};
