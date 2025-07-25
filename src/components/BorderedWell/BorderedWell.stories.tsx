import type { Meta, StoryObj } from '@storybook/react-vite';

import BorderedWell from './index';

const meta = {
  title: 'Pending Review/BorderedWell',
  component: BorderedWell,
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
  },
} satisfies Meta<typeof BorderedWell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'content',
  },
};
