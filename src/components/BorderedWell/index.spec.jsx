import React from 'react';
import { render, cleanup } from '@testing-library/react';
import BorderedWell from '.';

afterEach(cleanup);

describe('<BorderedWell />', () => {
  it('should have its component name as default className', () => {
    const { getByTestId } = render(<BorderedWell />);
    expect(getByTestId('borderedwell-wrapper')).toHaveClass('borderedwell-component');
    expect(getByTestId('borderedwell-wrapper')).toBeEmpty();
  });

  it('should pass through children', () => {
    const children = (
      <div data-testid="borderedwell-children" className="test-class">
        Party town
      </div>
    );
    const { getByTestId, queryAllByTestId } = render(<BorderedWell>{children}</BorderedWell>);
    expect(getByTestId('borderedwell-wrapper')).toHaveClass('borderedwell-component');
    expect(queryAllByTestId('borderedwell-wrapper')).toHaveLength(1);
    expect(getByTestId('borderedwell-children')).toHaveClass('test-class');
    expect(getByTestId('borderedwell-children')).toHaveTextContent('Party town');
  });
});
