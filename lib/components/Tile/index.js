"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../lib/utils");

const Tile = _ref => {
  let {
    className,
    title,
    imgLink,
    onClick,
    dts
  } = _ref;
  const baseClass = 'aui--tile';
  const tileClassNames = (0, _classnames.default)(baseClass, className);
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: tileClassNames,
    onClick: onClick
  }, (0, _utils.expandDts)(dts)), /*#__PURE__*/_react.default.createElement("div", {
    className: `${baseClass}-logo`
  }, imgLink ? /*#__PURE__*/_react.default.createElement("img", {
    src: imgLink,
    alt: "tile-logo"
  }) : ''), /*#__PURE__*/_react.default.createElement("div", {
    className: `${baseClass}-title`
  }, title));
};

Tile.propTypes = {
  /**
   *  	Custom classnames
   */
  className: _propTypes.default.string,

  /**
   * 	Tile title
   */
  title: _propTypes.default.node,

  /**
   * 	Use Logo as a tile
   */
  imgLink: _propTypes.default.string,

  /**
   *  Custome onClick event
   */
  onClick: _propTypes.default.func,

  /**
   * 	Generate "data-test-selector" on the pill
   */
  dts: _propTypes.default.string
};
var _default = Tile;
exports.default = _default;