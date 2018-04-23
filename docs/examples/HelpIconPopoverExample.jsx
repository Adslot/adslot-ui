import React from 'react';
import Example from '../components/Example';
import { HelpIconPopover } from '../../src';

class HelpIconPopoverExample extends React.PureComponent {
  render() {
    return (
      <HelpIconPopover id="help-text-example">
        <p>
          Download your <em>latest</em> report.
        </p>
      </HelpIconPopover>
    );
  }
}

const exampleProps = {
  componentName: 'Help Icon',
  designNotes: (
    <div>
      <p>
        Help icon is commonly used to deliver information on an area. On hover a popover will present the user with
        information about eg. cell, form section etc.
      </p>
      <p>
        <label>Example:</label> Cell and Form section.
      </p>
    </div>
  ),
  notes: (
    <span>
      Help text icon and popoover of rich-text. Useful in modals, accordions and page headers. For forms, use stacked{' '}
      <code>.help-block</code> text.
    </span>
  ),
  exampleCodeSnippet: `
  <HelpIconPopover id="help-text-example">
    <p>Download your <em>latest</em> report.</p>
  </HelpIconPopover>`,
  propTypeSectionArray: [
    {
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
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <HelpIconPopoverExample />
  </Example>
);
