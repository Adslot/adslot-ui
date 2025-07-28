import type { Meta, StoryObj } from '@storybook/react-vite';

import SvgSymbol from './index';

const meta = {
  title: 'Pending Review/SvgSymbol',
  component: SvgSymbol,
  tags: ['autodocs'],
} satisfies Meta<typeof SvgSymbol>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: 'svg-symbols.svg#calendar',
  },
};
