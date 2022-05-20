"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../../lib/utils");

var GridCell = function GridCell(_ref) {
  var children = _ref.children,
      classSuffixes = _ref.classSuffixes,
      onClick = _ref.onClick,
      stretch = _ref.stretch,
      dts = _ref.dts,
      addonClassNames = _ref.addonClassNames;
  var componentClass = 'grid-component-cell';
  var classesList = (0, _utils.classSuffixHelper)({
    classSuffixes: classSuffixes,
    suffixOptions: {
      stretch: stretch,
      clickable: onClick
    },
    componentClass: componentClass
  });

  var className = _classnames.default.apply(void 0, ["".concat(componentClass).concat(classesList)].concat((0, _toConsumableArray2.default)(addonClassNames)));

  var extraProps = onClick ? {
    onClick: onClick
  } : {};
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: className
  }, extraProps, (0, _utils.expandDts)(dts)), children);
};

GridCell.propTypes = {
  /**
   * list of addOn classNames as array of strings
   */
  addonClassNames: _propTypes.default.arrayOf(_propTypes.default.string),

  /**
   * the children to be rendered
   */
  children: _propTypes.default.node,
  classSuffixes: _propTypes.default.arrayOf(_propTypes.default.string),

  /**
   * data-test-selector of the gridCell
   */
  dts: _propTypes.default.string,

  /**
   * function that will be called when gridCell is clicked
   */
  onClick: _propTypes.default.func,

  /**
   * determines if gridCell should be stretched
   */
  stretch: _propTypes.default.bool
};
GridCell.defaultProps = {
  addonClassNames: [],
  classSuffixes: [],
  stretch: false
};
var _default = GridCell;
exports.default = _default;