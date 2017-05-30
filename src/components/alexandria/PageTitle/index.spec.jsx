/* eslint-disable lodash/prefer-lodash-method */
import React from 'react';
import { shallow } from 'enzyme';
import PageTitle from '.';

describe('PageTitle', () => {
  it('should have its component name as default className', () => {
    const component = shallow(<PageTitle />);
    expect(component.prop('className')).to.equal('pagetitle-component');
    expect(component.children()).to.have.length(0);
  });

  it('should render its title', () => {
    const component = shallow(<PageTitle title="Foo" />);
    expect(component.prop('className')).to.equal('pagetitle-component');
    expect(component.children()).to.have.length(1);
    expect(component.text()).to.equal('Foo');
  });

  it('should pass through children', () => {
    const children = <div className="test-class">Party town</div>;
    const component = shallow(<PageTitle title="Foo">{children}</PageTitle>);
    expect(component.prop('className')).to.equal('pagetitle-component');
    expect(component.childAt(0).prop('className')).to.equal('flexible-wrapper-inline');
    expect(component.childAt(0).children()).to.have.length(3);
    expect(component.find('.test-class').text()).to.equal('Party town');
  });

  it('should be a footer when asked', () => {
    const component = shallow(<PageTitle isFooter />);
    expect(component.prop('className')).to.equal('pagetitle-component pagetitle-component-is-footer');
    expect(component.childAt(0).children()).to.have.length(0);
  });
});
