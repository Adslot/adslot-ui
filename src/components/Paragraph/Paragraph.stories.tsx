import type { Meta, StoryObj } from '@storybook/react-vite';

import Paragraph from './index';

const meta = {
  title: 'Pending Review/Paragraph',
  component: Paragraph.HTML,
  tags: ['autodocs'],
} satisfies Meta<typeof Paragraph.HTML>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    briefCharCount: 100,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
};
