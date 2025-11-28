import React from 'react';
import { render, screen, user } from 'testing';
import invariant from '../../invariant';
import TextInput from '../TextInput';
import FormField from './';

jest.mock('../../invariant');

it('should render FormField', () => {
  render(<FormField>Test</FormField>);
  expect(screen.getByClass('aui--form-field')).toBeInTheDocument();
});

it('should support className prop', () => {
  render(<FormField className="all the-classes">Test</FormField>);
  expect(screen.getByClass('aui--form-field')).toHaveClass('all the-classes');
});

it('should support dts prop', () => {
  render(<FormField dts="test-id">Test</FormField>);

  expect(screen.getByClass('aui--form-field')).toHaveAttribute('data-test-selector', 'test-id');
});

it('should render label and children input', async () => {
  render(
    <FormField label="Name" labelFor="test">
      <TextInput id="test" className="test-input" />
    </FormField>
  );
  expect(screen.getByLabelText('Name')).toHaveClass('aui-input');
  expect(screen.getByClass('aui-form-label')).toHaveTextContent('Name');
});

it('should render full label when given', async () => {
  render(
    <FormField label="Name" labelFor="test" isRequired labelTooltip="tooltip">
      <TextInput id="test" className="test-input" />
    </FormField>
  );
  expect(screen.getByLabelText('Name')).toHaveClass('aui-input');
  expect(screen.getByClass('aui-form-label')).toHaveTextContent('Name');
  expect(screen.getByClass('aui-form-label')).toHaveTextContent('required');

  await user.hover(screen.getByClass('aui-form-label'));
  expect(screen.getByText('tooltip')).toBeInTheDocument();
});

it('should throw if using labelFor without label', () => {
  render(
    <FormField labelFor="Name">
      <TextInput className="test-input" />
    </FormField>
  );
  expect(invariant).toHaveBeenCalledWith(false, 'FormField: `labelFor` prop requires `label` prop.');
});

it('should throw if using labelTooltip without label', () => {
  render(<FormField labelTooltip="tooltip">Test</FormField>);
  expect(invariant).toHaveBeenCalledWith(false, 'FormField: `labelTooltip` prop requires `label` prop.');
});

it('should throw if using isRequired without label', () => {
  render(<FormField isRequired>Test</FormField>);
  expect(invariant).toHaveBeenCalledWith(false, 'FormField: `isRequired` prop requires `label` prop.');
});
