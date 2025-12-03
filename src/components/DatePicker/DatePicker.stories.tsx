import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import DatePicker from './index';

const meta = {
  title: 'Pending Review/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ height: 320 }}>{Story()}</div>],
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

const Demo = (props) => {
  const [date, setDate] = React.useState(() => new Date());

  return (
    <DatePicker
      dateFormat="DD MMM YYYY"
      onChange={setDate}
      selected={date}
      placeholderText="Date e.g. 03 Sep 2016"
      {...props}
    />
  );
};

export const Default: Story = {
  render: () => <Demo />,
};
