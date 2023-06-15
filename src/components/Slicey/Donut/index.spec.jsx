import React from 'react';
import { render, screen } from 'testing';
import Donut from '.';

it('should have its component name as default className', () => {
  render(
    <svg>
      <Donut />
    </svg>
  );
  expect(screen.getByTestId('slicey-donut-wrapper')).toHaveClass('donut-component');
});

it('should have a radius of .45 of the unit circle and an origin of 0,0', () => {
  render(
    <svg>
      <Donut />
    </svg>
  );
  expect(screen.getByTestId('slicey-donut-wrapper')).toHaveAttribute('r', '.45');
  expect(screen.getByTestId('slicey-donut-wrapper')).toHaveAttribute('cx', '0');
  expect(screen.getByTestId('slicey-donut-wrapper')).toHaveAttribute('cy', '0');
});
