"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ActionButton = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var defaultComponentClass = 'tag-component';

var ActionButton = function ActionButton(_ref) {
  var onAction = _ref.onAction,
      id = _ref.id,
      actionIcon = _ref.actionIcon;
  return /*#__PURE__*/_react.default.createElement("span", {
    className: "action-button",
    onClick: function onClick() {
      return onAction(id);
    }
  }, actionIcon || /*#__PURE__*/_react.default.createElement("span", {
    className: "action-icon"
  }, "\u2715"));
};

exports.ActionButton = ActionButton;
ActionButton.propTypes = {
  id: _propTypes.default.string.isRequired,
  onAction: _propTypes.default.func.isRequired,
  actionIcon: _propTypes.default.node
};

var Tag = function Tag(_ref2) {
  var _ref3;

  var children = _ref2.children,
      inverse = _ref2.inverse,
      id = _ref2.id,
      onAction = _ref2.onAction,
      accent = _ref2.accent,
      className = _ref2.className,
      actionIcon = _ref2.actionIcon,
      customDts = _ref2.dts;
  var classes = (0, _classnames.default)([defaultComponentClass, (_ref3 = {}, (0, _defineProperty2.default)(_ref3, "".concat(defaultComponentClass, "-inverse"), inverse), (0, _defineProperty2.default)(_ref3, "".concat(defaultComponentClass, "-accent accent-").concat(accent), accent), (0, _defineProperty2.default)(_ref3, "".concat(defaultComponentClass, "-actionable"), onAction), _ref3), className]);
  var dts = customDts || "tag-".concat(id);
  return /*#__PURE__*/_react.default.createElement("span", {
    className: classes,
    "data-test-selector": dts
  }, children, onAction ? /*#__PURE__*/_react.default.createElement(ActionButton, {
    onAction: onAction,
    id: id,
    actionIcon: actionIcon
  }) : null);
};

Tag.propTypes = {
  children: _propTypes.default.node.isRequired,
  id: _propTypes.default.string,
  accent: _propTypes.default.string,
  className: _propTypes.default.string,
  inverse: _propTypes.default.bool,
  onAction: _propTypes.default.func,
  actionIcon: _propTypes.default.node,
  dts: _propTypes.default.string
};
Tag.defaultProps = {
  id: 'default'
};
var _default = Tag;
exports.default = _default;