import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import './styles.scss';

const baseClass = 'filepicker-component';

class FilePickerComponent extends React.PureComponent {
  static propTypes = {
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

  static defaultProps = {
    isHighlighted: false,
    label: 'Select',
    placeholder: 'No file selected',
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.fileInput = React.createRef();
  }

  state = {
    isFileSelected: false,
    fileName: '',
  };

  onChange = changeEvent => {
    if (!this.state.isFileSelected) {
      this.setState({ isFileSelected: true, fileName: changeEvent.target.files[0].name });
      this.props.onSelect(changeEvent.target.files[0]);
    }
  };

  onUploadBtnClick = () => {
    this.fileInput.current.click();
  };

  removeFile = () => {
    if (this.state.isFileSelected) {
      this.fileInput.current.value = null;
      this.setState({ isFileSelected: false, fileName: '' });
      if (this.props.onRemove) {
        this.props.onRemove();
      }
    }
  };

  render() {
    const mainClass = classNames({ [`${baseClass}-highlight`]: this.props.isHighlighted }, baseClass, 'input-group');
    const { isFileSelected, fileName } = this.state;

    return (
      <div className={mainClass}>
        <input
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
            <Button className="remove-file" onClick={this.removeFile}>
              ×
            </Button>
          ) : null}
          <Button
            className="btn-inverse"
            onClick={this.onUploadBtnClick}
            disabled={this.props.disabled || isFileSelected}
          >
            <span>{this.props.label}</span>
            <input
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

export default FilePickerComponent;
