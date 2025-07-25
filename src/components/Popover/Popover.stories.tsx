import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import Popover from './index';
import Button from '../Button';

const meta = {
  title: 'Pending Review/Popover',
  component: Popover,
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placement: 'bottom',
    theme: 'dark',
    popoverContent: 'This is a button',
    children: <Button>Toggle Popover</Button>,
  },
};
