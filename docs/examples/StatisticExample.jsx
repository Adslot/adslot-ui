import React from 'react';
import Example from '../components/Example';
import { Statistic } from '../../src';

class StatisticExample extends React.PureComponent {
  render() {
    return <Statistic value="50 Million" label="Page Views" />;
  }
}

const exampleProps = {
  componentName: 'Statistic',
  notes: 'Used for metadata stats and pricing information.',
  exampleCodeSnippet: '<Statistic value="50 Million" label="Page Views" />',
  propTypes: [
    {
      propType: 'inline',
      type: 'boolean',
      note: 'Horizontal layout as opposed to stacked.',
      defaultValue: 'false',
    },
    {
      propType: 'label',
      type: 'string',
      note: 'Preferred TitleCase (aka. PascalCase, StartCase)',
    },
    {
      propType: 'value',
      type: 'string',
      note: "Where value is a number consider human readable strings e.g 'Million' instead of 000,000.",
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <StatisticExample />
  </Example>
);
