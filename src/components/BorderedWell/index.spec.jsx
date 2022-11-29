import React from 'react';
import { render, screen } from 'testing';
import BorderedWell from '.';

describe('<BorderedWell />', () => {
  it('should have its component name as default className', () => {
    render(<BorderedWell />);
    expect(screen.getByTestId('borderedwell-wrapper')).toHaveClass('borderedwell-component');
    expect(screen.getByTestId('borderedwell-wrapper')).toBeEmptyDOMElement();
  });

  it('should pass through children', () => {
    const children = (
      <div data-testid="borderedwell-children" className="test-class">
        Party town
      </div>
    );
    render(<BorderedWell>{children}</BorderedWell>);
    expect(screen.getByTestId('borderedwell-wrapper')).toHaveClass('borderedwell-component');
    expect(screen.getByTestId('borderedwell-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('borderedwell-children')).toHaveClass('test-class');
    expect(screen.getByTestId('borderedwell-children')).toHaveTextContent('Party town');
  });
});
