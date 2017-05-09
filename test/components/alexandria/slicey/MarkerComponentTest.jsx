import { shallow } from 'enzyme';
import MarkerComponent from 'components/alexandria/slicey/MarkerComponent';
import React from 'react';

describe('MarkerComponent', () => {
  it('should have its component name as default className', () => {
    const component = shallow(<MarkerComponent />);
    expect(component.prop('className')).to.equal('marker-component');
  });

  it('should draw the marker at the top of the circle when given no fraction', () => {
    const component = shallow(<MarkerComponent />);
    expect(component.prop('className')).to.equal('marker-component');
    expect(component.prop('points')).to.equal('3.061616997868383e-17,-0.5 0,0');
  });

  it('should draw the marker given a fraction of the circle', () => {
    const props = { fraction: 3 / 4 };
    const component = shallow(<MarkerComponent {...props} />);
    expect(component.prop('className')).to.equal('marker-component');
    expect(component.prop('points')).to.equal('-0.5,6.123233995736766e-17 0,0');
  });
});
