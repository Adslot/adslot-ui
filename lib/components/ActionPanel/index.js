"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _utils = require("../../lib/utils");

var _Button = _interopRequireDefault(require("../Button"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ActionPanel = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const {
    title,
    className,
    size,
    onClose,
    children,
    actionButton,
    isModal,
    closeIcon,
    cancelText,
    dts
  } = props;

  const addBodyClass = classname => document.body.classList.add(classname);

  const removeBodyClass = classname => document.body.classList.remove(classname);

  (0, _react.useEffect)(() => {
    if (isModal) addBodyClass('modal-open');
    return () => {
      if (isModal) removeBodyClass('modal-open');
    };
  }, [isModal]);

  const actionPanel = /*#__PURE__*/_react.default.createElement("div", {
    ref: ref
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: isModal ? 'aui--action-panel-backdrop' : 'hide'
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('aui--action-panel-wrapper', {
      'aui--action-panel-modal-wrapper': isModal
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
  }, actionButton ? /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: onClose,
    className: "close-button",
    dts: "header-close-button"
  }, cancelText) : /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: onClose,
    className: (0, _classnames.default)('close-button', 'close-svg-icon'),
    dts: "header-close-button",
    icon: closeIcon,
    "aria-label": 'Close'
  }), actionButton)), /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--action-panel-body"
  }, children))));

  return isModal ? /*#__PURE__*/_reactDom.default.createPortal(actionPanel, document.body) : actionPanel;
});

ActionPanel.propTypes = {
  title: _propTypes.default.node.isRequired,
  className: _propTypes.default.string,
  // large is intended to be used in a modal
  size: _propTypes.default.oneOf(['small', 'medium', 'large']),
  onClose: _propTypes.default.func.isRequired,
  children: _propTypes.default.node.isRequired,
  actionButton: _propTypes.default.node,
  closeIcon: _propTypes.default.node,
  isModal: _propTypes.default.bool,
  cancelText: _propTypes.default.string,
  dts: _propTypes.default.string
};
ActionPanel.defaultProps = {
  size: 'large',
  actionButton: null,
  isModal: false,
  closeIcon: /*#__PURE__*/_react.default.createElement("div", {
    className: "close-icon"
  }),
  cancelText: 'Cancel'
};
var _default = ActionPanel;
exports.default = _default;