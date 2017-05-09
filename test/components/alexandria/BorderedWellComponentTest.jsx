import React from 'react';
import { shallow } from 'enzyme';

import BorderedWellComponent from '../../../src/components/alexandria/BorderedWellComponent';

describe('BorderedWellComponent', () => {
  it('should have its component name as default className', () => {
    const component = shallow(<BorderedWellComponent />);
    expect(component.prop('className')).to.equal('borderedwell-component');
    expect(component.children()).to.have.length(0);
  });

  it('should pass through children', () => {
    const children = <div className="test-class">Party town</div>;
    const component = shallow(<BorderedWellComponent>{children}</BorderedWellComponent>);
    expect(component.prop('className')).to.equal('borderedwell-component');
    expect(component.children()).to.have.length(1);
    expect(component.find('.test-class').text()).to.equal('Party town');
  });
});
