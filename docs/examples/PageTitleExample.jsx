import React from 'react';
import Example from '../components/Example';
import {
  PageTitle,
} from '../../src/dist-entry';


class PageTitleExample extends React.PureComponent {
  render() {
    return (<PageTitle title="Campaign 12345: Adslot"><small>Version 5</small></PageTitle>);
  }
}


const exampleProps = {
  componentName: 'PageTitle',
  exampleCodeSnippet: '<PageTitle title="Campaign 12345: Adslot"><small>Version 5</small></PageTitle>',
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
};


export default () => <Example {...exampleProps}><PageTitleExample /></Example>;
