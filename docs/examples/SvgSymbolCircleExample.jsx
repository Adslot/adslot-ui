import React from 'react';
import Example from '../components/Example';
import {
  SvgSymbolCircle,
} from '../../src/dist-entry';

class SvgSymbolCircleExample extends React.PureComponent {
  render() {
    return <SvgSymbolCircle href="/assets/svg-symbols.svg#calendar" classSuffixes={['50']} />;
  }
}


const exampleProps = {
  componentName: 'SvgSymbolCircle',
  notes: <span>See <a href="#svg-symbol-component">SVG Symbol</a> component.</span>,
  exampleCodeSnippet: '<SvgSymbolCircle href="/assets/svg-symbols.svg#calendar" classSuffixes={[\'50\']} />',
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


export default () => <Example {...exampleProps}><SvgSymbolCircleExample /></Example>;
