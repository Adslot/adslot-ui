import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import Nav, { NavItem } from './index';

const meta = {
  title: 'Pending Review/Nav',
  component: Nav,
  tags: ['autodocs'],
} satisfies Meta<typeof Nav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeKey: 1,
    onSelect: () => {},
  },
  render: (args) => (
    <Nav {...args}>
      <NavItem key={0} eventKey={0}>
        Dashboard
      </NavItem>
      <NavItem key={1} eventKey={1}>
        Reports
      </NavItem>
      <NavItem key={2} eventKey={2} disabled>
        Invoicing
      </NavItem>
    </Nav>
  ),
};
