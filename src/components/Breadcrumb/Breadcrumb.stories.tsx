import type { Meta, StoryObj } from '@storybook/react';

import Breadcrumb from './index';

const meta = {
  title: 'Pending Review/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
    nodes: { control: false },
    onClick: { control: false },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'content',
    divider: '/',
    onClick: () => {},
    nodes: [
      { id: 'db4e2cda-ffad-4763-a016-03619ccfd7c2', label: 'Australia' },
      { id: 'b1b8222c-172b-46f6-bc91-5b92ea9adcd5', label: 'Victoria' },
      { id: '9398d812-9e01-4a8b-9d3e-bc946218070b', label: 'Melbourne' },
    ],
    rootNode: { id: 'another-all', label: 'Custom All' },
  },
};
