"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var tokens = _interopRequireWildcard(require("../../../system/dist"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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
var _default = defaultStyle;
exports.default = _default;