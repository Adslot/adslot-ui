import React from 'react';
import { render, screen } from 'testing';
import FlexibleSpacer from '.';

describe('<FlexibleSpacer />', () => {
  it('should have its component name as className', () => {
    render(<FlexibleSpacer />);
    expect(screen.getByTestId('flexible-spacer-wrapper')).toHaveClass('flexible-spacer-component');
  });
});
