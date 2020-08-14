import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Slicey from '.';

afterEach(cleanup);

describe('<Slicey />', () => {
  const dataset = [{ label: 'positive', value: 5 }, { label: 'negative', value: 3 }];

  it('should render an empty state', () => {
    const { getByTestId, queryAllByTestId } = render(<Slicey />);
    expect(getByTestId('slicey-wrapper')).toHaveClass('slicey-component');
    expect(getByTestId('slicey-wrapper')).toHaveAttribute('height', '100');
    expect(getByTestId('slicey-wrapper')).toHaveAttribute('width', '100');
    expect(getByTestId('slicey-wrapper')).toHaveAttribute('viewBox', '-0.5 -0.5 1 1');

    expect(getByTestId('slicey-circle')).toHaveClass('slicey-empty');
    expect(getByTestId('slicey-circle')).not.toHaveClass('slicey-background');

    expect(queryAllByTestId('slicey-arc-wrapper')).toHaveLength(0);
    expect(queryAllByTestId('slicey-marker-wrapper')).toHaveLength(0);
    expect(queryAllByTestId('slicey-donut-wrapper')).toHaveLength(0);
  });

  it('should render a given dataset', () => {
    const props = { dataset };
    const { getByTestId, queryAllByTestId } = render(<Slicey {...props} />);
    expect(getByTestId('slicey-wrapper')).toHaveClass('slicey-component');
    expect(getByTestId('slicey-wrapper')).toHaveAttribute('height', '100');
    expect(getByTestId('slicey-wrapper')).toHaveAttribute('width', '100');
    expect(getByTestId('slicey-wrapper')).toHaveAttribute('viewBox', '-0.5 -0.5 1 1');

    expect(queryAllByTestId('slicey-circle')).toHaveLength(1);
    expect(getByTestId('slicey-circle')).not.toHaveClass('slicey-empty');
    expect(getByTestId('slicey-circle')).toHaveClass('slicey-background');

    expect(queryAllByTestId('slicey-arc-wrapper')).toHaveLength(2);
    expect(queryAllByTestId('slicey-marker-wrapper')).toHaveLength(0);
    expect(queryAllByTestId('slicey-donut-wrapper')).toHaveLength(0);
  });

  it('should render a circle if there is only one arc to draw', () => {
    const props = { dataset: [{ label: 'positive', value: 5 }] };
    const { getByTestId, queryAllByTestId } = render(<Slicey {...props} />);
    expect(getByTestId('slicey-wrapper')).toHaveClass('slicey-component');
    expect(getByTestId('slicey-wrapper')).toHaveAttribute('height', '100');
    expect(getByTestId('slicey-wrapper')).toHaveAttribute('width', '100');
    expect(getByTestId('slicey-wrapper')).toHaveAttribute('viewBox', '-0.5 -0.5 1 1');

    expect(queryAllByTestId('slicey-circle')).toHaveLength(2);
    expect(queryAllByTestId('slicey-circle')[1]).toHaveClass('arc-component positive');
    expect(queryAllByTestId('slicey-circle')[0]).not.toHaveClass('slicey-empty');
    expect(queryAllByTestId('slicey-circle')[0]).toHaveClass('slicey-background');

    expect(queryAllByTestId('slicey-arc-wrapper')).toHaveLength(0);
    expect(queryAllByTestId('slicey-marker-wrapper')).toHaveLength(0);
    expect(queryAllByTestId('slicey-donut-wrapper')).toHaveLength(0);
  });

  it('should render a marker on a donut with a custom diameter', () => {
    const props = {
      dataset,
      marker: 0.5,
      donut: true,
      diameter: 50,
    };
    const { getByTestId, queryAllByTestId } = render(<Slicey {...props} />);

    expect(getByTestId('slicey-wrapper')).toHaveClass('slicey-component');
    expect(getByTestId('slicey-wrapper')).toHaveAttribute('height', '50');
    expect(getByTestId('slicey-wrapper')).toHaveAttribute('width', '50');
    expect(getByTestId('slicey-wrapper')).toHaveAttribute('viewBox', '-0.5 -0.5 1 1');

    expect(queryAllByTestId('slicey-circle')).toHaveLength(1);
    expect(getByTestId('slicey-circle')).not.toHaveClass('slicey-empty');
    expect(getByTestId('slicey-circle')).toHaveClass('slicey-background');

    expect(queryAllByTestId('slicey-arc-wrapper')).toHaveLength(2);

    expect(queryAllByTestId('slicey-marker-wrapper')).toHaveLength(1);
    expect(getByTestId('slicey-marker-wrapper')).toHaveAttribute('points', '3.061616997868383e-17,0.5 0,0');

    expect(queryAllByTestId('slicey-donut-wrapper')).toHaveLength(1);
  });
});
