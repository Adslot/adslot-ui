import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Popover from '../Popover';
import { popoverPlacements } from '../Popover/constants';
export var baseClass = 'aui--alert-input';

var AlertInput = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(AlertInput, _React$PureComponent);

  var _super = _createSuper(AlertInput);

  function AlertInput() {
    var _this;

    _classCallCheck(this, AlertInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isFocused: false,
      isPopoverVisible: false
    });

    _defineProperty(_assertThisInitialized(_this), "componentRef", /*#__PURE__*/React.createRef());

    _defineProperty(_assertThisInitialized(_this), "handleMouseEnter", function () {
      if (_this.props.alertMessage) {
        _this.setState({
          isPopoverVisible: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function () {
      _this.setState({
        isPopoverVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputFocus", function (event) {
      event.target.select();

      _this.setState({
        isFocused: true,
        isPopoverVisible: Boolean(_this.props.alertMessage)
      });

      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputBlur", function (event) {
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

  _createClass(AlertInput, [{
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
      var className = classnames(baseClass, (_classnames = {}, _defineProperty(_classnames, alertStatus, alertStatus), _defineProperty(_classnames, "".concat(baseClass, "--focused"), this.state.isFocused), _defineProperty(_classnames, "".concat(baseClass, "--disabled"), disabled), _classnames), this.props.className);
      var theme = alertStatus === 'warning' ? 'warn' : alertStatus;
      var shouldPopoverOpen = this.state.isPopoverVisible && !_.isEmpty(alertMessage);

      var inputProps = _.omit(this.props, ['dts', 'prefixAddon', 'suffixAddon', 'alertStatus', 'alertMessage', 'onValueChange', 'popoverPlacement']);

      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        ref: this.componentRef,
        className: className,
        "data-test-selector": dts,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave
      }, prefixAddon ? /*#__PURE__*/React.createElement("span", {
        className: "".concat(baseClass, "__addon")
      }, prefixAddon) : null, /*#__PURE__*/React.createElement("input", _objectSpread(_objectSpread({}, inputProps), {}, {
        className: "".concat(baseClass, "__input"),
        onChange: onValueChange,
        onFocus: this.handleInputFocus,
        onBlur: this.handleInputBlur
      })), suffixAddon ? /*#__PURE__*/React.createElement("span", {
        className: "".concat(baseClass, "__addon")
      }, suffixAddon) : null), shouldPopoverOpen && /*#__PURE__*/React.createElement(Popover.WithRef, {
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
}(React.PureComponent);

AlertInput.propTypes = {
  className: PropTypes.string,
  dts: PropTypes.string,
  disabled: PropTypes.bool,
  prefixAddon: PropTypes.node,
  suffixAddon: PropTypes.node,

  /**
   * <span>
   *   As <code>success</code> is assumed, and help is always displayed independently, the accepted pattern is to
   *  only use <code>warning</code> and <code>error</code> feedback states with this component. Otherwise leave
   *  type undefined for <code>success</code>.
   * </span>
   */
  alertStatus: PropTypes.oneOf(['success', 'info', 'warning', 'error']),

  /**
   * 'left', 'top', 'top-start', 'top-end', 'bottom-start', 'bottom', 'bottom-end', 'right'
   */
  popoverPlacement: PropTypes.oneOf(popoverPlacements),
  alertMessage: PropTypes.string,
  onValueChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};
AlertInput.defaultProps = {
  alertStatus: 'success',
  popoverPlacement: 'bottom'
};
export default AlertInput;