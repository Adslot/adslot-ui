"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("../Button"));

var _utils = require("../../lib/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ButtonGroup = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2.default)(ButtonGroup, _React$PureComponent);

  var _super = _createSuper(ButtonGroup);

  function ButtonGroup() {
    (0, _classCallCheck2.default)(this, ButtonGroup);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(ButtonGroup, [{
    key: "injectProps",
    value: function injectProps(children) {
      var _this = this;

      return _react.default.Children.map(children, function (child) {
        if ( /*#__PURE__*/_react.default.isValidElement(child)) {
          var buttonProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, _this.props.color ? {
            color: _this.props.color
          } : {}), !_lodash.default.isNil(_this.props.variant) ? {
            variant: _this.props.variant
          } : {}), !_lodash.default.isNil(_this.props.disabled) ? {
            disabled: _this.props.disabled
          } : {}), _this.props.size ? {
            size: _this.props.size
          } : {});

          var childNodes = _react.default.Children.map(child.props.children, function (childNode) {
            return /*#__PURE__*/_react.default.isValidElement(childNode) ? /*#__PURE__*/_react.default.cloneElement(childNode, _objectSpread(_objectSpread({}, childNode.props), childNode.type.name === _Button.default.name ? buttonProps : {})) : childNode;
          });

          return /*#__PURE__*/_react.default.cloneElement(child, _objectSpread(_objectSpread(_objectSpread({}, child.props), child.type.name === _Button.default.name ? buttonProps : {}), !_lodash.default.isEmpty(childNodes) ? {
            children: childNodes.length === 1 ? childNodes[0] : childNodes
          } : {}));
        }

        return child;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          dts = _this$props.dts;
      var content = this.injectProps(children);
      return /*#__PURE__*/_react.default.createElement("div", Object.assign({}, (0, _utils.expandDts)(dts), {
        className: "aui--button-group"
      }), content);
    }
  }]);
  return ButtonGroup;
}(_react.default.PureComponent);

ButtonGroup.propTypes = {
  dts: _propTypes.default.string,
  children: _propTypes.default.node,

  /**
   * primary, success, danger
   */
  color: _propTypes.default.oneOf(['primary', 'success', 'danger']),
  variant: _propTypes.default.oneOf(['inverse', 'borderless', 'solid']),
  disabled: _propTypes.default.bool,
  size: _propTypes.default.oneOf(['large'])
};
var _default = ButtonGroup;
exports.default = _default;