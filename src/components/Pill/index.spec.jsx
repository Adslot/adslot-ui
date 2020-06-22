import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import Pill from '.';

describe('<Pill />', () => {
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => sandbox.restore());

  it('should have default style', () => {
    const wrapper = mount(<Pill>Test</Pill>);
    expect(wrapper.find('.aui--pill')).to.have.length(1);
    expect(wrapper.find('.aui--pill-children')).to.have.length(1);
    expect(wrapper.find('.aui--pill-clickable')).to.have.length(0);
    expect(wrapper.text()).to.equal('Test');
  });
  it('should allow id prop', () => {
    const wrapper = mount(<Pill id="test">Test</Pill>);
    expect(wrapper.props().id).to.equal('test');
  });

  it('should allow classSuffix prop', () => {
    const wrapper = shallow(<Pill classSuffix="test">Test</Pill>);
    expect(wrapper.find('.aui--pill')).to.have.length(1);
    expect(wrapper.find('.aui--pill-test')).to.have.length(1);
  });

  it('should allow onClick prop', () => {
    const onClickMock = sinon.spy();
    const wrapper = shallow(<Pill onClick={onClickMock}>Test</Pill>);
    expect(wrapper.find('.aui--pill-clickable')).to.have.length(1);
    wrapper.simulate('click');
    expect(onClickMock.callCount).to.equal(1);
  });

  it('should not cause console error if onClick is undefined', () => {
    sandbox.stub(console, 'error');
    const wrapper = shallow(<Pill>Test</Pill>);
    wrapper.simulate('click');
    expect(console.error.callCount).to.equal(0);
  });

  it('should support custom dts', () => {
    const wrapper = shallow(<Pill dts="test-dts">Test</Pill>);
    expect(wrapper.props()['data-test-selector']).to.equal('test-dts');
  });
});
