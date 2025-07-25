import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import RadioGroup from './index';
import Radio from '../Radio';
import SvgSymbol from '../SvgSymbol';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: { name: 'hobbies', value: 'badminton' },
  render: (args) => {
    return (
      <RadioGroup {...args}>
        <Radio value="swimming" label="Swimming" />
        <Radio value="soccer" label="Soccer" />
        <Radio value="badminton" label="Badminton" />
      </RadioGroup>
    );
  },
};

export const Horizontal: Story = {
  ...Default,
  args: {
    ...Default.args,
    orientation: 'horizontal',
  },
};

export const Box: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'box',
  },
};

export const BoxIcons: Story = {
  ...Default,
  render: (args) => {
    return (
      <RadioGroup {...args}>
        <Radio
          icon={<SvgSymbol href="svg-symbols.svg#list" />}
          value="swimming"
          label="Swimming"
          text="My favourite!"
        />
        <Radio icon={<SvgSymbol href="svg-symbols.svg#list" />} value="soccer" label="Soccer" text="My favourite!" />
        <Radio
          icon={<SvgSymbol href="svg-symbols.svg#list" />}
          value="badminton"
          label="Badminton"
          text="My favourite!"
        />
      </RadioGroup>
    );
  },
  args: {
    ...Default.args,
    variant: 'box',
  },
};
