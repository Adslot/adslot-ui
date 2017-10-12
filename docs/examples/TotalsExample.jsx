import React from 'react';
import Example from '../components/Example';
import {
  Totals,
} from '../../src/dist-entry';


class TotalsExample extends React.PureComponent {
  render() {
    return (
      <Totals
        toSum={[
          { value: 10, isHidden: true },
          { label: 'Movies Category - Medium Rectangle', value: 1000 },
          { label: 'Selected', value: 36.80 },
        ]}
      />
    );
  }
}


const exampleProps = {
  componentName: 'Totals',
  exampleCodeSnippet: `
    <Totals
      toSum={[
        { value: 10, isHidden: true },
        { label: 'Movies Category - Medium Rectangle', value: 1000 },
        { label: 'Selected', value: 36.80 },
      ]}
    />
  `,
  propTypes: [
    {
      propType: 'toSum',
      type: 'arrayOf {number: value, string: label, boolean: isHidden}',
    },
  ],
};


export default () => <Example {...exampleProps}><TotalsExample /></Example>;
