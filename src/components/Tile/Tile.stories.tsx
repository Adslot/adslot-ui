import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Tile from './index';

const meta = {
  title: 'Pending Review/Tile',
  component: Tile,
  tags: ['autodocs'],
} satisfies Meta<typeof Tile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '',
    imgLink: 'tile/adslot-logo-2.png',
  },
};
