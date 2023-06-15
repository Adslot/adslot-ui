import React from 'react';
import { render, screen, user } from 'testing';
import Radio from '.';

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
  };
});

it('should render with props', () => {
  render(<Radio {...props} checked />);
  expect(screen.getByTestId('radio-wrapper')).toHaveTextContent('Radio 1');
  expect(screen.getByTestId('radio-wrapper')).toHaveAttribute('data-test-selector', 'radio-dts');
  expect(screen.getByTestId('radio-input')).toHaveAttribute('type', 'radio');
  expect(screen.getByTestId('radio-input')).toHaveAttribute('name', 'radio-name');
  expect(screen.getByTestId('radio-input')).toBeChecked();
});

it('should not render label if props.label is undefined', () => {
  delete props.label;
  render(<Radio {...props} />);
  expect(screen.getByTestId('radio-wrapper')).toHaveTextContent('');
});

it('should trigger `props.onChange` when the radio button is clicked', async () => {
  render(<Radio {...props} />);
  await user.click(screen.getByTestId('radio-input'));
  expect(props.onChange).toHaveBeenCalledTimes(1);
});

it('should be able to activate via keyboard when no radio is selected', async () => {
  render(<Radio {...props} value="" />);
  expect(props.onChange).toHaveBeenCalledTimes(0);
  await user.keyboard('[Tab]');
  await user.keyboard('[Enter]');
  expect(props.onChange).toHaveBeenCalledTimes(1);
  await user.keyboard('[Enter]');
  expect(props.onChange).toHaveBeenCalledTimes(2);
});
