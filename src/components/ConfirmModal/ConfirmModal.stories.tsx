import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import ConfirmModal from './index';
import Button from '../Button';

const meta = {
  title: 'Pending Review/ConfirmModal',
  component: ConfirmModal,
  tags: ['autodocs'],
  decorators: [
    (StoryInst) => {
      const [show, setShow] = React.useState(false);
      return <StoryInst show={show} setShow={setShow} />;
    },
  ],
} satisfies Meta<typeof ConfirmModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...args }, ctx) => {
    return (
      <>
        <ConfirmModal
          modalApply={() => ctx.setShow(false)}
          modalClose={() => ctx.setShow(false)}
          show={ctx.show}
          {...args}
        />
        <Button color="primary" onClick={() => ctx.setShow(true)}>
          Sign Off
        </Button>
      </>
    );
  },
  args: {
    children: 'Default',
  },
};
