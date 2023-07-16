import type { Meta, StoryObj } from '@storybook/react';

import PagedGrid from './index';

const meta = {
  title: 'Pending Review/PagedGrid',
  component: PagedGrid,
  tags: ['autodocs'],
} satisfies Meta<typeof PagedGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'givenName', label: 'Given Name', stretch: true },
      { key: 'surname', label: 'Surname', stretch: true },
    ],
    items: [
      { givenName: 'John', id: 1, surname: 'Smith' },
      { givenName: 'Jane', id: 2, surname: 'Doe' },
      { givenName: 'Jack', id: 3, surname: 'White' },
    ],
    verticalCellBorder: true,
    perPage: 2,
  },
};
