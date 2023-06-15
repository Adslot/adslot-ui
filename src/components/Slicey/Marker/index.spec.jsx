import React from 'react';
import { render, screen } from 'testing';
import Marker from '.';

it('should have its component name as default className', () => {
  render(
    <svg>
      <Marker />
    </svg>
  );
  expect(screen.getByTestId('slicey-marker-wrapper')).toHaveClass('marker-component');
});

it('should draw the marker at the top of the circle when given no fraction', () => {
  render(
    <svg>
      <Marker />
    </svg>
  );
  expect(screen.getByTestId('slicey-marker-wrapper')).toHaveClass('marker-component');
  expect(screen.getByTestId('slicey-marker-wrapper')).toHaveAttribute('points', '3.061616997868383e-17,-0.5 0,0');
});

it('should draw the marker given a fraction of the circle', () => {
  const props = { fraction: 3 / 4 };
  render(
    <svg>
      <Marker {...props} />
    </svg>
  );
  expect(screen.getByTestId('slicey-marker-wrapper')).toHaveClass('marker-component');
  expect(screen.getByTestId('slicey-marker-wrapper')).toHaveAttribute('points', '-0.5,6.123233995736766e-17 0,0');
});
