import React from 'react';
import Example from '../components/Example';
import { Spinner } from '../../src';

class SpinnerExample extends React.PureComponent {
  render() {
    return <Spinner />;
  }
}

const exampleProps = {
  componentName: 'Spinner',
  designNotes: (
    <div>
      <p>The spinner is commonly used to indicate it is processing the user's action.</p>
      <p>
        <label>Example:</label> Used inside a button or cell, or while loading a page.
      </p>
    </div>
  ),
  exampleCodeSnippet: '<Spinner />',
  propTypes: [
    {
      propType: 'size',
      type: "oneOf: 'large', medium', 'small'",
      defaultValue: 'large',
    },
    {
      propType: 'colourStyle',
      type: 'string',
      defaultValue: 'default',
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <SpinnerExample />
  </Example>
);
