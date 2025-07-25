import type { Meta, StoryObj } from '@storybook/react-vite';

import CountBadge from './index';

const meta = {
  title: 'Pending Review/CountBadge',
  component: CountBadge,
  tags: ['autodocs'],
} satisfies Meta<typeof CountBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 8,
    status: 'info',
  },
};
