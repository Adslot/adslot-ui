import _ from 'lodash';
import React from 'react';
import Example from '../components/Example';
import { Avatar, HoverDropdownMenu } from '../../src';

class HoverDropdownMenuExample extends React.PureComponent {
  render() {
    const links = [
      {
        title: 'Adslot.com',
        url: 'http://www.adslot.com',
        target: '_self',
        isEnabled: true,
        onClick: _.noop,
      },
      {
        title: 'Logout',
        url: '#',
        target: '_modal',
        isEnabled: true,
        onClick: _.noop,
      },
    ];

    const props = {
      arrowPosition: 'left',
      headerText: 'Hello, John Smith',
      hoverComponent: <Avatar givenName="John" surname="Smith" />,
    };

    return (
      <div className="hover-dropdown-example">
        <HoverDropdownMenu {...props}>
          {_.map(links, link => <HoverDropdownMenu.Item key={link.title} {...link} />)}
        </HoverDropdownMenu>
      </div>
    );
  }
}

const exampleProps = {
  componentName: 'Hover Dropdown Menu',
  notes: '',
  exampleCodeSnippet: `
const links = [
  {
    title: 'Adslot.com',
    url: 'http://www.adslot.com',
    target: '_self',
    isEnabled: true,
    onClick: _.noop,
  },
  {
    title: 'Logout',
    url: '#',
    target: '_modal',
    isEnabled: true,
    onClick: _.noop,
  },
];

const props = {
  arrowPosition: 'left',
  headerText: 'Hello, John Smith',
  hoverComponent: (<Avatar givenName="John" surname="Smith" />),
};

<div className="hover-dropdown-example">
  <HoverDropdownMenu {...props}>
    {_.map(links, (link) => (
      <HoverDropdownMenu.Item key={link.title} {...link} />
    ))}
  </HoverDropdownMenu>
</div>
`,
  propTypes: [
    {
      propType: 'arrowPosition',
      type: "oneOf ['left', 'right']",
      defaultValue: 'left',
      note: 'determine the placement of the popover',
    },
    {
      propType: 'headerText',
      type: 'string',
      defaultValue: '',
      note: 'If set to empty string, header will not be rendered.',
    },
    {
      propType: 'links',
      type: "arrayOf {oneOf ['_self', '_modal']: target, string: title, string: url, bool: isEnabled}",
      defaultValue: '[ ]',
      note: 'Each link will be used to render dropdown item',
    },
    {
      propType: 'hoverComponent',
      type: 'node',
      note: 'displayed element to be hovered on, e.g. Avatar component.',
    },
    {
      propType: 'onLinkClick',
      type: 'func',
      note: 'onLinkClick(link), callback when user clicks on a dropdown item; link is an object of `links` prop',
      defaultValue: '_.noop',
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <HoverDropdownMenuExample />
  </Example>
);
