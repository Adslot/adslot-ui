import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';

require('styles/adslotUi/FilePicker.scss');

const baseClass = 'filepicker-component';

class FilePickerComponent extends React.Component {
  constructor() {
    super();
    this.state = { fileName: '' };
    this.onChange = this.onChange.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  onChange(event) {
    this.setState({ fileName: event.target.files[0].name });
    this.props.onSelect(event.target.files[0]);
  }

  removeFile() {
    this.setState({ fileName: '' });
    if (this.props.onRemove) { this.props.onRemove(); }
  }

  render() {
    const mainClass = classNames({ [`${baseClass}-highlight`]: this.props.isHighlighted }, baseClass, 'input-group');
    const { fileName } = this.state;

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
          {fileName ? <Button className="remove-file btn-inverse" onClick={this.removeFile}>×</Button> : null}
          {!fileName && !this.props.disabled ?
            <Button bsStyle="primary" onClick={() => this.refs.fileInput.click()}>
              <span>{this.props.label}</span>
              <input
                className="file-input"
                ref="fileInput"
                type="file"
                onChange={this.onChange}
                accept={this.props.filter}
              />
            </Button> :
            <Button bsStyle="primary" disabled>{this.props.label}</Button>}
        </div>
      </div>
    );
  }
}

FilePickerComponent.propTypes = {
  disabled: PropTypes.bool,
  filter: PropTypes.string,
  isHighlighted: PropTypes.bool,
  label: PropTypes.string,
  onRemove: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

FilePickerComponent.defaultProps = {
  isHighlighted: false,
  label: 'Select',
  placeholder: 'No file selected',
};

export default FilePickerComponent;
