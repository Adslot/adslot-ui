import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import { expandDts } from '../../lib/utils';
import { checkboxPropTypes } from '../../prop-types/inputPropTypes';
import './styles.scss';

const getNextState = checked => {
  if (checked === 'partial') return false;
  return !checked;
};

const Checkbox = ({ name, value, label, dts, disabled, checked, id, className, inline, onChange, size }) => {
  const componentClassName = classnames([
    'checkbox-component',
    {
      'checkbox-component-inline': inline,
      checked: checked === true,
      'partial-checked': checked === 'partial',
      disabled,
    },
    className,
  ]);

  const handleChange = () => onChange(getNextState(checked), name, value);

  return (
    <div className={componentClassName} {...expandDts(dts)}>
      <label>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          value={value}
          id={id}
          className={className}
        />
        <div className="checkbox-component-icon" style={{ width: size, height: size }} />
        {label ? (
          <div className="checkbox-component-label" style={{ lineHeight: `${size}px` }}>
            {label}
          </div>
        ) : null}
      </label>
    </div>
  );
};

Checkbox.propTypes = checkboxPropTypes;
Checkbox.defaultProps = {
  dts: '',
  disabled: false,
  checked: false,
  onChange: _.noop,
  size: 16,
};

export default Checkbox;
