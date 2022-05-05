import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';

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
  var componentClassName = classnames(['checkbox-component', {
    'checkbox-component-inline': inline,
    checked: checked === true,
    'partial-checked': checked === 'partial',
    disabled: disabled
  }, className]);

  var handleChange = function handleChange() {
    return onChange(getNextState(checked), name, value);
  };

  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: componentClassName
  }, expandDts(dts)), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: name,
    checked: checked,
    disabled: disabled,
    onChange: handleChange,
    value: value,
    id: id,
    className: className
  }), /*#__PURE__*/React.createElement("div", {
    className: "checkbox-component-icon",
    style: {
      width: size,
      height: size
    }
  }), label ? /*#__PURE__*/React.createElement("div", {
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
   * checkBox input value
   */
  value: PropTypes.string,

  /**
   * data-test-selector for the checkbox component
   */
  dts: PropTypes.string,

  /**
   * determines if the checkbox is disabled
   */
  disabled: PropTypes.bool,

  /**
   * function called when checkBox onChange event is fired
   */
  onChange: PropTypes.func,

  /**
   * determines if checkbox-component-inline class is applied or not
   */
  inline: PropTypes.bool,

  /**
   * checked status of the input checkBox: oneOf([true, false, 'partial']
   */
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['partial'])]),
  size: PropTypes.number
};
Checkbox.defaultProps = {
  dts: '',
  disabled: false,
  checked: false,
  onChange: _.noop,
  size: 16
};
export default Checkbox;