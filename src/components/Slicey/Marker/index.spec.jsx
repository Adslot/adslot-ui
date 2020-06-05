import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Marker from '.';

afterEach(cleanup);

describe('<Marker />', () => {
  it('should have its component name as default className', () => {
    const { getByTestId } = render(
      <svg>
        <Marker />
      </svg>
    );
    expect(getByTestId('slicey-marker-wrapper')).toHaveClass('marker-component');
  });

  it('should draw the marker at the top of the circle when given no fraction', () => {
    const { getByTestId } = render(
      <svg>
        <Marker />
      </svg>
    );
    expect(getByTestId('slicey-marker-wrapper')).toHaveClass('marker-component');
    expect(getByTestId('slicey-marker-wrapper')).toHaveAttribute('points', '3.061616997868383e-17,-0.5 0,0');
  });

  it('should draw the marker given a fraction of the circle', () => {
    const props = { fraction: 3 / 4 };
    const { getByTestId } = render(
      <svg>
        <Marker {...props} />
      </svg>
    );
    expect(getByTestId('slicey-marker-wrapper')).toHaveClass('marker-component');
    expect(getByTestId('slicey-marker-wrapper')).toHaveAttribute('points', '-0.5,6.123233995736766e-17 0,0');
  });
});
