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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Switch = /*#__PURE__*/function (_React$PureComponent) {
  (0, _inherits2.default)(Switch, _React$PureComponent);

  var _super = _createSuper(Switch);

  function Switch() {
    var _this;

    (0, _classCallCheck2.default)(this, Switch);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      checked: _this.props.defaultChecked || false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleChange", function (event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          checked = _this$props.checked;

      var targetCheckedValue = _lodash.default.get(event, 'target.checked');

      if (_lodash.default.isNil(checked)) _this.setState({
        checked: targetCheckedValue
      });
      if (_lodash.default.isFunction(onChange)) onChange(targetCheckedValue);
    });
    return _this;
  }

  (0, _createClass2.default)(Switch, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          defaultChecked = _this$props2.defaultChecked,
          checked = _this$props2.checked,
          value = _this$props2.value,
          disabled = _this$props2.disabled,
          onChange = _this$props2.onChange,
          className = _this$props2.className,
          dts = _this$props2.dts;
      if (!_lodash.default.isNil(checked) && !_lodash.default.isNil(defaultChecked)) console.warn('Failed prop type: Contains an input of type checkbox with both `checked` and `defaultChecked` props. Input elements must be either controlled or uncontrolled');
      if (!_lodash.default.isNil(checked) && _lodash.default.isNil(onChange)) console.warn('Failed prop type: You have provided a `checked` prop to Switch Component without an `onChange` handler. This will render a read-only field.');
      var toggleInputChecked = !_lodash.default.isNil(checked) ? checked : this.state.checked;
      return /*#__PURE__*/_react.default.createElement("label", {
        className: "aui--switch-label"
      }, /*#__PURE__*/_react.default.createElement("input", {
        type: "checkbox",
        checked: toggleInputChecked,
        value: value,
        disabled: disabled,
        onChange: this.handleChange,
        className: className,
        "data-test-selector": dts
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "aui--switch-slider round"
      }));
    }
  }]);
  return Switch;
}(_react.default.PureComponent);

Switch.defaultProps = {
  value: '',
  disabled: false,
  dts: 'switch-component'
};
Switch.propTypes = {
  /**
   * 	switch value, if the value is un-controlled
   */
  defaultChecked: _propTypes.default.bool,

  /**
   * 	switch value, if the value is controlled
   */
  checked: _propTypes.default.bool,
  value: _propTypes.default.string,
  disabled: _propTypes.default.bool,

  /**
   * 	This function is called when value is changed
   *  <br/>
   *  const onChange = (nextState) => ...
   */
  onChange: _propTypes.default.func,
  dts: _propTypes.default.string,
  className: _propTypes.default.string
};
var _default = Switch;
exports.default = _default;