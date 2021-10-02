import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Skeleton from '.';

afterEach(cleanup);

describe('<Skeleton />', () => {
  it('should render with defaults', () => {
    const { getByTestId, queryByTestId } = render(<Skeleton />);

    expect(queryByTestId('skeleton-wrapper')).toBeInTheDocument();
    expect(getByTestId('skeleton-wrapper')).toHaveClass('aui--skeleton');
    expect(getByTestId('skeleton-wrapper')).toHaveClass('aui--skeleton-animated');
  });

  it('should render with custom className', () => {
    const { getByTestId, queryByTestId } = render(<Skeleton className="custom" />);

    expect(queryByTestId('skeleton-wrapper')).toBeInTheDocument();
    expect(getByTestId('skeleton-wrapper')).toHaveClass('aui--skeleton');
    expect(getByTestId('skeleton-wrapper')).toHaveClass('aui--skeleton-animated');
    expect(getByTestId('skeleton-wrapper')).toHaveClass('custom');
  });

  it('should render circle skeleton', () => {
    const { getByTestId, queryByTestId } = render(<Skeleton variant="circle" />);

    expect(queryByTestId('skeleton-wrapper')).toBeInTheDocument();
    expect(getByTestId('skeleton-wrapper')).toHaveClass('aui--skeleton-circle');
  });

  it('should render rectangle skeleton', () => {
    const { getByTestId, queryByTestId } = render(<Skeleton variant="rect" width="200px" height="300px" />);

    expect(queryByTestId('skeleton-wrapper')).toBeInTheDocument();
    expect(getByTestId('skeleton-wrapper')).toHaveClass('aui--skeleton-rect');
    expect(getByTestId('skeleton-wrapper')).toHaveStyle('height: 300px; width: 200px;');
  });

  it('should render default skeleton if variant is given an unexpected string', () => {
    jest.spyOn(console, 'error');
    console.error.mockImplementation((error) => error); //Prop type warning for the prop variant, should be one of ['rect','circle','text']
    const { getByTestId, queryByTestId } = render(<Skeleton variant="square" />);

    expect(queryByTestId('skeleton-wrapper')).toBeInTheDocument();
    expect(getByTestId('skeleton-wrapper')).not.toHaveClass('aui--skeleton-square');

    console.error.mockRestore();
  });
});
