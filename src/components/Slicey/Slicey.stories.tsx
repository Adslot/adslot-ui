import type { Meta, StoryObj } from '@storybook/react';

import Slicey from './index';

const meta = {
  title: 'Pending Review/Slicey',
  component: Slicey,
  tags: ['autodocs'],
} satisfies Meta<typeof Slicey>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    diameter: 100,
    donut: false,
    dataset: [
      { label: 'info', value: 35 },
      { label: 'positive', value: 123 },
      { label: 'negative', value: 15 },
    ],
  },
};
