import { shallow } from 'enzyme';
import _ from 'lodash';
import Tag, { ActionButton } from 'components/alexandria/TagComponent';
import SvgSymbol from 'components/alexandria/SvgSymbolComponent';
import React from 'react';
import sinon from 'sinon';

describe('TagComponent', () => {
  it('should render a default tag', () => {
    const component = shallow(<Tag>You are it!</Tag>);
    expect(component.find('span').prop('className')).to.equal('tag-component');
    expect(component.find('span').prop('data-test-selector')).to.equal('tag-default');
    expect(component.find(ActionButton)).to.have.length(0);
  });

  it('should take an id and apply a custom data test selector', () => {
    const component = shallow(<Tag id="foo">You are it!</Tag>);
    expect(component.find('span').prop('data-test-selector')).to.equal('tag-foo');
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
    const component = shallow(<Tag inverse accent="foo">You are it!</Tag>);
    expect(component.find('span').prop('className')).to.equal(
      'tag-component tag-component-inverse tag-component-accent accent-foo'
    );
  });

  it('should render an actionable tag', () => {
    const component = shallow(<Tag onAction={_.noop} actionIconSvgHref="foo">You are it!</Tag>);
    expect(component.find(ActionButton)).to.have.length(1);
    expect(component.find('span').prop('className')).to.equal('tag-component tag-component-actionable');
  });

  it('should render action buttons', () => {
    const onAction = sinon.spy();
    const component = shallow(<ActionButton onAction={onAction} actionIconSvgHref="foo" id="Bar" />);

    expect(component.prop('className')).to.equal('action-button');
    component.simulate('click');
    expect(onAction.calledOnce).to.equal(true);
    expect(onAction.calledWith('Bar')).to.equal(true);
    expect(component.find(SvgSymbol).prop('href')).to.equal('foo');
  });

  it('should render children nodes', () => {
    const component = shallow(<Tag onAction={_.noop} actionIconSvgHref="foo">
      <div className="child" />
      <div className="child" />
    </Tag>);
    expect(component.find('.child')).to.have.length(2);
  });
});
