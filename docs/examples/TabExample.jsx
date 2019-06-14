import React from 'react';
import Example from '../components/Example';
import { Empty, SvgSymbol, FlexibleSpacer, Tabs, Tab } from '../../src';

class TabExample extends React.Component {
  state = {
    activeTab: 'Audience',
  };

  switchTab = tabKey => {
    this.setState({
      activeTab: tabKey,
    });
  };

  render() {
    return (
      <Tabs activeKey={this.state.activeTab} onSelect={this.switchTab} id="audience-tab">
        <Tab
          eventKey="Audience"
          title={
            <span className="flexible-wrapper-inline">
              <SvgSymbol href="./assets/svg-symbols.svg#list" />
              <FlexibleSpacer />
              Audience
            </span>
          }
        >
          <Empty
            collection={[]}
            text="No audience details."
            svgSymbol={{
              href: './assets/svg-symbols.svg#checklist-incomplete',
            }}
          />
        </Tab>
        <Tab
          eventKey="Billing"
          title={
            <span className="flexible-wrapper-inline">
              <SvgSymbol href="./assets/svg-symbols.svg#calendar" />
              <FlexibleSpacer />
              Billing
            </span>
          }
        >
          <Empty
            collection={[]}
            text="No billing information."
            svgSymbol={{ href: './assets/svg-symbols.svg#calendar' }}
          />
        </Tab>
      </Tabs>
    );
  }
}

const exampleProps = {
  componentName: 'Tab',
  designNotes: (
    <p>
      Tabs are most commonly used with areas that require the user to switch between views. Each tab label is supported
      by an icon.
    </p>
  ),
  notes: (
    <p>
      This is not a react-bootstrap component. However it implements the same API for switching tabs. Only the props
      listed are supported.
    </p>
  ),
  exampleCodeSnippet: `
  <Tabs activeKey={this.state.activeTab} onSelect={this.switchTab} id="audience-tab">
    <Tab
      eventKey="Audience"
      title={
        <span className="flexible-wrapper-inline">
          <SvgSymbol href="./assets/svg-symbols.svg#list" />
          <FlexibleSpacer />
          Audience
        </span>
      }
    >
      <Empty
        collection={[]}
        text="No audience details."
        svgSymbol={{
          href: './assets/svg-symbols.svg#checklist-incomplete',
        }}
      />
    </Tab>
    <Tab
      eventKey="Billing"
      title={
        <span className="flexible-wrapper-inline">
          <SvgSymbol href="./assets/svg-symbols.svg#calendar" />
          <FlexibleSpacer />
          Billing
        </span>
      }
    >
      <Empty
        collection={[]}
        text="No billing information."
        svgSymbol={{ href: './assets/svg-symbols.svg#calendar' }}
      />
    </Tab>
  </Tabs>`,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'defaultActiveKey',
          type: 'oneOfType [string, number]',
        },
        {
          propType: 'activeKey',
          type: 'oneOfType [string, number]',
        },
        {
          propType: 'onSelect',
          type: 'func',
          note: `(selectedTabKey) => {...}`,
        },
        {
          propType: 'id',
          type: 'string',
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <TabExample />
  </Example>
);
