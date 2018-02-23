import React from 'react';
import Example from '../components/Example';
import { InformationBox } from '../../src';

class InformationBoxExample extends React.PureComponent {
  render() {
    return (
      <InformationBox title="This is an information" icon="./docs/assets/svg-symbols.svg#cancel">
        Content body.
      </InformationBox>
    );
  }
}

const exampleProps = {
  componentName: 'Information Box',
  designNotes: (
    <p>
      Information box is commonly used to highlight useful information on recent actions as well as what needs to be
      next in the workflow.
    </p>
  ),
  exampleCodeSnippet: `
    <InformationBox
      title="This is an information"
      icon="./docs/assets/svg-symbols.svg#cancel">
        Content body.
    </InformationBox>`,
  propTypes: [
    {
      propType: 'children',
      type: 'node',
    },
    {
      propType: 'icon',
      type: 'string',
      note: (
        <span>
          href for <a href="#svg-symbol-example">SVG Symbol</a> component.
        </span>
      ),
    },
    {
      propType: 'title',
      type: 'string',
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <InformationBoxExample />
  </Example>
);
