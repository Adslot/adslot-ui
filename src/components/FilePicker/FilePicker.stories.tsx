import type { Meta, StoryObj } from '@storybook/react';

import FilePicker from './index';

const meta = {
  title: 'Pending Review/FilePicker',
  component: FilePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof FilePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSelect: () => {},
  },
};
