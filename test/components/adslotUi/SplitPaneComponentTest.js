import React from 'react';
import SplitPaneComponent from 'components/adslotUi/SplitPaneComponent';
import { createComponent } from 'testHelpers/shallowRenderHelpers';

describe('SplitPaneComponent', () => {
  it('should have its component name as default className', () => {
    const component = createComponent(SplitPaneComponent);
    expect(component.props.className).to.equal('splitpane-component');
  });

  it('should transclude children', () => {
    const component = createComponent(SplitPaneComponent, {}, <div />);
    expect(component.props.className).to.equal('splitpane-component');
    expect(component.props.children.type).to.equal('div');
  });
});
