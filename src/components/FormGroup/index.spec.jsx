import React from 'react';
import { render, screen, user } from 'testing';
import FormGroup from '.';

const helpText = "Help me if you can I'm feeling down.";
const label = 'Sweet Caroline';

it('should render with required props', () => {
  render(<FormGroup helpText={helpText} label={label} placeholder="baz" onChange={jest.fn()} />);

  expect(screen.getByTestId('form-group-wrapper')).toHaveClass('form-group');

  expect(screen.getByTestId('form-group-label')).toBeInTheDocument();
  expect(screen.getByTestId('form-group-label')).toHaveAttribute('for', 'sweet-caroline');
  expect(screen.getByTestId('form-group-label')).toHaveClass('control-label col-xs-3');
  expect(screen.getByTestId('form-group-label')).toHaveTextContent('Sweet Caroline');

  expect(screen.getByTestId('form-group-input-group-wrapper')).toBeInTheDocument();
  expect(screen.getByTestId('form-group-input-group-wrapper')).toHaveClass('col-xs-5');

  expect(screen.getByTestId('form-group-input-group')).toBeInTheDocument();
  expect(screen.getByTestId('form-group-input-group')).toHaveClass('input-group col-xs-12');

  expect(screen.getByTestId('form-group-input')).toBeInTheDocument();
  expect(screen.getByTestId('form-group-input')).toHaveClass('form-control');
  expect(screen.getByTestId('form-group-input')).toHaveAttribute('type', 'text');
  expect(screen.getByTestId('form-group-input')).toHaveAttribute('id', 'sweet-caroline');
  expect(screen.getByTestId('form-group-input')).toHaveAttribute('placeholder', 'baz');
  expect(screen.getByTestId('form-group-input')).toHaveValue('');

  expect(screen.getByTestId('form-group-help')).toHaveClass('help-block');
  expect(screen.getByTestId('form-group-help')).toBeInTheDocument();
  expect(screen.getByTestId('form-group-help')).toHaveTextContent(helpText);
});

it('should render with an addon and a value', async () => {
  const onChangeMock = jest.fn();
  render(
    <FormGroup addon="$" helpText={helpText} label={label} onChange={onChangeMock} placeholder="5.00" value="10.00" />
  );

  expect(screen.getByTestId('form-group-wrapper')).toHaveClass('form-group');
  expect(screen.getByTestId('form-group-input-group')).toContainElement(screen.getByTestId('form-group-input'));
  expect(screen.getByTestId('form-group-input')).toBeInTheDocument();
  expect(screen.getByTestId('form-group-input')).toHaveClass('form-control');
  expect(screen.getByTestId('form-group-input')).toHaveAttribute('type', 'text');
  expect(screen.getByTestId('form-group-input')).toHaveAttribute('id', 'sweet-caroline');
  expect(screen.getByTestId('form-group-input')).toHaveAttribute('placeholder', '5.00');
  expect(screen.getByTestId('form-group-input')).toHaveValue('10.00');

  await user.click(screen.getByTestId('form-group-input'));
  await user.keyboard('a');
  expect(onChangeMock).toHaveBeenCalledTimes(1);
});

it('should render as disabled', () => {
  const onChangeMock = jest.fn();
  render(
    <FormGroup
      disabled
      helpText={helpText}
      label={label}
      onChange={onChangeMock}
      placeholder="I should be disabled"
      value="10.00"
    />
  );

  expect(screen.getByTestId('form-group-input')).toBeInTheDocument();
  expect(screen.getByTestId('form-group-input')).toBeDisabled();
});
