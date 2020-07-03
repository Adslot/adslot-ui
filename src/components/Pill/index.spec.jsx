import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import Pill from '.';

describe('<Pill />', () => {
  it('should have default style', () => {
    const wrapper = mount(<Pill>Test</Pill>);
    expect(wrapper.find('.aui--pill')).to.have.length(1);
    expect(wrapper.find('.aui--pill-children')).to.have.length(1);
    expect(wrapper.find('.aui--pill-clickable')).to.have.length(0);
    expect(wrapper.text()).to.equal('Test');
  });

  it('should allow className prop', () => {
    const wrapper = shallow(<Pill className="test">Test</Pill>);
    expect(wrapper.find('.aui--pill')).to.have.length(1);
    expect(wrapper.find('.test')).to.have.length(1);
  });

  it('should allow onClick prop', () => {
    const onClickMock = sinon.spy();
    const wrapper = shallow(<Pill onClick={onClickMock}>Test</Pill>);
    expect(wrapper.find('.aui--pill-clickable')).to.have.length(1);
    wrapper.simulate('click');
    expect(onClickMock.callCount).to.equal(1);
  });

  it('should support custom dts', () => {
    const wrapper = shallow(<Pill dts="test-dts">Test</Pill>);
    expect(wrapper.props()['data-test-selector']).to.equal('test-dts');
  });
});
