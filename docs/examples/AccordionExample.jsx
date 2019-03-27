import React from 'react';
import { Accordion, Checkbox } from 'adslot-ui';
import Example from '../components/Example';

class AccordionExample extends React.Component {
  state = {
    clickHistory: [],
  };

  onPanelClick = panelId => {
    this.setState({
      clickHistory: [...this.state.clickHistory, `onPanelClick triggered on ${panelId}`],
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-xs-6">
          <Accordion defaultActivePanelIds={['filter-by-region']} onPanelClick={this.onPanelClick} maxExpand={3}>
            <Accordion.Panel id="filter-by-region" title="Filter by region">
              <ul className="list-unstyled">
                <li>
                  <Checkbox label="Australia" />
                </li>
                <li>
                  <Checkbox label="New Zealand" />
                </li>
              </ul>
            </Accordion.Panel>
            <Accordion.Panel id="filter-by-device" title="Filter by device">
              <ul className="list-unstyled">
                <li>
                  <Checkbox label="Desktop" />
                </li>
                <li>
                  <Checkbox label="Mobile" />
                </li>
                <li>
                  <Checkbox label="Tablet" />
                </li>
              </ul>
            </Accordion.Panel>
            <div>test</div>
            <Accordion.Panel id="filter-1" title="Filter 1">
              Filter 1
            </Accordion.Panel>
            <Accordion.Panel id="filter-2" title="Filter 2">
              Filter 2
            </Accordion.Panel>
            <Accordion.Panel id="filter-3" title="Filter 3">
              Filter 3
            </Accordion.Panel>
            <Accordion.Panel id="filter-4" title="Filter 4">
              Filter 4
            </Accordion.Panel>
          </Accordion>
        </div>
        <div className="col-xs-6">
          {this.state.clickHistory.map((text, index) => (
            <div key={`${index}-${text}`}>{text}</div>
          ))}
        </div>
      </div>
    );
  }
}

const exampleProps = {
  componentName: 'Accordion',
  designNotes: (
    <p>
      The accordion menu is commonly used to group long list of filter options. Allowing the user to expand and close
      areas of the list.
    </p>
  ),
  exampleCodeSnippet: `
  <Accordion defaultActivePanelIds={['filter-by-region']} onPanelClick={this.onPanelClick} maxExpand={3}>
    <Accordion.Panel id="filter-by-region" title="Filter by region">
      <ul className="list-unstyled">
        <li>
          <Checkbox label="Australia" />
        </li>
        <li>
          <Checkbox label="New Zealand" />
        </li>
      </ul>
    </Accordion.Panel>
    <Accordion.Panel id="filter-by-device" title="Filter by device">
      <ul className="list-unstyled">
        <li>
          <Checkbox label="Desktop" />
        </li>
        <li>
          <Checkbox label="Mobile" />
        </li>
        <li>
          <Checkbox label="Tablet" />
        </li>
      </ul>
    </Accordion.Panel>
  </Accordion>
  `,
  propTypeSectionArray: [
    {
      propTypes: [
        {
          propType: 'dts',
          type: 'string',
          note: 'render `data-test-selector` onto the component. It can be useful for testing.',
        },
        {
          propType: 'onPanelClick',
          type: 'func',
          note: (
            <span>
              <pre>onPanelClick(panelId)</pre>
              <br />
              takes in a single parameter which is the id of the clicked panel.
            </span>
          ),
        },
        {
          propType: 'defaultActivePanelIds',
          type: 'arrayOf(string)',
        },
        {
          propType: 'maxExpand',
          type: "oneOfType(number, string('max'))",
          defaultValue: 'max',
          note:
            'determine how many Panels can be expanded, accepted value is a positive number, or `max` to have no restriction',
        },
        {
          propType: 'children',
          type: 'node',
          note: (
            <span>
              Accept an array of <a href="#panel-example">{`<Panel />`}</a> or{' '}
              <a href="#accordion-panel-example">{`<Accordion.Panel />`}</a>
            </span>
          ),
        },
      ],
    },
  ],
};

export default () => (
  <Example {...exampleProps}>
    <AccordionExample />
  </Example>
);
