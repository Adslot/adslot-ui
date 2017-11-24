import React from 'react';
import _ from 'lodash';
import Immutable from 'seamless-immutable';
import Example from '../components/Example';
import {
  Accordion,
  Checkbox,
} from '../../src/dist-entry';

const initialState = {
  accordionPanels: [
    {
      id: '1',
      icon: { href: './docs/assets/svg-symbols.svg#list' },
      title: 'Filter by region',
      isCollapsed: true,
      content: <ul className="list-unstyled">
        <li><Checkbox label="Australia" /></li>
        <li><Checkbox label="New Zealand" /></li>
      </ul>,
    },
    {
      id: '2',
      icon: { href: './docs/assets/svg-symbols.svg#list' },
      title: 'Filter by device',
      isCollapsed: false,
      content: (<ul className="list-unstyled">
        <li><Checkbox label="Desktop" /></li>
        <li><Checkbox label="Mobile" /></li>
        <li><Checkbox label="Tablet" /></li>
      </ul>),
    },
  ],
};

class AccordionExample extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.toggleAccordionPanel = this.toggleAccordionPanel.bind(this);
  }

  toggleAccordionPanel(panelId) {
    const nextPanels = Immutable.from(this.state.accordionPanels).asMutable({ deep: true });
    const panelToToggle = _.find(nextPanels, { id: panelId });
    panelToToggle.isCollapsed = !panelToToggle.isCollapsed;
    this.setState({ accordionPanels: nextPanels });
  }

  render() {
    return (<Accordion panels={this.state.accordionPanels} onPanelClick={this.toggleAccordionPanel} />);
  }
}


const exampleProps = {
  componentName: 'Accordion',
  exampleCodeSnippet: '<Accordion panels={accordionPanels} onPanelClick={this.toggleAccordionPanel} />',
  propTypes: [
    {
      propType: 'dts',
      type: 'string',
      note: 'render `data-test-selector` onto the component. It can be useful for testing.',
    },
    {
      propType: 'panels',
      type: <span>arrayOf <a href="#panel-example">Panels</a></span>,
    },
    {
      propType: 'onPanelClick',
      type: 'func',
    },
  ],
};


export default () => <Example {...exampleProps}><AccordionExample /></Example>;
