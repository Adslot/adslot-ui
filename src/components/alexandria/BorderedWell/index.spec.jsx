/* eslint-disable lodash/prefer-lodash-method */
import React from 'react';
import { shallow } from 'enzyme';
import BorderedWell from '.';

describe('BorderedWell', () => {
  it('should have its component name as default className', () => {
    const component = shallow(<BorderedWell />);
    expect(component.prop('className')).to.equal('borderedwell-component');
    expect(component.children()).to.have.length(0);
  });

  it('should pass through children', () => {
    const children = <div className="test-class">Party town</div>;
    const component = shallow(<BorderedWell>{children}</BorderedWell>);
    expect(component.prop('className')).to.equal('borderedwell-component');
    expect(component.children()).to.have.length(1);
    expect(component.find('.test-class').text()).to.equal('Party town');
  });
});
