import React from 'react';
import Example from '../components/Example';
import {
  HelpIconPopover,
} from '../../src/dist-entry';

class HelpIconPopoverExample extends React.PureComponent {
  render() {
    return (
      <HelpIconPopover id="help-text-example">
        <p>Download your <em>latest</em> report.</p>
      </HelpIconPopover>
    );
  }
}

const exampleProps = {
  componentName: 'Help Icon',
  exampleCodeSnippet: `<HelpIconPopover id="help-text-example">
  <p>Download your <em>latest</em> report.</p>
</HelpIconPopover>`,
  propTypes: [
    {
      propType: 'id',
      type: 'string',
    },
    {
      propType: 'children',
      type: 'node',
    },
  ],
};

export default () => <Example {...exampleProps}><HelpIconPopoverExample /></Example>;
