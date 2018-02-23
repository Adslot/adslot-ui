import React from 'react';
import Example from '../components/Example';
import { Slicey } from '../../src';

class SliceyExample extends React.PureComponent {
  render() {
    return (
      <Slicey
        dataset={[{ label: 'info', value: 35 }, { label: 'positive', value: 123 }, { label: 'negative', value: 15 }]}
        diameter={100}
      />
    );
  }
}

const exampleProps = {
  componentName: 'Slicey',
  exampleCodeSnippet: `
  <Slicey
    dataset={[
      { label: 'info', value: 35 },
      { label: 'positive', value: 123 },
      { label: 'negative', value: 15 },
    ]}
    diameter={100}
  />`,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'dataset',
          type: 'arrayOf {string: label, number: value}',
          note: (
            <span>
              Slicey will represent all values as percentage of the pie based on the sum of all values. Label will
              provide a className to each slice as <pre>.arc-component-{'${label}'}</pre>.
            </span>
          ),
        },
        {
          propType: 'diameter',
          type: 'number',
          defaultValue: '100',
        },
        {
          propType: 'marker',
          type: 'number',
          note: 'Add a line across the radius at a set fraction of the whole e.g. .25 for ¼.',
        },
        {
          propType: 'donut',
          type: 'bool',
          note: 'Set to true if you wish the pie chart to have a hollow hole in the centre, like a donut :9',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <SliceyExample />
  </Example>
);
