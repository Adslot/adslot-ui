"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Pill = _interopRequireDefault(require("../Pill"));

var styles = ['primary', 'success', 'warning', 'error', 'light'];
var sizes = ['large', 'medium', 'small'];

var StatusPill = function StatusPill(_ref) {
  var displayStyle = _ref.displayStyle,
      status = _ref.status,
      inverse = _ref.inverse,
      size = _ref.size,
      className = _ref.className,
      dts = _ref.dts;
  return /*#__PURE__*/_react.default.createElement(_Pill.default, {
    className: (0, _classnames.default)(['aui--status-pill', "aui--status-pill-".concat(displayStyle), {
      'aui--status-pill-inverse': inverse
    }, className]),
    size: size,
    dts: dts
  }, status);
};

StatusPill.defaultProps = {
  displayStyle: styles[0],
  size: sizes[1],
  inverse: false
};
StatusPill.propTypes = {
  /**
   * 	Text inside status pill
   */
  status: _propTypes.default.node.isRequired,

  /**
   * one of ["primary", "success", "warning", "error", "light"]
   */
  displayStyle: _propTypes.default.oneOf(styles),

  /**
   * one of ["large",  "medium", "small"]
   */
  size: _propTypes.default.oneOf(sizes),

  /**
   * Status pill with inverse style
   */
  inverse: _propTypes.default.bool,

  /**
   * 	Generate "data-test-selector" on the status pill
   */
  dts: _propTypes.default.string,
  className: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)])
};
var _default = StatusPill;
exports.default = _default;