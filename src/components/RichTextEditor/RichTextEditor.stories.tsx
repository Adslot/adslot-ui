import type { Meta, StoryObj } from '@storybook/react';

import RichTextEditor from './index';

const meta = {
  title: 'Pending Review/RichTextEditor',
  component: RichTextEditor,
  tags: ['autodocs'],
} satisfies Meta<typeof RichTextEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 'Initial value' },
};
