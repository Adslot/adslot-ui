import React from 'react';
import PropTypes from 'prop-types';
import cc from 'classnames';
import { expandDts } from '../../utils';
import invariant from '../../invariant';
import Popover from '../Popover';
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
    prefill,

    maxLength,
    className,
    variant = 'default',
    isLoading = false,
    dts,
    ...rest
  },
  inputRef
) {
  invariant(
    [placeholder, prefill].filter(Boolean).length <= 1,
    'TextInput: use either one of `placeholder` or `prefill`.'
  );

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
        placeholder={prefill || placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onInput={(event) => {
          setInternalValue(event.currentTarget.value);
          onInput?.(event);
        }}
        onFocus={(event) => {
          // prefill content and move cursor to the end
          if (prefill && !getValue()) {
            const target = event.currentTarget;
            event.currentTarget.value = prefill;
            onChange?.(event);
            target.selectionStart = target.selectionEnd = prefill.length;
          }
          onFocus?.(event);
        }}
      />
      {!isLoading ? null : <Spinner size="small" />}
      {!maxLength ? null : (
        <Popover
          theme="dark"
          placement="bottom"
          className="aui-count"
          popoverContent={`${maxLength - getValue().length} characters left`}
        >
          {maxLength - getValue().length}
        </Popover>
      )}
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
  prefill: PropTypes.string,
  maxLength: PropTypes.number,

  className: PropTypes.string,
  variant: PropTypes.oneOf(variants),
  isLoading: PropTypes.bool,
  dts: PropTypes.string,
};

export default TextInput;
