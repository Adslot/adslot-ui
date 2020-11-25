import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Skeleton from '.';

afterEach(cleanup);

describe('<Skeleton />', () => {
  it('should render with defaults', () => {
    const { getByTestId, queryAllByTestId } = render(<Skeleton />);

    expect(queryAllByTestId('skeleton-wrapper')).toHaveLength(1);
    expect(getByTestId('skeleton-wrapper')).toHaveClass('aui--skeleton');
    expect(getByTestId('skeleton-wrapper')).toHaveClass('aui--skeleton-animated');
  });

  it('should render with custom className', () => {
    const { getByTestId, queryAllByTestId } = render(<Skeleton className="custom" />);

    expect(queryAllByTestId('skeleton-wrapper')).toHaveLength(1);
    expect(getByTestId('skeleton-wrapper')).toHaveClass('aui--skeleton');
    expect(getByTestId('skeleton-wrapper')).toHaveClass('aui--skeleton-animated');
    expect(getByTestId('skeleton-wrapper')).toHaveClass('custom');
  });

  it('should render circle skeleton', () => {
    const { getByTestId, queryAllByTestId } = render(<Skeleton variant="circle" />);

    expect(queryAllByTestId('skeleton-wrapper')).toHaveLength(1);
    expect(getByTestId('skeleton-wrapper')).toHaveClass('aui--skeleton-circle');
  });

  it('should render rectangle skeleton', () => {
    const { getByTestId, queryAllByTestId } = render(<Skeleton variant="rect" width="200px" height="300px" />);

    expect(queryAllByTestId('skeleton-wrapper')).toHaveLength(1);
    expect(getByTestId('skeleton-wrapper')).toHaveClass('aui--skeleton-rect');
    expect(getByTestId('skeleton-wrapper')).toHaveAttribute('style', 'height: 300px; width: 200px;');
  });

  it('should render default skeleton if variant is given an unexpected string', () => {
    console.error = jest.fn();
    const { getByTestId, queryAllByTestId } = render(<Skeleton variant="square" />);

    expect(queryAllByTestId('skeleton-wrapper')).toHaveLength(1);
    expect(getByTestId('skeleton-wrapper')).not.toHaveClass('aui--skeleton-square');
  });
});
