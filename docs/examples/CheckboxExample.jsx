import React from 'react';
import Example from '../components/Example';
import { Checkbox } from '../../src/dist-entry';

class CheckboxExample extends React.PureComponent {
  render() {
    return <Checkbox label="Agree to the terms and conditions." />;
  }
}

const exampleProps = {
  componentName: 'Checkbox',
  designNotes: (
    <p>
      <span className="text-bold">Checkbox</span> used for making one or more selections from multiple options.
    </p>
  ),
  exampleCodeSnippet: '<Checkbox label="Agree to the terms and conditions." />',
  notes: (
    <p>
      See <a href="https://github.com/luqin/react-icheck">React iCheck Documentation</a>
    </p>
  ),
  propTypes: [
    {
      propType: 'label',
      type: 'node',
      note: 'Usually fine to rely on a string but can pass HTML e.g. for a url.',
    },
    {
      propType: 'value',
      type: 'string',
    },
    {
      propType: 'onChange',
      type: 'func',
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <CheckboxExample />
  </Example>
);
