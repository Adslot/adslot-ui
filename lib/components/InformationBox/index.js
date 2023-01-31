"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
const styles = ['primary', 'success', 'warning', 'error', 'light'];
const InformationBox = _ref => {
  let {
    children,
    icon,
    title,
    className,
    theme,
    dts
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('aui--information-box', `aui--information-box-${theme}`, className),
    "data-test-selector": dts
  }, icon ? /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--information-box-icon"
  }, icon) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--information-box-text"
  }, title ? /*#__PURE__*/_react.default.createElement("label", {
    className: "aui--information-box-title"
  }, title) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--information-box-node"
  }, children)));
};
InformationBox.propTypes = {
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  /**
   * oneOf: 'primary', 'success', 'warning', 'error', 'light'
   */
  theme: _propTypes.default.oneOf(styles),
  title: _propTypes.default.node,
  icon: _propTypes.default.node,
  dts: _propTypes.default.string
};
InformationBox.defaultProps = {
  theme: 'light'
};
var _default = InformationBox;
exports.default = _default;