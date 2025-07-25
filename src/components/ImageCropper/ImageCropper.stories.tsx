import type { Meta, StoryObj } from '@storybook/react-vite';

import ImageCropper from './index';

const meta = {
  title: 'Pending Review/ImageCropper',
  component: ImageCropper,
  tags: ['autodocs'],
} satisfies Meta<typeof ImageCropper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'tileGrid/example-image.jpg',
    height: 400,
    onCancel: () => {},
  },
};
