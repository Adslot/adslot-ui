import type { Meta, StoryObj } from '@storybook/react';

import Radio from './index';

const meta = {
  title: 'Pending Review/Radio',
  component: Radio,
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Radio button name',
    label: 'Radio button label',
    dts: 'radio-button-data-test-selector',
    value: 'Radio button value',
    checked: true,
  },
};
