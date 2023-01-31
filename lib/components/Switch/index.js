"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
class Switch extends _react.default.PureComponent {
  state = {
    checked: this.props.defaultChecked || false
  };
  handleChange = event => {
    const {
      onChange,
      checked
    } = this.props;
    const targetCheckedValue = _lodash.default.get(event, 'target.checked');
    if (_lodash.default.isNil(checked)) this.setState({
      checked: targetCheckedValue
    });
    if (_lodash.default.isFunction(onChange)) onChange(targetCheckedValue);
  };
  render() {
    const {
      defaultChecked,
      checked,
      value,
      disabled,
      onChange,
      className,
      dts
    } = this.props;
    if (!_lodash.default.isNil(checked) && !_lodash.default.isNil(defaultChecked)) console.warn('Failed prop type: Contains an input of type checkbox with both `checked` and `defaultChecked` props. Input elements must be either controlled or uncontrolled');
    if (!_lodash.default.isNil(checked) && _lodash.default.isNil(onChange)) console.warn('Failed prop type: You have provided a `checked` prop to Switch Component without an `onChange` handler. This will render a read-only field.');
    const toggleInputChecked = !_lodash.default.isNil(checked) ? checked : this.state.checked;
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
}
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