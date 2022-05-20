import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Anchor from '../../Anchor';
import Button from '../../Button';

var PopoverLinkItem = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(PopoverLinkItem, _React$PureComponent);

  var _super = _createSuper(PopoverLinkItem);

  function PopoverLinkItem() {
    _classCallCheck(this, PopoverLinkItem);

    return _super.apply(this, arguments);
  }

  _createClass(PopoverLinkItem, [{
    key: "render",
    value: function render() {
      // eslint-disable-next-line react/prop-types
      var _this$props = this.props,
          target = _this$props.target,
          title = _this$props.title,
          url = _this$props.url,
          isEnabled = _this$props.isEnabled,
          onClick = _this$props.onClick;
      var buttonProps = {
        disabled: !isEnabled,
        onClick: onClick,
        variant: 'link'
      };

      if (target !== '_modal') {
        _.assign(buttonProps, {
          href: url
        });
      }

      if (target === '_blank') {
        _.assign(buttonProps, {
          rel: 'noopener noreferrer'
        });
      }

      return /*#__PURE__*/React.createElement("li", {
        className: "popover-link-item"
      }, buttonProps.href ? /*#__PURE__*/React.createElement(Anchor, buttonProps, title) : /*#__PURE__*/React.createElement(Button, buttonProps, title));
    }
  }]);

  return PopoverLinkItem;
}(React.PureComponent);

export var LINK_PROPS = {
  target: PropTypes.oneOf(['_blank', '_self', '_modal']),
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  isEnabled: PropTypes.bool
};
PopoverLinkItem.propTypes = _objectSpread({
  onClick: PropTypes.func
}, LINK_PROPS);
PopoverLinkItem.defaultProps = {
  target: '_self',
  isEnabled: true,
  onClick: _.noop
};
export default PopoverLinkItem;