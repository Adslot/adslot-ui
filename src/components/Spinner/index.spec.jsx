import React from 'react';
import { render, screen } from 'testing';
import Spinner from '.';

describe('<Spinner />', () => {
  it('should render with defaults', () => {
    render(<Spinner />);
    expect(screen.getByTestId('spinner-wrapper')).toHaveClass('spinner-component');
    expect(screen.getByTestId('spinner')).toHaveClass('spinner');
    expect(screen.getByTestId('spinner')).toHaveClass('spinner-large');
  });

  it('should render with custom className', () => {
    render(<Spinner className="custom-spinner-style" />);
    expect(screen.getByTestId('spinner-wrapper')).toHaveClass('custom-spinner-style');
  });

  it('should render different size of spinner', () => {
    const view = render(<Spinner size="small" />);
    expect(screen.getByTestId('spinner')).toHaveClass('spinner-small');

    view.rerender(<Spinner size="medium" />);
    expect(screen.getByTestId('spinner')).toHaveClass('spinner-medium');
  });
});
