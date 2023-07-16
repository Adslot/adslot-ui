import type { Meta, StoryObj } from '@storybook/react';

import OverlayLoader from './index';

const meta = {
  title: 'Pending Review/OverlayLoader',
  component: OverlayLoader,
  tags: ['autodocs'],
} satisfies Meta<typeof OverlayLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disableBackground: false,
    text: '...',
  },
};
