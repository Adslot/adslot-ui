import React from 'react';
import _ from 'lodash';
import Example from '../components/Example';
import { Panel } from 'adslot-ui';

class PanelExample extends React.Component {
  constructor() {
    super();
    this.state = {
      isCollapsed: true,
    };
    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel() {
    const nextPanel = _.assign({}, this.state);
    nextPanel.isCollapsed = !nextPanel.isCollapsed;
    this.setState(nextPanel);
  }

  render() {
    return (
      <Panel
        id="8db886a1-671f-4a40-a000-3c6bf1f87ecd"
        title="Read more about integration"
        isCollapsed={this.state.isCollapsed}
        onClick={this.togglePanel}
      >
        <p>
          Lorem ipsum amet dolore voluptate veniam nulla dolore nulla adipisicing irure adipisicing qui fugiat veniam.
          Ullamco reprehenderit cillum irure esse ad eu dolor laboris.
        </p>
        <p>Consequat commodo consequat eiusmod sit mollit elit ex nostrud consectetur.</p>
      </Panel>
    );
  }
}

const exampleProps = {
  componentName: 'Panel',
  designNotes: (
    <p>
      Panel is an expandable information panel which can be used in a group (accordion). Panel is not commonly used on
      its own.
    </p>
  ),
  exampleCodeSnippet: `
  <Panel
    id="8db886a1-671f-4a40-a000-3c6bf1f87ecd"
    title="Read more about integration"
    isCollapsed={this.state.isCollapsed}
    onClick={this.togglePanel}
  >
    <p>
      Lorem ipsum amet dolore voluptate veniam nulla dolore nulla adipisicing irure
      adipisicing qui fugiat veniam. Ullamco reprehenderit cillum irure esse ad eu dolor laboris.
    </p>
    <p>Consequat commodo consequat eiusmod sit mollit elit ex nostrud consectetur.</p>
  </Panel>`,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'id',
          type: 'string',
          defaultValue: '',
          note: '',
        },
        {
          propType: 'className',
          type: 'string',
          defaultValue: '',
          note: '',
        },
        {
          propType: 'dts',
          type: 'string',
          note: 'render `data-test-selector` onto the component. It can be useful for testing.',
        },
        {
          propType: 'icon',
          type: (
            <span>
              shapeOf <a href="#svg-symbol-component">SVG Symbol</a> prop types.
            </span>
          ),
        },
        {
          propType: 'title',
          type: 'string',
          defaultValue: '',
          note: '',
        },
        {
          propType: 'isCollapsed',
          type: 'boolean',
          note: '',
        },
        {
          propType: 'onClick',
          type: 'func',
          defaultValue: '',
          note: '',
        },
        {
          propType: 'children',
          type: 'node',
          defaultValue: '',
          note: '',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <PanelExample />
  </Example>
);
