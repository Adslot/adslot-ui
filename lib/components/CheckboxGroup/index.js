"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Checkbox = _interopRequireDefault(require("../Checkbox"));

var _utils = require("../../lib/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var CheckboxGroup = function CheckboxGroup(_ref) {
  var id = _ref.id,
      className = _ref.className,
      dts = _ref.dts,
      children = _ref.children,
      value = _ref.value,
      name = _ref.name,
      inline = _ref.inline,
      onChange = _ref.onChange;

  var handleCheckboxChange = function handleCheckboxChange(nextCheckboxState, checkboxName, checkboxValue) {
    var newValues = _lodash.default.includes(value, checkboxValue) ? value.filter(function (item) {
      return item !== checkboxValue;
    }) : [].concat((0, _toConsumableArray2.default)(value), [checkboxValue]);
    onChange(newValues, name);
  };

  var renderChildren = function renderChildren() {
    return _react.default.Children.map(children, function (child) {
      if (!child) return null;

      if (child.type === _Checkbox.default) {
        var childProps = _objectSpread(_objectSpread({}, child.props), {}, {
          name: name,
          inline: inline,
          checked: _lodash.default.includes(value, child.props.value),
          onChange: function onChange() {
            var _child$props;

            (_child$props = child.props).onChange.apply(_child$props, arguments);

            handleCheckboxChange.apply(void 0, arguments);
          }
        });

        return /*#__PURE__*/_react.default.createElement(child.type, childProps);
      }

      console.error("ERROR: CheckboxGroup's children should be an array of Checkbox");
      return null;
    });
  };

  var classNames = (0, _classnames.default)(['checkbox-group-component', className]);
  return children ? /*#__PURE__*/_react.default.createElement("div", Object.assign({
    id: id,
    className: classNames
  }, (0, _utils.expandDts)(dts)), renderChildren()) : null;
};

CheckboxGroup.propTypes = {
  /**
   * id for the checkboxGroup input
   */
  id: _propTypes.default.string,
  className: _propTypes.default.string,
  name: _propTypes.default.string.isRequired,

  /**
   * string array of checked values
   */
  value: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])).isRequired,

  /**
   * checkBoxGroup children: oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]
   */
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired,

  /**
   * function called when checkBox onChange event is fired
   */
  onChange: _propTypes.default.func.isRequired,

  /**
   * data-test-selector for the checkboxGroup component
   */
  dts: _propTypes.default.string,

  /**
   * determines if checkbox-component-inline class is applied or not
   */
  inline: _propTypes.default.bool
};
var _default = CheckboxGroup;
exports.default = _default;