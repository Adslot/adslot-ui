import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';

var RadioButton = function RadioButton(_ref) {
  var id = _ref.id,
      value = _ref.value,
      name = _ref.name,
      className = _ref.className,
      label = _ref.label,
      disabled = _ref.disabled,
      checked = _ref.checked,
      onChange = _ref.onChange,
      inline = _ref.inline,
      dts = _ref.dts;
  var componentClassName = classnames(['radio-component', {
    'radio-component-inline': inline
  }]);
  var iconClassName = classnames(['selection-component-icon', 'iradio', {
    checked: checked
  }, {
    disabled: disabled
  }]);
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: componentClassName
  }, expandDts(dts)), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("div", {
    className: "radio-component-input-container"
  }, /*#__PURE__*/React.createElement("span", {
    className: iconClassName
  }), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    value: value,
    id: id,
    className: className
  })), label && /*#__PURE__*/React.createElement("div", {
    className: "radio-component-label"
  }, label)));
};

RadioButton.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.node,
  value: PropTypes.string,
  dts: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  inline: PropTypes.bool,
  checked: PropTypes.bool
};
RadioButton.defaultProps = {
  dts: '',
  disabled: false,
  checked: false,
  onChange: _.noop
};
export default RadioButton;