"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../lib/utils");

var _CheckboxGroup = require("../CheckboxGroup");

const SELECTION_KEYS = ['Enter', ' '];

const getNextState = checked => {
  if (checked === 'partial') return false;
  return !checked;
};

const Checkbox = _ref => {
  let {
    name,
    value,
    label,
    dts,
    disabled,
    checked: checkedProp,
    id,
    className,
    text,
    icon,
    onChange,
    size,
    inline,
    ...rest
  } = _ref;
  (0, _utils.invariant)(!size, 'Checkbox size prop has been deprecated.');
  (0, _utils.invariant)(!inline, 'Checkbox inline prop has been deprecated.');
  const {
    onCheckboxChange,
    isCheckedHandler,
    name: checkboxName = name,
    variant = 'default'
  } = (0, _CheckboxGroup.useCheckboxGroup)();
  (0, _utils.invariant)(!((icon || text) && variant !== 'box'), 'Checkbox with icon or text must use box variant.');
  (0, _utils.invariant)(!(onChange && onCheckboxChange), 'Checkbox should not have onChange when used in a CheckboxGroup');
  (0, _utils.invariant)(!(isCheckedHandler && checkedProp), 'Checkbox checked state is handled by CheckboxGroup.');

  const onCheckboxKeyDown = event => {
    if (SELECTION_KEYS.includes(event.key)) {
      event.preventDefault();
      handleChange();
    }
  };

  const handleChange = () => {
    onCheckboxChange ? onCheckboxChange(value) : onChange(getNextState(checked), name, value);
  };

  const checked = isCheckedHandler ? isCheckedHandler(value) : checkedProp;
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({}, rest, {
    role: 'checkbox',
    "aria-disabled": disabled ? 'true' : undefined,
    "aria-checked": checked === 'partial' ? 'mixed' : checked ? 'true' : 'false',
    className: (0, _classnames.default)('aui--checkbox', {
      checked: checked === true,
      'partial-checked': checked === 'partial',
      'aui--checkbox-box': variant === 'box',
      'aui--checkbox-default': variant === 'default',
      'is-reverse': icon,
      'is-selected': checked,
      'is-disabled': disabled,
      'has-text': text != null,
      disabled
    }, className),
    "data-aui-value": value,
    tabIndex: !disabled ? 0 : -1,
    onKeyDown: onCheckboxKeyDown
  }, (0, _utils.expandDts)(dts)), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: id
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    name: checkboxName,
    checked: checked,
    disabled: disabled,
    onChange: handleChange,
    value: value,
    id: id
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--checkbox-input-icon"
  }), label && /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--checkbox-label"
  }, icon && /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--checkbox-icon"
  }, icon), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--checkbox-label-text"
  }, label), text && /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--checkbox-text"
  }, text)))));
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
   * additional text description to display below the label
   */
  text: _propTypes.default.node,

  /**
   * icon to display beside the label when  parent group's `variant="box"`
   */
  icon: _propTypes.default.node,

  /**
   * checkBox input value
   */
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * data-test-selector for the checkbox component
   */
  dts: _propTypes.default.string,

  /**
   * determines if the checkbox is disabled
   */
  disabled: _propTypes.default.bool,

  /**
   * @function onChange called when checkBox onChange event is fired
   * @param {string|boolean} nextState - the checked state
   * @param {string} name - the checkbox name
   * @param {string|number} value - the checkbox value
   */
  onChange: _propTypes.default.func,

  /**
   * checked status of the input checkBox: oneOf([true, false, 'partial']
   */
  checked: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['partial'])]),

  /**
   * @deprecated
   */
  size: _propTypes.default.number,

  /**
   * @deprecated
   */
  inline: _propTypes.default.bool
};
Checkbox.defaultProps = {
  dts: '',
  disabled: false,
  checked: false
};
var _default = Checkbox;
exports.default = _default;