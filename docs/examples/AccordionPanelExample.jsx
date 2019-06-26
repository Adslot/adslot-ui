import React from 'react';
import Example from '../components/Example';
import { Accordion } from '../../src';

class AccordionPanelExample extends React.Component {
  state = {
    isCollapsed: false,
  };

  onPanelClick = () => this.setState({ isCollapsed: !this.state.isCollapsed });

  render() {
    return (
      <Accordion.Panel id="panel-id" title="demo" isCollapsed={this.state.isCollapsed} onClick={this.onPanelClick}>
        Panel content
      </Accordion.Panel>
    );
  }
}

const exampleProps = {
  componentName: 'Accordion.Panel',
  designNotes: (
    <p>
      This component is equivalent to <a href="#panel-example">Panel</a>
    </p>
  ),
  exampleCodeSnippet: `<Accordion.Panel
    id="panel-id"
    title="demo"
    isCollapsed={this.state.isCollapsed}
    onClick={this.onPanelClick}
  >
    Panel content
  </Accordion.Panel>`,
  propTypeSectionArray: [],
};

export default () => (
  <Example {...exampleProps}>
    <AccordionPanelExample />
  </Example>
);
