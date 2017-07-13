import React from 'react';
import { shallow } from 'enzyme';
import { Tab } from 'react-bootstrap';
import Tabs from './';

describe('AdslotTabs', () => {
  it('should render a AdslotTabs element with default style', () => {
    const component = shallow(
      <Tabs defaultActiveKey={4} id="adslot-tabs-test" className="extra-class">
        <Tab eventKey={1} title="Default tab">tab 1 content</Tab>
        <Tab eventKey={2} title="Warning tab" tabClassName="warning">tab 2 content</Tab>
        <Tab eventKey={3} title="Success tab" tabClassName="success">tab 3 content</Tab>
        <Tab eventKey={4} title="Warning with active" tabClassName="warning">tab 4 content</Tab>
      </Tabs>
    );

    expect(component.prop('className')).to.equal('extra-class');

    const tabComponents = component.find(Tab); // eslint-disable-line lodash/prefer-lodash-method
    expect(tabComponents.at(0).prop('tabClassName')).to.equal(undefined);
    expect(tabComponents.at(1).prop('tabClassName')).to.equal('warning');
    expect(tabComponents.at(2).prop('tabClassName')).to.equal('success');
    expect(tabComponents.at(3).prop('tabClassName')).to.equal('warning');
  });

  it('should render with chevron style', () => {
    const component = shallow(
      <Tabs defaultActiveKey={4} id="adslot-tabs-test" className="extra-class" adslotStyle="chevron">
        <Tab eventKey={1} title="Default tab">tab 1 content</Tab>
        <Tab eventKey={2} title="Warning tab" tabClassName="warning">tab 2 content</Tab>
        <Tab eventKey={3} title="Success tab" tabClassName="success">tab 3 content</Tab>
        <Tab eventKey={4} title="Warning with active" tabClassName="warning">tab 4 content</Tab>
      </Tabs>
    );

    expect(component.prop('className')).to.equal('extra-class chevron-tabs-component');

    const tabComponents = component.find(Tab); // eslint-disable-line lodash/prefer-lodash-method
    expect(tabComponents.at(0).prop('tabClassName')).to.equal('chevron-tab-component');
    expect(tabComponents.at(1).prop('tabClassName')).to.equal('warning chevron-tab-component');
    expect(tabComponents.at(2).prop('tabClassName')).to.equal('success chevron-tab-component');
    expect(tabComponents.at(3).prop('tabClassName')).to.equal('warning chevron-tab-component');
  });
});
