import React from 'react';
import { render, screen } from 'testing';
import Totals from '.';

it('should render with defaults', () => {
  render(<Totals />);
  expect(screen.getByTestId('grid-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('grid-wrapper')).not.toBeEmptyDOMElement();

  expect(screen.getByTestId('grid-row-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('grid-row-wrapper')).toHaveClass('grid-component-row-short');
  expect(screen.getByTestId('grid-row-wrapper')).toHaveClass('grid-component-row-footer');
  expect(screen.getByTestId('grid-row-wrapper')).not.toHaveClass('grid-component-row-horizontal-border');

  expect(screen.getAllByTestId('grid-cell-wrapper')).toHaveLength(2);
  expect(screen.getAllByTestId('grid-cell-wrapper')[0]).toHaveClass('grid-component-cell-stretch');
  expect(screen.getAllByTestId('grid-cell-wrapper')[0]).toHaveTextContent('Total');

  expect(screen.getAllByTestId('grid-cell-wrapper')[1]).not.toHaveClass('grid-component-cell-stretch');
  expect(screen.getAllByTestId('grid-cell-wrapper')[1]).toHaveTextContent('0');
});

it('should render with props', () => {
  const props = {
    toSum: [
      { value: 100, isHidden: true },
      { label: 'Custom Paint for Yo Whip', value: 200000 },
      { label: 'Selected', value: 50000 },
    ],
    valueFormatter: (value) => `€${(value / 100).toFixed(2)}`,
  };
  render(<Totals {...props} />);
  expect(screen.getByTestId('grid-wrapper')).toBeInTheDocument();

  expect(screen.getAllByTestId('grid-row-wrapper')).toHaveLength(3);
  expect(screen.getAllByTestId('grid-row-wrapper')[0]).toHaveClass('grid-component-row-short');
  expect(screen.getAllByTestId('grid-row-wrapper')[0]).not.toHaveClass('grid-component-row-horizontal-border');

  expect(screen.getAllByTestId('grid-cell-wrapper')).toHaveLength(6);
  expect(screen.getAllByTestId('grid-cell-wrapper')[0]).toHaveClass('grid-component-cell-stretch');
  expect(screen.getAllByTestId('grid-cell-wrapper')[0]).toHaveTextContent('Custom Paint for Yo Whip');
  expect(screen.getAllByTestId('grid-cell-wrapper')[1]).toHaveTextContent('€2000.00');

  expect(screen.getAllByTestId('grid-row-wrapper')[1]).toHaveClass('grid-component-row-short');
  expect(screen.getAllByTestId('grid-row-wrapper')[1]).not.toHaveClass('grid-component-row-horizontal-border');

  expect(screen.getAllByTestId('grid-cell-wrapper')[2]).toHaveClass('grid-component-cell-stretch');
  expect(screen.getAllByTestId('grid-cell-wrapper')[2]).toHaveTextContent('Selected');
  expect(screen.getAllByTestId('grid-cell-wrapper')[3]).toHaveTextContent('€500.00');

  expect(screen.getAllByTestId('grid-row-wrapper')[2]).toHaveClass('grid-component-row-short');
  expect(screen.getAllByTestId('grid-row-wrapper')[2]).not.toHaveClass('grid-component-row-horizontal-border');
  expect(screen.getAllByTestId('grid-row-wrapper')[2]).toHaveClass('grid-component-row-footer');

  expect(screen.getAllByTestId('grid-cell-wrapper')[4]).toHaveClass('grid-component-cell-stretch');
  expect(screen.getAllByTestId('grid-cell-wrapper')[4]).toHaveTextContent('Total');
  expect(screen.getAllByTestId('grid-cell-wrapper')[5]).toHaveTextContent('€2501.00');
});
