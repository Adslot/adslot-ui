"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ToastMessage = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _reactToastify = require("react-toastify");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("./constants");

var _excluded = ["theme", "title", "message"],
    _excluded2 = ["theme", "title", "message"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var ToastContainer = function ToastContainer(props) {
  return /*#__PURE__*/_react.default.createElement(_reactToastify.ToastContainer, Object.assign({
    className: "aui--toast-container"
  }, props));
};

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

var getToastClass = function getToastClass(theme) {
  return (0, _classnames2.default)('aui--toast-title', (0, _defineProperty2.default)({}, "aui--toast-title-".concat(theme), theme));
};

var ToastMessage = function ToastMessage(_ref) {
  var toastClass = _ref.toastClass,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? '' : _ref$title,
      message = _ref.message;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "aui--toast-body-message"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: toastClass
  }, title), /*#__PURE__*/_react.default.createElement("span", null, message)));
};

exports.ToastMessage = ToastMessage;

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
      options = (0, _objectWithoutProperties2.default)(_ref2, _excluded);
  var toastClass = getToastClass(theme);

  var toastMessage = /*#__PURE__*/_react.default.createElement(ToastMessage, {
    toastClass: toastClass,
    title: title,
    message: message
  });

  _reactToastify.toast.info(toastMessage, withDefaultOptions(_objectSpread({
    theme: theme
  }, options)));

  return null;
};

var notify = function notify(_ref3) {
  var _ref3$theme = _ref3.theme,
      theme = _ref3$theme === void 0 ? 'info' : _ref3$theme,
      title = _ref3.title,
      message = _ref3.message,
      options = (0, _objectWithoutProperties2.default)(_ref3, _excluded2);

  _reactToastify.toast.info( /*#__PURE__*/_react.default.createElement(ToastMessage, {
    toastClass: getToastClass(theme),
    title: title,
    message: message
  }), withDefaultOptions(_objectSpread({
    theme: theme
  }, options)));

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
var Toast = {
  Container: ToastContainer,
  Notification: ToastNotification,
  notify: notify
};
var _default = Toast;
exports.default = _default;