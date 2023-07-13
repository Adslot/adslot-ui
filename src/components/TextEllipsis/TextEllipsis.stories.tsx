import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import TextEllipsis from './index';

const meta = {
  title: 'Pending Review/TextEllipsis',
  component: TextEllipsis,
  tags: ['autodocs'],
} satisfies Meta<typeof TextEllipsis>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
  },
  decorators: [
    (StoryInst) => (
      <div style={{ width: 500 }}>
        <StoryInst />
      </div>
    ),
  ],
};
