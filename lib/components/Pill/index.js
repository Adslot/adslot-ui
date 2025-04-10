"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Button = require("../Button");
var _utils = require("../../utils");
const sizes = ['large', 'medium', 'small'];
const Pill = ({
  children,
  color = _Button.colors[0],
  size = sizes[1],
  inverse = false,
  onClick,
  dts,
  className,
  ...rest
}) => /*#__PURE__*/_react.default.createElement("div", Object.assign({}, rest, {
  className: (0, _classnames.default)('aui--pill', size !== sizes[1] && `aui-${size}`, color !== _Button.colors[0] && `aui-${color}`, inverse && 'aui-inverse', onClick && 'aui-clickable', className),
  onClick: onClick
}, (0, _utils.expandDts)(dts)), children);
Pill.propTypes = {
  /**
   * Content inside pill
   */
  children: _propTypes.default.node,
  /**
   * The main color for the pill
   */
  color: _propTypes.default.oneOf(_Button.colors),
  /**
   * one of ["large",  "medium", "small"]
   */
  size: _propTypes.default.oneOf(sizes),
  /**
   * Inverse the background and content color
   */
  inverse: _propTypes.default.bool,
  /**
   * Custom onClick event
   */
  onClick: _propTypes.default.func,
  /**
   * 	Generate "data-test-selector" on the pill
   */
  dts: _propTypes.default.string,
  /**
   * Custom classnames
   */
  className: _propTypes.default.string
};
var _default = exports.default = Pill;