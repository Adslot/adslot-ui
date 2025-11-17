import React from 'react';
import PropTypes from 'prop-types';
import cc from 'classnames';
import Popover from '../Popover';
import './styles.css';

const sizes = ['small', 'medium'];
const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
const variants = ['default', 'inline'];

const Label = ({ name, label, tooltip, required }) => {
  if (!label) return null;

  const labelNode = (
    <>
      <span className="aui-label">{label}</span>
      {!required ? null : <span className="aui-sub-label">- required</span>}
    </>
  );

  return (
    <label htmlFor={name} className="aui-label-row">
      {tooltip ? (
        <Popover theme="dark" popoverContent={tooltip} placement="bottom">
          {labelNode} <div data-testid="help-icon" className="aui-help-icon" />
        </Popover>
      ) : (
        labelNode
      )}
    </label>
  );
};

Label.propTypes = {
  name: PropTypes.string,
  label: PropTypes.node,
  tooltip: PropTypes.node,
  required: PropTypes.bool,
};

const TextField = ({
  name,
  value,
  onChange,
  onFocus,
  placeholder,
  className,
  maxLength,
  label,
  required = false,
  tooltip,
  variant = 'default',
  size = 'medium',
  color,
  helperText,
  prefill,
  ...rest
}) => {
  // TODO validation:
  // value onChange both
  // either placeholder or prefill
  // tooltip but no label
  const prefilledRef = React.useRef(false);

  return (
    <div
      className={cc(
        'aui--text-field',
        variant !== 'default' && `aui-${variant}`,
        `aui-${size}`,
        color && `aui-${color}`
      )}
    >
      <Label name={name} label={label} tooltip={tooltip} required={required} />
      <div className="aui-text-input">
        <input
          {...rest}
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          placeholder={prefill || placeholder}
          onFocus={(e) => {
            // prefill content and move cursor to the end
            if (prefill && !prefilledRef.current) {
              const target = e.currentTarget;
              target.value = prefill;
              onChange(e);
              setTimeout(() => {
                target.selectionStart = target.selectionEnd = prefill.length;
              }, 0);
              prefilledRef.current = true;
            }
            onFocus?.(e);
          }}
          className={cc('aui-input', className)}
        />
        {!maxLength ? null : (
          <Popover theme="dark" popoverContent={`${maxLength - value.length} characters left`}>
            <span className="aui-count">{maxLength - value.length}</span>
          </Popover>
        )}
      </div>
      <div className="aui-helper-text">{helperText}</div>
    </div>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  className: PropTypes.string,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  label: PropTypes.node,
  required: PropTypes.bool,

  tooltip: PropTypes.node,
  variant: PropTypes.oneOf(variants),
  size: PropTypes.oneOf(sizes),
  color: PropTypes.oneOf(colors),
  helperText: PropTypes.node,
  prefill: PropTypes.string,
};

export default TextField;
