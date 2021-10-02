import React from 'react';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import Switch from '.';

afterEach(cleanup);

describe('<Switch />', () => {
  it('should correctly render defaults', () => {
    const { getByTestId, queryByTestId } = render(<Switch />);

    expect(queryByTestId('switch-checkbox')).toBeInTheDocument();
    expect(getByTestId('switch-checkbox')).not.toBeChecked();
    expect(getByTestId('switch-checkbox')).toHaveAttribute('data-test-selector', 'switch-component');
  });

  it('should correctly render controlled Switch', () => {
    const { getByTestId, queryByTestId } = render(<Switch checked onChange={jest.fn()} />);
    expect(queryByTestId('switch-checkbox')).toBeInTheDocument();
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
    const { getByTestId, queryByTestId } = render(<Switch checked onChange={onChange} />);
    expect(queryByTestId('switch-checkbox')).toBeInTheDocument();
    expect(getByTestId('switch-checkbox')).toBeChecked();

    fireEvent.click(getByTestId('switch-checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should correctly change switch checked for uncontrolled Switch', () => {
    const { getByTestId, queryByTestId } = render(<Switch defaultChecked={false} />);

    expect(queryByTestId('switch-checkbox')).toBeInTheDocument();
    expect(getByTestId('switch-checkbox')).not.toBeChecked();

    fireEvent.change(getByTestId('switch-checkbox'), { target: { checked: true } });
    expect(getByTestId('switch-checkbox')).toBeChecked();
  });

  it('should correctly apply className', () => {
    const { getByTestId, queryByTestId } = render(<Switch className="some-class" />);

    expect(queryByTestId('switch-checkbox')).toBeInTheDocument();
    expect(getByTestId('switch-checkbox')).toHaveClass('some-class');
  });

  it('should correctly change switch checked for uncontrolled Switch', async () => {
    const { queryByTestId, getByTestId } = render(<Switch defaultChecked={false} />);
    expect(queryByTestId('switch-checkbox')).toBeInTheDocument();

    await act(async () => {
      await fireEvent.click(getByTestId('switch-checkbox'));
    });

    expect(getByTestId('switch-checkbox')).toBeChecked();
  });
});
