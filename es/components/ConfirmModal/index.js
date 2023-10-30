import React from 'react';
import PropTypes from 'prop-types';
import ActionPanel from '../ActionPanel';
import Button from '../Button';
const ConfirmModal = ({
  buttonCancelLabel,
  buttonConfirmLabel,
  modalApply,
  modalClose,
  modalDescription,
  modalTitle,
  show,
  dts
}) => {
  const cancelAction = () => {
    modalClose();
  };
  const applyAction = () => {
    modalApply();
    modalClose();
  };
  return show && /*#__PURE__*/React.createElement(ActionPanel, {
    isModal: true,
    dts: dts,
    className: "confirm-modal-component",
    size: "small",
    title: modalTitle,
    onClose: cancelAction,
    cancelButton: /*#__PURE__*/React.createElement(Button, {
      onClick: cancelAction,
      className: "close-button",
      dts: "header-close-button"
    }, buttonCancelLabel),
    actionButton: /*#__PURE__*/React.createElement(Button, {
      color: "primary",
      onClick: applyAction,
      "data-test-selector": "confirm-modal-confirm"
    }, buttonConfirmLabel)
  }, /*#__PURE__*/React.createElement("p", null, modalDescription));
};
ConfirmModal.propTypes = {
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
  modalApply: PropTypes.func.isRequired,
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
  dts: PropTypes.string
};
ConfirmModal.defaultProps = {
  buttonCancelLabel: 'Cancel',
  buttonConfirmLabel: 'Confirm',
  modalTitle: '',
  modalDescription: 'Are you sure?',
  show: false
};
export default ConfirmModal;