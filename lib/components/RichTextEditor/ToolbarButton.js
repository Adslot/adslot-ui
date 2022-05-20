"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("../Button"));

var ToolbarButton = function ToolbarButton(_ref) {
  var onToggle = _ref.onToggle,
      label = _ref.label,
      active = _ref.active;
  var className = (0, _classnames.default)('aui--toolbar-button', {
    active: active
  });

  var mouseDownHandler = _react.default.useCallback(function (event) {
    event.preventDefault();
    event.stopPropagation();
    return onToggle();
  }, [onToggle]);

  return /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: className,
    onMouseDown: mouseDownHandler
  }, label);
};

ToolbarButton.propTypes = {
  onToggle: _propTypes.default.func.isRequired,
  label: _propTypes.default.node.isRequired,
  active: _propTypes.default.bool
};
var _default = ToolbarButton;
exports.default = _default;