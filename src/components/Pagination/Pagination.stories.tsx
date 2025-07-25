import type { Meta, StoryObj } from '@storybook/react-vite';

import Pagination from './index';

const meta = {
  title: 'Pending Review/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pageCount: 10,
    next: true,
    prev: true,
  },
};
