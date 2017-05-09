import { shallow } from 'enzyme';
import FlexibleSpacerComponent from 'components/alexandria/FlexibleSpacerComponent';
import React from 'react';

describe('FlexibleSpacerComponent', () => {
  it('should have its component name as className', () => {
    const component = shallow(<FlexibleSpacerComponent />);
    expect(component.prop('className')).to.equal('flexible-spacer-component');
  });
});
