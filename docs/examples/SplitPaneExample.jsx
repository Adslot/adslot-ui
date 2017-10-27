import React from 'react';
import Example from '../components/Example';
import {
  SplitPane,
} from '../../src/dist-entry';

class SplitPaneExample extends React.PureComponent {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <SplitPane dts="left-side">
          <p>First pane</p>
        </SplitPane>
        <SplitPane dts="right-side">
          <p>Second pane</p>
        </SplitPane>
      </div>
    );
  }
}


const exampleProps = {
  componentName: 'SplitPane',
  exampleCodeSnippet: `<div style={{ display: 'flex' }}>
  <SplitPane dts="left-side">
    <p>First pane</p>
  </SplitPane>
  <SplitPane dts="right-side">
    <p>Second pane</p>
  </SplitPane>
</div>`,
  propTypes: [
    {
      propType: 'additionalClassNames',
      type: 'array',
      defaultValue: <pre>[]</pre>,
    },
    {
      propType: 'children',
      type: 'node',
    },
    {
      propType: 'dts',
      type: 'string',
      note: 'render `data-test-selector` onto the component. It can be useful for testing.',
    },
  ],
};


export default () => <Example {...exampleProps}><SplitPaneExample /></Example>;
