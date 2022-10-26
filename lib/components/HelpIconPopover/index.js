"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("../../lib/utils");

var _Popover = _interopRequireDefault(require("../Popover"));

const HelpIconPopover = _ref => {
  let {
    children,
    id,
    placement
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({}, (0, _utils.expandDts)(id), {
    className: "help-icon-popover-component"
  }), /*#__PURE__*/_react.default.createElement(_Popover.default, {
    triggers: ['hover'],
    placement: placement,
    popoverContent: children
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "help-icon-popover-component-trigger"
  })));
};

HelpIconPopover.propTypes = {
  children: _propTypes.default.node.isRequired,
  id: _propTypes.default.string.isRequired,
  placement: _propTypes.default.oneOf(['top', 'right', 'bottom', 'left'])
};
HelpIconPopover.defaultProps = {
  placement: 'right'
};
var _default = HelpIconPopover;
exports.default = _default;