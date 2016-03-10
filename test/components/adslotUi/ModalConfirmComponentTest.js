import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import ConfirmModalComponent from 'components/adslotUi/ConfirmModalComponent';
import Modal from 'react-bootstrap/lib/Modal';
import React from 'react';
import { createComponent } from 'testHelpers/shallowRenderHelpers';

describe('ConfirmModalComponent', () => {
  const indices = {
    modal: {
      header: 0,
      body: 1,
      footer: 2,
    },
    modalFooter: {
      cancelButton: 0,
      applyButton: 1,
    },
  };

  it('should render with defaults', () => {
    const component = createComponent(ConfirmModalComponent);
    expect(component.props.className).to.equal('confirm-modal-component');
    expect(component.type).to.equal((<Modal />).type);
    expect(component.props.show).to.equal(false);
    expect(component.props.bsSize).to.equal('small');
    expect(component.props.keyboard).to.equal(false);

    const modalHeaderElement = component.props.children[indices.modal.header];
    expect(modalHeaderElement).to.equal(null);

    const modalBodyElement = component.props.children[indices.modal.body];
    expect(modalBodyElement.type).to.equal((<Modal.Body />).type);
    const modalDescriptionElement = modalBodyElement.props.children;
    const modalDescriptionText = modalDescriptionElement.props.children;
    expect(modalDescriptionText).to.equal('Are you sure?');

    const modalFooterElement = component.props.children[indices.modal.footer];
    expect(modalFooterElement.type).to.equal((<Modal.Footer />).type);

    const cancelButtonElement = modalFooterElement.props.children[indices.modalFooter.cancelButton];
    expect(cancelButtonElement).to.equal(null);

    const applyButtonElement = modalFooterElement.props.children[indices.modalFooter.applyButton];
    expect(applyButtonElement.type).to.equal((<Button />).type);
    expect(applyButtonElement.props.bsStyle).to.equal('primary');
    expect(applyButtonElement.props.onClick).to.be.a('function');
    expect(applyButtonElement.props.children).to.equal('Confirm');
  });

  it('should render with props', () => {
    const component = createComponent(ConfirmModalComponent, {
      buttonCancelLabel: 'Close',
      buttonConfirmLabel: 'OK',
      modalClose: _.noop,
      modalDescription: 'If sure, please click confirm.',
      modalTitle: 'Please Confirm',
    });
    expect(component.props.className).to.equal('confirm-modal-component');

    const modalHeaderElement = component.props.children[indices.modal.header];
    const modalTitleElement = modalHeaderElement.props.children;
    const modalTitleText = modalTitleElement.props.children;
    expect(modalTitleText).to.equal('Please Confirm');

    const modalBodyElement = component.props.children[indices.modal.body];
    const modalDescriptionElement = modalBodyElement.props.children;
    const modalDescriptionText = modalDescriptionElement.props.children;
    expect(modalDescriptionText).to.equal('If sure, please click confirm.');

    const modalFooterElement = component.props.children[indices.modal.footer];
    expect(modalFooterElement.type).to.equal((<Modal.Footer />).type);

    const cancelButtonElement = modalFooterElement.props.children[indices.modalFooter.cancelButton];
    expect(cancelButtonElement.type).to.equal((<Button />).type);
    expect(cancelButtonElement.props.className).to.equal('btn-inverse');
    expect(cancelButtonElement.props.onClick).to.be.a('function');
    expect(cancelButtonElement.props.children).to.equal('Close');

    const applyButtonElement = modalFooterElement.props.children[indices.modalFooter.applyButton];
    expect(applyButtonElement.type).to.equal((<Button />).type);
    expect(applyButtonElement.props.bsStyle).to.equal('primary');
    expect(applyButtonElement.props.onClick).to.be.a('function');
    expect(applyButtonElement.props.children).to.equal('OK');
  });

  it('should show modal when `show` is true', () => {
    const component = createComponent(ConfirmModalComponent, { show: true });
    expect(component.props.show).to.equal(true);
  });

  it('should hide modal when `show` is false', () => {
    const component = createComponent(ConfirmModalComponent, { show: false });
    expect(component.props.show).to.equal(false);
  });

  it('should call `modalApply` and `modalClose` when we click Apply', () => {
    let applyCalls = 0;
    let closeCalls = 0;
    const applyMock = () => {applyCalls++;};

    const closeMock = () => {closeCalls++;};

    const component = createComponent(ConfirmModalComponent, {
      modalApply: applyMock,
      modalClose: closeMock,
    });

    const modalFooterElement = component.props.children[indices.modal.footer];
    const applyButtonElement = modalFooterElement.props.children[indices.modalFooter.applyButton];
    applyButtonElement.props.onClick();

    expect(applyCalls).to.equal(1);
    expect(closeCalls).to.equal(1);
  });

  it('should throw when we click Apply without a handler', () => {
    const component = createComponent(ConfirmModalComponent);

    const modalFooterElement = component.props.children[indices.modal.footer];
    const applyButtonElement = modalFooterElement.props.children[indices.modalFooter.applyButton];
    expect(applyButtonElement.props.onClick).to.throw('AdslotUi ConfirmModal needs a modalApply handler');
  });

  it('should call `modalClose` when we click Cancel', () => {
    let closeCalls = 0;
    const closeMock = () => {closeCalls += 1;};

    const component = createComponent(ConfirmModalComponent, {
      modalClose: closeMock,
    });

    const modalFooterElement = component.props.children[indices.modal.footer];
    const cancelButtonElement = modalFooterElement.props.children[indices.modalFooter.cancelButton];

    cancelButtonElement.props.onClick();

    expect(closeCalls).to.equal(1);
  });
});
