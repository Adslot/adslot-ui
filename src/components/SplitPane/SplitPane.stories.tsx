import type { Meta, StoryObj } from '@storybook/react-vite';

import SplitPane from './index';

const meta = {
  title: 'Pending Review/SplitPane',
  component: SplitPane,
  tags: ['autodocs'],
} satisfies Meta<typeof SplitPane>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
