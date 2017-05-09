import DonutComponent from 'components/alexandria/slicey/DonutComponent';
import { shallow } from 'enzyme';
import React from 'react';

describe('DonutComponent', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DonutComponent />);
  });

  it('should have its component name as default className', () => {
    expect(component.prop('className')).to.equal('donut-component');
  });

  it('should have a radius of .45 of the unit circle and an origin of 0,0', () => {
    expect(component.prop('r')).to.equal('.45');
    expect(component.prop('cx')).to.equal('0');
    expect(component.prop('cy')).to.equal('0');
  });
});
