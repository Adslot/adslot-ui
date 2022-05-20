import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["color", "size", "variant", "round", "fullWidth", "icon", "children", "className", "disabled", "dts", "isLoading", "inverse", "theme"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { expandDts, invariant } from '../../lib/utils';
export var buttonSharedClasses = function buttonSharedClasses(_ref) {
  var _ref2;

  var size = _ref.size,
      inverse = _ref.inverse,
      variant = _ref.variant,
      fullWidth = _ref.fullWidth,
      round = _ref.round,
      icon = _ref.icon,
      children = _ref.children,
      color = _ref.color;
  return _ref2 = {}, _defineProperty(_ref2, "aui-".concat(size), sizes.includes(size) && variant !== 'link'), _defineProperty(_ref2, "aui-".concat(color), colors.includes(color) && variant !== 'link'), _defineProperty(_ref2, 'aui-inverse', inverse || color === 'default' && _.isEmpty(variant)), _defineProperty(_ref2, "aui-".concat(variant), variants.includes(variant)), _defineProperty(_ref2, 'aui-full-width', fullWidth), _defineProperty(_ref2, 'aui-round', round && icon && _.isEmpty(children)), _defineProperty(_ref2, 'aui-icon', !_.isEmpty(icon) && _.isEmpty(children)), _ref2;
};

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
      rest = _objectWithoutProperties(props, _excluded);

  var isLink = variant === 'link' || (className === null || className === void 0 ? void 0 : (_className$match = className.match(/\b(aui-link)\b/)) === null || _className$match === void 0 ? void 0 : _className$match[0]);
  invariant(!props.hasOwnProperty('href'), 'Button: should not be used for href links. Use an <Anchor/> instead.');
  invariant(!theme, 'Button: The theme prop has been deprecated. Please use color instead.');
  invariant(!inverse, 'Button: The inverse prop has been deprecated. Please use variant="inverse" instead.');
  invariant(!round || icon && _.isEmpty(children), 'Button: round can only be used with an icon and no children.');
  invariant(!icon || !_.isEmpty(children) || rest['aria-label'], 'Button: an aria-label is required on icon buttons.');
  invariant(!isLink || color === 'default' && size !== 'large', 'Button: buttons with the "link" variant do not inherit size and color properties.');
  var baseClass = 'aui--button';
  var classes = classNames([baseClass, className, buttonSharedClasses(props)]);

  var renderSpinner = function renderSpinner() {
    return isLoading ? /*#__PURE__*/React.createElement("div", {
      className: "spinner-container"
    }, /*#__PURE__*/React.createElement(Spinner, {
      size: size === 'large' ? 'medium' : 'small'
    })) : null;
  };

  return /*#__PURE__*/React.createElement("button", Object.assign({
    disabled: isLoading || disabled,
    className: classes,
    type: "button"
  }, expandDts(dts), rest), renderSpinner(), /*#__PURE__*/React.createElement(React.Fragment, null, icon && /*#__PURE__*/React.createElement("span", {
    className: classNames('aui-icon-container', {
      'is-loading': isLoading && !round
    })
  }, icon), children && /*#__PURE__*/React.createElement("span", {
    className: classNames('aui-children-container', {
      'is-loading': isLoading
    })
  }, children)));
};

export var colors = ['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'];
export var variants = ['solid', 'borderless', 'inverse', 'link'];
export var sizes = ['medium', 'large'];
export var buttonSharedPropTypes = {
  round: PropTypes.bool,
  icon: PropTypes.node,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  dts: PropTypes.string,

  /**
   * @deprecated
   * Please use the `color` prop instead.
   */
  theme: PropTypes.string,

  /**
   * @deprecated
   * Please use `variant="inverse"` instead.
   */
  inverse: PropTypes.bool
};
Button.propTypes = _objectSpread({
  isLoading: PropTypes.bool,
  color: PropTypes.oneOf(colors),
  variant: PropTypes.oneOf(variants),
  size: PropTypes.oneOf(sizes)
}, buttonSharedPropTypes);
Button.defaultProps = {
  color: 'default'
};
export default Button;