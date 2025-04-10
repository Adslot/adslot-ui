import classnames from 'classnames';
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { expandDts } from '../../utils';
import invariant from '../../invariant';
import { useRadioGroup } from '../RadioGroup';
const SELECTION_KEYS = ['Enter', ' '];
const Radio = ({
  value,
  name,
  className,
  label,
  disabled = false,
  checked,
  onChange,
  text,
  icon,
  dts,
  inline,
  ...rest
}) => {
  const {
    onChange: onGroupChange,
    value: groupValue,
    variant = 'default',
    name: radioName = name
  } = useRadioGroup();
  const hasGroupValue = !_.isNil(groupValue);
  const hasItemValue = !_.isNil(checked);
  invariant(!inline, 'Radio inline prop has been deprecated.');
  invariant(!(onChange && onGroupChange), 'Radio should not have onChange when used in a RadioGroup');
  invariant(!((icon || text) && variant !== 'box'), 'Radio with icon or text must use box variant.');
  invariant(!(hasGroupValue && hasItemValue), 'Radio checked state is handled by RadioGroup.');
  const isChecked = hasGroupValue ? value === groupValue : !!checked;
  const iconClassName = classnames(['aui--radio-input-icon', {
    checked: isChecked,
    disabled
  }]);
  const handleChange = () => {
    onGroupChange?.(value);
    onChange?.(value);
  };
  const tabIndex = isChecked || groupValue?.length === 0 ? 0 : -1;
  return /*#__PURE__*/React.createElement("div", Object.assign({}, rest, {
    role: "radio",
    "aria-disabled": disabled ? 'true' : undefined,
    "aria-checked": isChecked ? 'true' : 'false',
    className: classnames('aui--radio', {
      'aui--radio-box': variant === 'box',
      'aui--radio-default': variant === 'default',
      'is-reverse': icon,
      'is-selected': isChecked,
      'is-disabled': disabled,
      'has-text': text != null
    }, className),
    "data-aui-value": value,
    tabIndex: !groupValue ? 0 : tabIndex,
    onKeyDown: event => {
      if (SELECTION_KEYS.includes(event.key) && !isChecked) {
        event.preventDefault();
        handleChange();
      }
    }
  }, expandDts(dts)), /*#__PURE__*/React.createElement("label", {
    className: "aui--radio-label-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "aui--radio-input-container"
  }, /*#__PURE__*/React.createElement("span", {
    className: iconClassName
  }), /*#__PURE__*/React.createElement("input", {
    className: "aui--radio-input",
    type: "radio",
    name: radioName,
    checked: isChecked,
    disabled: disabled,
    onChange: handleChange,
    value: value
  })), label && /*#__PURE__*/React.createElement("div", {
    className: "aui--radio-label"
  }, icon && /*#__PURE__*/React.createElement("div", {
    className: "aui--radio-icon"
  }, icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "aui--radio-label-text"
  }, label), text && /*#__PURE__*/React.createElement("div", {
    className: "aui--radio-text"
  }, text)))));
};
Radio.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.node,
  /**
   * additional text description to display below the label
   */
  text: PropTypes.node,
  /**
   * icon to display beside the label when parent group's `variant="box"`
   */
  icon: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dts: PropTypes.string,
  disabled: PropTypes.bool,
  /**
   * @function onChange called when radio onChange event is fired
   * @param {string|number} value - the radio value
   */
  onChange: PropTypes.func,
  /**
   * checked status of the radio input
   */
  checked: PropTypes.bool,
  /**
   * @deprecated
   */
  inline: PropTypes.bool
};
export default Radio;