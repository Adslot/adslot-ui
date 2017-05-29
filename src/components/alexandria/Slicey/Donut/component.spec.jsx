import React from 'react';
import { shallow } from 'enzyme';
import DonutComponent from './component';

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
