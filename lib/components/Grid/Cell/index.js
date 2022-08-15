"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../../lib/utils");

const GridCell = _ref => {
  let {
    children,
    classSuffixes,
    onClick,
    stretch,
    dts,
    addonClassNames
  } = _ref;
  const componentClass = 'grid-component-cell';
  const classesList = (0, _utils.classSuffixHelper)({
    classSuffixes,
    suffixOptions: {
      stretch,
      clickable: onClick
    },
    componentClass
  });
  const className = (0, _classnames.default)(`${componentClass}${classesList}`, ...addonClassNames);
  const extraProps = onClick ? {
    onClick
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