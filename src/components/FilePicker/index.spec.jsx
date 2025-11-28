import React from 'react';
import { render, screen, user } from 'testing';
import FilePicker from '.';

it('should render with defaults', () => {
  render(<FilePicker onSelect={jest.fn()} />);
  expect(screen.getByTestId('file-picker-wrapper')).toHaveClass('filepicker-component');

  expect(screen.getByTestId('file-picker-form-control')).toHaveClass('aui-file-input');
  expect(screen.getByTestId('file-picker-form-control')).toHaveAttribute('placeholder', 'No file selected');
  expect(screen.getByTestId('file-picker-form-control')).toHaveAttribute('title', '');

  expect(screen.getByTestId('file-picker-input-button-label')).toHaveTextContent('Select');
  expect(screen.getByTestId('file-picker-input-button-input')).toHaveAttribute('type', 'file');
});

it('should show remove button and call `onSelect` when file selected', async () => {
  const onSelect = jest.fn();
  render(<FilePicker onSelect={onSelect} dts="test-file-picker-input" />);

  expect(screen.getByTestId('file-picker-form-control')).toHaveAttribute('title', '');
  expect(screen.getByTestId('file-picker-form-control')).toHaveAttribute('placeholder', 'No file selected');

  expect(screen.queryByTestId('file-picker-remove-button')).not.toBeInTheDocument();
  expect(screen.getByTestId('file-picker-input-button')).toBeEnabled();

  expect(screen.getByTestId('file-picker-input-button-input')).toHaveAttribute(
    'data-test-selector',
    'test-file-picker-input'
  );

  const file = new File(['test'], 'test.png', { type: 'image/png' });
  await user.upload(screen.getByTestId('file-picker-input-button-input'), file);
  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(onSelect).toHaveBeenCalledWith(file);

  expect(screen.getByTestId('file-picker-remove-button')).toBeInTheDocument();
  expect(screen.getByTestId('file-picker-input-button')).toBeDisabled();

  // onChange() should do nothing if isFileSelected is true
  await user.click(screen.getByTestId('file-picker-input-button-input'));
  await user.keyboard('test');
  expect(onSelect).toHaveBeenCalledTimes(1);

  expect(screen.getByTestId('file-picker-form-control')).toHaveAttribute('title', 'test.png');
});

it('should upload a file when input-button is clicked', async () => {
  const onSelect = jest.fn();
  render(<FilePicker onSelect={onSelect} />);

  const file = new File(['test'], 'test.png', { type: 'image/png' });
  await user.upload(screen.getByTestId('file-picker-input-button-input'), file);
  expect(onSelect).toHaveBeenCalledTimes(1);

  expect(screen.getByTestId('file-picker-input-button-input').files[0]).toStrictEqual(file);
  expect(screen.getByTestId('file-picker-input-button-input').files.item(0)).toStrictEqual(file);
  expect(screen.getByTestId('file-picker-input-button-input').files).toHaveLength(1);

  expect(screen.getByTestId('file-picker-form-control')).toHaveAttribute('title', 'test.png');
  expect(screen.getByTestId('file-picker-form-control')).toHaveValue('test.png');
});

it('should remove file selected when remove file button is clicked', async () => {
  const onSelect = jest.fn();
  render(<FilePicker onSelect={onSelect} />);

  const file = new File(['test'], 'test.png', { type: 'image/png' });
  await user.upload(screen.getByTestId('file-picker-input-button-input'), file);
  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(screen.getByTestId('file-picker-form-control')).toHaveAttribute('title', 'test.png');

  await user.click(screen.getByTestId('file-picker-remove-button'));
  expect(screen.getByTestId('file-picker-form-control')).toHaveAttribute('title', '');
  expect(screen.getByTestId('file-picker-form-control')).toHaveValue('');
});

it('should call `onRemove` when remove file button is clicked', async () => {
  const onSelect = jest.fn();
  const onRemove = jest.fn();
  render(<FilePicker onSelect={onSelect} onRemove={onRemove} />);

  const file = new File(['test'], 'test.png', { type: 'image/png' });
  await user.upload(screen.getByTestId('file-picker-input-button-input'), file);
  expect(screen.getByTestId('file-picker-form-control')).toHaveAttribute('title', 'test.png');
  expect(onRemove).not.toHaveBeenCalled();

  await user.click(screen.getByTestId('file-picker-remove-button'));
  expect(screen.getByTestId('file-picker-form-control')).toHaveAttribute('title', '');
  expect(onRemove).toHaveBeenCalledTimes(1);
});
