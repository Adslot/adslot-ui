import { shallow } from 'enzyme';
import React from 'react';
import SplitPaneComponent from '.';

describe('SplitPaneComponent', () => {
  it('should have its component name as default className and no data-test-selector', () => {
    const component = shallow(<SplitPaneComponent />);
    expect(component.prop('className')).to.equal('splitpane-component');
    expect(component.prop('data-test-selector')).to.be.an('undefined');
  });

  it('should have its component name as default className with additional classes', () => {
    const splitPaneClass = ['background-highlighted', 'test-class'];
    const component = shallow(<SplitPaneComponent additionalClassNames={splitPaneClass} />);
    expect(component.prop('className')).to.equal('splitpane-component background-highlighted test-class');
    expect(component.prop('data-test-selector')).to.be.an('undefined');
  });

  it('should transclude children', () => {
    const component = shallow(
      <SplitPaneComponent>
        <div />
      </SplitPaneComponent>
    );
    expect(component.prop('className')).to.equal('splitpane-component');
    expect(component.children().type()).to.equal('div');
  });

  it('should set data-test-selector', () => {
    const component = shallow(<SplitPaneComponent dts="please-select-me" />);
    expect(component.prop('data-test-selector')).to.equal('please-select-me');
  });
});
