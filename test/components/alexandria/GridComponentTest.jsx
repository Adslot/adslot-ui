import { shallow } from 'enzyme';
import React from 'react';
import GridComponent from '../../../src/components/alexandria/GridComponent';

describe('GridComponent', () => {
  it('should have its component name as default className', () => {
    const component = shallow(<GridComponent />);
    expect(component.prop('className')).to.equal('grid-component');
    expect(component.children()).to.have.length(0);
  });

  it('should pass through children', () => {
    const children = <div className="test-class">Party town</div>;
    const component = shallow(<GridComponent>{children}</GridComponent>);
    expect(component.prop('className')).to.equal('grid-component');

    const childElement = component.children();
    expect(childElement.prop('className')).to.equal('test-class');
    expect(childElement.text()).to.equal('Party town');
  });
});
