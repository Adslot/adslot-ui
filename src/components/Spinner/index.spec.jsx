import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Spinner from '.';

afterEach(cleanup);

describe('<Spinner />', () => {
  it('should render with defaults', () => {
    const { getByTestId } = render(<Spinner />);
    expect(getByTestId('spinner-wrapper')).toHaveClass('spinner-component');
    expect(getByTestId('spinner')).toHaveClass('spinner spinner-large spinner-colour-style-default');
  });

  it('should render small with primary style', () => {
    const { getByTestId } = render(<Spinner size="small" colourStyle="primary" />);
    expect(getByTestId('spinner')).toHaveClass('spinner spinner-small spinner-colour-style-primary');
  });
});
