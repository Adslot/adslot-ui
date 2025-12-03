import React from 'react';
import { render, screen, user } from 'testing';
import invariant from '../../invariant';
import TextInput from './';

jest.mock('../../invariant');

const Controlled = ({ value: valueProp = '', ...rest }) => {
  const [value, setValue] = React.useState(() => valueProp);
  return <TextInput {...rest} value={value} onChange={(e) => setValue(e.target.value)} />;
};

it('should render a input', () => {
  render(<Controlled />);
  expect(screen.getByClass('aui--text-input')).toBeInTheDocument();
  expect(screen.getByClass('aui-input')).toBeInTheDocument();
});

it('should set placeholder value on focus when clickToInsert', async () => {
  render(<Controlled placeholder="data" clickToInsert />);

  expect(screen.getByClass('aui-input')).toHaveValue('');
  await user.click(screen.getByClass('aui-input'));
  expect(screen.getByClass('aui-input')).toHaveValue('data');
});

it('should set placeholder value on focus for uncontrolled input when clickToInsert', async () => {
  render(<TextInput placeholder="data" clickToInsert />);

  expect(screen.getByClass('aui-input')).toHaveValue('');
  await user.click(screen.getByClass('aui-input'));
  expect(screen.getByClass('aui-input')).toHaveValue('data');
});

it('should not set placeholder when not clickToInsert', async () => {
  render(<Controlled placeholder="data" clickToInsert={false} />);
  expect(screen.getByClass('aui-input')).toHaveValue('');

  await user.click(screen.getByClass('aui-input'));
  expect(screen.getByClass('aui-input')).toHaveValue('');
});

it('should not set placeholder if value is present', async () => {
  render(<Controlled value="some value" placeholder="data" />);
  expect(screen.getByClass('aui-input')).toHaveValue('some value');

  await user.click(screen.getByClass('aui-input'));
  expect(screen.getByClass('aui-input')).toHaveValue('some value');
});

it('should not set placeholder if value is present for uncontrolled input', async () => {
  render(<TextInput defaultValue="some value" placeholder="data" />);
  expect(screen.getByClass('aui-input')).toHaveValue('some value');

  await user.click(screen.getByClass('aui-input'));
  expect(screen.getByClass('aui-input')).toHaveValue('some value');
});

it('should throw if using clickToInsert without placeholder', () => {
  render(<Controlled clickToInsert />);
  expect(invariant).toHaveBeenCalledWith(false, 'TextInput: `clickToInsert` must be used with `placeholder`.');
});

it('should render a spinner when isLoading', () => {
  render(<TextInput isLoading />);
  expect(screen.getByClass('spinner-component')).toBeInTheDocument();
});

it('should show length count down when given', async () => {
  render(<TextInput maxLength={30} />);
  expect(screen.getByClass('aui-count')).toHaveTextContent(30);
  await user.type(screen.getByClass('aui-input'), 'some');
  expect(screen.getByClass('aui-count')).toHaveTextContent(26);
});

it('should show length count down when given for controlled input', async () => {
  render(<Controlled maxLength={30} />);
  expect(screen.getByClass('aui-count')).toHaveTextContent(30);
  await user.type(screen.getByClass('aui-input'), 'some');
  expect(screen.getByClass('aui-count')).toHaveTextContent(26);
});
