import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilePickerComponent from '.';

afterEach(cleanup);

describe('<FilePicker />', () => {
  it('should render with defaults', () => {
    const { getByTestId } = render(<FilePickerComponent onSelect={jest.fn()} dts="test-file-picker-input" />);
    expect(getByTestId('file-picker-wrapper')).toHaveClass('aui--filepicker-component input-group');
    expect(getByTestId('file-picker-wrapper')).toHaveAttribute('data-test-selector', 'test-file-picker-input');

    expect(getByTestId('file-picker-form-control')).toHaveClass('form-control');
    expect(getByTestId('file-picker-form-control')).toHaveAttribute('placeholder', 'No file selected');
    expect(getByTestId('file-picker-form-control')).toHaveAttribute('title', '');

    expect(getByTestId('file-picker-input-button-label')).toHaveTextContent('Select');
    expect(getByTestId('file-picker-input-button-input')).toHaveAttribute('type', 'file');
  });

  it('should show remove button and call `onSelect` when file selected', () => {
    const onSelect = jest.fn();
    const { getByTestId, queryAllByTestId } = render(<FilePickerComponent onSelect={onSelect} />);

    expect(getByTestId('file-picker-form-control')).toHaveAttribute('title', '');
    expect(getByTestId('file-picker-form-control')).toHaveAttribute('placeholder', 'No file selected');

    expect(queryAllByTestId('file-picker-remove-button')).toHaveLength(0);
    expect(getByTestId('file-picker-input-button')).toBeEnabled();

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

  it('should show value as file name, show remove button and disable input button if value is provided', () => {
    const { getByTestId, queryAllByTestId } = render(
      <FilePickerComponent onSelect={jest.fn()} value="custom_file_name" onChange={jest.fn()} />
    );
    expect(getByTestId('file-picker-form-control')).toHaveAttribute('value', 'custom_file_name');
    expect(getByTestId('file-picker-form-control')).toHaveAttribute('title', 'custom_file_name');
    expect(queryAllByTestId('file-picker-remove-button')).toHaveLength(1);
    expect(getByTestId('file-picker-input-button')).toBeDisabled();
  });

  it('should remove file name, hide remove button and enable input button if value is set to empty string', () => {
    const { getByTestId, queryAllByTestId, rerender } = render(
      <FilePickerComponent onSelect={jest.fn()} value="custom_file_name" onChange={jest.fn()} />
    );
    expect(getByTestId('file-picker-form-control')).toHaveAttribute('value', 'custom_file_name');

    rerender(<FilePickerComponent onSelect={jest.fn()} value="" />);
    expect(getByTestId('file-picker-form-control')).toHaveAttribute('value', '');
    expect(queryAllByTestId('file-picker-remove-button')).toHaveLength(0);
    expect(getByTestId('file-picker-input-button')).toBeEnabled();
  });

  it('should show warning if value is provided but onChange is not provided', () => {
    console.warn = jest.fn();

    render(<FilePickerComponent onSelect={jest.fn()} value="custom_file_name" />);

    expect(console.warn).toHaveBeenCalledWith(
      'Failed prop type: You have provided a `value` prop to FilePicker Component without an `onChange` handler. This will render a read-only field.'
    );
  });

  it('should call `onChange` with the file name when a file is selected', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <FilePickerComponent onSelect={jest.fn()} value="custom_file_name" onChange={onChange} />
    );
    fireEvent.change(getByTestId('file-picker-input-button-input'), {
      target: { files: [{ name: 'selected_file_name' }] },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('selected_file_name');
  });

  it('should call `onChange` with the empty string when a file is removed', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <FilePickerComponent onSelect={jest.fn()} value="custom_file_name" onChange={onChange} />
    );
    fireEvent.click(getByTestId('file-picker-remove-button'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('should call `onClick` when file name is clicked', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <FilePickerComponent onSelect={jest.fn()} onClick={onClick} value="custom_file_name" onChange={jest.fn()} />
    );
    fireEvent.click(getByTestId('file-picker-form-control'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
