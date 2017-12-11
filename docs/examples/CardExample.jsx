import React from 'react';
import Example from '../components/Example';
import { Card } from '../../src/dist-entry';

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
  exampleCodeSnippet: `<Card.Container>
  <Card.Content>Card body.</Card.Content>
</Card.Container>`,
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
};

export default () => (
  <Example {...exampleProps}>
    <CardExample />
  </Example>
);
