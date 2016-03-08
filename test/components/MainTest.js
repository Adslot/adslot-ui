/* eslint-env node, mocha */
/* global expect */

import { createComponent } from 'testHelpers/shallowRenderHelpers';
import Main from 'components/Main';
import React from 'react';
import { isElementOfType, createRenderer } from 'react-addons-test-utils';

import {
  Checkbox,
  ListPicker,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Toggle,
  TreePicker,
  UserListPicker,
} from '../../src/components/distributionEntry';

describe('MainComponent', () => {
  let MainComponent;
  const componentsHash = {
    modalButton: 7,
    modal: 8,
    confirmModalButton: 9,
    confirmModal: 10,
    checkbox: 12,
    radio: 20,
    toggle: 26,
    select: 30,
    selectList: 32,
    treePickerButton: 34,
    treePicker: 35,
    listPickerButton: 37,
    listPicker: 38,
    splitListPickerButton: 39,
    splitListPicker: 40,
    userListPickerButton: 42,
    userListPicker: 43,
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

  it('should open the modal when clicking the button', () => {
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

  it('should open the confirm modal when clicking the button', () => {
    const renderer = createRenderer();
    renderer.render(<Main />);
    let componentRenderOutput = renderer.getRenderOutput();

    const modalButtonComponent = componentRenderOutput.props.children[componentsHash.confirmModalButton];
    let modalComponent = componentRenderOutput.props.children[componentsHash.confirmModal];
    expect(modalComponent.props.show).to.equal(false);

    modalButtonComponent.props.onClick();

    componentRenderOutput = renderer.getRenderOutput();
    modalComponent = componentRenderOutput.props.children[componentsHash.confirmModal];
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

  it('should set and change values for list select', () => {
    const getRenderOutputAndCheck = ({ renderer, expectedValue }) => {
      const componentRenderOutput = renderer.getRenderOutput();

      const selectComponent = componentRenderOutput.props.children[componentsHash.selectList];
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

  it('should toggle `showListPickerModal` on `Open ListPicker` click', () => {
    const renderer = createRenderer();
    renderer.render(<Main />);
    let componentRenderOutput = renderer.getRenderOutput();

    const listPickerButtonElement = componentRenderOutput.props.children[componentsHash.listPickerButton];
    listPickerButtonElement.props.onClick();

    componentRenderOutput = renderer.getRenderOutput();
    const listPickerElement = componentRenderOutput.props.children[componentsHash.listPicker];
    expect(listPickerElement.props.show).to.equal(true);
  });

  it('should pass a custom labelFormatter into the ListPicker', () => {
    const listPickerElement = MainComponent.props.children[componentsHash.listPicker];
    expect(isElementOfType(listPickerElement, ListPicker)).to.equal(true);
    expect(listPickerElement.props.labelFormatter({ givenName: 'John', surname: 'Doe' })).to.equal('John Doe');
  });

  it('should pass a custom initialSelection into the ListPicker', () => {
    const listPickerElement = MainComponent.props.children[componentsHash.listPicker];
    expect(isElementOfType(listPickerElement, ListPicker)).to.equal(true);
    expect(listPickerElement.props.initialSelection).to.have.length(1);
  });

  it('should toggle `showSplitListPickerModal` on `Open Split ListPicker` click', () => {
    const renderer = createRenderer();
    renderer.render(<Main />);
    let componentRenderOutput = renderer.getRenderOutput();

    const splitListPickerButtonElement = componentRenderOutput.props.children[componentsHash.splitListPickerButton];
    splitListPickerButtonElement.props.onClick();

    componentRenderOutput = renderer.getRenderOutput();
    const splitListPickerElement = componentRenderOutput.props.children[componentsHash.splitListPicker];
    expect(splitListPickerElement.props.show).to.equal(true);
  });

  it('should toggle `showUserListPickerModal` on `Open UserListPicker` click', () => {
    const renderer = createRenderer();
    renderer.render(<Main />);
    let componentRenderOutput = renderer.getRenderOutput();

    const userListPickerButtonElement = componentRenderOutput.props.children[componentsHash.userListPickerButton];
    userListPickerButtonElement.props.onClick();

    componentRenderOutput = renderer.getRenderOutput();
    const userListPickerElement = componentRenderOutput.props.children[componentsHash.userListPicker];
    expect(userListPickerElement.props.show).to.equal(true);
  });

  it('should pass a custom avatarColor into the UserListPicker', () => {
    const userListPickerElement = MainComponent.props.children[componentsHash.userListPicker];
    expect(isElementOfType(userListPickerElement, UserListPicker)).to.equal(true);
    expect(userListPickerElement.props.avatarColor()).to.equal('cyan');
  });

  it('should pass a custom initialSelection into the UserListPicker', () => {
    const userListPickerElement = MainComponent.props.children[componentsHash.userListPicker];
    expect(isElementOfType(userListPickerElement, UserListPicker)).to.equal(true);
    expect(userListPickerElement.props.initialSelection).to.have.length(1);
  });
});
