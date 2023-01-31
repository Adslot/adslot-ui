"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.baseClass = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _classnames = _interopRequireDefault(require("classnames"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Popover = _interopRequireDefault(require("../Popover"));
var _constants = require("../Popover/constants");
const baseClass = 'aui--alert-input';
exports.baseClass = baseClass;
class AlertInput extends _react.default.PureComponent {
  state = {
    isFocused: false,
    isPopoverVisible: false
  };
  componentRef = /*#__PURE__*/_react.default.createRef();
  handleMouseEnter = () => {
    if (this.props.alertMessage) {
      this.setState({
        isPopoverVisible: true
      });
    }
  };
  handleMouseLeave = () => {
    this.setState({
      isPopoverVisible: false
    });
  };
  handleInputFocus = event => {
    event.target.select();
    this.setState({
      isFocused: true,
      isPopoverVisible: Boolean(this.props.alertMessage)
    });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };
  handleInputBlur = event => {
    this.setState({
      isFocused: false,
      isPopoverVisible: false
    });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };
  render() {
    const {
      dts,
      popoverPlacement,
      disabled,
      prefixAddon,
      suffixAddon,
      alertStatus,
      alertMessage,
      onValueChange
    } = this.props;
    const className = (0, _classnames.default)(baseClass, {
      [alertStatus]: alertStatus,
      [`${baseClass}--focused`]: this.state.isFocused,
      [`${baseClass}--disabled`]: disabled
    }, this.props.className);
    const theme = alertStatus === 'warning' ? 'warn' : alertStatus;
    const shouldPopoverOpen = this.state.isPopoverVisible && !_lodash.default.isEmpty(alertMessage);
    const inputProps = _lodash.default.omit(this.props, ['dts', 'prefixAddon', 'suffixAddon', 'alertStatus', 'alertMessage', 'onValueChange', 'popoverPlacement']);
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      ref: this.componentRef,
      className: className,
      "data-test-selector": dts,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave
    }, prefixAddon ? /*#__PURE__*/_react.default.createElement("span", {
      className: `${baseClass}__addon`
    }, prefixAddon) : null, /*#__PURE__*/_react.default.createElement("input", Object.assign({}, inputProps, {
      className: `${baseClass}__input`,
      onChange: onValueChange,
      onFocus: this.handleInputFocus,
      onBlur: this.handleInputBlur
    })), suffixAddon ? /*#__PURE__*/_react.default.createElement("span", {
      className: `${baseClass}__addon`
    }, suffixAddon) : null), shouldPopoverOpen && /*#__PURE__*/_react.default.createElement(_Popover.default.WithRef, {
      isOpen: true,
      refElement: this.componentRef.current,
      placement: popoverPlacement,
      popoverClassNames: `${baseClass}__popover`,
      theme: theme,
      popoverContent: alertMessage
    }));
  }
}
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