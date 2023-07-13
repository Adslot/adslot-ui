import type { Meta, StoryObj } from '@storybook/react';

import Tag from './index';

const meta = {
  title: 'Pending Review/Tag',
  component: Tag,
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const Inverse: Story = {
  args: {
    children: 'Inverse',
    inverse: true,
  },
};
