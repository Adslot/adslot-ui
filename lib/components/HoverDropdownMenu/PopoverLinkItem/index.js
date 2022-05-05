"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LINK_PROPS = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _lodash = _interopRequireDefault(require("lodash"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("../../Button"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var PopoverLinkItem = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2.default)(PopoverLinkItem, _React$PureComponent);

  var _super = _createSuper(PopoverLinkItem);

  function PopoverLinkItem() {
    (0, _classCallCheck2.default)(this, PopoverLinkItem);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(PopoverLinkItem, [{
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
        theme: 'link'
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
      }, /*#__PURE__*/_react.default.createElement(_Button.default, buttonProps, title));
    }
  }]);
  return PopoverLinkItem;
}(_react.default.PureComponent);

var LINK_PROPS = {
  target: _propTypes.default.oneOf(['_blank', '_self', '_modal']),
  title: _propTypes.default.string.isRequired,
  url: _propTypes.default.string,
  isEnabled: _propTypes.default.bool
};
exports.LINK_PROPS = LINK_PROPS;
PopoverLinkItem.propTypes = _objectSpread({
  onClick: _propTypes.default.func
}, LINK_PROPS);
PopoverLinkItem.defaultProps = {
  target: '_self',
  isEnabled: true,
  onClick: _lodash.default.noop
};
var _default = PopoverLinkItem;
exports.default = _default;