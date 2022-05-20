"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Textarea = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2.default)(Textarea, _React$PureComponent);

  var _super = _createSuper(Textarea);

  function Textarea(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Textarea);
    _this = _super.call(this, props);

    var valueString = _lodash.default.toString(_this.props.value);

    var charCountRemaining = _this.props.maxLength - valueString.length;
    _this.state = {
      charCountRemaining: charCountRemaining
    };
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(Textarea, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({
        charCountRemaining: this.props.maxLength - event.target.value.length
      });

      if (this.props.onChange) {
        this.props.onChange(event);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          maxLength = _this$props.maxLength,
          statusClass = _this$props.statusClass;

      var restProps = _lodash.default.omit(this.props, ['statusClass']);

      var classNames = (0, _classnames.default)('form-control', restProps.className);
      return _lodash.default.isNil(maxLength) ? /*#__PURE__*/_react.default.createElement("textarea", Object.assign({}, restProps, {
        className: classNames
      })) : /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("textarea", Object.assign({}, restProps, {
        className: classNames,
        onChange: this.handleChange
      })), /*#__PURE__*/_react.default.createElement("span", {
        className: statusClass
      }, this.state.charCountRemaining, " characters remaining"));
    }
  }]);
  return Textarea;
}(_react.default.PureComponent);

Textarea.propTypes = {
  maxLength: _propTypes.default.number,
  statusClass: _propTypes.default.string,
  onChange: _propTypes.default.func,
  value: _propTypes.default.string
};
Textarea.defaultProps = {
  statusClass: ''
};
var _default = Textarea;
exports.default = _default;