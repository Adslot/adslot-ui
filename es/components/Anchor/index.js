import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["href", "color", "size", "variant", "round", "fullWidth", "icon", "children", "className", "disabled", "dts", "isLoading"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { expandDts, invariant } from '../../lib/utils';
import { buttonSharedPropTypes, buttonSharedClasses } from '../Button';
import { colors } from '../Button';
import { variants } from '../Button';
import { sizes } from '../Button';

var Anchor = function Anchor(props) {
  var _className$match;

  var href = props.href,
      color = props.color,
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
      rest = _objectWithoutProperties(props, _excluded);

  var isLink = variant === 'link' || (className === null || className === void 0 ? void 0 : (_className$match = className.match(/\b(btn-link)\b/)) === null || _className$match === void 0 ? void 0 : _className$match[0]);
  invariant(props.hasOwnProperty('href'), 'Anchor: should not be used without an href. Use <Button/> for onClick-only actions.');
  invariant(!round || icon && _.isEmpty(children), 'Anchor: round can only be used with an icon and no children.');
  invariant(!icon || !_.isEmpty(children) || rest['aria-label'], 'Anchor: an aria-label is required on icon anchors.');
  invariant(!isLink || color === 'default' && size !== 'large', 'Anchor: anchors with the "link" variant do not inherit size and color properties.');
  var baseClass = 'aui--anchor';
  var classes = classNames([baseClass, className, buttonSharedClasses(props)]);
  return /*#__PURE__*/React.createElement("a", Object.assign({
    href: href,
    disabled: disabled,
    className: classes
  }, expandDts(dts), rest), /*#__PURE__*/React.createElement(React.Fragment, null, icon && /*#__PURE__*/React.createElement("span", {
    className: "aui-icon-container"
  }, icon), children && /*#__PURE__*/React.createElement("span", {
    className: "aui-children-container"
  }, children)));
};

Anchor.propTypes = _objectSpread(_objectSpread({
  color: PropTypes.oneOf(colors),
  variant: PropTypes.oneOf(variants),
  size: PropTypes.oneOf(sizes)
}, buttonSharedPropTypes), {}, {
  href: PropTypes.string
});
Anchor.defaultProps = {
  color: 'default'
};
export default Anchor;