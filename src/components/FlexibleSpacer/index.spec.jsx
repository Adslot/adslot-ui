import React from 'react';
import { render, cleanup } from '@testing-library/react';
import FlexibleSpacer from '.';

afterEach(cleanup);

describe('<FlexibleSpacer />', () => {
  it('should have its component name as className', () => {
    const { getByTestId } = render(<FlexibleSpacer />);
    expect(getByTestId('flexible-spacer-wrapper')).toHaveClass('flexible-spacer-component');
  });
});
