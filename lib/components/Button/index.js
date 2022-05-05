"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Spinner = _interopRequireDefault(require("../Spinner"));

var _utils = require("../../lib/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var Button = function Button(props) {
  var _classNames;

  var theme = props.theme,
      children = props.children,
      className = props.className,
      disabled = props.disabled,
      dts = props.dts,
      href = props.href,
      inverse = props.inverse,
      isLoading = props.isLoading,
      size = props.size,
      target = props.target,
      type = props.type;
  var baseClass = 'aui--button';
  var classes = (0, _classnames.default)(baseClass, (_classNames = {
    'btn-inverse': inverse,
    'btn-large': size === 'large'
  }, (0, _defineProperty2.default)(_classNames, "btn-".concat(theme), !_lodash.default.isEmpty(theme)), (0, _defineProperty2.default)(_classNames, 'has-anchor', href), _classNames), className);

  var renderSpinner = function renderSpinner() {
    return isLoading ? /*#__PURE__*/_react.default.createElement("div", {
      className: "spinner-container"
    }, /*#__PURE__*/_react.default.createElement(_Spinner.default, {
      size: size === 'large' ? 'medium' : 'small'
    })) : null;
  };

  var renderChildren = function renderChildren() {
    return href ? !disabled ? /*#__PURE__*/_react.default.createElement("a", {
      className: "aui--button-anchor",
      href: href,
      target: target,
      rel: "noopener noreferrer"
    }, children) : /*#__PURE__*/_react.default.createElement("div", {
      className: "aui--button-anchor"
    }, children) : children;
  };

  return /*#__PURE__*/_react.default.createElement("button", Object.assign({
    disabled: isLoading || disabled,
    className: classes,
    type: type
  }, (0, _utils.expandDts)(dts), _lodash.default.omit(props, _lodash.default.keys(adslotButtonPropTypes))), renderSpinner(), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('aui--button-children-container', {
      'is-loading': isLoading
    })
  }, renderChildren()));
};

var adslotButtonPropTypes = {
  /**
   * PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger', 'link'])
   */
  theme: _propTypes.default.oneOf(['default', 'primary', 'success', 'info', 'warning', 'danger', 'link']),
  className: _propTypes.default.string,
  dts: _propTypes.default.string,
  href: _propTypes.default.string,

  /**
   * The target attribute specifies where to open the linked document when there is a defined 'href',
   * PropTypes.oneOf(['_blank', '_self', '_parent', '_top'])
   */
  target: _propTypes.default.oneOf(['_blank', '_self', '_parent', '_top']),
  inverse: _propTypes.default.bool,
  isLoading: _propTypes.default.bool,

  /**
   * PropTypes.oneOf(['small', 'large'])
   */
  size: _propTypes.default.oneOf(['small', 'large']),

  /**
   * PropTypes.oneOf(['button', 'reset', 'submit'])
   */
  type: _propTypes.default.oneOf(['button', 'reset', 'submit'])
};
Button.propTypes = _objectSpread({}, adslotButtonPropTypes);
Button.defaultProps = {
  inverse: false,
  isLoading: false,
  size: 'small',
  theme: 'default',
  target: '_self',
  type: 'button'
};
var _default = Button;
exports.default = _default;