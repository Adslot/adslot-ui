import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import _ from 'lodash';

import CheckboxGroup from './index';
import SvgSymbol from '../SvgSymbol';

const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  argTypes: {
    value: { control: false },
    onChange: { control: false },
  },
  decorators: [
    (StoryInst) => {
      const [value, setValue] = React.useState([]);

      return <StoryInst value={value} setValue={setValue} />;
    },
  ],
} satisfies Meta<typeof CheckboxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    name: 'hobbies',
    value: ['badminton'],
    children: (
      <>
        <CheckboxGroup.Item value="swimming" label="Swimming" />
        <CheckboxGroup.Item value="soccer" label="Soccer" />
        <CheckboxGroup.Item value="badminton" label="Badminton" />
      </>
    ),
  },
  render: (args, { setValue, value }) => {
    return <CheckboxGroup {...args} onChange={setValue} value={value} />;
  },
};

export const Horizontal: Story = {
  args: {
    ...Default.args,
    orientation: 'horizontal',
  },
  render: (args, { setValue, value }) => {
    return <CheckboxGroup {...args} onChange={setValue} value={value} />;
  },
};

export const Box: Story = {
  args: {
    ...Default.args,
    variant: 'box',
  },
  render: (args, { setValue, value }) => {
    return <CheckboxGroup {...args} onChange={setValue} value={value} />;
  },
};

export const BoxIcons: Story = {
  render: (args) => {
    return (
      <CheckboxGroup {...args}>
        <CheckboxGroup.Item
          icon={<SvgSymbol href="svg-symbols.svg#list" />}
          value="swimming"
          label="Swimming"
          text="My favourite!"
        />
        <CheckboxGroup.Item
          icon={<SvgSymbol href="svg-symbols.svg#list" />}
          value="soccer"
          label="Soccer"
          text="My favourite!"
        />
        <CheckboxGroup.Item
          icon={<SvgSymbol href="svg-symbols.svg#list" />}
          value="badminton"
          label="Badminton"
          text="My favourite!"
        />
      </CheckboxGroup>
    );
  },
  args: {
    ...Default.args,
    variant: 'box',
  },
};

const allHobbies = { sports: ['swimming', 'soccer', 'badminton'], other: ['stamps'] };

export const NestedCheckboxes: Story = {
  args: { ...Default.args },
  render: (args) => (
    <CheckboxGroup {...args}>
      <CheckboxGroup indent>
        <CheckboxGroup.All label="Sports" values={allHobbies.sports} />
        {allHobbies.sports.map((item) => (
          <CheckboxGroup.Item key={item} value={item} label={_.capitalize(item)} />
        ))}
      </CheckboxGroup>
      <CheckboxGroup indent>
        <CheckboxGroup.All label="Other" values={allHobbies.other} />
        {allHobbies.other.map((item) => (
          <CheckboxGroup.Item key={item} value={item} label={_.capitalize(item)} />
        ))}
      </CheckboxGroup>
    </CheckboxGroup>
  ),
};
