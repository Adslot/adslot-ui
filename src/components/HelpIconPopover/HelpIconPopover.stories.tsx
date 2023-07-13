import type { Meta, StoryObj } from '@storybook/react';

import HelpIconPopover from './index';

const meta = {
  title: 'Pending Review/HelpIconPopover',
  component: HelpIconPopover,
  tags: ['autodocs'],
} satisfies Meta<typeof HelpIconPopover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'id',
    children: 'Default',
  },
};
