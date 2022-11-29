import React from 'react';
import { render, screen } from 'testing';
import Statistic from '.';

describe('<Statistic />', () => {
  it('should render with value and label', () => {
    render(<Statistic label="Views" value="2 Million" />);
    expect(screen.getByTestId('statistic-wrapper')).toHaveClass('statistic-component');
    expect(screen.getByTestId('statistic-value')).toBeInTheDocument();
    expect(screen.getByTestId('statistic-value')).toHaveClass('statistic-component-value');
    expect(screen.getByTestId('statistic-value')).toHaveTextContent('2 Million');

    expect(screen.getByTestId('statistic-label')).toBeInTheDocument();
    expect(screen.getByTestId('statistic-label')).toHaveClass('statistic-component-label');
    expect(screen.getByTestId('statistic-label')).toHaveTextContent('Views');
  });

  it('should render inline', () => {
    render(<Statistic label="Views" value="2 Million" inline />);
    expect(screen.getByTestId('statistic-wrapper')).toHaveClass('statistic-component inline');
  });
});
