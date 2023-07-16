import type { Meta, StoryObj } from '@storybook/react';

import Statistic from './index';

const meta = {
  title: 'Pending Review/Statistic',
  component: Statistic,
  tags: ['autodocs'],
} satisfies Meta<typeof Statistic>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Impressions',
    value: '1 Million',
  },
};
