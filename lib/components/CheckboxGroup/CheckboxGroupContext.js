"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCheckboxGroup = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

const CheckboxGroupContext = /*#__PURE__*/_react.default.createContext({});

const useCheckboxGroup = () => _react.default.useContext(CheckboxGroupContext);

exports.useCheckboxGroup = useCheckboxGroup;

const CheckboxGroupProvider = _ref => {
  let {
    children,
    name: nameProp,
    value: valueProp,
    onChange: onChangeProp,
    getIsChecked,
    variant
  } = _ref;
  const parentCtx = useCheckboxGroup();
  const onChange = parentCtx.onChange || onChangeProp;
  const name = parentCtx.name || nameProp;
  const value = parentCtx.value || valueProp;

  const context = _react.default.useMemo(() => {
    const getIsItemChecked = checkboxValue => {
      if (getIsChecked) return getIsChecked(checkboxValue, value);
      return value.includes(checkboxValue);
    };

    const getIsAllChecked = values => {
      const hasUnchecked = values.some(item => !getIsItemChecked(item));
      const hasChecked = values.some(item => getIsItemChecked(item));
      return hasUnchecked && hasChecked ? 'partial' : !hasUnchecked && hasChecked;
    };

    const onItemChange = checkboxValue => {
      const newValues = value.includes(checkboxValue) ? value.filter(item => item !== checkboxValue) : [...value, checkboxValue];
      onChange(newValues, name, checkboxValue);
    };

    const onAllChange = values => () => {
      const isAllChecked = getIsAllChecked(values);

      if (isAllChecked === true) {
        const newValues = value.filter(item => !values.includes(item));
        onChange(newValues, name);
      } else {
        onChange((0, _lodash.default)(value).concat(values).uniq().value(), name);
      }
    };

    return {
      variant,
      value,
      name,
      onChange,
      getIsItemChecked,
      getIsAllChecked,
      onItemChange,
      onAllChange
    };
  }, [getIsChecked, value, name, onChange, variant]);

  return /*#__PURE__*/_react.default.createElement(CheckboxGroupContext.Provider, {
    value: context
  }, children);
};

CheckboxGroupProvider.propTypes = {
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
  variant: _propTypes.default.oneOf(['default', 'box']),
  children: _propTypes.default.node.isRequired
};
var _default = CheckboxGroupProvider;
exports.default = _default;