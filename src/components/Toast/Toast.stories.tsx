import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Toast from './index';
import Button from '../Button';

const meta = {
  title: 'Pending Review/Toast',
  component: Toast.Container,
  tags: ['autodocs'],
} satisfies Meta<typeof Toast.Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <Toast.Container />
      <Button
        onClick={() =>
          Toast.notify({
            title: 'Hello',
            theme: 'success',
            message: <span>Hello Toast</span>,
          })
        }
      >
        Show Hello Toast
      </Button>
    </>
  ),
};
