import type { Meta, StoryObj } from '@storybook/react-vite';

import Spinner from './index';

const meta = {
  title: 'Pending Review/Spinner',
  component: Spinner,
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};
