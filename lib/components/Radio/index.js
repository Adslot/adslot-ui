"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../lib/utils");

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
  var componentClassName = (0, _classnames.default)(['radio-component', {
    'radio-component-inline': inline
  }]);
  var iconClassName = (0, _classnames.default)(['selection-component-icon', 'iradio', {
    checked: checked
  }, {
    disabled: disabled
  }]);
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    className: componentClassName
  }, (0, _utils.expandDts)(dts)), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "radio-component-input-container"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: iconClassName
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "radio",
    name: name,
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    value: value,
    id: id,
    className: className
  })), label && /*#__PURE__*/_react.default.createElement("div", {
    className: "radio-component-label"
  }, label)));
};

RadioButton.propTypes = {
  id: _propTypes.default.string,
  className: _propTypes.default.string,
  name: _propTypes.default.string,
  label: _propTypes.default.node,
  value: _propTypes.default.string,
  dts: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  inline: _propTypes.default.bool,
  checked: _propTypes.default.bool
};
RadioButton.defaultProps = {
  dts: '',
  disabled: false,
  checked: false,
  onChange: _lodash.default.noop
};
var _default = RadioButton;
exports.default = _default;