"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../lib/utils");

var _RadioGroup = require("../RadioGroup");

const SELECTION_KEYS = ['Enter', ' '];

const Radio = _ref => {
  let {
    id,
    value,
    name,
    className,
    label,
    disabled,
    checked: checkedProp,
    onChange,
    text,
    icon,
    dts,
    inline,
    ...rest
  } = _ref;
  const {
    onChange: onGroupChange,
    value: groupValue,
    variant = 'default',
    name: radioName = name
  } = (0, _RadioGroup.useRadioGroup)();
  (0, _utils.invariant)(!inline, 'Radio inline prop has been deprecated.');
  (0, _utils.invariant)(!(onChange && onGroupChange), 'Radio should not have onChange when used in a RadioGroup');
  (0, _utils.invariant)(!((icon || text) && variant !== 'box'), 'Radio with icon or text must use box variant.');
  (0, _utils.invariant)(!(groupValue && checkedProp), 'Radio checked state is handled by RadioGroup.');
  const checked = groupValue ? value === groupValue : checkedProp;
  const iconClassName = (0, _classnames.default)(['aui--radio-input-icon', {
    checked,
    disabled
  }]);

  const handleChange = () => {
    onGroupChange === null || onGroupChange === void 0 ? void 0 : onGroupChange(value);
    onChange === null || onChange === void 0 ? void 0 : onChange(value);
  };

  return /*#__PURE__*/_react.default.createElement("div", Object.assign({}, rest, {
    role: "radio",
    "aria-disabled": disabled ? 'true' : undefined,
    "aria-checked": checked ? 'true' : 'false',
    className: (0, _classnames.default)('aui--radio', {
      'aui--radio-box': variant === 'box',
      'aui--radio-default': variant === 'default',
      'is-reverse': icon,
      'is-selected': checked,
      'is-disabled': disabled,
      'has-text': text != null
    }, className),
    "data-aui-value": value,
    tabIndex: !groupValue ? 0 : checked || groupValue.length === 0 ? 0 : -1,
    onKeyDown: event => {
      if (SELECTION_KEYS.includes(event.key) && !checked) {
        event.preventDefault();
        handleChange();
      }
    }
  }, (0, _utils.expandDts)(dts)), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: id
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--radio-input-container"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: iconClassName
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    name: radioName,
    checked: checked,
    disabled: disabled,
    onChange: handleChange,
    value: value,
    id: id
  })), label && /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--radio-label"
  }, icon && /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--radio-icon"
  }, icon), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--radio-label-text"
  }, label), text && /*#__PURE__*/_react.default.createElement("div", {
    className: "aui--radio-text"
  }, text)))));
};

Radio.propTypes = {
  id: _propTypes.default.string,
  className: _propTypes.default.string,
  name: _propTypes.default.string,
  label: _propTypes.default.node,

  /**
   * additional text description to display below the label
   */
  text: _propTypes.default.node,

  /**
   * icon to display beside the label when parent group's `variant="box"`
   */
  icon: _propTypes.default.node,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  dts: _propTypes.default.string,
  disabled: _propTypes.default.bool,

  /**
   * @function onChange called when radio onChange event is fired
   * @param {string|number} value - the radio value
   */
  onChange: _propTypes.default.func,

  /**
   * checked status of the radio input
   */
  checked: _propTypes.default.bool,

  /**
   * @deprecated
   */
  inline: _propTypes.default.bool
};
Radio.defaultProps = {
  dts: '',
  disabled: false,
  checked: false
};
var _default = Radio;
exports.default = _default;