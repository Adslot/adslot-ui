"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Grid = _interopRequireDefault(require("../Grid"));

var _Cell = _interopRequireDefault(require("../Grid/Cell"));

var _Row = _interopRequireDefault(require("../Grid/Row"));

/* eslint-disable react/no-array-index-key */
const Totals = _ref => {
  let {
    toSum,
    valueFormatter
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_Grid.default, null, (0, _lodash.default)(toSum).reject({
    isHidden: true
  }).map((item, index) => /*#__PURE__*/_react.default.createElement(_Row.default, {
    short: true,
    horizontalBorder: false,
    key: index
  }, /*#__PURE__*/_react.default.createElement(_Cell.default, {
    stretch: true
  }, item.label), /*#__PURE__*/_react.default.createElement(_Cell.default, {
    dts: `${_lodash.default.kebabCase(item.label)}-value`
  }, valueFormatter(item.value)))).value(), /*#__PURE__*/_react.default.createElement(_Row.default, {
    short: true,
    horizontalBorder: false,
    type: "footer"
  }, /*#__PURE__*/_react.default.createElement(_Cell.default, {
    stretch: true
  }, "Total"), /*#__PURE__*/_react.default.createElement(_Cell.default, {
    dts: "total-value"
  }, valueFormatter(_lodash.default.sumBy(toSum, 'value')))));
};

Totals.propTypes = {
  /**
   * { label: PropTypes.node, value: PropTypes.number.isRequired, isHidden: PropTypes.bool }
   */
  toSum: _propTypes.default.arrayOf(_propTypes.default.shape({
    label: _propTypes.default.node,
    value: _propTypes.default.number.isRequired,
    isHidden: _propTypes.default.bool
  })),
  valueFormatter: _propTypes.default.func
};
Totals.defaultProps = {
  toSum: [],
  valueFormatter: value => `${value}`
};
var _default = Totals;
exports.default = _default;