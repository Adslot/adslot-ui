"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("../../lib/utils");

const sizes = ['large', 'medium', 'small'];

const Pill = _ref => {
  let {
    className,
    children,
    onClick,
    size,
    dts
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: (0, _classnames.default)('aui--pill', `aui--pill-${size}`, {
      'aui--pill-clickable': onClick
    }, className),
    onClick: onClick
  }, (0, _utils.expandDts)(dts)), /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--pill-children"
  }, children));
};

Pill.defaultProps = {
  size: sizes[1]
};
Pill.propTypes = {
  /**
   * 	Content inside pill
   */
  children: _propTypes.default.node.isRequired,

  /**
   *  	Custom classnames
   */
  className: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),

  /**
   *  	Custome onClick event
   */
  onClick: _propTypes.default.func,

  /**
   * one of ["large",  "medium", "small"]
   */
  size: _propTypes.default.oneOf(sizes),

  /**
   * 	Generate "data-test-selector" on the pill
   */
  dts: _propTypes.default.string
};
var _default = Pill;
exports.default = _default;