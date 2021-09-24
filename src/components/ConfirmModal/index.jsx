import React from 'react';
import PropTypes from 'prop-types';
import ActionPanel from '../ActionPanel';
import Button from '../Button';

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
    show && (
      <ActionPanel
        isModal
        data-testid="confirm-modal-wrapper"
        className="confirm-modal-component"
        size="small"
        title={modalTitle}
        onClose={cancelAction}
        closeIcon={buttonCancelLabel}
        actionButton={
          <Button
            data-testid="confirm-modal-confirm"
            theme="primary"
            onClick={applyAction}
            data-test-selector="confirm-modal-confirm"
          >
            {buttonConfirmLabel}
          </Button>
        }
      >
        <p>{modalDescription}</p>
      </ActionPanel>
    )
  );
};

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
  modalTitle: '',
  modalDescription: 'Are you sure?',
  show: false,
};

export default ConfirmModalComponent;
