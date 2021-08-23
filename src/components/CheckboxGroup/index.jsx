import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox';
import { expandDts } from '../../lib/utils';

const CheckboxGroup = ({ id, className, dts, children, value, name, inline, onChange }) => {
  const handleCheckboxChange = (nextCheckboxState, checkboxName, checkboxValue) => {
    const newValues = _.includes(value, checkboxValue)
      ? value.filter((item) => item !== checkboxValue)
      : [...value, checkboxValue];

    onChange(newValues, name);
  };

  const renderChildren = () =>
    React.Children.map(children, (child) => {
      if (!child) return null;

      if (child.type === Checkbox) {
        const childProps = {
          ...child.props,
          name,
          inline,
          checked: _.includes(value, child.props.value),
          onChange: (...args) => {
            child.props.onChange(...args);
            handleCheckboxChange(...args);
          },
        };
        return <child.type {...childProps} />;
      }
      console.error("ERROR: CheckboxGroup's children should be an array of Checkbox");
      return null;
    });
  const classNames = classnames(['checkbox-group-component', className]);

  return children ? (
    <div data-testid="checkbox-group-wrapper" id={id} className={classNames} {...expandDts(dts)}>
      {renderChildren()}
    </div>
  ) : null;
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
  inline: PropTypes.bool,
};

export default CheckboxGroup;
