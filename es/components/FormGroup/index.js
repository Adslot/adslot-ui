import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = _ref => {
  let {
    addon,
    disabled,
    helpText,
    label,
    onChange,
    placeholder,
    value
  } = _ref;
  const addonElement = addon ? /*#__PURE__*/React.createElement("div", {
    className: "input-group-addon"
  }, addon) : null;

  const inputId = _.kebabCase(label);

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