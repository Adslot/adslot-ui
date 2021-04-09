import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Spinner from '.';

afterEach(cleanup);

describe('<Spinner />', () => {
  it('should render with defaults', () => {
    const { getByTestId } = render(<Spinner />);
    expect(getByTestId('spinner-wrapper')).toHaveClass('spinner-component');
    expect(getByTestId('spinner')).toHaveClass('spinner');
    expect(getByTestId('spinner')).toHaveClass('spinner-large');
  });

  it('should render with custom className', () => {
    const { getByTestId } = render(<Spinner className="custom-spinner-style" />);
    expect(getByTestId('spinner-wrapper')).toHaveClass('custom-spinner-style');
  });

  it('should render different size of spinner', () => {
    const { getByTestId, rerender } = render(<Spinner size="small" />);
    expect(getByTestId('spinner')).toHaveClass('spinner-small');

    rerender(<Spinner size="medium" />);
    expect(getByTestId('spinner')).toHaveClass('spinner-medium');
  });
});
