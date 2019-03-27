import React from 'react';
import _ from 'lodash';
import Example from '../components/Example';
import { FilePicker } from 'adslot-ui';

class FilePickerExample extends React.PureComponent {
  render() {
    const onSelect = _.noop;
    return <FilePicker onSelect={onSelect} />;
  }
}

const exampleProps = {
  componentName: 'File Picker',
  designNotes: (
    <p>
      <span className="text-bold">File picker</span> allows the user to easily add and remove a file for upload.
    </p>
  ),
  exampleCodeSnippet: '<FilePicker onSelect={onSelect} />',
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'disabled',
          type: 'bool',
          defaultValue: 'false',
        },
        {
          propType: 'dts',
          type: 'string',
          note: 'render `data-test-selector` onto the component. It can be useful for testing.',
        },
        {
          propType: 'filter',
          type: 'string',
        },
        {
          propType: 'isHighlighted',
          type: 'bool',
          defaultValue: 'false',
        },
        {
          propType: 'label',
          type: 'string',
          defaultValue: 'Select',
        },
        {
          propType: 'onRemove',
          type: 'func',
        },
        {
          propType: 'onSelect',
          type: 'func',
          note: <code>{'onSelect({ isClosed, lastModified, lastModifiedDate, name, size, type })'}</code>,
        },
        {
          propType: 'placeholder',
          type: 'string',
          defaultValue: 'No file selected',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <FilePickerExample />
  </Example>
);
