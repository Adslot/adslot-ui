import type { Meta, StoryObj } from '@storybook/react-vite';

import InformationBox from './index';

const meta = {
  title: 'Pending Review/InformationBox',
  component: InformationBox,
  tags: ['autodocs'],
} satisfies Meta<typeof InformationBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'This is an information',
    children: 'Content body.',
  },
};
