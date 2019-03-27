import React from 'react';
import Example from '../components/Example';
import { SvgSymbol } from 'adslot-ui';

class SvgSymbolExample extends React.PureComponent {
  render() {
    return <SvgSymbol href="./docs/assets/svg-symbols.svg#checklist-incomplete" classSuffixes={['70']} />;
  }
}

const exampleProps = {
  componentName: 'SvgSymbol',
  designNotes: (
    <div>
      <p>
        SVGs are used to provide visual support for an action or information. Icons and graphics are used alongside
        text, inside a button, tab and larger graphics are used to provide information around a state of a page,
        onboarding or recommending an action that could be taken.
      </p>
      <label>Examples:</label>
      <p>
        <span className="text-bold">Larger graphics</span> - Get Started page, Information blocks.
        <br />
        <span className="text-bold">Smaller icons</span> - Import, export buttons, campaign tabs.
      </p>
    </div>
  ),
  exampleCodeSnippet:
    '<SvgSymbol href="./docs/assets/svg-symbols.svg#checklist-incomplete" classSuffixes={[\'70\']} />',
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'href',
          type: 'string',
          note: 'accept both file path and base64 encoded string',
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
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <SvgSymbolExample />
  </Example>
);
