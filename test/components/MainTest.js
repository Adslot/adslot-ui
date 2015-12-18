/* eslint-env node, mocha */
/* global expect */

import createComponent from 'helpers/shallowRenderHelper';
import Main from 'components/Main';
import { isElementOfType } from 'react-addons-test-utils';
import {
  Checkbox,
  Radio,
  RadioGroup,
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
    expect(modalComponent.props.bsClass).to.equal('modal');
    expect(modalComponent.props.bsSize).to.equal('small');
    expect(modalComponent.props.keyboard).to.equal(false);
    expect(modalComponent.props.backdrop).to.equal(true);
  });

  it('should have a checkbox component', () => {
    const checkboxExampleContainer = MainComponent.props.children[10];
    const checkboxComponent = checkboxExampleContainer.props.children;
    expect(isElementOfType(checkboxComponent, Checkbox)).to.equal(true);
    expect(checkboxComponent.props.label).to.equal('Unchecked');
  });

  it('should have a radio button component', () => {
    const radioButtonContainer = MainComponent.props.children[15];
    const radioGroupComponent = radioButtonContainer.props.children;
    expect(isElementOfType(radioGroupComponent, RadioGroup)).to.equal(true);
    const radioComponent = radioGroupComponent.props.children[0];
    expect(isElementOfType(radioComponent, Radio)).to.equal(true);
    expect(radioComponent.props.label).to.equal('Unchecked');
  });
});
