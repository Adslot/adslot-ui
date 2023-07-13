import type { Meta, StoryObj } from '@storybook/react';

import FormGroup from './index';

const meta = {
  title: 'Pending Review/FormGroup',
  component: FormGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof FormGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
    helpText: 'help text',
    label: 'Label',
  },
};
