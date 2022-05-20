import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/* eslint-disable react/prop-types */
import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { components, createFilter } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import defaultStyle from './styles';
var componentBaseClass = 'select-component';

var DropdownIndicator = function DropdownIndicator(props) {
  return /*#__PURE__*/React.createElement(components.DropdownIndicator, props, /*#__PURE__*/React.createElement("div", {
    className: "caret-icon"
  }));
};

var ClearIndicator = function ClearIndicator(props) {
  return /*#__PURE__*/React.createElement(components.ClearIndicator, props, "\u2715");
};

var selectContainerBuilder = function selectContainerBuilder(extraProps) {
  return function (props) {
    var containerProps = _objectSpread(_objectSpread({}, props), {}, {
      innerProps: _objectSpread(_objectSpread({}, props.innerProps), extraProps)
    });

    return /*#__PURE__*/React.createElement(components.SelectContainer, containerProps);
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

    if (!_.isEmpty(props.dts)) {
      customComponents.SelectContainer = selectContainerBuilder({
        'data-test-selector': props.dts
      });
    }

    var selectProps = _objectSpread(_objectSpread({}, _.omit(props, ['components', 'className', 'styles', 'dts', 'isInModal'])), {}, {
      components: _objectSpread(_objectSpread({}, customComponents), props.components),
      className: classnames(componentBaseClass, props.className),
      classNamePrefix: props.classNamePrefix || componentBaseClass,
      styles: _objectSpread(_objectSpread({}, defaultStyle), props.styles)
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

    return /*#__PURE__*/React.createElement(Component, selectProps);
  };

  SelectComponent.propTypes = {
    dts: PropTypes.string,
    isInModal: PropTypes.bool
  };
  SelectComponent.defaultProps = {
    isInModal: false
  };
  return SelectComponent;
};

var Select = selectComponentBuilder(ReactSelect); // re-export components so user can customize various components

Select.components = components;
Select.Creatable = selectComponentBuilder(CreatableSelect);
Select.Async = selectComponentBuilder(AsyncSelect);
Select.AsyncCreatable = selectComponentBuilder(AsyncCreatableSelect);
Select.createFilter = createFilter;
export default Select;
/* eslint-enable react/prop-types */