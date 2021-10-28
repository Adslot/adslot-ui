import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
import './styles.scss';

const baseClass = 'filepicker-component';

const FilePicker = ({ filter, dts, placeholder, onSelect, onRemove, isHighlighted, disabled, label }) => {
  const fileInputRef = React.useRef();
  const [fileName, setFileName] = React.useState('');
  const isFileSelected = !!fileName;

  const onChange = (event) => {
    if (!isFileSelected) {
      setFileName(event.target.files[0].name);
      onSelect(event.target.files[0]);
    }
  };

  const onUploadBtnClick = () => {
    fileInputRef.current.click();
  };

  const removeFile = () => {
    fileInputRef.current.value = null;
    setFileName('');
    onRemove?.();
  };

  const mainClass = classNames({ [`${baseClass}-highlight`]: isHighlighted }, baseClass, 'input-group');

  return (
    <div data-testid="file-picker-wrapper" className={mainClass}>
      <input
        data-testid="file-picker-form-control"
        className="form-control"
        type="text"
        disabled
        placeholder={placeholder}
        readOnly="readonly"
        value={fileName}
        title={fileName}
      />
      <div className="input-group-btn">
        {isFileSelected ? (
          <Button data-testid="file-picker-remove-button" className="remove-file" onClick={removeFile}>
            ×
          </Button>
        ) : null}
        <Button
          data-testid="file-picker-input-button"
          inverse
          onClick={onUploadBtnClick}
          disabled={disabled || isFileSelected}
        >
          <span data-testid="file-picker-input-button-label">{label}</span>
          <input
            data-testid="file-picker-input-button-input"
            className="file-input"
            ref={fileInputRef}
            type="file"
            onChange={onChange}
            accept={filter}
            data-test-selector={dts}
          />
        </Button>
      </div>
    </div>
  );
};

FilePicker.propTypes = {
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
   * the label to be displayed
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
   * determines the placeholder when no date is selected
   */
  placeholder: PropTypes.string,
};

FilePicker.defaultProps = {
  isHighlighted: false,
  label: 'Select',
  placeholder: 'No file selected',
  disabled: false,
};

export default FilePicker;
