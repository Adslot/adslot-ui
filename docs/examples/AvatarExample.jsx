import React from 'react';
import Example from '../components/Example';
import { Avatar } from '../../src/dist-entry';

class AvatarExample extends React.PureComponent {
  render() {
    return <Avatar givenName="John" surname="Smith" />;
  }
}

const exampleProps = {
  componentName: 'Avatar',
  exampleCodeSnippet: '<Avatar givenName="John" surname="Smith" />',
  propTypes: [
    {
      propType: 'color',
      type: 'string',
    },
    {
      propType: 'givenName',
      type: 'string',
    },
    {
      propType: 'tooltip',
      type: 'string',
    },
    {
      propType: 'surname',
      type: 'string',
    },
    {
      propType: 'image',
      type: 'string',
      note: 'URL to image source (e.g. Gravatar).',
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <AvatarExample />
  </Example>
);
