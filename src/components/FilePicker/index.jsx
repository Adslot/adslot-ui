import classNames from 'classnames';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/lib/Button';
import './styles.scss';

const baseClass = 'aui--filepicker-component';

const FilePickerComponent = ({
  disabled,
  dts,
  filter,
  isHighlighted,
  label,
  onRemove,
  onSelect,
  onClick,
  onChange,
  value,
  placeholder,
}) => {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInput = useRef();

  const selectFile = event => {
    if (!isFileSelected) {
      const file = event.target.files[0];
      setIsFileSelected(true);
      if (_.isFunction(onChange)) {
        onChange(file.name);
      }
      setFileName(file.name);

      onSelect(file);
    }
  };

  const onUploadBtnClick = () => {
    fileInput.current.click();
  };

  const removeFile = () => {
    if (isFileSelected || !_.isEmpty(value)) {
      fileInput.current.value = null;
      setIsFileSelected(false);
      if (_.isFunction(onChange)) {
        onChange('');
      }
      setFileName('');

      if (_.isFunction(onRemove)) {
        onRemove();
      }
    }
  };

  const clickFile = () => {
    if (_.isFunction(onClick)) {
      onClick();
    }
  };

  if (value && !onChange)
    console.warn(
      'Failed prop type: You have provided a `value` prop to FilePicker Component without an `onChange` handler. This will render a read-only field.'
    );

  const hasFileName = _.isString(value) ? value !== '' : isFileSelected;

  return (
    <div
      className={classNames({ [`${baseClass}-highlight`]: isHighlighted }, baseClass, 'input-group')}
      data-test-selector={dts}
      data-testid="file-picker-wrapper"
    >
      <input
        data-testid="file-picker-form-control"
        className={classNames('form-control', { clickable: _.isFunction(onClick) })}
        type="text"
        readOnly
        placeholder={placeholder}
        value={value || fileName}
        title={value || fileName}
        onClick={clickFile}
      />
      <div className="input-group-btn">
        {hasFileName ? (
          <Button data-testid="file-picker-remove-button" className="remove-file" onClick={removeFile}>
            ×
          </Button>
        ) : null}
        <Button
          data-testid="file-picker-input-button"
          className="btn-inverse select-file"
          onClick={onUploadBtnClick}
          disabled={disabled || hasFileName}
        >
          <span data-testid="file-picker-input-button-label">{label}</span>
          <input
            data-testid="file-picker-input-button-input"
            className="file-input"
            ref={fileInput}
            type="file"
            onChange={selectFile}
            accept={filter}
          />
        </Button>
      </div>
    </div>
  );
};

FilePickerComponent.propTypes = {
  /**
   * determines if the filePicker is disabled
   */
  disabled: PropTypes.bool,
  /**
   * data-test-selector of the filePicker
   */
  dts: PropTypes.string,
  /**
   * determines what file types the user can pick from the file input dialog box
   */
  filter: PropTypes.string,
  /**
   * determines if the filePicker is highlighted or not
   */
  isHighlighted: PropTypes.bool,
  /**
   * label on button
   */
  label: PropTypes.string,
  /**
   * function called when onRemove event is fired
   */
  onRemove: PropTypes.func,
  /**
   * function called when onSelect event is fired
   */
  onSelect: PropTypes.func.isRequired,
  /**
   * function called when user click the file name
   */
  onClick: PropTypes.func,
  /**
   * function called when the file name changes
   */
  onChange: PropTypes.func,
  /**
   * file name on input
   */
  value: PropTypes.string,
  /**
   * determines the placeholder when no date is selected
   */
  placeholder: PropTypes.string,
};

FilePickerComponent.defaultProps = {
  isHighlighted: false,
  label: 'Select',
  placeholder: 'No file selected',
  disabled: false,
};

export default FilePickerComponent;
