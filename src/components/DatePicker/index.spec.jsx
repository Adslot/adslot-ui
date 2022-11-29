import React from 'react';
import moment from 'moment';
import { render, screen, user } from 'testing';
import DatePicker from '.';

describe('<DatePicker />', () => {
  it('should render with defaults', () => {
    render(<DatePicker className="test" dts="test" />);

    expect(screen.getByTestId('date-picker-wrapper')).toHaveClass('aui--date-picker');
    expect(screen.getByTestId('date-picker-wrapper')).toHaveAttribute('data-test-selector', 'test');
    expect(screen.getByTestId('date-picker-wrapper')).not.toBeEmptyDOMElement();
  });

  it('should handle input change', async () => {
    const onChange = jest.fn();
    render(
      <DatePicker
        className="test"
        dateFormat="DD MMM YYYY"
        onChange={onChange}
        dts="test"
        disableInlineEditing={false}
      />
    );

    const datePickerInput = screen.getByClass('test');

    await user.click(datePickerInput);
    await user.keyboard('11 Oct 2021');
    expect(datePickerInput).toHaveValue('11 Oct 2021');
  });

  it('should prevent inline editing when `disableInlineEditing`', async () => {
    const onChange = jest.fn();
    render(
      <DatePicker
        className="test"
        dateFormat="DD MMM YYYY"
        onChange={onChange}
        selected={moment('11 Oct 2020', 'DD MMM YYYY')}
        dts="test"
        disableInlineEditing
      />
    );

    const datePickerInput = screen.getByClass('test');
    await user.click(datePickerInput);
    await user.keyboard('11 Oct 2021');

    expect(datePickerInput).toHaveValue('11 Oct 2020');
  });

  it('should support Date object value', async () => {
    const onChange = jest.fn();
    render(
      <DatePicker
        className="test"
        dateFormat="DD MMM YYYY"
        onChange={onChange}
        selected={new Date('2020-10-11')}
        dts="test"
      />
    );
    expect(screen.getByClass('test')).toHaveValue('11 Oct 2020');
  });

  it('should disable momentjs format', async () => {
    const onChange = jest.fn();
    render(<DatePicker className="test" dateFormat="dd MMM yyyy" onChange={onChange} dts="test" disableMomentFormat />);

    const datePickerInput = screen.getByClass('test');
    await user.click(datePickerInput);
    await user.keyboard('12 Oct 2020');
    expect(datePickerInput).toHaveValue('12 Oct 2020');
  });
});
