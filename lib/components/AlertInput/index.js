"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.baseClass = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Popover = _interopRequireDefault(require("../Popover"));

var _constants = require("../Popover/constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var baseClass = 'aui--alert-input';
exports.baseClass = baseClass;

var AlertInput = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2.default)(AlertInput, _React$PureComponent);

  var _super = _createSuper(AlertInput);

  function AlertInput() {
    var _this;

    (0, _classCallCheck2.default)(this, AlertInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      isFocused: false,
      isPopoverVisible: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "componentRef", /*#__PURE__*/_react.default.createRef());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleMouseEnter", function () {
      if (_this.props.alertMessage) {
        _this.setState({
          isPopoverVisible: true
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleMouseLeave", function () {
      _this.setState({
        isPopoverVisible: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleInputFocus", function (event) {
      event.target.select();

      _this.setState({
        isFocused: true,
        isPopoverVisible: Boolean(_this.props.alertMessage)
      });

      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleInputBlur", function (event) {
      _this.setState({
        isFocused: false,
        isPopoverVisible: false
      });

      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    });
    return _this;
  }

  (0, _createClass2.default)(AlertInput, [{
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          dts = _this$props.dts,
          popoverPlacement = _this$props.popoverPlacement,
          disabled = _this$props.disabled,
          prefixAddon = _this$props.prefixAddon,
          suffixAddon = _this$props.suffixAddon,
          alertStatus = _this$props.alertStatus,
          alertMessage = _this$props.alertMessage,
          onValueChange = _this$props.onValueChange;
      var className = (0, _classnames2.default)(baseClass, (_classnames = {}, (0, _defineProperty2.default)(_classnames, alertStatus, alertStatus), (0, _defineProperty2.default)(_classnames, "".concat(baseClass, "--focused"), this.state.isFocused), (0, _defineProperty2.default)(_classnames, "".concat(baseClass, "--disabled"), disabled), _classnames), this.props.className);
      var theme = alertStatus === 'warning' ? 'warn' : alertStatus;
      var shouldPopoverOpen = this.state.isPopoverVisible && !_lodash.default.isEmpty(alertMessage);

      var inputProps = _lodash.default.omit(this.props, ['dts', 'prefixAddon', 'suffixAddon', 'alertStatus', 'alertMessage', 'onValueChange', 'popoverPlacement']);

      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        ref: this.componentRef,
        className: className,
        "data-test-selector": dts,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      }, prefixAddon ? /*#__PURE__*/_react.default.createElement("span", {
        className: "".concat(baseClass, "__addon")
      }, prefixAddon) : null, /*#__PURE__*/_react.default.createElement("input", _objectSpread(_objectSpread({}, inputProps), {}, {
        className: "".concat(baseClass, "__input"),
        onChange: onValueChange,
        onFocus: this.handleInputFocus,
        onBlur: this.handleInputBlur
      })), suffixAddon ? /*#__PURE__*/_react.default.createElement("span", {
        className: "".concat(baseClass, "__addon")
      }, suffixAddon) : null), shouldPopoverOpen && /*#__PURE__*/_react.default.createElement(_Popover.default.WithRef, {
        isOpen: true,
        refElement: this.componentRef.current,
        placement: popoverPlacement,
        popoverClassNames: "".concat(baseClass, "__popover"),
        theme: theme,
        popoverContent: alertMessage
      }));
    }
  }]);
  return AlertInput;
}(_react.default.PureComponent);

AlertInput.propTypes = {
  className: _propTypes.default.string,
  dts: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  prefixAddon: _propTypes.default.node,
  suffixAddon: _propTypes.default.node,

  /**
   * <span>
   *   As <code>success</code> is assumed, and help is always displayed independently, the accepted pattern is to
   *  only use <code>warning</code> and <code>error</code> feedback states with this component. Otherwise leave
   *  type undefined for <code>success</code>.
   * </span>
   */
  alertStatus: _propTypes.default.oneOf(['success', 'info', 'warning', 'error']),

  /**
   * 'left', 'top', 'top-start', 'top-end', 'bottom-start', 'bottom', 'bottom-end', 'right'
   */
  popoverPlacement: _propTypes.default.oneOf(_constants.popoverPlacements),
  alertMessage: _propTypes.default.string,
  onValueChange: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onFocus: _propTypes.default.func
};
AlertInput.defaultProps = {
  alertStatus: 'success',
  popoverPlacement: 'bottom'
};
var _default = AlertInput;
exports.default = _default;