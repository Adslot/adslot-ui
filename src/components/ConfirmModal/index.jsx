import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

const ConfirmModalComponent = ({
  buttonCancelLabel,
  buttonConfirmLabel,
  modalApply,
  modalClose,
  modalDescription,
  modalTitle,
  show,
}) => {
  const cancelAction = () => {
    modalClose();
  };

  const applyAction = () => {
    modalApply();
    modalClose();
  };

  return (
    <Modal className="confirm-modal-component" show={show} bsSize="small" keyboard={false}>
      {modalTitle ? (
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
      ) : null}
      <Modal.Body>
        <p>{modalDescription}</p>
      </Modal.Body>
      <Modal.Footer>
        {modalClose ? (
          <Button className="btn-inverse" onClick={cancelAction} data-test-selector="confirm-modal-cancel">
            {buttonCancelLabel}
          </Button>
        ) : null}
        <Button bsStyle="primary" onClick={applyAction} data-test-selector="confirm-modal-confirm">
          {buttonConfirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmModalComponent.displayName = 'ConfirmModalComponent';

ConfirmModalComponent.propTypes = {
  /**
   * determines the label of cancel button
   */
  buttonCancelLabel: PropTypes.string,
  /**
   * determines the label of confirm button
   */
  buttonConfirmLabel: PropTypes.string,
  /**
   * function called when modalApply event is fired
   */
  modalApply: PropTypes.func,
  /**
   * function called when modalClose event is fired
   */
  modalClose: PropTypes.func,
  /**
   * description of the modal
   */
  modalDescription: PropTypes.string,
  /**
   * title of the modal
   */
  modalTitle: PropTypes.string,
  /**
   * determines if the modal needs to be shown or not
   */
  show: PropTypes.bool,
};

ConfirmModalComponent.defaultProps = {
  buttonCancelLabel: 'Cancel',
  buttonConfirmLabel: 'Confirm',
  modalApply: () => {
    throw new Error('AdslotUi ConfirmModal needs a modalApply handler');
  },
  modalDescription: 'Are you sure?',
  show: false,
};

export default ConfirmModalComponent;
