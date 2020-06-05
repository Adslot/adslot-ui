import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Switch from '.';

afterEach(cleanup);

describe('<Switch />', () => {
  it('should correctly render defaults', () => {
    const { getByTestId, queryAllByTestId } = render(<Switch />);

    expect(queryAllByTestId('switch-checkbox')).toHaveLength(1);
    expect(getByTestId('switch-checkbox')).not.toBeChecked();
    expect(getByTestId('switch-checkbox')).toHaveAttribute('data-test-selector', 'switch-component');
  });

  it('should correctly render controlled Switch', () => {
    const { getByTestId, queryAllByTestId } = render(<Switch checked onChange={jest.fn()} />);
    expect(queryAllByTestId('switch-checkbox')).toHaveLength(1);
    expect(getByTestId('switch-checkbox')).toBeChecked();
  });

  it('should throw warning if checked is provided without onChange', () => {
    console.warn = jest.fn();
    render(<Switch checked />);

    expect(console.warn).toHaveBeenCalledWith(
      'Failed prop type: You have provided a `checked` prop to Switch Component without an `onChange` handler. This will render a read-only field.'
    );
  });

  it('should throw warning if both defaultChecked and checked are provided', () => {
    console.warn = jest.fn();

    render(<Switch defaultChecked checked onChange={jest.fn()} />);

    expect(console.warn).toHaveBeenCalledWith(
      'Failed prop type: Contains an input of type checkbox with both `checked` and `defaultChecked` props. Input elements must be either controlled or uncontrolled'
    );
  });

  it('should correctly call onChange for controlled Switch', () => {
    const onChange = jest.fn();
    const { getByTestId, queryAllByTestId } = render(<Switch checked onChange={onChange} />);
    expect(queryAllByTestId('switch-checkbox')).toHaveLength(1);
    expect(getByTestId('switch-checkbox')).toBeChecked();

    fireEvent.click(getByTestId('switch-checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should correctly change switch checked for uncontrolled Switch', () => {
    const { getByTestId, queryAllByTestId } = render(<Switch defaultChecked={false} />);

    expect(queryAllByTestId('switch-checkbox')).toHaveLength(1);
    expect(getByTestId('switch-checkbox')).not.toBeChecked();

    fireEvent.change(getByTestId('switch-checkbox'), { target: { checked: true } });
    expect(getByTestId('switch-checkbox')).toBeChecked();
  });

  it('should correctly apply className', () => {
    const { getByTestId, queryAllByTestId } = render(<Switch className="some-class" />);

    expect(queryAllByTestId('switch-checkbox')).toHaveLength(1);
    expect(getByTestId('switch-checkbox')).toHaveClass('some-class');
  });
});
