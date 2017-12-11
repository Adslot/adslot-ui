import React from 'react';
import Example from '../components/Example';
import { Textarea } from '../../src/dist-entry';

class TextareaExample extends React.PureComponent {
  render() {
    return <Textarea maxLength={250} />;
  }
}

const exampleProps = {
  componentName: 'Textarea',
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
