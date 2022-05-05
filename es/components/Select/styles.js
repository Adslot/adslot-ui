import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import * as tokens from '../../../system/dist';
var color = tokens.color;
var borderColor = color.gray.base;
var defaultStyle = {
  option: function option(styles, _ref) {
    var isFocused = _ref.isFocused,
        isSelected = _ref.isSelected,
        isDisabled = _ref.isDisabled,
        isActive = _ref.isActive;
    var backgroundColor;

    switch (true) {
      case isSelected:
        backgroundColor = color.gray.lightest;
        break;

      case isFocused:
        backgroundColor = color.gray.lightest;
        break;

      case isDisabled:
        return styles;

      default:
        backgroundColor = null;
    }

    return _objectSpread(_objectSpread({}, styles), {}, {
      color: 'inherit',
      ':active': {
        backgroundColor: color.gray.lighter
      },
      backgroundColor: backgroundColor
    });
  },
  indicatorSeparator: function indicatorSeparator(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      display: 'none'
    });
  },
  control: function control(styles, state) {
    return _objectSpread(_objectSpread(_objectSpread({}, styles), state.isFocused ? {
      boxShadow: 0,
      ':hover': {
        borderColor: borderColor
      },
      borderColor: borderColor
    } : {}), {}, {
      minHeight: 26,
      borderRadius: 0
    });
  },
  clearIndicator: function clearIndicator(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      padding: '0 4px 0 8px'
    });
  },
  dropdownIndicator: function dropdownIndicator(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      padding: '0 8px 0 4px'
    });
  },
  valueContainer: function valueContainer(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      padding: '0 8px'
    });
  },
  multiValue: function multiValue(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      color: '#fff',
      backgroundColor: color.gray.dark
    });
  },
  multiValueLabel: function multiValueLabel(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      color: '#fff'
    });
  },
  multiValueRemove: function multiValueRemove(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      ':hover': {}
    });
  },
  menu: function menu(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      zIndex: 1060,
      borderRadius: 0,
      marginTop: 4
    });
  },
  noOptionsMessage: function noOptionsMessage(styles) {
    return _objectSpread(_objectSpread({}, styles), {}, {
      textAlign: 'left'
    });
  }
};
export default defaultStyle;