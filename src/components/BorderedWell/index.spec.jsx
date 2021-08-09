import React from 'react';
import { render, cleanup } from '@testing-library/react';
import BorderedWell from '.';

afterEach(cleanup);

describe('<BorderedWell />', () => {
  it('should have its component name as default className', () => {
    const { getByTestId } = render(<BorderedWell />);
    expect(getByTestId('borderedwell-wrapper')).toHaveClass('borderedwell-component');
    expect(getByTestId('borderedwell-wrapper')).toBeEmptyDOMElement();
  });

  it('should pass through children', () => {
    const children = (
      <div data-testid="borderedwell-children" className="test-class">
        Party town
      </div>
    );
    const { getByTestId, queryByTestId } = render(<BorderedWell>{children}</BorderedWell>);
    expect(getByTestId('borderedwell-wrapper')).toHaveClass('borderedwell-component');
    expect(queryByTestId('borderedwell-wrapper')).toBeInTheDocument();
    expect(getByTestId('borderedwell-children')).toHaveClass('test-class');
    expect(getByTestId('borderedwell-children')).toHaveTextContent('Party town');
  });
});
