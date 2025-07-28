import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TileGrid from './index';

const meta = {
  title: 'Pending Review/TileGrid',
  component: TileGrid,
  tags: ['autodocs'],
} satisfies Meta<typeof TileGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Browse by category',
    items: [
      { id: '0', classSuffix: 'news', title: 'News', maxWidth: 200, imgLink: 'tileGrid/example-image.jpg' },
      {
        id: '1',
        classSuffix: 'sport',
        title: 'Sport',
        imgLink: 'tileGrid/example-image.jpg',
        imgAlign: 'center',
        maxWidth: 200,
      },
      {
        id: '2',
        classSuffix: 'health',
        title: 'Health & Fitness',
        imgLink: 'tileGrid/example-image.jpg',
        imgAlign: 'right',
        maxWidth: 200,
      },
      { id: '3', classSuffix: 'tech', maxWidth: 200, title: 'Technology & Computing' },
    ],
    distributed: true,
  },
  decorators: [
    (StoryInst) => (
      <div style={{ width: '100%' }}>
        <StoryInst />
      </div>
    ),
  ],
};
