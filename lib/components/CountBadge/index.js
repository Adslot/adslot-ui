"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("../../utils");
const CountBadge = ({
  value,
  status = 'default',
  dts
}) => {
  const fontSize = value > 99 ? 'small' : 'normal';
  const classNames = `count-badge status-${status} count-badge-font-size-${fontSize}`;
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: classNames
  }, (0, _utils.expandDts)(dts)), value);
};
CountBadge.propTypes = {
  /**
   * determines the number that is rendered inside the counter badge
   */
  value: _propTypes.default.number.isRequired,
  /**
   * determines the appearance of the counter badge: oneOf(['info', 'warning', 'danger', 'light'])
   */
  status: _propTypes.default.string,
  /**
   * data-test-selector for the counter badge component
   */
  dts: _propTypes.default.string
};
var _default = exports.default = CountBadge;