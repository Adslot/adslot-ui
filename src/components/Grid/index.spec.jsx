import React from 'react';
import { render, screen } from 'testing';
import Grid from '.';

it('should have its component name as default className', () => {
  render(<Grid />);
  expect(screen.getByTestId('grid-wrapper')).toHaveClass('grid-component');
  expect(screen.getByTestId('grid-wrapper')).toBeEmptyDOMElement();
});

it('should pass through children', () => {
  const children = (
    <div data-testid="grid-children" className="test-class">
      Party town
    </div>
  );
  render(<Grid>{children}</Grid>);
  expect(screen.getByTestId('grid-wrapper')).toHaveClass('grid-component');
  expect(screen.getByTestId('grid-children')).toHaveClass('test-class');
  expect(screen.getByTestId('grid-children')).toHaveTextContent('Party town');
});
