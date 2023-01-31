"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("../../lib/utils");
const Grid = _ref => {
  let {
    children,
    dts
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: "grid-component"
  }, (0, _utils.expandDts)(dts)), children);
};
Grid.propTypes = {
  /**
   * the children to be rendered
   */
  children: _propTypes.default.node,
  /**
   * data-test-selector of the grid
   */
  dts: _propTypes.default.string
};
var _default = Grid;
exports.default = _default;