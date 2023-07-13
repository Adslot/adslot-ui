import type { Meta, StoryObj } from '@storybook/react';

import FlexibleSpacer from './index';

const meta = {
  title: 'Pending Review/FlexibleSpacer',
  component: FlexibleSpacer,
  tags: ['autodocs'],
} satisfies Meta<typeof FlexibleSpacer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
