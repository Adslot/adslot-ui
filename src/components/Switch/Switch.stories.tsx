import type { Meta, StoryObj } from '@storybook/react-vite';

import Switch from './index';

const meta = {
  title: 'Pending Review/Switch',
  component: Switch,
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
