import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import Panel from './index';

const meta = {
  title: 'Pending Review/Panel',
  component: Panel,
  tags: ['autodocs'],
} satisfies Meta<typeof Panel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Read more about integration',
    id: 'my-panel',
    children: (
      <>
        <p>
          Lorem ipsum amet dolore voluptate veniam nulla dolore nulla adipisicing irure adipisicing qui fugiat veniam.
          Ullamco reprehenderit cillum irure esse ad eu dolor laboris.
        </p>
        <p>Consequat commodo consequat eiusmod sit mollit elit ex nostrud consectetur.</p>
      </>
    ),
  },
};
