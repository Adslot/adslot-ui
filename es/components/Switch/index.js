import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

var Switch = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Switch, _React$PureComponent);

  var _super = _createSuper(Switch);

  function Switch() {
    var _this;

    _classCallCheck(this, Switch);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      checked: _this.props.defaultChecked || false
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          checked = _this$props.checked;

      var targetCheckedValue = _.get(event, 'target.checked');

      if (_.isNil(checked)) _this.setState({
        checked: targetCheckedValue
      });
      if (_.isFunction(onChange)) onChange(targetCheckedValue);
    });

    return _this;
  }

  _createClass(Switch, [{
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
      if (!_.isNil(checked) && !_.isNil(defaultChecked)) console.warn('Failed prop type: Contains an input of type checkbox with both `checked` and `defaultChecked` props. Input elements must be either controlled or uncontrolled');
      if (!_.isNil(checked) && _.isNil(onChange)) console.warn('Failed prop type: You have provided a `checked` prop to Switch Component without an `onChange` handler. This will render a read-only field.');
      var toggleInputChecked = !_.isNil(checked) ? checked : this.state.checked;
      return /*#__PURE__*/React.createElement("label", {
        className: "aui--switch-label"
      }, /*#__PURE__*/React.createElement("input", {
        type: "checkbox",
        checked: toggleInputChecked,
        value: value,
        disabled: disabled,
        onChange: this.handleChange,
        className: className,
        "data-test-selector": dts
      }), /*#__PURE__*/React.createElement("span", {
        className: "aui--switch-slider round"
      }));
    }
  }]);

  return Switch;
}(React.PureComponent);

Switch.defaultProps = {
  value: '',
  disabled: false,
  dts: 'switch-component'
};
Switch.propTypes = {
  /**
   * 	switch value, if the value is un-controlled
   */
  defaultChecked: PropTypes.bool,

  /**
   * 	switch value, if the value is controlled
   */
  checked: PropTypes.bool,
  value: PropTypes.string,
  disabled: PropTypes.bool,

  /**
   * 	This function is called when value is changed
   *  <br/>
   *  const onChange = (nextState) => ...
   */
  onChange: PropTypes.func,
  dts: PropTypes.string,
  className: PropTypes.string
};
export default Switch;