import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';

require('styles/adslotUi/FileUpload.scss');

const baseClass = 'fileupload-component';

class FileUploadComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      fileName: '',
    };
    this.onChange = this.onChange.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  onChange(event) {
    this.setState({
      fileName: event.target.files[0].name,
    });
    this.props.setFileData(event.target.files[0]);
  }

  removeFile() {
    this.setState({
      fileName: '',
    });

    if (this.props.onRemove) {
      this.props.onRemove();
    }
  }

  render() {
    let inputFile;

    if (!this.state.fileName) {
      inputFile = (
        <div className="input-group-btn">
          <div className={`${baseClass}-uploadInputBox`}>
            <Button bsStyle="primary" className={`${baseClass}-btn-add`}>
              {this.props.btnUploadText}
            </Button>
            <input
              type="file"
              name="file"
              size="1"
              onChange={this.onChange}
              accept={this.props.filter}
            />
          </div>
        </div>
      );
    } else {
      inputFile = (
        <div className="input-group-btn">
          <Button className={`${baseClass}-btn-remove-file btn-inverse`} onClick={this.removeFile}>
            &#x2716;
          </Button>
          <Button bsStyle="primary" disabled className={`${baseClass}-btn-add`}>
            {this.props.btnUploadText}
          </Button>
        </div>
      );
    }

    const mainClass =
      classNames({ [`${baseClass}-highlight`]: this.props.isHighlight }, baseClass, 'input-group');

    return (
      <div className={mainClass}>
        <input
          className="form-control"
          type="text"
          disabled
          placeholder={this.props.placeholder}
          readOnly="readonly"
          value={this.state.fileName}
          title={this.state.fileName}
        />
        {inputFile}
      </div>
    );
  }
}

FileUploadComponent.propTypes = {
  setFileData: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  placeholder: PropTypes.string,
  btnUploadText: PropTypes.string,
  disabledUploadBtn: PropTypes.bool,
  isHighlight: PropTypes.bool,
  filter: PropTypes.string,
};

FileUploadComponent.defaultProps = {
  placeholder: 'No file selected',
  btnUploadText: 'Select',
  disabledUploadBtn: false,
  isHighlight: false,
};

export default FileUploadComponent;
