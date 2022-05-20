import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox';
import { expandDts } from '../../lib/utils';

var CheckboxGroup = function CheckboxGroup(_ref) {
  var id = _ref.id,
      className = _ref.className,
      dts = _ref.dts,
      children = _ref.children,
      value = _ref.value,
      name = _ref.name,
      inline = _ref.inline,
      onChange = _ref.onChange;

  var handleCheckboxChange = function handleCheckboxChange(nextCheckboxState, checkboxName, checkboxValue) {
    var newValues = _.includes(value, checkboxValue) ? value.filter(function (item) {
      return item !== checkboxValue;
    }) : [].concat(_toConsumableArray(value), [checkboxValue]);
    onChange(newValues, name);
  };

  var renderChildren = function renderChildren() {
    return React.Children.map(children, function (child) {
      if (!child) return null;

      if (child.type === Checkbox) {
        var childProps = _objectSpread(_objectSpread({}, child.props), {}, {
          name: name,
          inline: inline,
          checked: _.includes(value, child.props.value),
          onChange: function onChange() {
            var _child$props;

            (_child$props = child.props).onChange.apply(_child$props, arguments);

            handleCheckboxChange.apply(void 0, arguments);
          }
        });

        return /*#__PURE__*/React.createElement(child.type, childProps);
      }

      console.error("ERROR: CheckboxGroup's children should be an array of Checkbox");
      return null;
    });
  };

  var classNames = classnames(['checkbox-group-component', className]);
  return children ? /*#__PURE__*/React.createElement("div", Object.assign({
    id: id,
    className: classNames
  }, expandDts(dts)), renderChildren()) : null;
};

CheckboxGroup.propTypes = {
  /**
   * id for the checkboxGroup input
   */
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,

  /**
   * string array of checked values
   */
  value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,

  /**
   * checkBoxGroup children: oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,

  /**
   * function called when checkBox onChange event is fired
   */
  onChange: PropTypes.func.isRequired,

  /**
   * data-test-selector for the checkboxGroup component
   */
  dts: PropTypes.string,

  /**
   * determines if checkbox-component-inline class is applied or not
   */
  inline: PropTypes.bool
};
export default CheckboxGroup;