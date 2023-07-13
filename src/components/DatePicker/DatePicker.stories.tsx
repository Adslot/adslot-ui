import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import DatePicker from './index';

const meta = {
  title: 'Pending Review/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ height: 260 }}>{Story()}</div>],
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'form-control',
    dateFormat: 'dd MMM yyyy',
    selected: new Date(),
    placeholderText: 'Date e.g. 03 Sep 2016',
    disableInlineEditing: false,
    disableMomentFormat: true,
  },
};
