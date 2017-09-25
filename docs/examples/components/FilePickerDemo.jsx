import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { FilePicker } from 'adslot-ui';

class FilePickerDemo extends React.Component {
  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.resetFilePicker = this.resetFilePicker.bind(this);
  }

  onSelect(file) {
    console.log(`FilePicker ${file.name} selected`);
  }

  onRemove() {
    console.log('FilePicker file removed');
  }

  resetFilePicker() {
    this.filePicker.removeFile();
  }

  render() {
    return (
      <div>
        <FilePicker
          onRemove={this.onRemove}
          onSelect={this.onSelect}
          ref={(ref) => { this.filePicker = ref; }}
        />
        <br />
        <Button bsStyle="primary" onClick={this.resetFilePicker}>Reset file</Button>
      </div>
    );
  }
}

export default FilePickerDemo;
