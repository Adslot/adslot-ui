import type { Meta, StoryObj } from '@storybook/react';

import Textarea from './index';

const meta = {
  title: 'Pending Review/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxLength: 250,
    value: 'text',
  },
};
