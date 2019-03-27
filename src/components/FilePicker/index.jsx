import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';

require('./styles.scss');

const baseClass = 'filepicker-component';

class FilePickerComponent extends React.PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    dts: PropTypes.string,
    filter: PropTypes.string,
    isHighlighted: PropTypes.bool,
    label: PropTypes.string,
    onRemove: PropTypes.func,
    onSelect: PropTypes.func.isRequired,
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
