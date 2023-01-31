"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LINK_PROPS = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _Anchor = _interopRequireDefault(require("../../Anchor"));
var _Button = _interopRequireDefault(require("../../Button"));
class PopoverLinkItem extends _react.default.PureComponent {
  render() {
    // eslint-disable-next-line react/prop-types
    const {
      target,
      title,
      url,
      isEnabled,
      onClick
    } = this.props;
    const buttonProps = {
      disabled: !isEnabled,
      onClick,
      variant: 'link'
    };
    if (target !== '_modal') {
      _lodash.default.assign(buttonProps, {
        href: url
      });
    }
    if (target === '_blank') {
      _lodash.default.assign(buttonProps, {
        rel: 'noopener noreferrer'
      });
    }
    return /*#__PURE__*/_react.default.createElement("li", {
      className: "popover-link-item"
    }, buttonProps.href ? /*#__PURE__*/_react.default.createElement(_Anchor.default, buttonProps, title) : /*#__PURE__*/_react.default.createElement(_Button.default, buttonProps, title));
  }
}
const LINK_PROPS = {
  target: _propTypes.default.oneOf(['_blank', '_self', '_modal']),
  title: _propTypes.default.string.isRequired,
  url: _propTypes.default.string,
  isEnabled: _propTypes.default.bool
};
exports.LINK_PROPS = LINK_PROPS;
PopoverLinkItem.propTypes = {
  onClick: _propTypes.default.func,
  ...LINK_PROPS
};
PopoverLinkItem.defaultProps = {
  target: '_self',
  isEnabled: true,
  onClick: _lodash.default.noop
};
var _default = PopoverLinkItem;
exports.default = _default;