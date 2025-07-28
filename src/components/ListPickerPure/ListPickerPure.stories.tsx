import type { Meta, StoryObj } from '@storybook/react-vite';

import ListPickerPure from './index';

const meta = {
  title: 'Pending Review/ListPickerPure',
  component: ListPickerPure,
  tags: ['autodocs'],
} satisfies Meta<typeof ListPickerPure>;

export default meta;

type Story = StoryObj<typeof meta>;

const teamMember1 = { givenName: 'John', id: 1, surname: 'Smith' };
const teamMember2 = { givenName: 'Jane', id: 2, surname: 'Doe' };
const teamMember3 = { givenName: 'Jack', id: 3, surname: 'White' };

const listPickerItems = [teamMember1, teamMember2, teamMember3];

export const Default: Story = {
  args: {
    items: listPickerItems,
    labelFormatter: (item) => `${item.givenName} ${item.surname}`,
  },
};
