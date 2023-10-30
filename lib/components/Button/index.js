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
var _utils = require("../../utils");
var _invariant = _interopRequireDefault(require("../../invariant"));
const buttonSharedClasses = ({
  size,
  inverse,
  variant,
  fullWidth,
  round,
  icon,
  children,
  disabled,
  color
}) => ({
  [`aui-${size}`]: sizes.includes(size) && variant !== 'link',
  [`aui-${color}`]: colors.includes(color) && variant !== 'link',
  'aui-inverse': inverse || color === 'default' && _lodash.default.isEmpty(variant),
  [`aui-${variant}`]: variants.includes(variant),
  'aui-full-width': fullWidth,
  'aui-round': round && icon && _lodash.default.isEmpty(children),
  'aui-icon': !_lodash.default.isEmpty(icon) && _lodash.default.isEmpty(children),
  disabled: disabled
});

/**
 * Use buttons to trigger actions, drive direction, accomplish tasks or to link. Buttons assist the user to complete tasks confidently and to feel secure about the next action they are taking.
 */
exports.buttonSharedClasses = buttonSharedClasses;
const Button = ({
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
}) => {
  const isLink = variant === 'link' || className?.match(/\b(aui-link)\b/)?.[0];
  (0, _invariant.default)(!rest.href, 'Button: should not be used for href links. Use an <Anchor/> instead.');
  (0, _invariant.default)(!theme, 'Button: The theme prop has been deprecated. Please use color instead.');
  (0, _invariant.default)(!inverse, 'Button: The inverse prop has been deprecated. Please use variant="inverse" instead.');
  (0, _invariant.default)(!(round && (!icon || !_lodash.default.isEmpty(children))), 'Button: round can only be used with an icon and no children.');
  (0, _invariant.default)(!(icon && _lodash.default.isEmpty(children) && !rest['aria-label'] && !rest['aria-labelledby']), 'Button: an aria-label or aria-labelledby is required on icon buttons.');
  (0, _invariant.default)(!(isLink && (color !== 'default' || size === 'large')), `Button: buttons with the "link" variant do not inherit size and color properties.`);
  const renderSpinner = () => isLoading ? /*#__PURE__*/_react.default.createElement("div", {
    className: "spinner-container"
  }, /*#__PURE__*/_react.default.createElement(_Spinner.default, {
    size: size === 'large' ? 'medium' : 'small'
  })) : null;
  return /*#__PURE__*/_react.default.createElement("button", Object.assign({
    type: "button"
  }, (0, _utils.expandDts)(dts), rest, {
    disabled: isLoading || disabled,
    className: (0, _classnames.default)('aui--button', className, buttonSharedClasses({
      size,
      inverse,
      variant,
      fullWidth,
      round,
      icon,
      children,
      disabled,
      color
    }))
  }), renderSpinner(), icon && /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _classnames.default)('aui-icon-container', {
      'is-loading': isLoading && !round
    })
  }, icon), children && /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _classnames.default)('aui-children-container', {
      'is-loading': isLoading
    })
  }, children));
};
const colors = exports.colors = ['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'];
const variants = exports.variants = ['solid', 'borderless', 'inverse', 'link'];
const sizes = exports.sizes = ['medium', 'large'];
Button.propTypes = {
  /**
   * Controls the main display mode for the button.
   */
  variant: _propTypes.default.oneOf(variants),
  /**
   * Controls the main color for the button.
   */
  color: _propTypes.default.oneOf(colors),
  /**
   * Controls the size for the button.
   */
  size: _propTypes.default.oneOf(sizes),
  /**
   * Controls if the button should render a spinner.
   * When set to true, the button will be disabled as well.
   */
  isLoading: _propTypes.default.bool,
  /**
   * Controls if the button is disabled.
   */
  disabled: _propTypes.default.bool,
  /**
   * Controls if the button should expand to its closet container
   */
  fullWidth: _propTypes.default.bool,
  /**
   * Controls if the button should be circular.
   * Only allowed when the button has no `children` and `icon` is given.
   */
  round: _propTypes.default.bool,
  /**
   * Controls the icon to be displayed for the button.
   */
  icon: _propTypes.default.node,
  /**
   * Controls the main content to be displayed within the button.
   * When both children and icon are given, icon will be on the left.
   */
  children: _propTypes.default.node,
  /**
   * Adds additional class names to the button
   */
  className: _propTypes.default.string,
  /**
   * Adds `data-test-selector` to the button
   */
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
var _default = exports.default = Button;