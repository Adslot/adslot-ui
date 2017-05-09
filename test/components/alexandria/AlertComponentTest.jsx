import AlertComponent from 'components/alexandria/AlertComponent';
import { shallow } from 'enzyme';
import React from 'react';

describe('AlertComponent', () => {
  it('should render default info type', () => {
    const component = shallow(<AlertComponent><div /></AlertComponent>);
    expect(component.prop('className')).to.equal('alert-component alert-component-info');
    expect(component.children().type()).to.equal('div');
  });

  it('should render success type', () => {
    const component = shallow(<AlertComponent type="success"><div /></AlertComponent>);
    expect(component.prop('className')).to.equal('alert-component alert-component-success');
  });

  it('should render warning type', () => {
    const component = shallow(<AlertComponent type="warning"><div /></AlertComponent>);
    expect(component.prop('className')).to.equal('alert-component alert-component-warning');
  });

  it('should render danger type', () => {
    const component = shallow(<AlertComponent type="danger"><div /></AlertComponent>);
    expect(component.prop('className')).to.equal('alert-component alert-component-danger');
  });
});
