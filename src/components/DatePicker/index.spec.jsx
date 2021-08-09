import React from 'react';
import moment from 'moment';
import { render, cleanup, fireEvent, queryByAttribute } from '@testing-library/react';
import DatePicker from '.';

afterEach(cleanup);

const getByClass = queryByAttribute.bind(null, 'class');

describe('<DatePicker />', () => {
  it('should render with defaults', () => {
    const { getByTestId } = render(<DatePicker className="test" dts="test" />);

    expect(getByTestId('date-picker-wrapper')).toHaveClass('aui--date-picker');
    expect(getByTestId('date-picker-wrapper')).toHaveAttribute('data-test-selector', 'test');
    expect(getByTestId('date-picker-wrapper')).not.toBeEmptyDOMElement();
  });

  it('should handle input change', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DatePicker
        className="test"
        dateFormat="DD MMM YYYY"
        onChange={onChange}
        selected={moment('11 Oct 2020', 'DD MMM YYYY')}
        dts="test"
        disableInlineEditing={false}
      />
    );

    const datePickerInput = getByClass(container, 'test');

    fireEvent.change(datePickerInput, { target: { value: '11 Oct 2021' } });
    expect(datePickerInput).toHaveValue('11 Oct 2021');
  });

  it('should prevent inline editing when `disableInlineEditing`', () => {
    const onChange = jest.fn();
    const { container } = render(
      <DatePicker
        className="test"
        dateFormat="DD MMM YYYY"
        onChange={onChange}
        selected={moment('11 Oct 2020', 'DD MMM YYYY')}
        dts="test"
        disableInlineEditing
      />
    );

    const datePickerInput = getByClass(container, 'test');

    fireEvent.change(datePickerInput, { target: { value: '11 Oct 2021' } });
    expect(datePickerInput).toHaveValue('11 Oct 2020');
  });
});
