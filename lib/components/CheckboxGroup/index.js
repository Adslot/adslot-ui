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

var _utils = require("../../lib/utils");

var _Checkbox = _interopRequireWildcard(require("../Checkbox"));

var _CheckboxGroupContext = _interopRequireWildcard(require("./CheckboxGroupContext"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const CheckboxGroupItem = _ref => {
  let {
    value,
    ...rest
  } = _ref;
  const groupCtx = (0, _CheckboxGroupContext.useCheckboxGroup)();
  (0, _utils.invariant)(!_lodash.default.isEmpty(groupCtx), 'CheckboxGroup.Item: must be used as children of CheckboxGroup');
  (0, _utils.invariant)(!rest.name, 'CheckboxGroup.Item: name will be overridden by CheckboxGroup name');
  (0, _utils.invariant)(!rest.variant, 'CheckboxGroup.Item: variant will be overridden by CheckboxGroup variant');
  (0, _utils.invariant)(!rest.onChange, 'CheckboxGroup.Item: onChange will be overridden by CheckboxGroup onChange');
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

CheckboxGroupItem.propTypes = { ..._Checkbox.shareCheckboxPropTypes
};

const CheckboxGroupAll = _ref2 => {
  let {
    className,
    label = 'All',
    values,
    ...rest
  } = _ref2;
  const groupCtx = (0, _CheckboxGroupContext.useCheckboxGroup)();
  (0, _utils.invariant)(!_lodash.default.isEmpty(groupCtx), 'CheckboxGroup.All: must be used as children of CheckboxGroup');
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

const CheckboxGroup = _ref3 => {
  let {
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
  } = _ref3;
  const parentCtx = (0, _CheckboxGroupContext.useCheckboxGroup)();
  const isNested = !_lodash.default.isEmpty(parentCtx);
  (0, _utils.invariant)(isNested || Array.isArray(value), 'CheckboxGroup: must have an array as value');
  (0, _utils.invariant)(!inline, 'CheckboxGroup: the inline prop has been replaced by orientation="vertical"');
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
var _default = CheckboxGroup;
exports.default = _default;