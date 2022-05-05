"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../../lib/utils");

var GridRow = function GridRow(_ref) {
  var horizontalBorder = _ref.horizontalBorder,
      short = _ref.short,
      type = _ref.type,
      verticalCellBorder = _ref.verticalCellBorder,
      children = _ref.children,
      dts = _ref.dts;
  var componentClass = 'grid-component-row';
  var classesList = (0, _utils.classSuffixHelper)({
    classSuffixes: [type],
    suffixOptions: {
      horizontalBorder: horizontalBorder,
      short: short,
      verticalCellBorder: verticalCellBorder
    },
    componentClass: componentClass
  });
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: "".concat(componentClass).concat(classesList)
  }, (0, _utils.expandDts)(dts)), children);
};

GridRow.propTypes = {
  /**
   * the children to be rendered
   */
  children: _propTypes.default.node,

  /**
   * determines if horizontalBorder is to be rendered
   */
  horizontalBorder: _propTypes.default.bool,

  /**
   * determines if the row is short or long
   */
  short: _propTypes.default.bool,

  /**
   * determines the type of griRow: oneOf(['body', 'header', 'subfooter', 'footer'])
   */
  type: _propTypes.default.oneOf(['body', 'header', 'subfooter', 'footer']),

  /**
   * determines if verticalCellBorder should be displayed
   */
  verticalCellBorder: _propTypes.default.bool,

  /**
   * data-test-selector of the grid
   */
  dts: _propTypes.default.string
};
GridRow.defaultProps = {
  horizontalBorder: true,
  short: false,
  type: 'body',
  verticalCellBorder: false
};
var _default = GridRow;
exports.default = _default;