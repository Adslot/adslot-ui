import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Statistic from '.';

afterEach(cleanup);

describe('<Statistic />', () => {
  it('should render with value and label', () => {
    const { getByTestId, queryAllByTestId } = render(<Statistic label="Views" value="2 Million" />);
    expect(getByTestId('statistic-wrapper')).toHaveClass('statistic-component');
    expect(queryAllByTestId('statistic-value')).toHaveLength(1);
    expect(getByTestId('statistic-value')).toHaveClass('statistic-component-value');
    expect(getByTestId('statistic-value')).toHaveTextContent('2 Million');

    expect(queryAllByTestId('statistic-label')).toHaveLength(1);
    expect(getByTestId('statistic-label')).toHaveClass('statistic-component-label');
    expect(getByTestId('statistic-label')).toHaveTextContent('Views');
  });

  it('should render inline', () => {
    const { getByTestId } = render(<Statistic label="Views" value="2 Million" inline />);
    expect(getByTestId('statistic-wrapper')).toHaveClass('statistic-component inline');
  });
});
