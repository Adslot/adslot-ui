import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["theme", "title", "message"],
    _excluded2 = ["theme", "title", "message"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import React from 'react';
import classnames from 'classnames';
import { toast, ToastContainer as ReactToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import { toastPlacements } from './constants';

var ToastContainer = function ToastContainer(props) {
  return /*#__PURE__*/React.createElement(ReactToastContainer, Object.assign({
    className: "aui--toast-container"
  }, props));
};

ToastContainer.propTypes = {
  /**
   * PropTypes.oneOf(['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'])
   */
  position: PropTypes.oneOf(toastPlacements),
  // Delay in ms to close the toast. If set to false, the notification needs to be closed manually
  autoClose: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  // Display or not the progress bar below the toast(remaining time)
  hideProgressBar: PropTypes.bool,
  // Display newest toast on top
  newestOnTop: PropTypes.bool,
  // Dismiss toast on click
  closeOnClick: PropTypes.bool,
  // Support right to left content
  rtl: PropTypes.bool,
  // Allow toast to be draggable
  draggable: PropTypes.bool,
  // Keep the timer running or not on hover
  pauseOnHover: PropTypes.bool
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

var getToastClass = function getToastClass(theme) {
  return classnames('aui--toast-title', _defineProperty({}, "aui--toast-title-".concat(theme), theme));
};

export var ToastMessage = function ToastMessage(_ref) {
  var toastClass = _ref.toastClass,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? '' : _ref$title,
      message = _ref.message;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "aui--toast-body-message"
  }, /*#__PURE__*/React.createElement("span", {
    className: toastClass
  }, title), /*#__PURE__*/React.createElement("span", null, message)));
};

var withDefaultOptions = function withDefaultOptions(options) {
  return _objectSpread({
    position: 'bottom-left',
    autoClose: 5000,
    className: 'aui--toast-notification-body',
    icon: false
  }, options);
};

var ToastNotification = function ToastNotification(_ref2) {
  var _ref2$theme = _ref2.theme,
      theme = _ref2$theme === void 0 ? 'info' : _ref2$theme,
      _ref2$title = _ref2.title,
      title = _ref2$title === void 0 ? '' : _ref2$title,
      message = _ref2.message,
      options = _objectWithoutProperties(_ref2, _excluded);

  var toastClass = getToastClass(theme);
  var toastMessage = /*#__PURE__*/React.createElement(ToastMessage, {
    toastClass: toastClass,
    title: title,
    message: message
  });
  toast.info(toastMessage, withDefaultOptions(_objectSpread({
    theme: theme
  }, options)));
  return null;
};

var notify = function notify(_ref3) {
  var _ref3$theme = _ref3.theme,
      theme = _ref3$theme === void 0 ? 'info' : _ref3$theme,
      title = _ref3.title,
      message = _ref3.message,
      options = _objectWithoutProperties(_ref3, _excluded2);

  toast.info( /*#__PURE__*/React.createElement(ToastMessage, {
    toastClass: getToastClass(theme),
    title: title,
    message: message
  }), withDefaultOptions(_objectSpread({
    theme: theme
  }, options)));
  return;
}; // this will force types onto the notify function, although it will be incorrectly defined as React.FC


notify.propTypes = {
  title: PropTypes.string,
  theme: PropTypes.oneOf(['success', 'info', 'alert', 'attention']),
  message: PropTypes.node.isRequired
};
ToastNotification.propTypes = {
  /**
   * PropTypes.oneOf(['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'])
   */
  position: PropTypes.oneOf(toastPlacements),
  // Delay in ms to close the toast. If set to false, the notification needs to be closed manually
  autoClose: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  title: PropTypes.string,
  theme: PropTypes.oneOf(['success', 'info', 'alert', 'attention']),
  message: PropTypes.node.isRequired
};
var Toast = {
  Container: ToastContainer,
  Notification: ToastNotification,
  notify: notify
};
export default Toast;