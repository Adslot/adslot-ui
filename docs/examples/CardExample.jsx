import React from 'react';
import Example from '../components/Example';
import { Card } from '../../src';

class CardExample extends React.PureComponent {
  render() {
    return (
      <Card.Container>
        <Card.Content>Card body.</Card.Content>
      </Card.Container>
    );
  }
}

const exampleProps = {
  componentName: 'Card',
  designNotes: (
    <p>Cards are used as a visual list which usually contain a logo or icon to assist the user in with discovery.</p>
  ),
  exampleCodeSnippet: `
  <Card.Container>
    <Card.Content>Card body.</Card.Content>
  </Card.Container>`,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'children',
          type: 'arrayOf <Card.Content>',
        },
        {
          propType: 'className',
          type: 'string',
        },
        {
          propType: 'accent',
          type: 'string',
        },
        {
          propType: 'dts',
          type: 'string',
          note: 'render `data-test-selector` onto the component. It can be useful for testing.',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <CardExample />
  </Example>
);
