import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

var FormGroup = function FormGroup(_ref) {
  var addon = _ref.addon,
      disabled = _ref.disabled,
      helpText = _ref.helpText,
      label = _ref.label,
      onChange = _ref.onChange,
      placeholder = _ref.placeholder,
      value = _ref.value;
  var addonElement = addon ? /*#__PURE__*/React.createElement("div", {
    className: "input-group-addon"
  }, addon) : null;

  var inputId = _.kebabCase(label);

  return /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    className: "control-label col-xs-3"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "col-xs-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-group col-xs-12"
  }, addonElement, /*#__PURE__*/React.createElement("input", {
    className: "form-control",
    disabled: disabled,
    id: inputId,
    onChange: onChange,
    placeholder: placeholder,
    type: "text",
    value: value
  })), /*#__PURE__*/React.createElement("p", {
    className: "help-block"
  }, helpText)));
};

FormGroup.propTypes = {
  addon: PropTypes.string,
  disabled: PropTypes.bool,
  helpText: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string
};
FormGroup.defaultProps = {
  disabled: false,
  value: ''
};
export default FormGroup;