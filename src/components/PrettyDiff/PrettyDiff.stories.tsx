import type { Meta, StoryObj } from '@storybook/react';

import PrettyDiff from './index';

const meta = {
  title: 'Pending Review/PrettyDiff',
  component: PrettyDiff,
  tags: ['autodocs'],
} satisfies Meta<typeof PrettyDiff>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};
