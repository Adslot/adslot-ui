import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { expandDts, invariant } from '../../lib/utils';
import { useRadioGroup } from '../RadioGroup';
import './styles.css';

const SELECTION_KEYS = ['Enter', ' '];

const Radio = ({
  id,
  value,
  name,
  className,
  label,
  disabled,
  checked: checkedProp,
  onChange,
  text,
  icon,
  dts,
  inline,
  ...rest
}) => {
  const { onChange: onGroupChange, value: groupValue, variant = 'default', name: radioName = name } = useRadioGroup();

  invariant(!inline, 'Radio inline prop has been deprecated.');
  invariant(!(onChange && onGroupChange), 'Radio should not have onChange when used in a RadioGroup');
  invariant(!((icon || text) && variant !== 'box'), 'Radio with icon or text must use box variant.');
  invariant(!(groupValue && checkedProp), 'Radio checked state is handled by RadioGroup.');

  const checked = groupValue ? value === groupValue : checkedProp;

  const iconClassName = classnames(['aui--radio-input-icon', { checked, disabled }]);

  const handleChange = () => {
    onGroupChange?.(value);
    onChange?.(value);
  };

  return (
    <div
      {...rest}
      data-testid="radio-wrapper"
      role="radio"
      aria-disabled={disabled ? 'true' : undefined}
      aria-checked={checked ? 'true' : 'false'}
      className={classnames(
        'aui--radio',
        {
          'aui--radio-box': variant === 'box',
          'aui--radio-default': variant === 'default',
          'is-reverse': icon,
          'is-selected': checked,
          'is-disabled': disabled,
          'has-text': text != null,
        },
        className
      )}
      data-aui-value={value}
      tabIndex={!groupValue ? 0 : checked || groupValue.length === 0 ? 0 : -1}
      onKeyDown={(event) => {
        if (SELECTION_KEYS.includes(event.key) && !checked) {
          event.preventDefault();
          handleChange();
        }
      }}
      {...expandDts(dts)}
    >
      <label htmlFor={id}>
        <div className="aui--radio-input-container">
          <span className={iconClassName} />
          <input
            data-testid="radio-input"
            type="radio"
            name={radioName}
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
            value={value}
            id={id}
          />
        </div>

        {label && (
          <div className="aui--radio-label">
            {icon && <div className="aui--radio-icon">{icon}</div>}
            <div>
              <div className="aui--radio-label-text">{label}</div>
              {text && <div className="aui--radio-text">{text}</div>}
            </div>
          </div>
        )}
      </label>
    </div>
  );
};

Radio.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.node,
  /**
   * additional text description to display below the label
   */
  text: PropTypes.node,
  /**
   * icon to display beside the label when parent group's `variant="box"`
   */
  icon: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dts: PropTypes.string,
  disabled: PropTypes.bool,
  /**
   * @function onChange called when radio onChange event is fired
   * @param {string|number} value - the radio value
   */
  onChange: PropTypes.func,
  /**
   * checked status of the radio input
   */
  checked: PropTypes.bool,
  /**
   * @deprecated
   */
  inline: PropTypes.bool,
};

Radio.defaultProps = {
  dts: '',
  disabled: false,
  checked: false,
};

export default Radio;
