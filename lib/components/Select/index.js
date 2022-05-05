"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSelect = _interopRequireWildcard(require("react-select"));

var _creatable = _interopRequireDefault(require("react-select/creatable"));

var _async = _interopRequireDefault(require("react-select/async"));

var _asyncCreatable = _interopRequireDefault(require("react-select/async-creatable"));

var _styles = _interopRequireDefault(require("./styles"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var componentBaseClass = 'select-component';

var DropdownIndicator = function DropdownIndicator(props) {
  return /*#__PURE__*/_react.default.createElement(_reactSelect.components.DropdownIndicator, props, /*#__PURE__*/_react.default.createElement("div", {
    className: "caret-icon"
  }));
};

var ClearIndicator = function ClearIndicator(props) {
  return /*#__PURE__*/_react.default.createElement(_reactSelect.components.ClearIndicator, props, "\u2715");
};

var selectContainerBuilder = function selectContainerBuilder(extraProps) {
  return function (props) {
    var containerProps = _objectSpread(_objectSpread({}, props), {}, {
      innerProps: _objectSpread(_objectSpread({}, props.innerProps), extraProps)
    });

    return /*#__PURE__*/_react.default.createElement(_reactSelect.components.SelectContainer, containerProps);
  };
};
/**
 * The propType for this component should be the same as 'React-Select` lib, plus any special props
 */


var selectComponentBuilder = function selectComponentBuilder(Component) {
  var SelectComponent = function SelectComponent(props) {
    var customComponents = {
      DropdownIndicator: DropdownIndicator,
      ClearIndicator: ClearIndicator
    };

    if (!_lodash.default.isEmpty(props.dts)) {
      customComponents.SelectContainer = selectContainerBuilder({
        'data-test-selector': props.dts
      });
    }

    var selectProps = _objectSpread(_objectSpread({}, _lodash.default.omit(props, ['components', 'className', 'styles', 'dts', 'isInModal'])), {}, {
      components: _objectSpread(_objectSpread({}, customComponents), props.components),
      className: (0, _classnames.default)(componentBaseClass, props.className),
      classNamePrefix: props.classNamePrefix || componentBaseClass,
      styles: _objectSpread(_objectSpread({}, _styles.default), props.styles)
    });

    if (props.isInModal) {
      selectProps.menuPortalTarget = document.body;
      selectProps.styles = _objectSpread({
        menuPortal: function menuPortal(base) {
          return _objectSpread(_objectSpread({}, base), {}, {
            zIndex: 9999
          });
        }
      }, selectProps.styles);
    }

    return /*#__PURE__*/_react.default.createElement(Component, selectProps);
  };

  SelectComponent.propTypes = {
    dts: _propTypes.default.string,
    isInModal: _propTypes.default.bool
  };
  SelectComponent.defaultProps = {
    isInModal: false
  };
  return SelectComponent;
};

var Select = selectComponentBuilder(_reactSelect.default); // re-export components so user can customize various components

Select.components = _reactSelect.components;
Select.Creatable = selectComponentBuilder(_creatable.default);
Select.Async = selectComponentBuilder(_async.default);
Select.AsyncCreatable = selectComponentBuilder(_asyncCreatable.default);
Select.createFilter = _reactSelect.createFilter;
var _default = Select;
/* eslint-enable react/prop-types */

exports.default = _default;