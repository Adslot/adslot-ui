import React from 'react';
import { shallow } from 'enzyme';
import StatusPill from '.';

describe('<StatusPill />', () => {
  it('should have default style', () => {
    const wrapper = shallow(<StatusPill status="test" />);
    expect(wrapper.props().className).to.equal('aui--status-pill aui--status-pill-primary');
  });

  it('should allow style prop', () => {
    const wrapper = shallow(<StatusPill status="test" displayStyle="success" />);
    expect(wrapper.props().className).to.equal('aui--status-pill aui--status-pill-success');
  });

  it('should allow inverse prop', () => {
    const wrapper = shallow(<StatusPill status="test" displayStyle="success" inverse />);
    expect(wrapper.props().className).to.equal('aui--status-pill aui--status-pill-success aui--status-pill-inverse');
  });

  it('should support custom dts', () => {
    const wrapper = shallow(<StatusPill status="test" dts="test-dts" />);
    expect(wrapper.props()['dts']).to.equal('test-dts');
  });
});
