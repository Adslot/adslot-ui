import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
import './styles.css';

const baseClass = 'filepicker-component';

class FilePicker extends React.PureComponent {
  constructor(props) {
    super(props);

    this.fileInput = React.createRef();
  }

  state = {
    isFileSelected: false,
    fileName: '',
  };

  onChange = (changeEvent) => {
    if (!this.state.isFileSelected) {
      this.setState({ isFileSelected: true, fileName: changeEvent.target.files[0].name });
      this.props.onSelect(changeEvent.target.files[0]);
    }
  };

  onUploadBtnClick = () => {
    this.fileInput.current.click();
  };

  removeFile = () => {
    this.fileInput.current.value = null;
    this.setState({ isFileSelected: false, fileName: '' });
    if (this.props.onRemove) {
      this.props.onRemove();
    }
  };

  render() {
    const mainClass = classNames({ [`${baseClass}-highlight`]: this.props.isHighlighted }, baseClass, 'input-group');
    const { isFileSelected, fileName } = this.state;

    return (
      <div data-testid="file-picker-wrapper" className={mainClass}>
        <input
          data-testid="file-picker-form-control"
          className="form-control"
          type="text"
          disabled
          placeholder={this.props.placeholder}
          readOnly="readonly"
          value={fileName}
          title={fileName}
        />
        <div className="input-group-btn">
          {isFileSelected ? (
            <Button data-testid="file-picker-remove-button" className="remove-file" onClick={this.removeFile}>
              ×
            </Button>
          ) : null}
          <Button
            data-testid="file-picker-input-button"
            variant="inverse"
            onClick={this.onUploadBtnClick}
            disabled={this.props.disabled || isFileSelected}
          >
            <span data-testid="file-picker-input-button-label">{this.props.label}</span>
            <input
              data-testid="file-picker-input-button-input"
              className="file-input"
              ref={this.fileInput}
              type="file"
              onChange={this.onChange}
              accept={this.props.filter}
              data-test-selector={this.props.dts}
            />
          </Button>
        </div>
      </div>
    );
  }
}

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
