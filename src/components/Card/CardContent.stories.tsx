import type { Meta, StoryObj } from '@storybook/react';

import Card from './index';

const meta = {
  title: 'Pending Review/Card/Card.Content',
  component: Card.Content,
  tags: ['autodocs'],
} satisfies Meta<typeof Card.Content>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fill: false,
    stretch: false,
    append: false,
    children: `Eu anim labore dolore quis Lorem labore. Cupidatat sunt consequat sint ex in eu ea elit. Ut excepteur consequat
    sit tempor sit. Officia ut nisi labore velit qui amet irure. Exercitation deserunt ea pariatur sunt labore dolore
    eiusmod ut deserunt. Ipsum ut tempor adipisicing quis do do Lorem.Fugiat esse do veniam ea nulla est commodo quis.
    Est nisi Lorem ipsum sunt aliqua commodo. Aliqua exercitation excepteur aute ex dolor proident in sint culpa
    voluptate ullamco. Ex proident exercitation ipsum irure aliquip aliqua id sit et. Fugiat voluptate mollit
    excepteur tempor.`,
  },
};
