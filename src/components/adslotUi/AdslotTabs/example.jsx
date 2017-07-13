import _ from 'lodash';
import React, { Component } from 'react';
import { DropdownButton, MenuItem, Tab } from 'react-bootstrap';
import Tabs from './';
import SvgSymbol from '../../alexandria/SvgSymbol';
import FlexibleSpacer from '../../alexandria/FlexibleSpacer';

export default class AdslotTabsExample extends Component {
  constructor() {
    super();
    this.state = {
      adslotStyle: 'default',
      activeTab: 0,
    };
    this.changeStyle = this.changeStyle.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  changeStyle(eventKey) {
    this.setState({ adslotStyle: eventKey });
  }

  changeTab(eventKey) {
    this.setState({ activeTab: eventKey });
  }

  render() {
    const styleList = {
      chevron: 'Chevron',
      default: 'Default',
    };

    return (
      <div style={{ marginBottom: '10px' }}>
        <h2>Adslot Tabs</h2>
        <div className="row">
          <div className="col-xs-2">Choose Style</div>
          <div className="col-xs-10">
            <DropdownButton
              bsStyle="info"
              title={styleList[this.state.adslotStyle]}
              id="adslot-tabs-dropdown"
              onSelect={this.changeStyle}
            >
              {_.map(styleList, (value, key) => (
                <MenuItem eventKey={key} active={key === this.state.adslotStyle} key={key}>{value}</MenuItem>
              ))}
            </DropdownButton>
          </div>
        </div>
        <br />
        <div className="row">
          <Tabs
            id="adslot-tab-example"
            activeKey={this.state.activeTab}
            onSelect={this.changeTab}
            adslotStyle={this.state.adslotStyle}
          >
            <Tab eventKey={0} title="Default tab">tab 1 content</Tab>
            <Tab eventKey={1} title="Warning tab" tabClassName="warning">tab 2 content</Tab>
            <Tab eventKey={2} title="Success tab" tabClassName="success">tab 3 content</Tab>
            <Tab eventKey={3} title="Warning with active" tabClassName="warning">tab 4 content</Tab>
            <Tab
              eventKey={4}
              title={
                <span className="flexible-wrapper-inline">
                  <SvgSymbol href="/assets/svg-symbols.svg#checklist-incomplete" />
                  <FlexibleSpacer />Audience</span>
              }
              tabClassName="warning"
            >
              Complex title
            </Tab>
            <Tab eventKey={5} title="Disabled with warning" tabClassName="warning" disabled>tab 5 content</Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
