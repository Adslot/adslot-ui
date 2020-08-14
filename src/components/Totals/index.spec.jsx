import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Totals from '.';

afterEach(cleanup);

describe('<Totals />', () => {
  it('should render with defaults', () => {
    const { getByTestId, queryAllByTestId } = render(<Totals />);
    expect(queryAllByTestId('grid-wrapper')).toHaveLength(1);
    expect(getByTestId('grid-wrapper')).not.toBeEmpty();

    expect(queryAllByTestId('grid-row-wrapper')).toHaveLength(1);
    expect(getByTestId('grid-row-wrapper')).toHaveClass('grid-component-row-short');
    expect(getByTestId('grid-row-wrapper')).toHaveClass('grid-component-row-footer');
    expect(getByTestId('grid-row-wrapper')).not.toHaveClass('grid-component-row-horizontal-border');

    expect(queryAllByTestId('grid-cell-wrapper')).toHaveLength(2);
    expect(queryAllByTestId('grid-cell-wrapper')[0]).toHaveClass('grid-component-cell-stretch');
    expect(queryAllByTestId('grid-cell-wrapper')[0]).toHaveTextContent('Total');

    expect(queryAllByTestId('grid-cell-wrapper')[1]).not.toHaveClass('grid-component-cell-stretch');
    expect(queryAllByTestId('grid-cell-wrapper')[1]).toHaveTextContent('0');
  });

  it('should render with props', () => {
    const props = {
      toSum: [
        { value: 100, isHidden: true },
        { label: 'Custom Paint for Yo Whip', value: 200000 },
        { label: 'Selected', value: 50000 },
      ],
      valueFormatter: value => `€${(value / 100).toFixed(2)}`,
    };
    const { queryAllByTestId } = render(<Totals {...props} />);
    expect(queryAllByTestId('grid-wrapper')).toHaveLength(1);

    expect(queryAllByTestId('grid-row-wrapper')).toHaveLength(3);
    expect(queryAllByTestId('grid-row-wrapper')[0]).toHaveClass('grid-component-row-short');
    expect(queryAllByTestId('grid-row-wrapper')[0]).not.toHaveClass('grid-component-row-horizontal-border');

    expect(queryAllByTestId('grid-cell-wrapper')).toHaveLength(6);
    expect(queryAllByTestId('grid-cell-wrapper')[0]).toHaveClass('grid-component-cell-stretch');
    expect(queryAllByTestId('grid-cell-wrapper')[0]).toHaveTextContent('Custom Paint for Yo Whip');
    expect(queryAllByTestId('grid-cell-wrapper')[1]).toHaveTextContent('€2000.00');

    expect(queryAllByTestId('grid-row-wrapper')[1]).toHaveClass('grid-component-row-short');
    expect(queryAllByTestId('grid-row-wrapper')[1]).not.toHaveClass('grid-component-row-horizontal-border');

    expect(queryAllByTestId('grid-cell-wrapper')[2]).toHaveClass('grid-component-cell-stretch');
    expect(queryAllByTestId('grid-cell-wrapper')[2]).toHaveTextContent('Selected');
    expect(queryAllByTestId('grid-cell-wrapper')[3]).toHaveTextContent('€500.00');

    expect(queryAllByTestId('grid-row-wrapper')[2]).toHaveClass('grid-component-row-short');
    expect(queryAllByTestId('grid-row-wrapper')[2]).not.toHaveClass('grid-component-row-horizontal-border');
    expect(queryAllByTestId('grid-row-wrapper')[2]).toHaveClass('grid-component-row-footer');

    expect(queryAllByTestId('grid-cell-wrapper')[4]).toHaveClass('grid-component-cell-stretch');
    expect(queryAllByTestId('grid-cell-wrapper')[4]).toHaveTextContent('Total');
    expect(queryAllByTestId('grid-cell-wrapper')[5]).toHaveTextContent('€2501.00');
  });
});
