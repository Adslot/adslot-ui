import React from 'react';
import Example from '../components/Example';
import {
  SvgSymbol,
} from '../../src/dist-entry';

class SvgSymbolExample extends React.PureComponent {
  render() {
    return <SvgSymbol href="/assets/svg-symbols.svg#checklist-incomplete" classSuffixes={['70']} />;
  }
}


const exampleProps = {
  componentName: 'SvgSymbol',
  exampleCodeSnippet: '<SvgSymbol href="/assets/svg-symbols.svg#checklist-incomplete" classSuffixes={[\'70\']} />',
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


export default () => <Example {...exampleProps}><SvgSymbolExample /></Example>;
