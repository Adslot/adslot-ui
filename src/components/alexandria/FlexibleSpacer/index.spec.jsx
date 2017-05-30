import React from 'react';
import { shallow } from 'enzyme';
import FlexibleSpacerComponent from '.';

describe('FlexibleSpacerComponent', () => {
  it('should have its component name as className', () => {
    const component = shallow(<FlexibleSpacerComponent />);
    expect(component.prop('className')).to.equal('flexible-spacer-component');
  });
});
