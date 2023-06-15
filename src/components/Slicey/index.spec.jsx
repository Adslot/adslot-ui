import React from 'react';
import { render, screen } from 'testing';
import Slicey from '.';

const dataset = [
  { label: 'positive', value: 5 },
  { label: 'negative', value: 3 },
];

it('should render an empty state', () => {
  render(<Slicey />);
  expect(screen.getByTestId('slicey-wrapper')).toHaveClass('slicey-component');
  expect(screen.getByTestId('slicey-wrapper')).toHaveAttribute('height', '100');
  expect(screen.getByTestId('slicey-wrapper')).toHaveAttribute('width', '100');
  expect(screen.getByTestId('slicey-wrapper')).toHaveAttribute('viewBox', '-0.5 -0.5 1 1');

  expect(screen.getByTestId('slicey-circle')).toHaveClass('slicey-empty');
  expect(screen.getByTestId('slicey-circle')).not.toHaveClass('slicey-background');

  expect(screen.queryByTestId('slicey-arc-wrapper')).not.toBeInTheDocument();
  expect(screen.queryByTestId('slicey-marker-wrapper')).not.toBeInTheDocument();
  expect(screen.queryByTestId('slicey-donut-wrapper')).not.toBeInTheDocument();
});

it('should render a given dataset', () => {
  const props = { dataset };
  render(<Slicey {...props} />);
  expect(screen.getByTestId('slicey-wrapper')).toHaveClass('slicey-component');
  expect(screen.getByTestId('slicey-wrapper')).toHaveAttribute('height', '100');
  expect(screen.getByTestId('slicey-wrapper')).toHaveAttribute('width', '100');
  expect(screen.getByTestId('slicey-wrapper')).toHaveAttribute('viewBox', '-0.5 -0.5 1 1');

  expect(screen.getByTestId('slicey-circle')).toBeInTheDocument();
  expect(screen.getByTestId('slicey-circle')).not.toHaveClass('slicey-empty');
  expect(screen.getByTestId('slicey-circle')).toHaveClass('slicey-background');

  expect(screen.getAllByTestId('slicey-arc-wrapper')).toHaveLength(2);
  expect(screen.queryByTestId('slicey-marker-wrapper')).not.toBeInTheDocument();
  expect(screen.queryByTestId('slicey-donut-wrapper')).not.toBeInTheDocument();
});

it('should render a circle if there is only one arc to draw', () => {
  const props = { dataset: [{ label: 'positive', value: 5 }] };
  render(<Slicey {...props} />);
  expect(screen.getByTestId('slicey-wrapper')).toHaveClass('slicey-component');
  expect(screen.getByTestId('slicey-wrapper')).toHaveAttribute('height', '100');
  expect(screen.getByTestId('slicey-wrapper')).toHaveAttribute('width', '100');
  expect(screen.getByTestId('slicey-wrapper')).toHaveAttribute('viewBox', '-0.5 -0.5 1 1');

  expect(screen.getAllByTestId('slicey-circle')).toHaveLength(2);
  expect(screen.getAllByTestId('slicey-circle')[1]).toHaveClass('arc-component positive');
  expect(screen.getAllByTestId('slicey-circle')[0]).not.toHaveClass('slicey-empty');
  expect(screen.getAllByTestId('slicey-circle')[0]).toHaveClass('slicey-background');

  expect(screen.queryByTestId('slicey-arc-wrapper')).not.toBeInTheDocument();
  expect(screen.queryByTestId('slicey-marker-wrapper')).not.toBeInTheDocument();
  expect(screen.queryByTestId('slicey-donut-wrapper')).not.toBeInTheDocument();
});

it('should render a marker on a donut with a custom diameter', () => {
  const props = {
    dataset,
    marker: 0.5,
    donut: true,
    diameter: 50,
  };
  render(<Slicey {...props} />);

  expect(screen.getByTestId('slicey-wrapper')).toHaveClass('slicey-component');
  expect(screen.getByTestId('slicey-wrapper')).toHaveAttribute('height', '50');
  expect(screen.getByTestId('slicey-wrapper')).toHaveAttribute('width', '50');
  expect(screen.getByTestId('slicey-wrapper')).toHaveAttribute('viewBox', '-0.5 -0.5 1 1');

  expect(screen.getByTestId('slicey-circle')).toBeInTheDocument();
  expect(screen.getByTestId('slicey-circle')).not.toHaveClass('slicey-empty');
  expect(screen.getByTestId('slicey-circle')).toHaveClass('slicey-background');

  expect(screen.getAllByTestId('slicey-arc-wrapper')).toHaveLength(2);

  expect(screen.getByTestId('slicey-marker-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('slicey-marker-wrapper')).toHaveAttribute('points', '3.061616997868383e-17,0.5 0,0');

  expect(screen.getByTestId('slicey-donut-wrapper')).toBeInTheDocument();
});
