"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ActionPanel = _interopRequireDefault(require("../ActionPanel"));

var _Button = _interopRequireDefault(require("../Button"));

const ConfirmModal = _ref => {
  let {
    buttonCancelLabel,
    buttonConfirmLabel,
    modalApply,
    modalClose,
    modalDescription,
    modalTitle,
    show
  } = _ref;

  const cancelAction = () => {
    modalClose();
  };

  const applyAction = () => {
    modalApply();
    modalClose();
  };

  return show && /*#__PURE__*/_react.default.createElement(_ActionPanel.default, {
    isModal: true,
    className: "confirm-modal-component",
    size: "small",
    title: modalTitle,
    onClose: cancelAction,
    closeIcon: buttonCancelLabel,
    actionButton: /*#__PURE__*/_react.default.createElement(_Button.default, {
      color: "primary",
      onClick: applyAction,
      "data-test-selector": "confirm-modal-confirm"
    }, buttonConfirmLabel)
  }, /*#__PURE__*/_react.default.createElement("p", null, modalDescription));
};

ConfirmModal.propTypes = {
  /**
   * determines the label of cancel button
   */
  buttonCancelLabel: _propTypes.default.string,

  /**
   * determines the label of confirm button
   */
  buttonConfirmLabel: _propTypes.default.string,

  /**
   * function called when modalApply event is fired
   */
  modalApply: _propTypes.default.func,

  /**
   * function called when modalClose event is fired
   */
  modalClose: _propTypes.default.func,

  /**
   * description of the modal
   */
  modalDescription: _propTypes.default.string,

  /**
   * title of the modal
   */
  modalTitle: _propTypes.default.string,

  /**
   * determines if the modal needs to be shown or not
   */
  show: _propTypes.default.bool
};
ConfirmModal.defaultProps = {
  buttonCancelLabel: 'Cancel',
  buttonConfirmLabel: 'Confirm',
  modalApply: () => {
    throw new Error('AdslotUi ConfirmModal needs a modalApply handler');
  },
  modalTitle: '',
  modalDescription: 'Are you sure?',
  show: false
};
var _default = ConfirmModal;
exports.default = _default;