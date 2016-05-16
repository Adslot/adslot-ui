import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import React, { PropTypes } from 'react';

const ConfirmModalComponent = ({
  buttonCancelLabel,
  buttonConfirmLabel,
  modalApply,
  modalClose,
  modalDescription,
  modalTitle,
  show,
}) => {
  const cancelAction = () => { modalClose(); };

  const applyAction = () => {
    modalApply();
    modalClose();
  };

  return (
    <Modal className="confirm-modal-component" show={show} bsSize="small" keyboard={false}>
      {modalTitle ? <Modal.Header><Modal.Title>{modalTitle}</Modal.Title></Modal.Header> : null}
      <Modal.Body>
        <p>{modalDescription}</p>
      </Modal.Body>
      <Modal.Footer>
        {modalClose ? <Button className="btn-inverse" onClick={cancelAction} data-test-selector="confirm-modal-cancel">
          {buttonCancelLabel}</Button> : null}
        <Button bsStyle="primary" onClick={applyAction} data-test-selector="confirm-modal-confirm">
          {buttonConfirmLabel}</Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmModalComponent.displayName = 'AdslotUiConfirmModalComponent';

ConfirmModalComponent.propTypes = {
  buttonCancelLabel: PropTypes.string.isRequired,
  buttonConfirmLabel: PropTypes.string.isRequired,
  modalApply: PropTypes.func.isRequired,
  modalClose: PropTypes.func,
  modalDescription: PropTypes.string.isRequired,
  modalTitle: PropTypes.string,
  show: PropTypes.bool.isRequired,
};

ConfirmModalComponent.defaultProps = {
  buttonCancelLabel: 'Cancel',
  buttonConfirmLabel: 'Confirm',
  modalApply: () => { throw new Error('AdslotUi ConfirmModal needs a modalApply handler'); },

  modalDescription: 'Are you sure?',
  show: false,
};

export default ConfirmModalComponent;
