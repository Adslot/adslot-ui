/* eslint-env node, mocha */
/* global expect */

import createComponent from 'helpers/shallowRenderHelper';
import Main from 'components/Main';
import React from 'react';
import { isElementOfType, createRenderer } from 'react-addons-test-utils';
import {
  Checkbox,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Toggle,
} from '../../src/components/distributionEntry';

describe('MainComponent', () => {
  let MainComponent;

  beforeEach(() => {
    MainComponent = createComponent(Main);
  });

  it('should have its component name as default className', () => {
    expect(MainComponent.props.className).to.equal('index');
  });

  it('should have a modal component', () => {
    const modalComponent = MainComponent.props.children[8];
    expect(isElementOfType(modalComponent, Modal)).to.equal(true);
    expect(modalComponent.props.bsSize).to.equal('small');
    expect(modalComponent.props.keyboard).to.equal(false);
    expect(modalComponent.props.backdrop).to.equal(true);
  });

  it('should have a checkbox component', () => {
    const checkboxComponent = MainComponent.props.children[10];
    expect(isElementOfType(checkboxComponent, Checkbox)).to.equal(true);
    expect(checkboxComponent.props.label).to.equal('Unchecked');
  });

  it('should have a radio button component', () => {
    const radioGroupComponent = MainComponent.props.children[18];
    expect(isElementOfType(radioGroupComponent, RadioGroup)).to.equal(true);
    const radioComponent = radioGroupComponent.props.children[0];
    expect(isElementOfType(radioComponent, Radio)).to.equal(true);
    expect(radioComponent.props.label).to.equal('Unchecked');
  });

  it('should have a toggle component', () => {
    const toggleComponent = MainComponent.props.children[24];
    expect(isElementOfType(toggleComponent, Toggle)).to.equal(true);
  });

  it('should set and change values for single select', () => {
    const getRenderOutputAndCheck = ({ renderer, expectedValue }) => {
      const componentRenderOutput = renderer.getRenderOutput();

      const selectComponent = componentRenderOutput.props.children[28];
      expect(isElementOfType(selectComponent, Select)).to.equal(true);
      expect(selectComponent.props.value).to.equal(expectedValue);

      return { selectComponent };
    };

    const renderer = createRenderer();
    renderer.render(<Main />);

    const { selectComponent } = getRenderOutputAndCheck({
      renderer,
      expectedValue: 'au',
    });

    selectComponent.props.onChange({ value: 'uk' });

    getRenderOutputAndCheck({
      renderer,
      expectedValue: 'uk',
    });
  });

  it('should set and change values for multi select', () => {
    const getRenderOutputAndCheck = ({ renderer, expectedValue }) => {
      const componentRenderOutput = renderer.getRenderOutput();

      const selectComponent = componentRenderOutput.props.children[30];
      expect(isElementOfType(selectComponent, Select)).to.equal(true);
      expect(selectComponent.props.value).to.eql(expectedValue);

      return { selectComponent };
    };

    const renderer = createRenderer();
    renderer.render(<Main />);

    const { selectComponent } = getRenderOutputAndCheck({
      renderer,
      expectedValue: 'vanilla',
    });

    selectComponent.props.onChange('vanilla,chocolate');

    getRenderOutputAndCheck({
      renderer,
      expectedValue: 'vanilla,chocolate',
    });
  });
});
