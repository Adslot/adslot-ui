import React from 'react';
import Example from '../components/Example';
import { PageTitle } from '../../src';

class PageTitleExample extends React.PureComponent {
  render() {
    return (
      <PageTitle title="Campaign 12345: Adslot">
        <small>Version 5</small>
      </PageTitle>
    );
  }
}

const exampleProps = {
  componentName: 'PageTitle',
  designNotes: (
    <div>
      <p>Title are commonly used to ensure the user knows which section they have entered within the application.</p>
      <p>
        <label>Example:</label> Page Title 18px Roboto 300.
      </p>
    </div>
  ),
  exampleCodeSnippet: '<PageTitle title="Campaign 12345: Adslot"><small>Version 5</small></PageTitle>',
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'title',
          type: 'string',
        },
        {
          propType: 'children',
          type: 'node',
        },
        {
          propType: 'isFooter',
          type: 'bool',
          defaultValue: 'false',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <PageTitleExample />
  </Example>
);
