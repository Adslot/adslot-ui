"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.variants = exports.sizes = exports.default = exports.colors = exports.buttonSharedPropTypes = exports.buttonSharedClasses = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Spinner = _interopRequireDefault(require("../Spinner"));

var _utils = require("../../lib/utils");

var _excluded = ["color", "size", "variant", "round", "fullWidth", "icon", "children", "className", "disabled", "dts", "isLoading", "inverse", "theme"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var buttonSharedClasses = function buttonSharedClasses(_ref) {
  var _ref2;

  var size = _ref.size,
      inverse = _ref.inverse,
      variant = _ref.variant,
      fullWidth = _ref.fullWidth,
      round = _ref.round,
      icon = _ref.icon,
      children = _ref.children,
      color = _ref.color;
  return _ref2 = {}, (0, _defineProperty2.default)(_ref2, "aui-".concat(size), sizes.includes(size) && variant !== 'link'), (0, _defineProperty2.default)(_ref2, "aui-".concat(color), colors.includes(color) && variant !== 'link'), (0, _defineProperty2.default)(_ref2, 'aui-inverse', inverse || color === 'default' && _lodash.default.isEmpty(variant)), (0, _defineProperty2.default)(_ref2, "aui-".concat(variant), variants.includes(variant)), (0, _defineProperty2.default)(_ref2, 'aui-full-width', fullWidth), (0, _defineProperty2.default)(_ref2, 'aui-round', round && icon && _lodash.default.isEmpty(children)), (0, _defineProperty2.default)(_ref2, 'aui-icon', !_lodash.default.isEmpty(icon) && _lodash.default.isEmpty(children)), _ref2;
};

exports.buttonSharedClasses = buttonSharedClasses;

var Button = function Button(props) {
  var _className$match;

  var color = props.color,
      size = props.size,
      variant = props.variant,
      round = props.round,
      fullWidth = props.fullWidth,
      icon = props.icon,
      children = props.children,
      className = props.className,
      disabled = props.disabled,
      dts = props.dts,
      isLoading = props.isLoading,
      inverse = props.inverse,
      theme = props.theme,
      rest = (0, _objectWithoutProperties2.default)(props, _excluded);
  var isLink = variant === 'link' || (className === null || className === void 0 ? void 0 : (_className$match = className.match(/\b(aui-link)\b/)) === null || _className$match === void 0 ? void 0 : _className$match[0]);
  (0, _utils.invariant)(!props.hasOwnProperty('href'), 'Button: should not be used for href links. Use an <Anchor/> instead.');
  (0, _utils.invariant)(!theme, 'Button: The theme prop has been deprecated. Please use color instead.');
  (0, _utils.invariant)(!inverse, 'Button: The inverse prop has been deprecated. Please use variant="inverse" instead.');
  (0, _utils.invariant)(!round || icon && _lodash.default.isEmpty(children), 'Button: round can only be used with an icon and no children.');
  (0, _utils.invariant)(!icon || !_lodash.default.isEmpty(children) || rest['aria-label'], 'Button: an aria-label is required on icon buttons.');
  (0, _utils.invariant)(!isLink || color === 'default' && size !== 'large', 'Button: buttons with the "link" variant do not inherit size and color properties.');
  var baseClass = 'aui--button';
  var classes = (0, _classnames.default)([baseClass, className, buttonSharedClasses(props)]);

  var renderSpinner = function renderSpinner() {
    return isLoading ? /*#__PURE__*/_react.default.createElement("div", {
      className: "spinner-container"
    }, /*#__PURE__*/_react.default.createElement(_Spinner.default, {
      size: size === 'large' ? 'medium' : 'small'
    })) : null;
  };

  return /*#__PURE__*/_react.default.createElement("button", Object.assign({
    disabled: isLoading || disabled,
    className: classes,
    type: "button"
  }, (0, _utils.expandDts)(dts), rest), renderSpinner(), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, icon && /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _classnames.default)('aui-icon-container', {
      'is-loading': isLoading && !round
    })
  }, icon), children && /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _classnames.default)('aui-children-container', {
      'is-loading': isLoading
    })
  }, children)));
};

var colors = ['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'];
exports.colors = colors;
var variants = ['solid', 'borderless', 'inverse', 'link'];
exports.variants = variants;
var sizes = ['medium', 'large'];
exports.sizes = sizes;
var buttonSharedPropTypes = {
  round: _propTypes.default.bool,
  icon: _propTypes.default.node,
  fullWidth: _propTypes.default.bool,
  className: _propTypes.default.string,
  dts: _propTypes.default.string,

  /**
   * @deprecated
   * Please use the `color` prop instead.
   */
  theme: _propTypes.default.string,

  /**
   * @deprecated
   * Please use `variant="inverse"` instead.
   */
  inverse: _propTypes.default.bool
};
exports.buttonSharedPropTypes = buttonSharedPropTypes;
Button.propTypes = _objectSpread({
  isLoading: _propTypes.default.bool,
  color: _propTypes.default.oneOf(colors),
  variant: _propTypes.default.oneOf(variants),
  size: _propTypes.default.oneOf(sizes)
}, buttonSharedPropTypes);
Button.defaultProps = {
  color: 'default'
};
var _default = Button;
exports.default = _default;