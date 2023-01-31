"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
const Spinner = _ref => {
  let {
    className,
    size
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(['spinner-component', className])
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(['spinner', `spinner-${size}`])
  }));
};
Spinner.propTypes = {
  className: _propTypes.default.string,
  /**
   * Size of the spinner should be one of: 'large' (40x40px), 'medium' (30x30px), 'small' (16x16px)
   */
  size: _propTypes.default.oneOf(['small', 'medium', 'large'])
};
Spinner.defaultProps = {
  size: 'large'
};
var _default = Spinner;
exports.default = _default;