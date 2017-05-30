import React from 'react';
import { shallow } from 'enzyme';
import Marker from '.';

describe('Marker', () => {
  it('should have its component name as default className', () => {
    const component = shallow(<Marker />);
    expect(component.prop('className')).to.equal('marker-component');
  });

  it('should draw the marker at the top of the circle when given no fraction', () => {
    const component = shallow(<Marker />);
    expect(component.prop('className')).to.equal('marker-component');
    expect(component.prop('points')).to.equal('3.061616997868383e-17,-0.5 0,0');
  });

  it('should draw the marker given a fraction of the circle', () => {
    const props = { fraction: 3 / 4 };
    const component = shallow(<Marker {...props} />);
    expect(component.prop('className')).to.equal('marker-component');
    expect(component.prop('points')).to.equal('-0.5,6.123233995736766e-17 0,0');
  });
});
