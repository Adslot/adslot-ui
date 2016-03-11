import React from 'react';
import SplitPaneComponent from 'components/adslotUi/SplitPaneComponent';
import { shallow } from 'enzyme';

describe('SplitPaneComponent', () => {
  it('should have its component name as default className', () => {
    const component = shallow(<SplitPaneComponent />);
    expect(component.prop('className')).to.equal('splitpane-component');
  });

  it('should transclude children', () => {
    const component = shallow(<SplitPaneComponent><div /></SplitPaneComponent>);
    expect(component.prop('className')).to.equal('splitpane-component');
    expect(component.children().type()).to.equal('div');
  });
});
