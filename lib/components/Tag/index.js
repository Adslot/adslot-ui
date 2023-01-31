"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ActionButton = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
const defaultComponentClass = 'tag-component';
const ActionButton = _ref => {
  let {
    onAction,
    id,
    actionIcon
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("span", {
    className: "action-button",
    onClick: () => onAction(id)
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
const Tag = _ref2 => {
  let {
    children,
    inverse,
    id,
    onAction,
    accent,
    className,
    actionIcon,
    dts: customDts
  } = _ref2;
  const classes = (0, _classnames.default)([defaultComponentClass, {
    [`${defaultComponentClass}-inverse`]: inverse,
    [`${defaultComponentClass}-accent accent-${accent}`]: accent,
    [`${defaultComponentClass}-actionable`]: onAction
  }, className]);
  const dts = customDts || `tag-${id}`;
  return /*#__PURE__*/_react.default.createElement("span", {
    className: classes,
    "data-test-selector": dts
  }, children, onAction ? /*#__PURE__*/_react.default.createElement(ActionButton, {
    onAction,
    id,
    actionIcon
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