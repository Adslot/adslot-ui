import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import FormGroup from '.';

afterEach(cleanup);

describe('<FormGroup />', () => {
  const helpText = "Help me if you can I'm feeling down.";
  const label = 'Sweet Caroline';

  it('should render with required props', () => {
    const { getByTestId, queryByTestId } = render(
      <FormGroup helpText={helpText} label={label} placeholder="baz" onChange={jest.fn()} />
    );

    expect(getByTestId('form-group-wrapper')).toHaveClass('form-group');

    expect(queryByTestId('form-group-label')).toBeInTheDocument();
    expect(getByTestId('form-group-label')).toHaveAttribute('for', 'sweet-caroline');
    expect(getByTestId('form-group-label')).toHaveClass('control-label col-xs-3');
    expect(getByTestId('form-group-label')).toHaveTextContent('Sweet Caroline');

    expect(queryByTestId('form-group-input-group-wrapper')).toBeInTheDocument();
    expect(getByTestId('form-group-input-group-wrapper')).toHaveClass('col-xs-5');

    expect(queryByTestId('form-group-input-group')).toBeInTheDocument();
    expect(getByTestId('form-group-input-group')).toHaveClass('input-group col-xs-12');

    expect(queryByTestId('form-group-input')).toBeInTheDocument();
    expect(getByTestId('form-group-input')).toHaveClass('form-control');
    expect(getByTestId('form-group-input')).toHaveAttribute('type', 'text');
    expect(getByTestId('form-group-input')).toHaveAttribute('id', 'sweet-caroline');
    expect(getByTestId('form-group-input')).toHaveAttribute('placeholder', 'baz');
    expect(getByTestId('form-group-input')).toHaveValue('');

    expect(getByTestId('form-group-help')).toHaveClass('help-block');
    expect(queryByTestId('form-group-help')).toBeInTheDocument();
    expect(getByTestId('form-group-help')).toHaveTextContent(helpText);
  });

  it('should render with an addon and a value', () => {
    const onChangeMock = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <FormGroup addon="$" helpText={helpText} label={label} onChange={onChangeMock} placeholder="5.00" value="10.00" />
    );

    expect(getByTestId('form-group-wrapper')).toHaveClass('form-group');
    expect(getByTestId('form-group-input-group')).toContainElement(getByTestId('form-group-input'));
    expect(queryByTestId('form-group-input')).toBeInTheDocument();
    expect(getByTestId('form-group-input')).toHaveClass('form-control');
    expect(getByTestId('form-group-input')).toHaveAttribute('type', 'text');
    expect(getByTestId('form-group-input')).toHaveAttribute('id', 'sweet-caroline');
    expect(getByTestId('form-group-input')).toHaveAttribute('placeholder', '5.00');
    expect(getByTestId('form-group-input')).toHaveValue('10.00');

    fireEvent.change(getByTestId('form-group-input'), { target: { value: 'a' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it('should render as disabled', () => {
    const onChangeMock = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <FormGroup
        disabled
        helpText={helpText}
        label={label}
        onChange={onChangeMock}
        placeholder="I should be disabled"
        value="10.00"
      />
    );

    expect(queryByTestId('form-group-input')).toBeInTheDocument();
    expect(getByTestId('form-group-input')).toBeDisabled();
  });
});
