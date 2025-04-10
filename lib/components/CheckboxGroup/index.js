"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
Object.defineProperty(exports, "useCheckboxGroup", {
  enumerable: true,
  get: function () {
    return _CheckboxGroupContext.useCheckboxGroup;
  }
});
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _lodash = _interopRequireDefault(require("lodash"));
var _utils = require("../../utils");
var _invariant = _interopRequireDefault(require("../../invariant"));
var _Checkbox = _interopRequireWildcard(require("../Checkbox"));
var _CheckboxGroupContext = _interopRequireWildcard(require("./CheckboxGroupContext"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CheckboxGroupItem = ({
  value,
  ...rest
}) => {
  const groupCtx = (0, _CheckboxGroupContext.useCheckboxGroup)();
  (0, _invariant.default)(!_lodash.default.isEmpty(groupCtx), 'CheckboxGroup.Item: must be used as children of CheckboxGroup');
  (0, _invariant.default)(!rest.name, 'CheckboxGroup.Item: name will be overridden by CheckboxGroup name');
  (0, _invariant.default)(!rest.variant, 'CheckboxGroup.Item: variant will be overridden by CheckboxGroup variant');
  (0, _invariant.default)(!rest.onChange, 'CheckboxGroup.Item: onChange will be overridden by CheckboxGroup onChange');
  const {
    onItemChange,
    getIsItemChecked,
    name,
    variant
  } = groupCtx;
  return /*#__PURE__*/_react.default.createElement(_Checkbox.default, Object.assign({}, rest, {
    name: name,
    value: value,
    variant: variant,
    checked: getIsItemChecked(value),
    onChange: () => onItemChange(value)
  }));
};
CheckboxGroupItem.propTypes = {
  ..._Checkbox.shareCheckboxPropTypes
};
const CheckboxGroupAll = ({
  className,
  label = 'All',
  values,
  ...rest
}) => {
  const groupCtx = (0, _CheckboxGroupContext.useCheckboxGroup)();
  (0, _invariant.default)(!_lodash.default.isEmpty(groupCtx), 'CheckboxGroup.All: must be used as children of CheckboxGroup');
  const {
    onAllChange,
    getIsAllChecked,
    name,
    variant
  } = groupCtx;
  return /*#__PURE__*/_react.default.createElement(_Checkbox.default, Object.assign({}, rest, {
    className: (0, _classnames.default)(className, 'is-all'),
    name: name,
    label: label,
    checked: getIsAllChecked(values),
    onChange: onAllChange(values),
    variant: variant
  }));
};
CheckboxGroupAll.propTypes = {
  label: _propTypes.default.node,
  className: _propTypes.default.string,
  /**
   * a array of values that the All option represent
   */
  values: _propTypes.default.array.isRequired
};
const CheckboxGroup = ({
  name,
  value,
  onChange,
  orientation = 'vertical',
  className,
  getIsChecked,
  dts,
  children,
  variant = 'default',
  inline,
  indent = false,
  ...rest
}) => {
  const parentCtx = (0, _CheckboxGroupContext.useCheckboxGroup)();
  const isNested = !_lodash.default.isEmpty(parentCtx);
  (0, _invariant.default)(isNested || Array.isArray(value), 'CheckboxGroup: must have an array as value');
  (0, _invariant.default)(!inline, 'CheckboxGroup: the inline prop has been replaced by orientation="vertical"');
  return /*#__PURE__*/_react.default.createElement(_CheckboxGroupContext.default, {
    name: name,
    value: value,
    onChange: onChange,
    getIsChecked: getIsChecked,
    variant: variant
  }, /*#__PURE__*/_react.default.createElement("div", Object.assign({}, rest, {
    role: "group",
    className: (0, _classnames.default)('aui--checkbox-group', className, {
      'is-vertical': orientation === 'vertical',
      'is-default': variant === 'default',
      'is-indented': isNested && indent
    })
  }, (0, _utils.expandDts)(dts)), children));
};
CheckboxGroup.propTypes = {
  value: _propTypes.default.array,
  name: _propTypes.default.string,
  /**
   * @function onChange
   * @param {array} newValue - the new checkboxGroup value
   * @param {string} name - the checkbox name
   * @param {string|number} value - the changed checkbox's value
   */
  onChange: _propTypes.default.func,
  /**
   * @function getIsChecked overrides the default checked state behaviour
   * @param {string|number} itemValue - the checkbox's value
   * @param {array} value - the checkbox group's value
   */
  getIsChecked: _propTypes.default.func,
  orientation: _propTypes.default.oneOf(['vertical', 'horizontal']),
  children: _propTypes.default.node.isRequired,
  className: _propTypes.default.string,
  dts: _propTypes.default.string,
  variant: _propTypes.default.oneOf(['default', 'box']),
  id: _propTypes.default.string,
  indent: _propTypes.default.bool,
  /**
   *  @deprecated use orientation="horizontal" instead
   **/
  inline: _propTypes.default.bool
};
CheckboxGroup.Item = CheckboxGroupItem;
CheckboxGroup.All = CheckboxGroupAll;
var _default = exports.default = CheckboxGroup;