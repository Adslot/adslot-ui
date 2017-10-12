import React from 'react';
import Example from '../components/Example';
import {
  Statistic,
} from '../../src/dist-entry';

class StatisticExample extends React.PureComponent {
  render() {
    return <Statistic value="50 Million" label="Page Views" />;
  }
}

const exampleProps = {
  componentName: 'Statistic',
  exampleCodeSnippet: '<Statistic value="50 Million" label="Page Views" />',
  propTypes: [
    {
      propType: 'inline',
      type: 'boolean',
    }, {
      propType: 'label',
      type: 'string',
    }, {
      propType: 'value',
      type: 'string',
    },
  ],
};


export default () => <Example {...exampleProps}><StatisticExample /></Example>;
