import type { Meta, StoryObj } from '@storybook/react';

import Skeleton from './index';

const meta = {
  title: 'Pending Review/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { width: '75px', variant: 'text' },
};

export const Rectangle: Story = {
  args: {
    variant: 'rect',
    width: '210px',
    height: '118px',
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
  },
};
