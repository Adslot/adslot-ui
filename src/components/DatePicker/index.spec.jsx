import React from 'react';
import { render, cleanup } from '@testing-library/react';
import DatePicker from '.';

afterEach(cleanup);

describe('<DatePicker />', () => {
  it('should render with defaults', () => {
    const { getByTestId } = render(<DatePicker className="test" dts="test" />);
    expect(getByTestId('date-picker-wrapper')).toHaveClass('aui--date-picker');
    expect(getByTestId('date-picker-wrapper')).toHaveAttribute('data-test-selector', 'test');
    expect(getByTestId('date-picker-wrapper')).not.toBeEmpty();
  });
});
