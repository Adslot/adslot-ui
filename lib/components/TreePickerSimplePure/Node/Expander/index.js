"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _Cell = _interopRequireDefault(require("../../../Grid/Cell"));
var _Spinner = _interopRequireDefault(require("../../../Spinner"));
const TreePickerNodeExpander = ({
  isLoading,
  onClick
}) => {
  const props = {
    dts: 'expander',
    onClick: isLoading ? null : onClick
  };
  return /*#__PURE__*/_react.default.createElement(_Cell.default, props, isLoading ? /*#__PURE__*/_react.default.createElement(_Spinner.default, {
    size: "small"
  }) : /*#__PURE__*/_react.default.createElement("div", {
    className: "treepickernode-component-expander"
  }));
};
TreePickerNodeExpander.propTypes = {
  isLoading: _propTypes.default.bool,
  onClick: _propTypes.default.func.isRequired
};
TreePickerNodeExpander.defaultProps = {
  isLoading: false
};
var _default = exports.default = TreePickerNodeExpander;