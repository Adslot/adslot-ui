import React from 'react';
import { render, screen } from 'testing';
import Arc from '.';

describe('<Arc />', () => {
  it('should have its component name as default className', () => {
    render(
      <svg>
        <Arc />
      </svg>
    );
    expect(screen.getByTestId('slicey-arc-wrapper')).toHaveClass('arc-component');
  });

  it('should render an arc for given data', () => {
    const props = {
      data: {
        label: 'Something Great',
        id: 0,
        largeArcFlag: 0,
        x1: 3.06,
        y1: -0.5,
        x2: 0.14,
        y2: 0.47,
      },
    };
    render(
      <svg>
        <Arc {...props} />
      </svg>
    );
    expect(screen.getByTestId('slicey-arc-wrapper')).toHaveClass('arc-component something-great');
    expect(screen.getByTestId('slicey-arc-wrapper')).toHaveAttribute('d', 'M0,0 L3.06,-0.5 A0.5,0.5 0 0,1 0.14,0.47 z');
  });
});
