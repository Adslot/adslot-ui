import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TextInput from './index';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultTextInput: Story = {
  args: {},
};

export const LineInput: Story = {
  args: {
    variant: 'line',
  },
};

export const LoadingInput: Story = {
  args: {
    isLoading: true,
  },
};

const ClickToInsertInputDemo = (props) => {
  const [value, setValue] = React.useState('');

  return <TextInput value={value} onChange={(e) => setValue(e.target.value)} {...props} />;
};

export const ClickToInsertInput: Story = {
  args: {
    placeholder: 'https://',
    clickToInsert: true,
  },
  render: (args) => <ClickToInsertInputDemo {...args} />,
};

export const DisabledInput: Story = {
  args: {
    disabled: true,
  },
};

export const InputWithMaxLength: Story = {
  args: {
    maxLength: 40,
  },
};
