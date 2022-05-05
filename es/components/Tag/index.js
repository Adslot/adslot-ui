import _defineProperty from "@babel/runtime/helpers/defineProperty";
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
var defaultComponentClass = 'tag-component';
export var ActionButton = function ActionButton(_ref) {
  var onAction = _ref.onAction,
      id = _ref.id,
      actionIcon = _ref.actionIcon;
  return /*#__PURE__*/React.createElement("span", {
    className: "action-button",
    onClick: function onClick() {
      return onAction(id);
    }
  }, actionIcon || /*#__PURE__*/React.createElement("span", {
    className: "action-icon"
  }, "\u2715"));
};
ActionButton.propTypes = {
  id: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  actionIcon: PropTypes.node
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
  var classes = classnames([defaultComponentClass, (_ref3 = {}, _defineProperty(_ref3, "".concat(defaultComponentClass, "-inverse"), inverse), _defineProperty(_ref3, "".concat(defaultComponentClass, "-accent accent-").concat(accent), accent), _defineProperty(_ref3, "".concat(defaultComponentClass, "-actionable"), onAction), _ref3), className]);
  var dts = customDts || "tag-".concat(id);
  return /*#__PURE__*/React.createElement("span", {
    className: classes,
    "data-test-selector": dts
  }, children, onAction ? /*#__PURE__*/React.createElement(ActionButton, {
    onAction: onAction,
    id: id,
    actionIcon: actionIcon
  }) : null);
};

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  accent: PropTypes.string,
  className: PropTypes.string,
  inverse: PropTypes.bool,
  onAction: PropTypes.func,
  actionIcon: PropTypes.node,
  dts: PropTypes.string
};
Tag.defaultProps = {
  id: 'default'
};
export default Tag;