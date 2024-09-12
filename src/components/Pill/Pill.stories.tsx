import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Pill from './index';

const meta = {
  title: 'Components/Pill',
  component: Pill,
  tags: ['autodocs'],
  argTypes: {
    onClick: { control: false },
  },
  args: {
    inverse: false,
    onClick: undefined,
    size: 'medium',
  },
} satisfies Meta<typeof Pill>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const Colors: Story = {
  args: {
    children: 'Colors',
  },
  argTypes: {
    color: { control: false },
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Pill {...args} color="default" />
      <Pill {...args} color="primary" />
      <Pill {...args} color="secondary" />
      <Pill {...args} color="danger" />
      <Pill {...args} color="info" />
      <Pill {...args} color="success" />
      <Pill {...args} color="warning" />
    </div>
  ),
};

export const Inverse: Story = {
  args: {
    children: 'Inverse',
    inverse: true,
  },
  argTypes: {
    color: { control: false },
    inverse: { control: false },
  },
  render: Colors.render,
};
