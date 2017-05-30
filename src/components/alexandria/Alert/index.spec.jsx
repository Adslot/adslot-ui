import React from 'react';
import { shallow } from 'enzyme';
import Alert from '.';

describe('Alert', () => {
  it('should render default info type', () => {
    const component = shallow(<Alert><div /></Alert>);
    expect(component.prop('className')).to.equal('alert-component alert-component-info');
    expect(component.children().type()).to.equal('div');
  });

  it('should render success type', () => {
    const component = shallow(<Alert type="success"><div /></Alert>);
    expect(component.prop('className')).to.equal('alert-component alert-component-success');
  });

  it('should render warning type', () => {
    const component = shallow(<Alert type="warning"><div /></Alert>);
    expect(component.prop('className')).to.equal('alert-component alert-component-warning');
  });

  it('should render danger type', () => {
    const component = shallow(<Alert type="danger"><div /></Alert>);
    expect(component.prop('className')).to.equal('alert-component alert-component-danger');
  });
});
