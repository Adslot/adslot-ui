import React from 'react';
import Example from '../components/Example';
import { SvgSymbolCircle } from '../../src';

class SvgSymbolCircleExample extends React.PureComponent {
  render() {
    return <SvgSymbolCircle href="./docs/assets/svg-symbols.svg#calendar" classSuffixes={['50']} />;
  }
}

const exampleProps = {
  componentName: 'SvgSymbolCircle',
  designNotes: (
    <p>
      For more details see <a href="#svg-symbol-example">SVG Symbol</a> component.
    </p>
  ),
  exampleCodeSnippet: '<SvgSymbolCircle href="./docs/assets/svg-symbols.svg#calendar" classSuffixes={[\'50\']} />',
  propTypes: [
    {
      propType: 'href',
      type: 'string',
    },
    {
      propType: 'classSuffixes',
      type: 'arrayOf string',
    },
    {
      propType: 'onClick',
      type: 'func',
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <SvgSymbolCircleExample />
  </Example>
);
