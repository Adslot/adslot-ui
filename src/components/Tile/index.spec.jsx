import _ from 'lodash';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import Tile from '.';

const makeProps = override =>
  _.merge(
    {
      id: '123',
    },
    override
  );

describe('<Tile />', () => {
  it('should have default style', () => {
    const wrapper = mount(<Tile {...makeProps()} />);
    expect(wrapper.find('.aui--tile')).to.have.length(1);
    expect(wrapper.find('.aui--tile-title')).to.have.length(1);
    expect(wrapper.find('.aui--tile-title').text()).to.equal('');
    expect(wrapper.find('.aui--tile-logo')).to.have.length(1);
    expect(wrapper.find('.aui--tile-logo').children()).to.have.length(0);
  });

  it('should allow title prop', () => {
    const wrapper = shallow(<Tile {...makeProps({ title: 'test-title' })} />);
    expect(wrapper.find('.aui--tile-title')).to.have.length(1);
    expect(wrapper.find('.aui--tile-title').text()).to.equal('test-title');
  });

  it('should allow imgLink prop', () => {
    const wrapper = shallow(<Tile {...makeProps({ imgLink: 'fake-url' })} />);
    expect(wrapper.find('.aui--tile-logo')).to.have.length(1);
    expect(wrapper.find('.aui--tile-logo').children()).to.have.length(1);
  });

  it('should allow className prop', () => {
    const wrapper = shallow(<Tile {...makeProps({ className: 'test' })} />);
    expect(wrapper.find('.aui--tile.test')).to.have.length(1);
  });

  it('should allow onClick prop', () => {
    const onClickMock = sinon.spy();
    const wrapper = shallow(<Tile {...makeProps({ onClick: onClickMock })} />);
    wrapper.simulate('click');
    expect(onClickMock.callCount).to.equal(1);
  });

  it('should support custom dts', () => {
    const wrapper = shallow(<Tile {...makeProps({ dts: 'test-dts' })} />);
    expect(wrapper.props()['data-test-selector']).to.equal('test-dts');
  });
});
