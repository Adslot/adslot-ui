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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
var _default = exports.default = Select;
/* eslint-enable react/prop-types */