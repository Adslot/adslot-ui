import React from 'react';
import _ from 'lodash';
import Example from '../components/Example';
import {
  FilePicker,
} from '../../src/dist-entry';


class FilePickerExample extends React.PureComponent {
  render() {
    const onSelect = _.noop;
    return (<FilePicker onSelect={onSelect} />);
  }
}


const exampleProps = {
  componentName: 'File Picker',
  exampleCodeSnippet: '<FilePicker onSelect={onSelect} />',
  propTypes: [{
    propType: 'onSelect',
    type: 'func',
    note: (<pre>{'onSelect({ isClosed, lastModified, lastModifiedDate, name, size, type })'}</pre>),
  }],
};


export default () => <Example {...exampleProps}><FilePickerExample /></Example>;
