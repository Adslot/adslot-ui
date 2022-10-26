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

const ToastContainer = props => /*#__PURE__*/_react.default.createElement(_reactToastify.ToastContainer, Object.assign({
  className: "aui--toast-container"
}, props));

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
ToastContainer.defaultProps = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  draggable: true,
  pauseOnHover: true
};

const getToastClass = theme => (0, _classnames.default)('aui--toast-title', {
  [`aui--toast-title-${theme}`]: theme
});

const ToastMessage = _ref => {
  let {
    toastClass,
    title = '',
    message
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "aui--toast-body-message"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: toastClass
  }, title), /*#__PURE__*/_react.default.createElement("span", null, message)));
};

exports.ToastMessage = ToastMessage;

const withDefaultOptions = options => ({
  position: 'bottom-left',
  autoClose: 5000,
  className: 'aui--toast-notification-body',
  icon: false,
  ...options
});

const ToastNotification = _ref2 => {
  let {
    theme = 'info',
    title = '',
    message,
    ...options
  } = _ref2;
  const toastClass = getToastClass(theme);

  const toastMessage = /*#__PURE__*/_react.default.createElement(ToastMessage, {
    toastClass: toastClass,
    title: title,
    message: message
  });

  _reactToastify.toast.info(toastMessage, withDefaultOptions({
    theme,
    ...options
  }));

  return null;
};

const notify = _ref3 => {
  let {
    theme = 'info',
    title,
    message,
    ...options
  } = _ref3;

  _reactToastify.toast.info( /*#__PURE__*/_react.default.createElement(ToastMessage, {
    toastClass: getToastClass(theme),
    title: title,
    message: message
  }), withDefaultOptions({
    theme,
    ...options
  }));

  return;
}; // this will force types onto the notify function, although it will be incorrectly defined as React.FC


notify.propTypes = {
  title: _propTypes.default.string,
  theme: _propTypes.default.oneOf(['success', 'info', 'alert', 'attention']),
  message: _propTypes.default.node.isRequired
};
ToastNotification.propTypes = {
  /**
   * PropTypes.oneOf(['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'])
   */
  position: _propTypes.default.oneOf(_constants.toastPlacements),
  // Delay in ms to close the toast. If set to false, the notification needs to be closed manually
  autoClose: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.bool]),
  title: _propTypes.default.string,
  theme: _propTypes.default.oneOf(['success', 'info', 'alert', 'attention']),
  message: _propTypes.default.node.isRequired
};
const dismiss = _reactToastify.toast.dismiss;
dismiss.propTypes = {};
const Toast = {
  Container: ToastContainer,
  Notification: ToastNotification,
  notify: notify,
  dismiss
};
var _default = Toast;
exports.default = _default;