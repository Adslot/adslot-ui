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
  notes: <span>Help text icon and popoover of rich-text. Useful in modals, accordions and page headers.
  For forms, use stacked <pre>.help-block</pre> text.</span>,
  exampleCodeSnippet: `<HelpIconPopover id="help-text-example">
  <p>Download your <em>latest</em> report.</p>
</HelpIconPopover>`,
  propTypes: [
    {
      propType: 'id',
      type: 'string',
      note: 'A unique identifier for the element.',
    },
    {
      propType: 'children',
      type: 'node',
      note: 'Rich-text, html help message.',
    },
    {
      propType: 'placement',
      type: 'string oneOf top, right, bottom, left',
      defaultValue: 'right',
    },
  ],
};

export default () => <Example {...exampleProps}><HelpIconPopoverExample /></Example>;
