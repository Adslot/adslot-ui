import React from 'react';
import { render, screen } from 'testing';
import Skeleton from '.';

describe('<Skeleton />', () => {
  it('should render with defaults', () => {
    render(<Skeleton />);

    expect(screen.getByTestId('skeleton-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-wrapper')).toHaveClass('aui--skeleton');
    expect(screen.getByTestId('skeleton-wrapper')).toHaveClass('aui--skeleton-animated');
  });

  it('should render with custom className', () => {
    render(<Skeleton className="custom" />);

    expect(screen.getByTestId('skeleton-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-wrapper')).toHaveClass('aui--skeleton');
    expect(screen.getByTestId('skeleton-wrapper')).toHaveClass('aui--skeleton-animated');
    expect(screen.getByTestId('skeleton-wrapper')).toHaveClass('custom');
  });

  it('should render circle skeleton', () => {
    render(<Skeleton variant="circle" />);

    expect(screen.getByTestId('skeleton-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-wrapper')).toHaveClass('aui--skeleton-circle');
  });

  it('should render rectangle skeleton', () => {
    render(<Skeleton variant="rect" width="200px" height="300px" />);

    expect(screen.getByTestId('skeleton-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-wrapper')).toHaveClass('aui--skeleton-rect');
    expect(screen.getByTestId('skeleton-wrapper')).toHaveStyle('height: 300px; width: 200px;');
  });

  it('should render default skeleton if variant is given an unexpected string', () => {
    jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    render(<Skeleton variant="square" />);

    expect(screen.getByTestId('skeleton-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-wrapper')).not.toHaveClass('aui--skeleton-square');
  });
});
