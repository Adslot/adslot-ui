"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var FormGroup = function FormGroup(_ref) {
  var addon = _ref.addon,
      disabled = _ref.disabled,
      helpText = _ref.helpText,
      label = _ref.label,
      onChange = _ref.onChange,
      placeholder = _ref.placeholder,
      value = _ref.value;
  var addonElement = addon ? /*#__PURE__*/_react.default.createElement("div", {
    className: "input-group-addon"
  }, addon) : null;

  var inputId = _lodash.default.kebabCase(label);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: inputId,
    className: "control-label col-xs-3"
  }, label), /*#__PURE__*/_react.default.createElement("div", {
    className: "col-xs-5"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "input-group col-xs-12"
  }, addonElement, /*#__PURE__*/_react.default.createElement("input", {
    className: "form-control",
    disabled: disabled,
    id: inputId,
    onChange: onChange,
    placeholder: placeholder,
    type: "text",
    value: value
  })), /*#__PURE__*/_react.default.createElement("p", {
    className: "help-block"
  }, helpText)));
};

FormGroup.propTypes = {
  addon: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  helpText: _propTypes.default.string.isRequired,
  label: _propTypes.default.string.isRequired,
  onChange: _propTypes.default.func,
  placeholder: _propTypes.default.string.isRequired,
  value: _propTypes.default.string
};
FormGroup.defaultProps = {
  disabled: false,
  value: ''
};
var _default = FormGroup;
exports.default = _default;