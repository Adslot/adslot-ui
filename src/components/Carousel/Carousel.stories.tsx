import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Carousel from './index';

const meta = {
  title: 'Pending Review/Carousel',
  component: Carousel,
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    children: Array.from(Array(4).keys()).map((_, i) => (
      <div key={i}>
        <div style={{ marginRight: 10, marginLeft: 10 }}>
          <img
            src={`/carousel/carousel-${i + 1}.jpg`}
            alt={`Slide ${i + 1}`}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
    )),
    slidesToShow: 2,
    variableWidth: false,
  },
  decorators: [(StoryIns) => <div style={{ display: 'block', maxWidth: 680 }}>{StoryIns()}</div>],
};

export const usePreventSwipeClicks = {
  render: function Render(args) {
    const handlers = Carousel.usePreventSwipeClicks();
    const onClick = () => alert('slide clicked');
    return (
      <Carousel {...args}>
        {Array.from(Array(4).keys()).map((_, i) => (
          <div key={i} {...handlers} onClick={onClick}>
            <div style={{ marginRight: 10, marginLeft: 10 }}>
              <img
                src={`/carousel/carousel-${i + 1}.jpg`}
                alt={`Slide ${i + 1}`}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        ))}
      </Carousel>
    );
  },
  args: {
    slidesToShow: 2,
    variableWidth: false,
  },
  decorators: [(StoryIns) => <div style={{ display: 'block', maxWidth: 680 }}>{StoryIns()}</div>],
};
