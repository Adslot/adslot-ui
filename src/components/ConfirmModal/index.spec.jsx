import _ from 'lodash';
import Button from 'react-bootstrap/lib/Button';
import ConfirmModalComponent from 'components/ConfirmModal';
import Modal from 'react-bootstrap/lib/Modal';
import React from 'react';
import { shallow } from 'enzyme';

describe('ConfirmModalComponent', () => {
  it('should render with defaults', () => {
    const component = shallow(<ConfirmModalComponent />);
    expect(component.prop('className')).to.equal('confirm-modal-component');
    expect(component.type()).to.equal(Modal);
    expect(component.prop('show')).to.equal(false);
    expect(component.prop('bsSize')).to.equal('small');
    expect(component.prop('keyboard')).to.equal(false);

    const modalHeaderElement = component.find(Modal.Header);
    expect(modalHeaderElement).to.have.length(0);

    const modalBodyElement = component.find(Modal.Body);
    const modalDescriptionElement = modalBodyElement.children();
    const modalDescriptionText = modalDescriptionElement.text();
    expect(modalDescriptionText).to.equal('Are you sure?');

    const modalFooterElement = component.find(Modal.Footer);
    const applyButtonElement = modalFooterElement.find(Button).first();
    expect(applyButtonElement.prop('bsStyle')).to.equal('primary');
    expect(applyButtonElement.prop('onClick')).to.be.a('function');
    expect(applyButtonElement.children().text()).to.equal('Confirm');
  });

  it('should render with props', () => {
    const props = {
      buttonCancelLabel: 'Close',
      buttonConfirmLabel: 'OK',
      modalClose: _.noop,
      modalDescription: 'If sure, please click confirm.',
      modalTitle: 'Please Confirm',
    };
    const component = shallow(<ConfirmModalComponent {...props} />);
    expect(component.prop('className')).to.equal('confirm-modal-component');

    const modalHeaderElement = component.find(Modal.Header);
    const modalTitleElement = modalHeaderElement.find(Modal.Title);
    const modalTitleText = modalTitleElement.children().text();
    expect(modalTitleText).to.equal('Please Confirm');

    const modalBodyElement = component.find(Modal.Body);
    const modalDescriptionElement = modalBodyElement.children();
    const modalDescriptionText = modalDescriptionElement.text();
    expect(modalDescriptionText).to.equal('If sure, please click confirm.');

    const modalFooterElement = component.find(Modal.Footer);
    const cancelButtonElement = modalFooterElement.find(Button).first();
    expect(cancelButtonElement.prop('className')).to.equal('btn-inverse');
    expect(cancelButtonElement.prop('onClick')).to.be.a('function');
    expect(cancelButtonElement.children().text()).to.equal('Close');

    const applyButtonElement = modalFooterElement.find(Button).last();
    expect(applyButtonElement.prop('bsStyle')).to.equal('primary');
    expect(applyButtonElement.prop('onClick')).to.be.a('function');
    expect(applyButtonElement.children().text()).to.equal('OK');
  });

  it('should show modal when `show` is true', () => {
    const component = shallow(<ConfirmModalComponent show />);
    expect(component.prop('show')).to.equal(true);
  });

  it('should hide modal when `show` is false', () => {
    const component = shallow(<ConfirmModalComponent show={false} />);
    expect(component.prop('show')).to.equal(false);
  });

  it('should call `modalApply` and `modalClose` when we click Apply', () => {
    let applyCalls = 0;
    let closeCalls = 0;
    const applyMock = () => {
      applyCalls++;
    };

    const closeMock = () => {
      closeCalls++;
    };

    const component = shallow(<ConfirmModalComponent modalApply={applyMock} modalClose={closeMock} />);
    const modalFooterElement = component.find(Modal.Footer);
    const applyButtonElement = modalFooterElement.find(Button).last();
    applyButtonElement.simulate('click');
    expect(applyCalls).to.equal(1);
    expect(closeCalls).to.equal(1);
  });

  it('should throw when we click Apply without a handler', () => {
    const component = shallow(<ConfirmModalComponent />);
    const modalFooterElement = component.find(Modal.Footer);
    const applyButtonElement = modalFooterElement.find(Button).first();
    expect(applyButtonElement.prop('onClick')).to.throw('AdslotUi ConfirmModal needs a modalApply handler');
  });

  it('should call `modalClose` when we click Cancel', () => {
    let closeCalls = 0;
    const closeMock = () => {
      closeCalls += 1;
    };

    const component = shallow(<ConfirmModalComponent modalClose={closeMock} />);
    const modalFooterElement = component.find(Modal.Footer);
    const cancelButtonElement = modalFooterElement.find(Button).first();
    cancelButtonElement.simulate('click');
    expect(closeCalls).to.equal(1);
  });
});
