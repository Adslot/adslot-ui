import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import Accordion from './index';

const meta = {
  title: 'Pending Review/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
    onPanelClick: { control: false },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxExpand: 3,
    defaultActivePanelIds: ['filter-by-region'],
    children: [
      <Accordion.Panel id="filter-by-region" title="Filter by region">
        Filter by region
      </Accordion.Panel>,
      <Accordion.Panel id="filter-by-device" title="Filter by device">
        Filter by device
      </Accordion.Panel>,
      <Accordion.Panel id="filter-1" title="Filter by continent">
        Filter by continent
      </Accordion.Panel>,
      <Accordion.Panel id="filter-2" title="Filter by country">
        Filter by country
      </Accordion.Panel>,
    ],
  },
};
