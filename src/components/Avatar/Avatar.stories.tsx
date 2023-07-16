import type { Meta, StoryObj } from '@storybook/react';

import Avatar from './index';

const meta = {
  title: 'Pending Review/Avatar',
  component: Avatar,
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: 'blue',
    givenName: 'Adslot',
    surname: 'UI',
  },
};
