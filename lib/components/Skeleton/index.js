"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../lib/utils");

const Skeleton = _ref => {
  let {
    animated,
    className,
    dts,
    height,
    variant,
    width
  } = _ref;
  const baseClass = 'aui--skeleton';

  const variantClass = () => _lodash.default.includes(['rect', 'circle', 'text'], variant) ? `${baseClass}-${variant}` : '';

  return /*#__PURE__*/_react.default.createElement("span", Object.assign({
    className: (0, _classnames.default)(baseClass, variantClass(), {
      [`${baseClass}-animated`]: animated
    }, className),
    style: {
      height: height,
      width: width
    }
  }, (0, _utils.expandDts)(dts)));
};

Skeleton.propTypes = {
  animated: _propTypes.default.bool,

  /**
   *  Custom classnames
   */
  className: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),

  /**
   * 	Generate "data-test-selector"
   */
  dts: _propTypes.default.string,
  height: _propTypes.default.string,

  /**
   *  oneOf: 'rect', 'circle', 'text'
   */
  variant: _propTypes.default.oneOf(['rect', 'circle', 'text']),
  width: _propTypes.default.string
};
Skeleton.defaultProps = {
  animated: true,
  variant: 'text'
};
var _default = Skeleton;
exports.default = _default;