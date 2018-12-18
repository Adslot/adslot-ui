import React from 'react';
import Example from '../components/Example';
import { Empty, SvgSymbol, FlexibleSpacer, Tabs, Tab } from '../../src';

class TabExample extends React.PureComponent {
  render() {
    return (
      <Tabs defaultActiveKey="Audience" animation={false} id="audience-tab">
        <Tab
          eventKey="Audience"
          title={
            <span className="flexible-wrapper-inline">
              <SvgSymbol href="./docs/assets/svg-symbols.svg#list" />
              <FlexibleSpacer />
              Audience
            </span>
          }
        >
          <Empty
            collection={[]}
            text="No audience details."
            svgSymbol={{
              href: './docs/assets/svg-symbols.svg#checklist-incomplete',
            }}
          />
        </Tab>
        <Tab
          eventKey="Billing"
          title={
            <span className="flexible-wrapper-inline">
              <SvgSymbol href="./docs/assets/svg-symbols.svg#calendar" />
              <FlexibleSpacer />
              Billing
            </span>
          }
        >
          <Empty
            collection={[]}
            text="No billing information."
            svgSymbol={{ href: './docs/assets/svg-symbols.svg#calendar' }}
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
      See{' '}
      <a href="https://getbootstrap.com/docs/3.3/components/#nav-tabs" target="_blank" rel="noopener noreferrer">
        Bootstrap documentation
      </a>{' '}
      or{' '}
      <a href="https://react-bootstrap.github.io/components/tabs/" target="_blank" rel="noopener noreferrer">
        React Bootstrap documentation
      </a>
      .
    </p>
  ),
  exampleCodeSnippet: `
  <Tabs defaultActiveKey="Audience" animation={false} id="audience-tab">
    <Tab
      eventKey="Audience"
      title={
        <span className="flexible-wrapper-inline">
          <SvgSymbol href="./docs/assets/svg-symbols.svg#list" />
          <FlexibleSpacer />
          Audience
        </span>}
    >
      <Empty
        collection={[]}
        text="No audience details."
        svgSymbol={{ href: './docs/assets/svg-symbols.svg#checklist-incomplete' }}
      />
    </Tab>
    <Tab
      eventKey="Billing"
      title={
        <span className="flexible-wrapper-inline">
          <SvgSymbol href="./docs/assets/svg-symbols.svg#calendar" />
          <FlexibleSpacer />
          Billing
        </span>}
    >
      <Empty
        collection={[]}
        text="No billing information."
        svgSymbol={{ href: './docs/assets/svg-symbols.svg#calendar' }}
      />
    </Tab>
  </Tabs>`,
  propTypeSectionArray: [],
};

export default () => (
  <Example {...exampleProps}>
    <TabExample />
  </Example>
);
