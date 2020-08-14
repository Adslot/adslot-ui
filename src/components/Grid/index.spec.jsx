import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Grid from '.';

afterEach(cleanup);

describe('<Grid />', () => {
  it('should have its component name as default className', () => {
    const { getByTestId } = render(<Grid />);
    expect(getByTestId('grid-wrapper')).toHaveClass('grid-component');
    expect(getByTestId('grid-wrapper')).toBeEmpty();
  });

  it('should pass through children', () => {
    const children = (
      <div data-testid="grid-children" className="test-class">
        Party town
      </div>
    );
    const { getByTestId } = render(<Grid>{children}</Grid>);
    expect(getByTestId('grid-wrapper')).toHaveClass('grid-component');
    expect(getByTestId('grid-children')).toHaveClass('test-class');
    expect(getByTestId('grid-children')).toHaveTextContent('Party town');
  });
});
