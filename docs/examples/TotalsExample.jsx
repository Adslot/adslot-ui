import React from 'react';
import Example from '../components/Example';
import { Totals } from 'adslot-ui';

class TotalsExample extends React.PureComponent {
  render() {
    return (
      <Totals
        toSum={[
          { value: 10, isHidden: true },
          { label: 'Movies Category - Medium Rectangle', value: 1000 },
          { label: 'Selected', value: 36.8 },
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
  />`,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'toSum',
          type: 'arrayOf {number: value, string: label, boolean: isHidden}',
          defaultValue: <code>[]</code>,
        },
        {
          propType: 'valueFormatter',
          type: 'func',
          defaultValue: <code>(value) =&gt; `$value`</code>,
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <TotalsExample />
  </Example>
);
