"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("../../lib/utils");
var _Button = require("../Button");
const Anchor = props => {
  const {
    href,
    color = 'default',
    variant,
    size,
    round,
    fullWidth,
    icon,
    children,
    className,
    disabled,
    dts,
    ...rest
  } = props;
  const isLink = variant === 'link' || className?.match(/\b(btn-link)\b/)?.[0];
  (0, _utils.invariant)(href, 'Anchor: should not be used without href. Use <Button/> for onClick-only actions.');
  (0, _utils.invariant)(!(round && (!icon || !_lodash.default.isEmpty(children))), 'Anchor: round can only be used with an icon and no children.');
  (0, _utils.invariant)(!(icon && _lodash.default.isEmpty(children) && !rest['aria-label'] && !rest['aria-labelledby']), 'Anchor: an aria-label or aria-labelledby is required on icon anchors.');
  (0, _utils.invariant)(!(isLink && (color !== 'default' || size === 'large')), 'Anchor: anchors with the "link" variant do not inherit size and color properties.');
  const baseClass = 'aui--anchor';
  const classes = (0, _classnames.default)([baseClass, className, (0, _Button.buttonSharedClasses)({
    size,
    variant,
    fullWidth,
    round,
    icon,
    children,
    disabled,
    color
  })]);
  return /*#__PURE__*/_react.default.createElement("a", Object.assign({
    href: disabled ? undefined : href,
    className: classes
  }, (0, _utils.expandDts)(dts), rest), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, icon && /*#__PURE__*/_react.default.createElement("span", {
    className: "aui-icon-container"
  }, icon), children && /*#__PURE__*/_react.default.createElement("span", {
    className: "aui-children-container"
  }, children)));
};
Anchor.propTypes = {
  color: _propTypes.default.oneOf(_Button.colors),
  variant: _propTypes.default.oneOf(_Button.variants),
  size: _propTypes.default.oneOf(_Button.sizes),
  href: _propTypes.default.string.isRequired,
  round: _propTypes.default.bool,
  icon: _propTypes.default.node,
  fullWidth: _propTypes.default.bool,
  className: _propTypes.default.string,
  dts: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  children: _propTypes.default.node
};
var _default = Anchor;
exports.default = _default;