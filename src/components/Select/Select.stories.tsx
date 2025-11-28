import type { Meta, StoryObj } from '@storybook/react-vite';

import Select from './index';

const meta = {
  title: 'Pending Review/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

const countryOptions = [
  { value: 'au', label: 'Australia' },
  { value: 'ca', label: 'Canada' },
  { value: 'jp', label: 'Japan', disabled: true },
  { value: 'uk', label: 'United Kingdom' },
];

export const Default: Story = {
  args: {
    options: countryOptions,
    isInModal: true,
    isClearable: true,
  },
};

export const MultiSelect: Story = {
  args: {
    isMulti: true,
    options: countryOptions,
    isInModal: true,
  },
};
