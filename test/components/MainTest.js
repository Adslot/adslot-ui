/* eslint-env node, mocha */
/* global expect */

import createComponent from 'testHelpers/shallowRenderHelper';
import Main from 'components/Main';
import React from 'react';
import { isElementOfType, createRenderer } from 'react-addons-test-utils';

import {
  Checkbox,
  Modal,
  MultiPicker,
  Radio,
  RadioGroup,
  Select,
  Toggle,
  TreePicker,
  UserMultiPicker,
} from '../../src/components/distributionEntry';

describe('MainComponent', () => {
  let MainComponent;
  const componentsHash = {
    modalButton: 7,
    modal: 8,
    checkbox: 10,
    radio: 18,
    toggle: 24,
    select: 28,
    selectMulti: 30,
    treePickerButton: 32,
    treePicker: 33,
    multiPickerButton: 35,
    multiPicker: 36,
    userMultiPickerButton: 38,
    userMultiPicker: 39,
  };

  beforeEach(() => {
    MainComponent = createComponent(Main);
  });

  it('should have its component name as default className', () => {
    expect(MainComponent.props.className).to.equal('index');
  });

  it('should have a modal component', () => {
    const modalComponent = MainComponent.props.children[componentsHash.modal];
    expect(isElementOfType(modalComponent, Modal)).to.equal(true);
    expect(modalComponent.props.bsSize).to.equal('small');
    expect(modalComponent.props.keyboard).to.equal(false);
    expect(modalComponent.props.backdrop).to.equal(true);
  });

  it('should open the modal when the button is clicked', () => {
    const renderer = createRenderer();
    renderer.render(<Main />);
    let componentRenderOutput = renderer.getRenderOutput();

    const modalButtonComponent = componentRenderOutput.props.children[componentsHash.modalButton];
    let modalComponent = componentRenderOutput.props.children[componentsHash.modal];
    expect(modalComponent.props.show).to.equal(false);

    modalButtonComponent.props.onClick();

    componentRenderOutput = renderer.getRenderOutput();
    modalComponent = componentRenderOutput.props.children[componentsHash.modal];
    expect(modalComponent.props.show).to.equal(true);
  });

  it('should have a checkbox component', () => {
    const checkboxComponent = MainComponent.props.children[componentsHash.checkbox];
    expect(isElementOfType(checkboxComponent, Checkbox)).to.equal(true);
    expect(checkboxComponent.props.label).to.equal('Unchecked');
  });

  it('should have a radio button component', () => {
    const radioGroupComponent = MainComponent.props.children[componentsHash.radio];
    expect(isElementOfType(radioGroupComponent, RadioGroup)).to.equal(true);
    const radioComponent = radioGroupComponent.props.children[0];
    expect(isElementOfType(radioComponent, Radio)).to.equal(true);
    expect(radioComponent.props.label).to.equal('Unchecked');
  });

  it('should have a toggle component', () => {
    const toggleComponent = MainComponent.props.children[componentsHash.toggle];
    expect(isElementOfType(toggleComponent, Toggle)).to.equal(true);
  });

  it('should set and change values for single select', () => {
    const getRenderOutputAndCheck = ({ renderer, expectedValue }) => {
      const componentRenderOutput = renderer.getRenderOutput();

      const selectComponent = componentRenderOutput.props.children[componentsHash.select];
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

      const selectComponent = componentRenderOutput.props.children[componentsHash.selectMulti];
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

  it('should toggle `showTreePickerModal` on `Open Treepicker` click', () => {
    const renderer = createRenderer();
    renderer.render(<Main />);
    let componentRenderOutput = renderer.getRenderOutput();

    const treePickerButtonElement = componentRenderOutput.props.children[componentsHash.treePickerButton];
    treePickerButtonElement.props.onClick();

    componentRenderOutput = renderer.getRenderOutput();
    const treePickerElement = componentRenderOutput.props.children[componentsHash.treePicker];
    expect(treePickerElement.props.show).to.equal(true);
  });

  it('should pass a custom valueFormatter into the TreePicker', () => {
    const treePickerElement = MainComponent.props.children[componentsHash.treePicker];
    expect(isElementOfType(treePickerElement, TreePicker)).to.equal(true);
    expect(treePickerElement.props.valueFormatter(155)).to.equal('$1.55');
  });

  it('should pass a custom initialSelection into the TreePicker', () => {
    const treePickerElement = MainComponent.props.children[componentsHash.treePicker];
    expect(isElementOfType(treePickerElement, TreePicker)).to.equal(true);
    expect(treePickerElement.props.initialSelection).to.have.length(2);
  });

  it('should pass a custom getSubtree into the TreePicker', () => {
    const treePickerElement = MainComponent.props.children[componentsHash.treePicker];
    expect(isElementOfType(treePickerElement, TreePicker)).to.equal(true);
    treePickerElement.props.getSubtree({}, (subtree) => expect(subtree).to.have.length(0));
    treePickerElement.props.getSubtree({ rootTypeId: '0' }, (subtree) => expect(subtree).to.have.length(4));
  });

  it('should toggle `showMultiPickerModal` on `Open MultiPicker` click', () => {
    const renderer = createRenderer();
    renderer.render(<Main />);
    let componentRenderOutput = renderer.getRenderOutput();

    const multiPickerButtonElement = componentRenderOutput.props.children[componentsHash.multiPickerButton];
    multiPickerButtonElement.props.onClick();

    componentRenderOutput = renderer.getRenderOutput();
    const multiPickerElement = componentRenderOutput.props.children[componentsHash.multiPicker];
    expect(multiPickerElement.props.show).to.equal(true);
  });

  it('should pass a custom labelFormatter into the MultiPicker', () => {
    const multiPickerElement = MainComponent.props.children[componentsHash.multiPicker];
    expect(isElementOfType(multiPickerElement, MultiPicker)).to.equal(true);
    expect(multiPickerElement.props.labelFormatter({ givenName: 'John', surname: 'Doe' })).to.equal('John Doe');
  });

  it('should pass a custom initialSelection into the MultiPicker', () => {
    const multiPickerElement = MainComponent.props.children[componentsHash.multiPicker];
    expect(isElementOfType(multiPickerElement, MultiPicker)).to.equal(true);
    expect(multiPickerElement.props.initialSelection).to.have.length(1);
  });

  it('should toggle `showUserMultiPickerModal` on `Open UserMultiPicker` click', () => {
    const renderer = createRenderer();
    renderer.render(<Main />);
    let componentRenderOutput = renderer.getRenderOutput();

    const userMultiPickerButtonElement = componentRenderOutput.props.children[componentsHash.userMultiPickerButton];
    userMultiPickerButtonElement.props.onClick();

    componentRenderOutput = renderer.getRenderOutput();
    const userMultiPickerElement = componentRenderOutput.props.children[componentsHash.userMultiPicker];
    expect(userMultiPickerElement.props.show).to.equal(true);
  });

  it('should pass a custom avatarColor into the UserMultiPicker', () => {
    const userMultiPickerElement = MainComponent.props.children[componentsHash.userMultiPicker];
    expect(isElementOfType(userMultiPickerElement, UserMultiPicker)).to.equal(true);
    expect(userMultiPickerElement.props.avatarColor()).to.equal('cyan');
  });

  it('should pass a custom initialSelection into the UserMultiPicker', () => {
    const userMultiPickerElement = MainComponent.props.children[componentsHash.userMultiPicker];
    expect(isElementOfType(userMultiPickerElement, UserMultiPicker)).to.equal(true);
    expect(userMultiPickerElement.props.initialSelection).to.have.length(1);
  });
});
