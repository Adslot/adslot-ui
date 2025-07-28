import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import ButtonGroup from './index';
import Button from '../Button';
import Popover from '../Popover';
import SvgSymbol from '../SvgSymbol';

const meta = {
  title: 'Pending Review/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ color, variant, size }) => {
    return (
      <React.Fragment>
        <ButtonGroup color={color} variant={variant} size={size}>
          <Button>Approve</Button>
          <Popover triggers="click" placement="bottom" popoverContent="I am a popover on click!">
            <Button
              className="svg-icon"
              aria-label="Toggle menu"
              icon={<SvgSymbol href="svg-symbols.svg#caret-down" />}
            />
          </Popover>
        </ButtonGroup>
      </React.Fragment>
    );
  },
  args: {
    color: 'success',
    variant: 'solid',
  },
};
