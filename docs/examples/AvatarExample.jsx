import React from 'react';
import Example from '../components/Example';
import { Avatar } from '../../src';

class AvatarExample extends React.PureComponent {
  render() {
    return <Avatar givenName="John" surname="Smith" />;
  }
}

const exampleProps = {
  componentName: 'Avatar',
  designNotes: (
    <div>
      <p>
        Avatars are used to personalise the user’s experience allowing each buyer and seller feel they are collaborating
        with an actual person.
      </p>
      <p>
        <label>Example:</label> Profile area, Inbox and User section.
      </p>
    </div>
  ),
  exampleCodeSnippet: '<Avatar givenName="John" surname="Smith" />',
  propTypeSectionArray: [
    {
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
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <AvatarExample />
  </Example>
);
