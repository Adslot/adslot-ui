import React from 'react';
import Example from '../components/Example';
import { InformationBox } from '../../src/dist-entry';

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
