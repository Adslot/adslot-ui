import type { Meta, StoryObj } from '@storybook/react';

import Pill from './index';

const meta = {
  title: 'Pending Review/Pill',
  component: Pill,
  tags: ['autodocs'],
} satisfies Meta<typeof Pill>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};
