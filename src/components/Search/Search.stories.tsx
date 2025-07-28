import type { Meta, StoryObj } from '@storybook/react-vite';

import Search from './index';

const meta = {
  title: 'Pending Review/Search',
  component: Search,
  tags: ['autodocs'],
} satisfies Meta<typeof Search>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
