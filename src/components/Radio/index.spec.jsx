import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Radio from '.';

afterEach(cleanup);

describe('<Radio />', () => {
  let props;

  beforeEach(() => {
    props = {
      name: 'radio-name',
      value: 'radio-value',
      label: 'Radio 1',
      dts: 'radio-dts',
      id: 'radio-id',
      className: 'radio-class',
      disabled: false,
      checked: false,
      onChange: jest.fn(),
      inline: false,
    };
  });

  it('should render with props', () => {
    const { getByTestId } = render(<Radio {...props} checked />);
    expect(getByTestId('radio-wrapper')).toHaveTextContent('Radio 1');
    expect(getByTestId('radio-wrapper')).toHaveAttribute('data-test-selector', 'radio-dts');
    expect(getByTestId('radio-input')).toHaveAttribute('type', 'radio');
    expect(getByTestId('radio-input')).toHaveAttribute('name', 'radio-name');
    expect(getByTestId('radio-input')).toBeChecked();
  });

  it('should not render label if props.label is undefined', () => {
    delete props.label;
    const { getByTestId } = render(<Radio {...props} />);
    expect(getByTestId('radio-wrapper')).toHaveTextContent('');
  });

  it('should trigger `props.onChange` when the radio button is clicked', () => {
    const { getByTestId } = render(<Radio {...props} />);
    fireEvent.click(getByTestId('radio-input'));
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  it('should add inline class when inline prop in true', () => {
    const { getByTestId, rerender } = render(<Radio {...props} />);
    expect(getByTestId('radio-wrapper')).not.toHaveClass('radio-component-inline');
    props.inline = true;

    rerender(<Radio {...props} />);
    expect(getByTestId('radio-wrapper')).toHaveClass('radio-component-inline');
  });
});
