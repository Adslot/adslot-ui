import React from 'react';
import Example from '../components/Example';
import { InfoIconPopover } from '../../src';

class InfoIconPopoverExample extends React.PureComponent {
  render() {
    return (
      <InfoIconPopover id="info-text-example" theme="dark" placement="bottom">
        <h5>
          <b>Infomation Tip</b>
        </h5>
        <p>
          <i>Some information</i>
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a erat nulla. Morbi sed accumsan magna, nec
          viverra arcu. Nullam nec nisi nisl. Sed sapien risus, lacinia vel lorem ut, varius finibus libero. Praesent
          pretium nisi sed odio pellentesque.
        </p>
      </InfoIconPopover>
    );
  }
}

const exampleProps = {
  componentName: 'Help Icon Popover',
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
  <InfoIconPopover id="help-text-example">
    <p>Download your <em>latest</em> report.</p>
  </InfoIconPopover>`,
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
        {
          propType: 'theme',
          type: 'oneOf[light, dark, warn, error]',
          defaultValue: 'light',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <InfoIconPopoverExample />
  </Example>
);
