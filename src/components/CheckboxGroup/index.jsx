import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import { expandDts } from 'lib/utils';
import { checkboxGroupPropTypes } from 'common-prop-types/inputPropTypes';
import Checkbox from 'components/Checkbox';

const CheckboxGroup = ({ id, className, dts, children, value, name, inline, onChange }) => {
  const handleCheckboxChange = (nextCheckboxState, checkboxName, checkboxValue) => {
    const newValues = _.includes(value, checkboxValue)
      ? value.filter(item => item !== checkboxValue)
      : [...value, checkboxValue];

    onChange(newValues, name);
  };

  const renderChildren = () =>
    React.Children.map(children, child => {
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

  return (
    <div id={id} className={classNames} {...expandDts(dts)}>
      {renderChildren()}
    </div>
  );
};

CheckboxGroup.propTypes = checkboxGroupPropTypes;

export default CheckboxGroup;
