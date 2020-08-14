import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilePickerComponent from '.';

afterEach(cleanup);

describe('<FilePicker />', () => {
  it('should render with defaults', () => {
    const { getByTestId } = render(<FilePickerComponent onSelect={jest.fn()} />);
    expect(getByTestId('file-picker-wrapper')).toHaveClass('filepicker-component input-group');

    expect(getByTestId('file-picker-form-control')).toHaveClass('form-control');
    expect(getByTestId('file-picker-form-control')).toHaveAttribute('placeholder', 'No file selected');
    expect(getByTestId('file-picker-form-control')).toHaveAttribute('title', '');

    expect(getByTestId('file-picker-input-button-label')).toHaveTextContent('Select');
    expect(getByTestId('file-picker-input-button-input')).toHaveAttribute('type', 'file');
  });

  it('should show remove button and call `onSelect` when file selected', () => {
    const onSelect = jest.fn();
    const { getByTestId, queryAllByTestId } = render(
      <FilePickerComponent onSelect={onSelect} dts="test-file-picker-input" />
    );

    expect(getByTestId('file-picker-form-control')).toHaveAttribute('title', '');
    expect(getByTestId('file-picker-form-control')).toHaveAttribute('placeholder', 'No file selected');

    expect(queryAllByTestId('file-picker-remove-button')).toHaveLength(0);
    expect(getByTestId('file-picker-input-button')).toBeEnabled();

    expect(getByTestId('file-picker-input-button-input')).toHaveAttribute(
      'data-test-selector',
      'test-file-picker-input'
    );

    fireEvent.change(getByTestId('file-picker-input-button-input'), { target: { files: [{ name: 'selected file' }] } });
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith({ name: 'selected file' });

    expect(queryAllByTestId('file-picker-remove-button')).toHaveLength(1);
    expect(getByTestId('file-picker-input-button')).toBeDisabled();

    // onChange() should do nothing if isFileSelected is true
    fireEvent.change(getByTestId('file-picker-input-button-input'));
    expect(onSelect).toHaveBeenCalledTimes(1);

    expect(getByTestId('file-picker-form-control')).toHaveAttribute('title', 'selected file');
  });

  it('should upload a file when input-button is clicked', () => {
    const onSelect = jest.fn();
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const { getByTestId } = render(<FilePickerComponent onSelect={onSelect} />);

    userEvent.upload(getByTestId('file-picker-input-button-input'), file);
    expect(onSelect).toHaveBeenCalledTimes(1);

    expect(getByTestId('file-picker-input-button-input').files[0]).toStrictEqual(file);
    expect(getByTestId('file-picker-input-button-input').files.item(0)).toStrictEqual(file);
    expect(getByTestId('file-picker-input-button-input').files).toHaveLength(1);

    expect(getByTestId('file-picker-form-control')).toHaveAttribute('title', 'test.png');
    expect(getByTestId('file-picker-form-control')).toHaveAttribute('value', 'test.png');
  });

  it('should remove file selected when remove file button is clicked', () => {
    const onSelect = jest.fn();
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const { getByTestId } = render(<FilePickerComponent onSelect={onSelect} />);

    userEvent.upload(getByTestId('file-picker-input-button-input'), file);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(getByTestId('file-picker-form-control')).toHaveAttribute('title', 'test.png');

    fireEvent.click(getByTestId('file-picker-remove-button'));

    expect(getByTestId('file-picker-form-control')).toHaveAttribute('title', '');
    expect(getByTestId('file-picker-form-control')).toHaveAttribute('value', '');
  });

  it('should call `onRemove` when remove file button is clicked', () => {
    const onSelect = jest.fn();
    const onRemove = jest.fn();
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const { getByTestId } = render(<FilePickerComponent onSelect={onSelect} onRemove={onRemove} />);

    userEvent.upload(getByTestId('file-picker-input-button-input'), file);
    expect(getByTestId('file-picker-form-control')).toHaveAttribute('title', 'test.png');
    expect(onRemove).not.toHaveBeenCalled();

    fireEvent.click(getByTestId('file-picker-remove-button'));

    expect(getByTestId('file-picker-form-control')).toHaveAttribute('title', '');
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
