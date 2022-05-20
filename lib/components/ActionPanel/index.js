"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Button = _interopRequireDefault(require("../Button"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ActionPanel = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var title = props.title,
      className = props.className,
      size = props.size,
      onClose = props.onClose,
      children = props.children,
      actionButton = props.actionButton,
      isModal = props.isModal,
      closeIcon = props.closeIcon,
      cancelText = props.cancelText;

  var addBodyClass = function addBodyClass(classname) {
    return document.body.classList.add(classname);
  };

  var removeBodyClass = function removeBodyClass(classname) {
    return document.body.classList.remove(classname);
  };

  (0, _react.useEffect)(function () {
    if (isModal) addBodyClass('modal-open');
    return function () {
      if (isModal) removeBodyClass('modal-open');
    };
  }, [isModal]);

  var actionPanel = /*#__PURE__*/_react.default.createElement("div", {
    ref: ref
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: isModal ? 'aui--action-panel-backdrop' : 'hide'
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('aui--action-panel-wrapper', {
      'aui--action-panel-modal-wrapper': isModal
    })
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('aui--action-panel', "is-".concat(size), {
      'action-modal': isModal
    }, className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('aui--action-panel-header', {
      'has-actions': actionButton
    })
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "title"
  }, title), /*#__PURE__*/_react.default.createElement("span", {
    className: "actions"
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: onClose,
    className: (0, _classnames.default)('close-button', {
      'close-svg-icon': !actionButton
    }),
    dts: "header-close-button",
    icon: !actionButton ? closeIcon : undefined,
    "aria-label": !actionButton ? 'Close' : undefined
  }, actionButton && cancelText), actionButton)), /*#__PURE__*/_react.default.createElement("div", {
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
  cancelText: _propTypes.default.string
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