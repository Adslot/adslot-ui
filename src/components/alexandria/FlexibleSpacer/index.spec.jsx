import React from 'react';
import { shallow } from 'enzyme';
import FlexibleSpacer from '.';

describe('FlexibleSpacer', () => {
  it('should have its component name as className', () => {
    const component = shallow(<FlexibleSpacer />);
    expect(component.prop('className')).to.equal('flexible-spacer-component');
  });

  it('should return false for shouldComponentUpdate', () => {
    const component = shallow(<FlexibleSpacer />);
    expect(component.instance().shouldComponentUpdate()).to.equal(false);
  });
});
