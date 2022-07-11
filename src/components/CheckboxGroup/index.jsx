import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { invariant } from '../../lib/utils';
import '../RadioGroup/style.css';

const CheckboxGroupContext = React.createContext({});

const CheckboxGroupProvider = ({ children, name, value, onChange, getIsChecked, variant }) => {
  const context = React.useMemo(() => {
    const onCheckboxChange = (checkboxValue) => {
      const newValues = value.includes(checkboxValue)
        ? value.filter((item) => item !== checkboxValue)
        : [...value, checkboxValue];

      onChange(newValues, name, checkboxValue);
    };

    const isCheckedHandler = (itemValue) => {
      if (getIsChecked) {
        return getIsChecked(itemValue, value);
      }
      return value.includes(itemValue);
    };

    return {
      variant,
      value,
      name,
      isCheckedHandler,
      onCheckboxChange,
    };
  }, [getIsChecked, value, name, onChange, variant]);

  return <CheckboxGroupContext.Provider value={context}>{children}</CheckboxGroupContext.Provider>;
};

export const useCheckboxGroup = () => React.useContext(CheckboxGroupContext);

const CheckboxGroup = ({
  name,
  value,
  onChange,
  orientation = 'vertical',
  className,
  getIsChecked,
  dts,
  children,
  variant = 'default',
  inline,
  ...rest
}) => {
  invariant(Array.isArray(value), 'CheckboxGroup: must have an array as value');
  invariant(!inline, 'CheckboxGroup: the inline prop has been replaced by orientation="vertical"');

  return (
    <CheckboxGroupProvider name={name} value={value} onChange={onChange} getIsChecked={getIsChecked} variant={variant}>
      <div
        {...rest}
        role={'group'}
        data-testid="checkbox-group-wrapper"
        className={classnames('aui--checkbox-group', className, {
          'is-vertical': orientation === 'vertical',
          'is-default': variant === 'default',
        })}
        dts={dts}
      >
        {children}
      </div>
    </CheckboxGroupProvider>
  );
};

CheckboxGroup.propTypes = {
  value: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  /**
   * @function onChange
   * @param {array} newValue - the new checkboxGroup value
   * @param {string} name - the checkbox name
   * @param {string|number} value - the changed checkbox's value
   */
  onChange: PropTypes.func.isRequired,
  /**
   * @function getIsChecked overrides the default checked state behaviour
   * @param {string|number} itemValue - the checkbox's value
   * @param {array} value - the checkbox group's value
   */
  getIsChecked: PropTypes.func,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dts: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'box']),
  id: PropTypes.string,
  /**
   *  @deprecated use orientation="horizontal" instead
   **/
  inline: PropTypes.bool,
};

export default CheckboxGroup;
