"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCheckboxGroup = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../../lib/utils");

const CheckboxGroupContext = /*#__PURE__*/_react.default.createContext({});

const CheckboxGroupProvider = _ref => {
  let {
    children,
    name,
    value,
    onChange,
    getIsChecked,
    variant
  } = _ref;

  const context = _react.default.useMemo(() => {
    const onCheckboxChange = checkboxValue => {
      const newValues = value.includes(checkboxValue) ? value.filter(item => item !== checkboxValue) : [...value, checkboxValue];
      onChange(newValues, name, checkboxValue);
    };

    const isCheckedHandler = itemValue => {
      if (getIsChecked) {
        return getIsChecked(itemValue, value);
      }

      return value.includes(itemValue);
    };

    return {
      variant,
      value,
      name,
      isCheckedHandler,
      onCheckboxChange
    };
  }, [getIsChecked, value, name, onChange, variant]);

  return /*#__PURE__*/_react.default.createElement(CheckboxGroupContext.Provider, {
    value: context
  }, children);
};

const useCheckboxGroup = () => _react.default.useContext(CheckboxGroupContext);

exports.useCheckboxGroup = useCheckboxGroup;

const CheckboxGroup = _ref2 => {
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
    ...rest
  } = _ref2;
  (0, _utils.invariant)(Array.isArray(value), 'CheckboxGroup: must have an array as value');
  (0, _utils.invariant)(!inline, 'CheckboxGroup: the inline prop has been replaced by orientation="vertical"');
  return /*#__PURE__*/_react.default.createElement(CheckboxGroupProvider, {
    name: name,
    value: value,
    onChange: onChange,
    getIsChecked: getIsChecked,
    variant: variant
  }, /*#__PURE__*/_react.default.createElement("div", Object.assign({}, rest, {
    role: 'group',
    className: (0, _classnames.default)('aui--checkbox-group', className, {
      'is-vertical': orientation === 'vertical',
      'is-default': variant === 'default'
    }),
    dts: dts
  }), children));
};

CheckboxGroup.propTypes = {
  value: _propTypes.default.array.isRequired,
  name: _propTypes.default.string.isRequired,

  /**
   * @function onChange
   * @param {array} newValue - the new checkboxGroup value
   * @param {string} name - the checkbox name
   * @param {string|number} value - the changed checkbox's value
   */
  onChange: _propTypes.default.func.isRequired,

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

  /**
   *  @deprecated use orientation="horizontal" instead
   **/
  inline: _propTypes.default.bool
};
var _default = CheckboxGroup;
exports.default = _default;