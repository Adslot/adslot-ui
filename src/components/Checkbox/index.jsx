import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { expandDts, invariant } from '../../utils';
import './styles.css';

const SELECTION_KEYS = ['Enter', ' '];

const getNextState = (checked) => {
  if (checked === 'partial') return true;
  return !checked;
};

const Checkbox = ({
  name,
  value,
  label,
  dts,
  disabled = false,
  checked = false,
  id,
  className,
  variant = 'default',
  text,
  icon,
  onChange,
  onKeyDown,
  size,
  inline,
  ...rest
}) => {
  invariant(!size, 'Checkbox size prop has been deprecated.');
  invariant(!inline, 'Checkbox inline prop has been deprecated.');
  invariant(!((icon || text) && variant !== 'box'), 'Checkbox with icon or text must use box variant.');

  const handleChange = () => {
    onChange(getNextState(checked), name, value);
  };

  const onCheckboxKeyDown = (event) => {
    if (SELECTION_KEYS.includes(event.key)) {
      event.preventDefault();
      handleChange();
    }
    onKeyDown?.(event);
  };

  const ariaChecked = checked ? 'true' : 'false';

  return (
    <div
      {...rest}
      data-testid="checkbox"
      role="checkbox"
      aria-disabled={disabled ? 'true' : undefined}
      aria-checked={checked === 'partial' ? 'mixed' : ariaChecked}
      className={classnames(
        'aui--checkbox',
        {
          checked: checked === true,
          'partial-checked': checked === 'partial',
          'aui--checkbox-box': variant === 'box',
          'aui--checkbox-default': variant === 'default',
          'is-reverse': icon,
          'is-selected': checked,
          'is-disabled': disabled,
          'has-text': text != null,
          disabled,
        },
        className
      )}
      data-aui-value={value}
      tabIndex={!disabled ? 0 : -1}
      onKeyDown={onCheckboxKeyDown}
      {...expandDts(dts)}
    >
      <label className="aui--checkbox-label-container" htmlFor={id}>
        <input
          className="aui--checkbox-input"
          data-testid="checkbox-input"
          type="checkbox"
          name={name}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          value={value}
          id={id}
        />
        <div className="aui--checkbox-input-icon" />
        {label && (
          <div className="aui--checkbox-label">
            {icon && <div className="aui--checkbox-icon">{icon}</div>}
            <div>
              <div data-testid="checkbox-label" className="aui--checkbox-label-text">
                {label}
              </div>
              {text && <div className="aui--checkbox-text">{text}</div>}
            </div>
          </div>
        )}
      </label>
    </div>
  );
};

export const shareCheckboxPropTypes = {
  /**
   * checkBox input value
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * id for the checkbox input
   */
  id: PropTypes.string,
  className: PropTypes.string,
  /**
   * checkBox label for the checkbox input
   */
  label: PropTypes.node,
  /**
   * additional text description to display below the label
   */
  text: PropTypes.node,
  /**
   * icon to display beside the label when  parent group's `variant="box"`
   */
  icon: PropTypes.node,
  /**
   * data-test-selector for the checkbox component
   */
  dts: PropTypes.string,
  /**
   * determines if the checkbox is disabled
   */
  disabled: PropTypes.bool,
};

Checkbox.propTypes = {
  ...shareCheckboxPropTypes,
  /**
   * name for the checkbox input
   */
  name: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'box']),
  /**
   * @function onChange called when checkBox onChange event is fired
   * @param {string|boolean} nextState - the checked state
   * @param {string} name - the checkbox name
   * @param {string|number} value - the checkbox value
   */
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  /**
   * checked status of the input checkBox: oneOf([true, false, 'partial']
   */
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['partial'])]),
  /**
   * @deprecated
   */
  size: PropTypes.number,
  /**
   * @deprecated
   */
  inline: PropTypes.bool,
};

export default Checkbox;
