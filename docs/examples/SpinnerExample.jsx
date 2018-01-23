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
