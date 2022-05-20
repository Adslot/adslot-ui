"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../lib/utils");

var _Button = require("../Button");

var _excluded = ["href", "color", "size", "variant", "round", "fullWidth", "icon", "children", "className", "disabled", "dts", "isLoading"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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
      rest = (0, _objectWithoutProperties2.default)(props, _excluded);
  var isLink = variant === 'link' || (className === null || className === void 0 ? void 0 : (_className$match = className.match(/\b(btn-link)\b/)) === null || _className$match === void 0 ? void 0 : _className$match[0]);
  (0, _utils.invariant)(props.hasOwnProperty('href'), 'Anchor: should not be used without an href. Use <Button/> for onClick-only actions.');
  (0, _utils.invariant)(!round || icon && _lodash.default.isEmpty(children), 'Anchor: round can only be used with an icon and no children.');
  (0, _utils.invariant)(!icon || !_lodash.default.isEmpty(children) || rest['aria-label'], 'Anchor: an aria-label is required on icon anchors.');
  (0, _utils.invariant)(!isLink || color === 'default' && size !== 'large', 'Anchor: anchors with the "link" variant do not inherit size and color properties.');
  var baseClass = 'aui--anchor';
  var classes = (0, _classnames.default)([baseClass, className, (0, _Button.buttonSharedClasses)(props)]);
  return /*#__PURE__*/_react.default.createElement("a", Object.assign({
    href: href,
    disabled: disabled,
    className: classes
  }, (0, _utils.expandDts)(dts), rest), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, icon && /*#__PURE__*/_react.default.createElement("span", {
    className: "aui-icon-container"
  }, icon), children && /*#__PURE__*/_react.default.createElement("span", {
    className: "aui-children-container"
  }, children)));
};

Anchor.propTypes = _objectSpread(_objectSpread({
  color: _propTypes.default.oneOf(_Button.colors),
  variant: _propTypes.default.oneOf(_Button.variants),
  size: _propTypes.default.oneOf(_Button.sizes)
}, _Button.buttonSharedPropTypes), {}, {
  href: _propTypes.default.string
});
Anchor.defaultProps = {
  color: 'default'
};
var _default = Anchor;
exports.default = _default;