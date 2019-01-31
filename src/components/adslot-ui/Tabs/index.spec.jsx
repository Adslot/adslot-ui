import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Tabs from '.';
import Tab from '../Tab';

describe('<Tabs />', () => {
  it('should render with props', () => {
    const wrapper = shallow(
      <Tabs defaultActiveKey="first" id="test">
        <Tab eventKey="first" title="Fist">
          Tab1
        </Tab>
        <Tab eventKey="last" title="Second" disabled>
          Tab2
        </Tab>
      </Tabs>
    );
    const links = wrapper.find('a');
    let content = wrapper.find(Tab);
    expect(links.length).to.equal(2);
    expect(content.length).to.equal(2);

    expect(links.last().props().style).to.eql({ pointerEvents: 'none' });

    expect(content.first().props().show).to.equal(true);
    expect(content.last().props().show).to.equal(false);

    links.last().simulate('click', { preventDefault: _.noop });
    content = wrapper.find(Tab);
    expect(content.first().props().show).to.equal(false);
    expect(content.last().props().show).to.equal(true);
  });

  it('should work as controlled', () => {
    const selectSpy = sinon.spy();
    const wrapper = shallow(
      <Tabs activeKey="first" onSelect={selectSpy} id="test">
        <Tab eventKey="first" title="Fist">
          Tab1
        </Tab>
        <Tab eventKey="last" title="Second">
          Tab2
        </Tab>
        <div>other</div>
      </Tabs>
    );
    const links = wrapper.find('a');
    expect(links.length).to.equal(2);

    links.last().simulate('click', { preventDefault: _.noop });
    expect(selectSpy.callCount).to.equal(1);
    expect(selectSpy.calledWith('last')).to.equal(true);
  });

  it('should not re render when key is the same', () => {
    const wrapper = shallow(
      <Tabs defaultActiveKey="first" id="test">
        <Tab eventKey="first" title="Fist">
          Tab1
        </Tab>
        <Tab eventKey="last" title="Second">
          Tab2
        </Tab>
      </Tabs>
    );
    const spy = sinon.spy(wrapper.instance(), 'setState');
    const links = wrapper.find('a');
    links.last().simulate('click', { preventDefault: _.noop });
    links.last().simulate('click', { preventDefault: _.noop });
    expect(spy.callCount).to.equal(1);
  });
});
