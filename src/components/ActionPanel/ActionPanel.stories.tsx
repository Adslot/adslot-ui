import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ActionPanel from './index';
import Button from '../Button';

const meta = {
  title: 'Pending Review/ActionPanel',
  component: ActionPanel,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    onClose: { control: false },
    actionButton: {
      control: { type: 'boolean' },
      mapping: {
        false: null,
        true: <Button>Save</Button>,
      },
    },
  },
} satisfies Meta<typeof ActionPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Action Panel',
    size: 'medium',
    children: `Native mammals include the dingoes or wild dogs, numbats, quolls, and Tasmanian devils. Dingoes are the largest carnivorous mammals that populate the wilds of mainland Australia. But the smaller numbats and Tasmanian devils, which are house cat-like size can be seen only in wildlife parks. You can also spot them in the wilds of Tasmania.`,
    isModal: false,
  },
};
