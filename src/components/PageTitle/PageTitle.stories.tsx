import type { Meta, StoryObj } from '@storybook/react-vite';

import PageTitle from './index';

const meta = {
  title: 'Pending Review/PageTitle',
  component: PageTitle,
  tags: ['autodocs'],
} satisfies Meta<typeof PageTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Children',
    title: 'Title',
  },
};
