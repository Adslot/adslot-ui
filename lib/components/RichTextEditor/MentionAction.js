"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ToolbarButton = _interopRequireDefault(require("./ToolbarButton"));

const MentionAction = _ref => {
  let {
    onToggle
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_ToolbarButton.default, {
    label: /*#__PURE__*/_react.default.createElement("div", {
      className: "mention-button"
    }, "@"),
    onToggle: onToggle,
    "aria-label": "Mention"
  });
};

var _default = MentionAction;
exports.default = _default;
MentionAction.propTypes = {
  onToggle: _propTypes.default.func
};