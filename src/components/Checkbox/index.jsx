import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';
import './styles.scss';

const getNextState = (checked) => {
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
    <div data-testid="checkbox-wrapper" className={componentClassName} {...expandDts(dts)}>
      <label>
        <input
          data-testid="checkbox-input"
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
          <div data-testid="checkbox-label" className="checkbox-component-label" style={{ lineHeight: `${size}px` }}>
            {label}
          </div>
        ) : null}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  /**
   * id for the checkbox input
   */
  id: PropTypes.string,
  className: PropTypes.string,
  /**
   * name for the checkbox input
   */
  name: PropTypes.string,
  /**
   * checkBox label for the checkbox input
   */
  label: PropTypes.node,
  /**
   * checkBox input value
   */
  value: PropTypes.string,
  /**
   * data-test-selector for the checkbox component
   */
  dts: PropTypes.string,
  /**
   * determines if the checkbox is disabled
   */
  disabled: PropTypes.bool,
  /**
   * function called when checkBox onChange event is fired
   */
  onChange: PropTypes.func,
  /**
   * determines if checkbox-component-inline class is applied or not
   */
  inline: PropTypes.bool,
  /**
   * checked status of the input checkBox: oneOf([true, false, 'partial']
   */
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['partial'])]),
  size: PropTypes.number,
};

Checkbox.defaultProps = {
  dts: '',
  disabled: false,
  checked: false,
  onChange: _.noop,
  size: 16,
};

export default Checkbox;
