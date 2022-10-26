import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { expandDts, invariant } from '../../lib/utils';
import Checkbox, { shareCheckboxPropTypes } from '../Checkbox';
import CheckboxGroupProvider, { useCheckboxGroup } from './CheckboxGroupContext';

const CheckboxGroupItem = _ref => {
  let {
    value,
    ...rest
  } = _ref;
  const groupCtx = useCheckboxGroup();
  invariant(!_.isEmpty(groupCtx), 'CheckboxGroup.Item: must be used as children of CheckboxGroup');
  invariant(!rest.name, 'CheckboxGroup.Item: name will be overridden by CheckboxGroup name');
  invariant(!rest.variant, 'CheckboxGroup.Item: variant will be overridden by CheckboxGroup variant');
  invariant(!rest.onChange, 'CheckboxGroup.Item: onChange will be overridden by CheckboxGroup onChange');
  const {
    onItemChange,
    getIsItemChecked,
    name,
    variant
  } = groupCtx;
  return /*#__PURE__*/React.createElement(Checkbox, Object.assign({}, rest, {
    name: name,
    value: value,
    variant: variant,
    checked: getIsItemChecked(value),
    onChange: () => onItemChange(value)
  }));
};

CheckboxGroupItem.propTypes = { ...shareCheckboxPropTypes
};

const CheckboxGroupAll = _ref2 => {
  let {
    className,
    label = 'All',
    values,
    ...rest
  } = _ref2;
  const groupCtx = useCheckboxGroup();
  invariant(!_.isEmpty(groupCtx), 'CheckboxGroup.All: must be used as children of CheckboxGroup');
  const {
    onAllChange,
    getIsAllChecked,
    name,
    variant
  } = groupCtx;
  return /*#__PURE__*/React.createElement(Checkbox, Object.assign({}, rest, {
    className: classnames(className, 'is-all'),
    name: name,
    label: label,
    checked: getIsAllChecked(values),
    onChange: onAllChange(values),
    variant: variant
  }));
};

CheckboxGroupAll.propTypes = {
  label: PropTypes.node,
  className: PropTypes.string,

  /**
   * a array of values that the All option represent
   */
  values: PropTypes.array.isRequired
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
  const parentCtx = useCheckboxGroup();
  const isNested = !_.isEmpty(parentCtx);
  invariant(isNested || Array.isArray(value), 'CheckboxGroup: must have an array as value');
  invariant(!inline, 'CheckboxGroup: the inline prop has been replaced by orientation="vertical"');
  return /*#__PURE__*/React.createElement(CheckboxGroupProvider, {
    name: name,
    value: value,
    onChange: onChange,
    getIsChecked: getIsChecked,
    variant: variant
  }, /*#__PURE__*/React.createElement("div", Object.assign({}, rest, {
    role: "group",
    className: classnames('aui--checkbox-group', className, {
      'is-vertical': orientation === 'vertical',
      'is-default': variant === 'default',
      'is-indented': isNested && indent
    })
  }, expandDts(dts)), children));
};

CheckboxGroup.propTypes = {
  value: PropTypes.array,
  name: PropTypes.string,

  /**
   * @function onChange
   * @param {array} newValue - the new checkboxGroup value
   * @param {string} name - the checkbox name
   * @param {string|number} value - the changed checkbox's value
   */
  onChange: PropTypes.func,

  /**
   * @function getIsChecked overrides the default checked state behaviour
   * @param {string|number} itemValue - the checkbox's value
   * @param {array} value - the checkbox group's value
   */
  getIsChecked: PropTypes.func,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dts: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'box']),
  id: PropTypes.string,
  indent: PropTypes.bool,

  /**
   *  @deprecated use orientation="horizontal" instead
   **/
  inline: PropTypes.bool
};
CheckboxGroup.Item = CheckboxGroupItem;
CheckboxGroup.All = CheckboxGroupAll;
export { useCheckboxGroup } from './CheckboxGroupContext';
export default CheckboxGroup;