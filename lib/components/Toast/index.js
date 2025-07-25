"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ToastMessage = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _reactToastify = require("react-toastify");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("./constants");
var _utils = require("../../utils");
const ToastContainer = ({
  position = 'bottom-left',
  autoClose = 5000,
  hideProgressBar = true,
  newestOnTop = false,
  closeOnClick = true,
  rtl = false,
  draggable = true,
  pauseOnHover = true,
  ...rest
}) => /*#__PURE__*/_react.default.createElement(_reactToastify.ToastContainer, Object.assign({
  className: "aui--toast-container",
  position: position,
  autoClose: autoClose,
  hideProgressBar: hideProgressBar,
  newestOnTop: newestOnTop,
  closeOnClick: closeOnClick,
  rtl: rtl,
  draggable: draggable,
  pauseOnHover: pauseOnHover
}, rest));
ToastContainer.propTypes = {
  /**
   * PropTypes.oneOf(['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'])
   */
  position: _propTypes.default.oneOf(_constants.toastPlacements),
  // Delay in ms to close the toast. If set to false, the notification needs to be closed manually
  autoClose: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.bool]),
  // Display or not the progress bar below the toast(remaining time)
  hideProgressBar: _propTypes.default.bool,
  // Display newest toast on top
  newestOnTop: _propTypes.default.bool,
  // Dismiss toast on click
  closeOnClick: _propTypes.default.bool,
  // Support right to left content
  rtl: _propTypes.default.bool,
  // Allow toast to be draggable
  draggable: _propTypes.default.bool,
  // Keep the timer running or not on hover
  pauseOnHover: _propTypes.default.bool
};
const getToastClass = theme => (0, _classnames.default)('aui--toast-title', {
  [`aui--toast-title-${theme}`]: theme
});
const ToastMessage = ({
  toastClass,
  title = '',
  message,
  dts
}) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", Object.assign({
  className: "aui--toast-body-message"
}, (0, _utils.expandDts)(dts)), /*#__PURE__*/_react.default.createElement("span", {
  className: toastClass
}, title), /*#__PURE__*/_react.default.createElement("span", null, message)));
exports.ToastMessage = ToastMessage;
const withDefaultOptions = options => ({
  position: 'bottom-left',
  autoClose: 5000,
  className: 'aui--toast-notification-body',
  icon: false,
  ...options
});
const notify = ({
  theme = 'info',
  title,
  message,
  dts,
  ...options
}) => {
  _reactToastify.toast.info(/*#__PURE__*/_react.default.createElement(ToastMessage, {
    toastClass: getToastClass(theme),
    title: title,
    message: message,
    dts: dts
  }), withDefaultOptions({
    theme,
    ...options
  }));
  return;
};

// this will force types onto the notify function, although it will be incorrectly defined as React.FC
notify.propTypes = {
  title: _propTypes.default.string,
  theme: _propTypes.default.oneOf(['success', 'info', 'alert', 'attention']),
  message: _propTypes.default.node.isRequired,
  dts: _propTypes.default.string
};
const dismiss = _reactToastify.toast.dismiss;
dismiss.propTypes = {};
const Toast = {
  Container: ToastContainer,
  notify: notify,
  dismiss
};
var _default = exports.default = Toast;