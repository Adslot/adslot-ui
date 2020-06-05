import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Donut from '.';

afterEach(cleanup);

describe('<Donut />', () => {
  it('should have its component name as default className', () => {
    const { getByTestId } = render(
      <svg>
        <Donut />
      </svg>
    );
    expect(getByTestId('slicey-donut-wrapper')).toHaveClass('donut-component');
  });

  it('should have a radius of .45 of the unit circle and an origin of 0,0', () => {
    const { getByTestId } = render(
      <svg>
        <Donut />
      </svg>
    );
    expect(getByTestId('slicey-donut-wrapper')).toHaveAttribute('r', '.45');
    expect(getByTestId('slicey-donut-wrapper')).toHaveAttribute('cx', '0');
    expect(getByTestId('slicey-donut-wrapper')).toHaveAttribute('cy', '0');
  });
});
