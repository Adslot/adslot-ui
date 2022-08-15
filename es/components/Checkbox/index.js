import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { expandDts, invariant } from '../../lib/utils';
import { useCheckboxGroup } from '../CheckboxGroup';
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
  invariant(!size, 'Checkbox size prop has been deprecated.');
  invariant(!inline, 'Checkbox inline prop has been deprecated.');
  const {
    onCheckboxChange,
    isCheckedHandler,
    name: checkboxName = name,
    variant = 'default'
  } = useCheckboxGroup();
  invariant(!((icon || text) && variant !== 'box'), 'Checkbox with icon or text must use box variant.');
  invariant(!(onChange && onCheckboxChange), 'Checkbox should not have onChange when used in a CheckboxGroup');
  invariant(!(isCheckedHandler && checkedProp), 'Checkbox checked state is handled by CheckboxGroup.');

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
  return /*#__PURE__*/React.createElement("div", Object.assign({}, rest, {
    role: 'checkbox',
    "aria-disabled": disabled ? 'true' : undefined,
    "aria-checked": checked === 'partial' ? 'mixed' : checked ? 'true' : 'false',
    className: classnames('aui--checkbox', {
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
  }, expandDts(dts)), /*#__PURE__*/React.createElement("label", {
    htmlFor: id
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: checkboxName,
    checked: checked,
    disabled: disabled,
    onChange: handleChange,
    value: value,
    id: id
  }), /*#__PURE__*/React.createElement("div", {
    className: "aui--checkbox-input-icon"
  }), label && /*#__PURE__*/React.createElement("div", {
    className: "aui--checkbox-label"
  }, icon && /*#__PURE__*/React.createElement("div", {
    className: "aui--checkbox-icon"
  }, icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "aui--checkbox-label-text"
  }, label), text && /*#__PURE__*/React.createElement("div", {
    className: "aui--checkbox-text"
  }, text)))));
};

Checkbox.propTypes = {
  /**
   * id for the checkbox input
   */
  id: PropTypes.string,
  className: PropTypes.string,

  /**
   * name for the checkbox input
   */
  name: PropTypes.string,

  /**
   * checkBox label for the checkbox input
   */
  label: PropTypes.node,

  /**
   * additional text description to display below the label
   */
  text: PropTypes.node,

  /**
   * icon to display beside the label when  parent group's `variant="box"`
   */
  icon: PropTypes.node,

  /**
   * checkBox input value
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * data-test-selector for the checkbox component
   */
  dts: PropTypes.string,

  /**
   * determines if the checkbox is disabled
   */
  disabled: PropTypes.bool,

  /**
   * @function onChange called when checkBox onChange event is fired
   * @param {string|boolean} nextState - the checked state
   * @param {string} name - the checkbox name
   * @param {string|number} value - the checkbox value
   */
  onChange: PropTypes.func,

  /**
   * checked status of the input checkBox: oneOf([true, false, 'partial']
   */
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['partial'])]),

  /**
   * @deprecated
   */
  size: PropTypes.number,

  /**
   * @deprecated
   */
  inline: PropTypes.bool
};
Checkbox.defaultProps = {
  dts: '',
  disabled: false,
  checked: false
};
export default Checkbox;