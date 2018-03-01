import React from 'react';
import Example from '../components/Example';
import { xxx } from '../../src';

class xxxExample extends React.PureComponent {
  render() {
    return <xxx />;
  }
}

const exampleProps = {
  componentName: 'xxx',
  notes: '',
  exampleCodeSnippet: '<xxx />',
  propTypeSectionArray: [
    {
      label: '',
      propTypes: [
        {
          propType: '',
          type: '',
          defaultValue: '',
          note: '',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <xxxExample />
  </Example>
);
