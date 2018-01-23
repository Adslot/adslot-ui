import React from 'react';
import Example from '../components/Example';
import { Textarea } from '../../src';

class TextareaExample extends React.PureComponent {
  render() {
    return <Textarea maxLength={250} />;
  }
}

const exampleProps = {
  componentName: 'Textarea',
  designNotes: (
    <p>
      <span className="text-bold">Text area</span> used to capture comments, creative ad tags etc. If there is a
      character limitation then the count should be listed below and on the right side of the text area. Font size is{' '}
      <span className="text-bold">12px</span>, weight <span className="text-bold">300</span>.
    </p>
  ),
  exampleCodeSnippet: '<Textarea maxLength={250} />',
  propTypes: [
    {
      propType: 'maxLength',
      type: 'number',
    },
    {
      propType: 'statusClass',
      type: 'string',
      defaultValue: '',
    },
    {
      propType: 'onChange',
      type: 'func',
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <TextareaExample />
  </Example>
);
