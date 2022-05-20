"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Statistic = function Statistic(_ref) {
  var label = _ref.label,
      value = _ref.value,
      inline = _ref.inline;
  var baseClass = 'statistic-component';
  var statisticClassNames = [baseClass];
  if (inline) statisticClassNames.push('inline');
  return /*#__PURE__*/_react.default.createElement("label", {
    className: statisticClassNames.join(' ')
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(baseClass, "-value")
  }, value), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(baseClass, "-label")
  }, label));
};

Statistic.propTypes = {
  /**
   * 	Horizontal layout as opposed to stacked.
   */
  inline: _propTypes.default.bool,

  /**
   * Preferred TitleCase (aka. PascalCase, StartCase)
   */
  label: _propTypes.default.string.isRequired,

  /**
   * Where value is a number consider human readable strings e.g 'Million' instead of 000,000.
   */
  value: _propTypes.default.string.isRequired
};
Statistic.defaultProps = {
  inline: false
};
var _default = Statistic;
exports.default = _default;