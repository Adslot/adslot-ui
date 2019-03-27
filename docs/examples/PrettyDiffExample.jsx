import React from 'react';
import Example from '../components/Example';
import { PrettyDiff } from 'adslot-ui';

class PrettyDiffExample extends React.PureComponent {
  render() {
    return (
      <PrettyDiff
        newText={`<A HREF="https://adslot.com/buy">
  <IMG SRC="https://adslot.com/image.png" ALT="Buy now.">
</A>`}
        oldText={`<A HREF="http://adslot.com/click">
  <IMG SRC="http://adslot.com/image.jpg" ALT="Click here">
</A>`}
      />
    );
  }
}

const exampleProps = {
  componentName: 'PrettyDiff',
  exampleCodeSnippet: `
    <PrettyDiff
      newText={
        '<A HREF="https://adslot.com/buy">
          <IMG SRC="https://adslot.com/image.png" ALT="Buy now.">
        </A>'
      }
      oldText={
        '<A HREF="http://adslot.com/click">
          <IMG SRC="http://adslot.com/image.jpg" ALT="Click here">
        </A>'
      }
    />
  `,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'oldText',
          type: 'string',
          defaultValue: '',
        },
        {
          propType: 'newText',
          type: 'string',
          defaultValue: '',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <PrettyDiffExample />
  </Example>
);
