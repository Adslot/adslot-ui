"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _utils = require("../../utils");
var _Button = _interopRequireDefault(require("../Button"));
const ActionPanel = /*#__PURE__*/_react.default.forwardRef(({
  title,
  size = 'large',
  onClose,
  isModal = false,
  children,
  actionButton = null,
  cancelButton = null,
  visuallyHidden,
  className,
  dts
}, ref) => {
  const addBodyClass = classname => document.body.classList.add(classname);
  const removeBodyClass = classname => document.body.classList.remove(classname);
  _react.default.useLayoutEffect(() => {
    if (isModal) addBodyClass('modal-open');
    return () => {
      if (visuallyHidden) return;
      if (isModal) removeBodyClass('modal-open');
    };
  }, [isModal, visuallyHidden]);
  const defaultCancelButton = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, actionButton ? /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: onClose,
    className: "close-button",
    dts: "header-close-button"
  }, "Cancel") : /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: onClose,
    className: (0, _classnames.default)('close-button', 'close-svg-icon'),
    dts: "header-close-button",
    icon: /*#__PURE__*/_react.default.createElement("div", {
      className: "close-icon"
    }),
    "aria-label": 'Close'
  }));
  const actionPanel = /*#__PURE__*/_react.default.createElement("div", {
    ref: ref
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(isModal ? 'aui--action-panel-backdrop' : 'hide', {
      'visually-hidden': visuallyHidden
    })
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('aui--action-panel-wrapper', {
      'aui--action-panel-modal-wrapper': isModal,
      'visually-hidden': visuallyHidden
    })
  }, /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: (0, _classnames.default)('aui--action-panel', `is-${size}`, {
      'action-modal': isModal
    }, className)
  }, (0, _utils.expandDts)(dts)), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('aui--action-panel-header', {
      'has-actions': actionButton
    })
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, title), /*#__PURE__*/_react.default.createElement("span", {
    className: "actions"
  }, cancelButton ? cancelButton : defaultCancelButton, actionButton)), /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--action-panel-body"
  }, children))));
  return isModal ? /*#__PURE__*/_reactDom.default.createPortal(actionPanel, document.body) : actionPanel;
});
ActionPanel.propTypes = {
  title: _propTypes.default.node.isRequired,
  // large is intended to be used in a modal
  size: _propTypes.default.oneOf(['small', 'medium', 'large']),
  onClose: _propTypes.default.func.isRequired,
  isModal: _propTypes.default.bool,
  children: _propTypes.default.node.isRequired,
  actionButton: _propTypes.default.node,
  cancelButton: _propTypes.default.node,
  /**
   * Hides the modal with css, but keeps it mounted.
   * This should only be used if you need to launch an ActionPanel
   * from within another ActionPanel.
   */
  visuallyHidden: _propTypes.default.bool,
  className: _propTypes.default.string,
  dts: _propTypes.default.string
};
var _default = exports.default = ActionPanel;