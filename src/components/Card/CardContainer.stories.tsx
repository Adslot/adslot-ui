import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Card from './index';
import { Default as DefaultContent } from './CardContent.stories';

const meta = {
  title: 'Pending Review/Card/Card.Container',
  component: Card.Container,
  tags: ['autodocs'],
} satisfies Meta<typeof Card.Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Card.Content {...DefaultContent.args} />,
  },
};
