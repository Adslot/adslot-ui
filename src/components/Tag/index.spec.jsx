/* eslint-disable lodash/prefer-lodash-method */
import _ from 'lodash';
import { SvgSymbol } from 'adslot-ui';
import { shallow, mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import Tag, { ActionButton } from '.';

describe('Tag', () => {
  it('should render a default tag', () => {
    const component = shallow(<Tag>You are it!</Tag>);
    expect(component.find('span').prop('className')).to.equal('tag-component');
    expect(component.find('span').prop('data-test-selector')).to.equal('tag-default');
    expect(component.find(ActionButton)).to.have.length(0);
  });

  it('should apply a custom data test selector', () => {
    const component = shallow(<Tag dts="foo">You are it!</Tag>);
    expect(component.find('span').prop('data-test-selector')).to.equal('foo');
  });

  it('should render an inverse tag', () => {
    const component = shallow(<Tag inverse>You are it!</Tag>);
    expect(component.find('span').prop('className')).to.equal('tag-component tag-component-inverse');
  });

  it('should render a default tag with highlight', () => {
    const component = shallow(<Tag accent="foo">You are it!</Tag>);
    expect(component.find('span').prop('className')).to.equal('tag-component tag-component-accent accent-foo');
  });

  it('should render an inverse tag with highlight', () => {
    const component = shallow(
      <Tag inverse accent="foo">
        You are it!
      </Tag>
    );
    expect(component.find('span').prop('className')).to.equal(
      'tag-component tag-component-inverse tag-component-accent accent-foo'
    );
  });

  it('should render an actionable tag', () => {
    const component = shallow(
      <Tag onAction={_.noop} actionIconSvgHref="foo">
        You are it!
      </Tag>
    );
    expect(component.find(ActionButton)).to.have.length(1);
    expect(component.find('span').prop('className')).to.equal('tag-component tag-component-actionable');
  });

  it('should render action buttons', () => {
    const onAction = sinon.spy();
    const actionIcon = <SvgSymbol href="foo" />;
    const component = shallow(<ActionButton onAction={onAction} actionIcon={actionIcon} id="Bar" />);

    expect(component.prop('className')).to.equal('action-button');
    component.simulate('click');
    expect(onAction.calledOnce).to.equal(true);
    expect(onAction.calledWith('Bar')).to.equal(true);
    expect(component.find(SvgSymbol).prop('href')).to.equal('foo');
  });

  it('should render children nodes', () => {
    const component = shallow(
      <Tag onAction={_.noop} actionIconSvgHref="foo">
        <div className="child" />
        <div className="child" />
      </Tag>
    );
    expect(component.find('.child')).to.have.length(2);
  });

  it('should render a tag with base class', () => {
    const component = shallow(<Tag baseClass="foo">You are it!</Tag>);
    expect(component.find('span').prop('className')).to.equal('tag-component foo');
  });

  it('should render a actionable tag without svg', () => {
    const component = mount(<Tag onAction={() => sinon.spy()}>You are it!</Tag>);
    expect(component.find(ActionButton)).to.have.length(1);
    expect(
      component
        .find('span')
        .at(2)
        .prop('className')
    ).to.equal('action-icon');
  });
});
