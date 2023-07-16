import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Totals from './index';

const meta = {
  title: 'Pending Review/Totals',
  component: Totals,
  tags: ['autodocs'],
} satisfies Meta<typeof Totals>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
    toSum: [
      { value: 10, isHidden: true },
      { label: 'Movies Category - Medium Rectangle', value: 1000 },
      { label: 'Selected', value: 36.8 },
    ],
  },
};
