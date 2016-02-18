/* eslint-env node, mocha */
/* global expect */

import { createComponent } from 'testHelpers/shallowRenderHelpers';
import React from 'react';
import TreePickerPaneComponent from 'components/adslotUi/TreePickerPaneComponent';

describe('TreePickerPaneComponent', () => {
  it('should have its component name as default className', () => {
    const component = createComponent(TreePickerPaneComponent);
    expect(component.props.className).to.equal('treepickerpane-component');
  });

  it('should transclude children', () => {
    const component = createComponent(TreePickerPaneComponent, {}, <div />);
    expect(component.props.className).to.equal('treepickerpane-component');
    expect(component.props.children.type).to.equal('div');
  });
});
