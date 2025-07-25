import type { Meta, StoryObj } from '@storybook/react-vite';

import Alert from './index';

const meta = {
  title: 'Pending Review/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default alert message',
  },
};
