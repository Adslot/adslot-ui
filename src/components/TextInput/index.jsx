import React from 'react';
import PropTypes from 'prop-types';
import cc from 'classnames';
import { expandDts } from '../../utils';
import invariant from '../../invariant';
import Spinner from '../Spinner';
import './styles.css';

const variants = ['default', 'line'];

const TextInput = React.forwardRef(function TextInput(
  {
    defaultValue,
    value,
    onChange,
    onFocus,
    onInput,

    disabled,
    placeholder,
    clickToInsert = false,

    maxLength,
    className,
    variant = 'default',
    isLoading = false,
    dts,
    ...rest
  },
  inputRef
) {
  invariant(!(clickToInsert && !placeholder), 'TextInput: `clickToInsert` must be used with `placeholder`.');

  const [internalValue, setInternalValue] = React.useState(() => defaultValue || '');

  const getValue = () => `${value || internalValue}`;

  return (
    <div
      className={cc(
        'aui--text-input',
        variant !== 'default' && `aui-${variant}`,
        disabled && `aui-disabled`,
        className
      )}
    >
      <input
        type="text"
        {...rest}
        {...expandDts(dts)}
        className="aui-input"
        ref={inputRef}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onInput={(event) => {
          setInternalValue(event.currentTarget.value);
          onInput?.(event);
        }}
        onFocus={(event) => {
          // click to insert placeholder and move cursor to the end
          if (clickToInsert && placeholder && !getValue()) {
            const target = event.currentTarget;
            event.currentTarget.value = placeholder;
            onChange?.(event);
            target.selectionStart = target.selectionEnd = placeholder.length;
          }
          onFocus?.(event);
        }}
      />
      {!isLoading ? null : <Spinner size="small" />}
      {!maxLength ? null : <span className="aui-count">{maxLength - getValue().length} characters left</span>}
    </div>
  );
});

TextInput.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onInput: PropTypes.func,

  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  clickToInsert: PropTypes.bool,
  maxLength: PropTypes.number,

  className: PropTypes.string,
  variant: PropTypes.oneOf(variants),
  isLoading: PropTypes.bool,
  dts: PropTypes.string,
};

export default TextInput;
