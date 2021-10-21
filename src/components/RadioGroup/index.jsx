import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';

const RadioGroup = ({ className, onChange, children, name, value, inline, id, dts }) => {
  const classNames = classnames(['radio-group-component', className]);

  const onChangeDefault = (event) => {
    const newValue = event.currentTarget.value;
    onChange(newValue);
  };

  const renderChildren = () =>
    React.Children.map(children, (child) => {
      const childProps = _.assign({}, child.props, {
        name: name,
        checked: value === child.props.value,
        onChange: (...args) => {
          child.props.onChange(...args);
          onChangeDefault(...args);
        },
        inline: inline,
      });

      return React.cloneElement(child, childProps);
    });

  return (
    <div data-testid="radio-group-wrapper" id={id} className={classNames} {...expandDts(dts)}>
      {renderChildren()}
    </div>
  );
};

RadioGroup.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onChange: PropTypes.func.isRequired,
  dts: PropTypes.string,
  inline: PropTypes.bool,
};

export default RadioGroup;
