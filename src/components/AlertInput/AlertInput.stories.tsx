import type { Meta, StoryObj } from '@storybook/react-vite';

import AlertInput from './index';

const meta = {
  title: 'Pending Review/AlertInput',
  component: AlertInput,
  tags: ['autodocs'],
  argTypes: {
    onValueChange: { control: false },
    onBlur: { control: false },
    onFocus: { control: false },
  },
} satisfies Meta<typeof AlertInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultAlert: Story = {
  args: {
    alertStatus: 'success',
  },
};

export const InfoAlert: Story = {
  args: {
    alertStatus: 'info',
  },
};

export const WarningAlert: Story = {
  args: {
    alertStatus: 'warning',
  },
};

export const ErrorAlert: Story = {
  args: {
    alertStatus: 'error',
  },
};
