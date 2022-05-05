"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../lib/utils");

var getNextState = function getNextState(checked) {
  if (checked === 'partial') return false;
  return !checked;
};

var Checkbox = function Checkbox(_ref) {
  var name = _ref.name,
      value = _ref.value,
      label = _ref.label,
      dts = _ref.dts,
      disabled = _ref.disabled,
      checked = _ref.checked,
      id = _ref.id,
      className = _ref.className,
      inline = _ref.inline,
      onChange = _ref.onChange,
      size = _ref.size;
  var componentClassName = (0, _classnames.default)(['checkbox-component', {
    'checkbox-component-inline': inline,
    checked: checked === true,
    'partial-checked': checked === 'partial',
    disabled: disabled
  }, className]);

  var handleChange = function handleChange() {
    return onChange(getNextState(checked), name, value);
  };

  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: componentClassName
  }, (0, _utils.expandDts)(dts)), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    name: name,
    checked: checked,
    disabled: disabled,
    onChange: handleChange,
    value: value,
    id: id,
    className: className
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "checkbox-component-icon",
    style: {
      width: size,
      height: size
    }
  }), label ? /*#__PURE__*/_react.default.createElement("div", {
    className: "checkbox-component-label",
    style: {
      lineHeight: "".concat(size, "px")
    }
  }, label) : null));
};

Checkbox.propTypes = {
  /**
   * id for the checkbox input
   */
  id: _propTypes.default.string,
  className: _propTypes.default.string,

  /**
   * name for the checkbox input
   */
  name: _propTypes.default.string,

  /**
   * checkBox label for the checkbox input
   */
  label: _propTypes.default.node,

  /**
   * checkBox input value
   */
  value: _propTypes.default.string,

  /**
   * data-test-selector for the checkbox component
   */
  dts: _propTypes.default.string,

  /**
   * determines if the checkbox is disabled
   */
  disabled: _propTypes.default.bool,

  /**
   * function called when checkBox onChange event is fired
   */
  onChange: _propTypes.default.func,

  /**
   * determines if checkbox-component-inline class is applied or not
   */
  inline: _propTypes.default.bool,

  /**
   * checked status of the input checkBox: oneOf([true, false, 'partial']
   */
  checked: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['partial'])]),
  size: _propTypes.default.number
};
Checkbox.defaultProps = {
  dts: '',
  disabled: false,
  checked: false,
  onChange: _lodash.default.noop,
  size: 16
};
var _default = Checkbox;
exports.default = _default;