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
var _reactSelect = _interopRequireWildcard(require("react-select"));
var _creatable = _interopRequireDefault(require("react-select/creatable"));
var _async = _interopRequireDefault(require("react-select/async"));
var _asyncCreatable = _interopRequireDefault(require("react-select/async-creatable"));
var _styles = _interopRequireDefault(require("./styles"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable react/prop-types */

const componentBaseClass = 'select-component';
const DropdownIndicator = props => /*#__PURE__*/_react.default.createElement(_reactSelect.components.DropdownIndicator, props, /*#__PURE__*/_react.default.createElement("div", {
  className: "caret-icon"
}));
const ClearIndicator = props => /*#__PURE__*/_react.default.createElement(_reactSelect.components.ClearIndicator, props, "\u2715");
const SelectContainer = props => {
  return /*#__PURE__*/_react.default.createElement(_reactSelect.components.SelectContainer, Object.assign({}, props, {
    innerProps: {
      ...props.innerProps,
      ...(props.selectProps.dts ? {
        'data-test-selector': props.selectProps.dts
      } : {})
    }
  }));
};

/**
 * The propType for this component should be the same as 'React-Select` lib, plus any special props
 */
const selectComponentBuilder = Component => {
  const SelectComponent = props => {
    const customComponents = {
      SelectContainer,
      DropdownIndicator,
      ClearIndicator
    };
    const selectProps = {
      ..._lodash.default.omit(props, ['components', 'className', 'styles', 'isInModal']),
      components: {
        ...customComponents,
        ...props.components
      },
      className: (0, _classnames.default)(componentBaseClass, props.className),
      classNamePrefix: props.classNamePrefix || componentBaseClass,
      styles: {
        ..._styles.default,
        ...props.styles
      }
    };
    if (props.isInModal) {
      selectProps.menuPortalTarget = document.body;
      selectProps.styles = {
        menuPortal: base => ({
          ...base,
          zIndex: 9999
        }),
        ...selectProps.styles
      };
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
const Select = selectComponentBuilder(_reactSelect.default);

// re-export components so user can customize various components
Select.components = _reactSelect.components;
Select.Creatable = selectComponentBuilder(_creatable.default);
Select.Async = selectComponentBuilder(_async.default);
Select.AsyncCreatable = selectComponentBuilder(_asyncCreatable.default);
Select.createFilter = _reactSelect.createFilter;
var _default = Select;
/* eslint-enable react/prop-types */
exports.default = _default;