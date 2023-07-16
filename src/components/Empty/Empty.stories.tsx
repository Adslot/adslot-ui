import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Empty from './index';
import SvgSymbol from '../SvgSymbol';

const meta = {
  title: 'Pending Review/Empty',
  component: Empty,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ height: 260 }}>{Story()}</div>],
} satisfies Meta<typeof Empty>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    collection: [],
    text: 'No items selected',
    icon: <SvgSymbol classSuffixes={['gray-darker', '70']} href="/svg-symbols.svg#checklist-incomplete" isCircle />,
  },
};
