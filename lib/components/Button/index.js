"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.variants = exports.sizes = exports.default = exports.colors = exports.buttonSharedClasses = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Spinner = _interopRequireDefault(require("../Spinner"));
var _utils = require("../../lib/utils");
const buttonSharedClasses = _ref => {
  let {
    size,
    inverse,
    variant,
    fullWidth,
    round,
    icon,
    children,
    disabled,
    color
  } = _ref;
  return {
    [`aui-${size}`]: sizes.includes(size) && variant !== 'link',
    [`aui-${color}`]: colors.includes(color) && variant !== 'link',
    'aui-inverse': inverse || color === 'default' && _lodash.default.isEmpty(variant),
    [`aui-${variant}`]: variants.includes(variant),
    'aui-full-width': fullWidth,
    'aui-round': round && icon && _lodash.default.isEmpty(children),
    'aui-icon': !_lodash.default.isEmpty(icon) && _lodash.default.isEmpty(children),
    disabled: disabled
  };
};
exports.buttonSharedClasses = buttonSharedClasses;
const Button = props => {
  const {
    color = 'default',
    size,
    variant,
    round,
    fullWidth,
    icon,
    children,
    className,
    disabled,
    dts,
    isLoading,
    inverse,
    // deprecated
    theme,
    // deprecated
    ...rest
  } = props;
  const isLink = variant === 'link' || className?.match(/\b(aui-link)\b/)?.[0];

  // eslint-disable-next-line react/prop-types
  (0, _utils.invariant)(!props.href, 'Button: should not be used for href links. Use an <Anchor/> instead.');
  (0, _utils.invariant)(!theme, 'Button: The theme prop has been deprecated. Please use color instead.');
  (0, _utils.invariant)(!inverse, 'Button: The inverse prop has been deprecated. Please use variant="inverse" instead.');
  (0, _utils.invariant)(!(round && (!icon || !_lodash.default.isEmpty(children))), 'Button: round can only be used with an icon and no children.');
  (0, _utils.invariant)(!(icon && _lodash.default.isEmpty(children) && !rest['aria-label'] && !rest['aria-labelledby']), 'Button: an aria-label or aria-labelledby is required on icon buttons.');
  (0, _utils.invariant)(!(isLink && (color !== 'default' || size === 'large')), `Button: buttons with the "link" variant do not inherit size and color properties.${isLink} ${color} ${size}`);
  const baseClass = 'aui--button';
  const classes = (0, _classnames.default)([baseClass, className, buttonSharedClasses({
    size,
    inverse,
    variant,
    fullWidth,
    round,
    icon,
    children,
    disabled,
    color
  })]);
  const renderSpinner = () => isLoading ? /*#__PURE__*/_react.default.createElement("div", {
    className: "spinner-container"
  }, /*#__PURE__*/_react.default.createElement(_Spinner.default, {
    size: size === 'large' ? 'medium' : 'small'
  })) : null;
  return /*#__PURE__*/_react.default.createElement("button", Object.assign({
    type: "button"
  }, (0, _utils.expandDts)(dts), rest, {
    disabled: isLoading || disabled,
    className: classes
  }), renderSpinner(), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, icon && /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _classnames.default)('aui-icon-container', {
      'is-loading': isLoading && !round
    })
  }, icon), children && /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _classnames.default)('aui-children-container', {
      'is-loading': isLoading
    })
  }, children)));
};
const colors = ['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'];
exports.colors = colors;
const variants = ['solid', 'borderless', 'inverse', 'link'];
exports.variants = variants;
const sizes = ['medium', 'large'];
exports.sizes = sizes;
Button.propTypes = {
  isLoading: _propTypes.default.bool,
  color: _propTypes.default.oneOf(colors),
  variant: _propTypes.default.oneOf(variants),
  size: _propTypes.default.oneOf(sizes),
  /**
   * @deprecated
   * Please use the `color` prop instead.
   */
  theme: _propTypes.default.string,
  /**
   * @deprecated
   * Please use `variant="inverse"` instead.
   */
  inverse: _propTypes.default.bool,
  round: _propTypes.default.bool,
  icon: _propTypes.default.node,
  fullWidth: _propTypes.default.bool,
  className: _propTypes.default.string,
  dts: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  children: _propTypes.default.node
};
var _default = Button;
exports.default = _default;