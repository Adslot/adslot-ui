import React from 'react';
import Example from '../components/Example';
import { CountBadge } from '../../src';

class CountBadgeExample extends React.PureComponent {
  render() {
    return <CountBadge value={8} status="info" dts="data-test-selector-goes-here" />;
  }
}

const exampleProps = {
  componentName: 'CountBadge',
  notes: '',
  exampleCodeSnippet: `<CountBadge value={8} status="info" dts="data-test-selector-goes-here" />`,
  propTypeSectionArray: [
    {
      label: '',
      propTypes: [
        {
          propType: 'value',
          type: 'string',
          defaultValue: '',
          note: 'Should be a 1- to 3-digit number',
        },
        {
          propType: 'status',
          type: "oneOf: 'default', 'info', 'warning', 'danger'",
          defaultValue: 'default',
          note: '"default" and no value given have the same effect',
        },
        {
          propType: 'dts',
          type: 'string',
          note: 'data test selector, used for testing',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <CountBadgeExample />
  </Example>
);
