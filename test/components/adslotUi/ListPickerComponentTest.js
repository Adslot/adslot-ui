/* eslint-env node, mocha */
/* global expect */

import Button from 'react-bootstrap/lib/Button';
import { createAndMountComponent } from 'testHelpers/shallowRenderHelpers';
import Modal from 'react-bootstrap/lib/Modal';
import ListPickerComponent from 'components/adslotUi/ListPickerComponent';
import ListPickerMocks from 'mocks/ListPickerMocks';
import React from 'react';

describe('ListPickerComponent', () => {
  const {
    getInitialSelection,
    userHeaders,
    users,
    labelFormatter,
    teamMember1,
    teamMember2,
  } = ListPickerMocks;

  const getListPickerPureElement = (rootComponent) => {
    const modalBodyElement = rootComponent.props.children[1];
    return modalBodyElement.props.children[1];
  };

  it('should render with defaults', () => {
    const component = createAndMountComponent(ListPickerComponent);
    expect(component.props.className).to.equal('listpicker-component');
    expect(component.type).to.equal((<Modal />).type);
    expect(component.props.show).to.equal(false);
    expect(component.props.bsSize).to.equal('large');
    expect(component.props.keyboard).to.equal(false);

    const modalHeaderElement = component.props.children[0];
    expect(modalHeaderElement.type).to.equal((<Modal.Header />).type);
    const modalTitleElement = modalHeaderElement.props.children;
    expect(modalTitleElement.type).to.equal((<Modal.Title />).type);
    const modalTitleText = modalTitleElement.props.children;
    expect(modalTitleText).to.equal('Select Items');

    const modalBodyElement = component.props.children[1];
    expect(modalBodyElement.type).to.equal((<Modal.Body />).type);

    const modalDescriptionElement = modalBodyElement.props.children[0];
    expect(modalDescriptionElement.type).to.equal('p');
    const modalDescriptionText = modalDescriptionElement.props.children;
    expect(modalDescriptionText).to.equal('Select items.');

    const listPickerPureElement = modalBodyElement.props.children[1];
    expect(listPickerPureElement.type.name).to.equal('ListPickerPureComponent');

    expect(listPickerPureElement.props.deselectItem).to.be.a('function');
    expect(listPickerPureElement.props.labelFormatter).to.be.a('function');
    expect(listPickerPureElement.props.itemHeaders).to.be.an('undefined');
    expect(listPickerPureElement.props.items).to.deep.equal([]);
    expect(listPickerPureElement.props.selectItem).to.be.a('function');
    expect(listPickerPureElement.props.selectedItems).to.deep.equal([]);

    const modalFooterElement = component.props.children[2];
    expect(modalFooterElement.type).to.equal((<Modal.Footer />).type);

    const cancelButtonElement = modalFooterElement.props.children[0];
    expect(cancelButtonElement.type).to.equal((<Button />).type);
    expect(cancelButtonElement.props.className).to.equal('btn-inverse');
    expect(cancelButtonElement.props.onClick).to.be.a('function');
    expect(cancelButtonElement.props.children).to.equal('Cancel');

    const applyButtonElement = modalFooterElement.props.children[1];
    expect(applyButtonElement.type).to.equal((<Button />).type);
    expect(applyButtonElement.props.bsStyle).to.equal('primary');
    expect(applyButtonElement.props.onClick).to.be.a('function');
    expect(applyButtonElement.props.children).to.equal('Apply');
    expect(applyButtonElement.props.disabled).to.equal(false);
  });

  it('should render with props', () => {
    const initialSelection = getInitialSelection();
    const component = createAndMountComponent(ListPickerComponent, {
      initialSelection,
      itemHeaders: userHeaders,
      items: users,
      labelFormatter,
      modalDescription: 'Select users.',
      modalTitle: 'Select Users',
    });
    expect(component.props.className).to.equal('listpicker-component');

    const modalHeaderElement = component.props.children[0];
    const modalTitleElement = modalHeaderElement.props.children;
    const modalTitleText = modalTitleElement.props.children;
    expect(modalTitleText).to.equal('Select Users');

    const modalBodyElement = component.props.children[1];
    const modalDescriptionElement = modalBodyElement.props.children[0];
    const modalDescriptionText = modalDescriptionElement.props.children;
    expect(modalDescriptionText).to.equal('Select users.');

    const listPickerPureElement = getListPickerPureElement(component);
    expect(listPickerPureElement.type.name).to.equal('ListPickerPureComponent');
    expect(listPickerPureElement.props.selectedItems).to.not.equal(initialSelection);
    expect(listPickerPureElement.props.selectedItems).to.deep.equal(initialSelection);

    expect(listPickerPureElement.props.deselectItem).to.be.a('function');
    expect(listPickerPureElement.props.labelFormatter).to.be.a('function');
    expect(listPickerPureElement.props.itemHeaders).to.deep.equal(userHeaders);
    expect(listPickerPureElement.props.items).to.deep.equal(users);
    expect(listPickerPureElement.props.selectItem).to.be.a('function');
    expect(listPickerPureElement.props.selectedItems).to.deep.equal([teamMember2]);
  });

  it('should disable apply button for empty selection if `allowEmptySelection` is false', () => {
    const component = createAndMountComponent(ListPickerComponent, {
      allowEmptySelection: false,
      items: users,
    });

    const modalFooterElement = component.props.children[2];
    const applyButtonElement = modalFooterElement.props.children[1];

    expect(applyButtonElement.props.disabled).to.equal(true);
  });

  it('should change `selectedItems` state after a `selectItem` action', () => {
    const component = createAndMountComponent(ListPickerComponent, {
      initialSelection: getInitialSelection(),
      items: users,
    });
    const listPickerPureElement = getListPickerPureElement(component);
    listPickerPureElement.props.selectItem(teamMember1);

    expect(listPickerPureElement.props.selectedItems).to.deep.equal([teamMember2, teamMember1]);
  });

  it('should only allow one selection if `allowMultiSelection` is false', () => {
    const component = createAndMountComponent(ListPickerComponent, {
      allowMultiSelection: false,
      initialSelection: getInitialSelection(),
      items: users,
    });
    const listPickerPureElement = getListPickerPureElement(component);
    expect(listPickerPureElement.props.selectedItems).to.deep.equal([teamMember2]);

    listPickerPureElement.props.selectItem(teamMember1);

    expect(listPickerPureElement.props.selectedItems).to.deep.equal([teamMember1]);
  });

  it('should change `selectedItems` state after a `deselectItem` action', () => {
    const component = createAndMountComponent(ListPickerComponent, {
      initialSelection: getInitialSelection(),
      items: users,
    });
    const listPickerPureElement = getListPickerPureElement(component);
    listPickerPureElement.props.deselectItem(teamMember2);

    expect(listPickerPureElement.props.selectedItems).to.deep.equal([]);
  });

  it('should show modal when `show` is true', () => {
    const component = createAndMountComponent(ListPickerComponent, { show: true });
    expect(component.props.show).to.equal(true);
  });

  it('should hide modal when `show` is false', () => {
    const component = createAndMountComponent(ListPickerComponent, { show: false });
    expect(component.props.show).to.equal(false);
  });

  it('should call `modalApply` and `modalClose` when we click Apply', () => {
    let applyCalls = null;
    let closeCalls = 0;
    const applyMock = (selectedItems) => applyCalls = selectedItems;
    const closeMock = () => closeCalls += 1;
    const component = createAndMountComponent(ListPickerComponent, {
      initialSelection: getInitialSelection(),
      modalApply: applyMock,
      modalClose: closeMock,
    });

    const modalFooterElement = component.props.children[2];
    const applyButtonElement = modalFooterElement.props.children[1];
    applyButtonElement.props.onClick();

    expect(applyCalls).to.deep.equal([teamMember2]);
    expect(closeCalls).to.equal(1);
  });

  it('should throw when we click Apply without a handler', () => {
    const component = createAndMountComponent(ListPickerComponent);

    const modalFooterElement = component.props.children[2];
    const applyButtonElement = modalFooterElement.props.children[1];
    expect(applyButtonElement.props.onClick).to.throw('AdslotUi ListPicker needs a modalApply handler');
  });

  it('should call `modalClose` when we click Cancel', () => {
    let closeCalls = 0;
    const closeMock = () => closeCalls += 1;

    const component = createAndMountComponent(ListPickerComponent, {
      modalClose: closeMock,
    });

    const modalFooterElement = component.props.children[2];
    const cancelButtonElement = modalFooterElement.props.children[0];

    cancelButtonElement.props.onClick();

    expect(closeCalls).to.equal(1);
  });

  it('should throw when we click Close without a handler', () => {
    const component = createAndMountComponent(ListPickerComponent);

    const modalFooterElement = component.props.children[2];
    const cancelButtonElement = modalFooterElement.props.children[0];
    expect(cancelButtonElement.props.onClick).to.throw('AdslotUi ListPicker needs a modalClose handler');
  });
});
