"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../lib/utils");

var Alert = function Alert(_ref) {
  var type = _ref.type,
      children = _ref.children,
      dts = _ref.dts;
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: "alert-component alert-component-".concat(type)
  }, (0, _utils.expandDts)(dts)), children);
};

Alert.propTypes = {
  /**
   * ['success', 'info', 'warning', 'danger']
   */
  type: _propTypes.default.oneOf(['success', 'info', 'warning', 'danger']),
  children: _propTypes.default.node.isRequired,
  dts: _propTypes.default.string
};
Alert.defaultProps = {
  type: 'info'
};
var _default = Alert;
exports.default = _default;