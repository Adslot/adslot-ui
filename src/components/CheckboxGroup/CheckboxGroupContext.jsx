import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const CheckboxGroupContext = React.createContext({});

export const useCheckboxGroup = () => React.useContext(CheckboxGroupContext);

const CheckboxGroupProvider = ({
  children,
  name: nameProp,
  value: valueProp,
  onChange: onChangeProp,
  getIsChecked,
  variant,
}) => {
  const parentCtx = useCheckboxGroup();

  const valuesRef = React.useRef([]);
  React.useLayoutEffect(() => {
    return () => {
      valuesRef.current = [];
    };
  });

  const onChange = parentCtx.onChange || onChangeProp;
  const name = parentCtx.name || nameProp;
  const value = parentCtx.value || valueProp;

  const context = React.useMemo(() => {
    const getIsItemChecked = (checkboxValue) => {
      if (getIsChecked) return getIsChecked(checkboxValue, value);

      return value.includes(checkboxValue);
    };

    const getIsAllChecked = () => {
      const hasUnchecked = valuesRef.current.some((item) => !getIsItemChecked(item));
      const hasChecked = valuesRef.current.some((item) => getIsItemChecked(item));

      return hasUnchecked && hasChecked ? 'partial' : !hasUnchecked && hasChecked;
    };

    const onItemChange = (checkboxValue) => {
      const newValues = value.includes(checkboxValue)
        ? value.filter((item) => item !== checkboxValue)
        : [...value, checkboxValue];

      onChange(newValues, name, checkboxValue);
    };

    const onAllChange = () => {
      const isAllChecked = getIsAllChecked();
      if (isAllChecked === true) {
        const newValues = value.filter((item) => !valuesRef.current.includes(item));
        onChange(newValues, name);
      } else {
        onChange(_(value).concat(valuesRef.current).uniq().value(), name);
      }
    };

    const recordValue = (checkboxValue) => {
      valuesRef.current.push(checkboxValue);
      parentCtx.recordValue?.(checkboxValue);
    };

    return {
      variant,
      value,
      name,
      onChange,

      getIsItemChecked,
      getIsAllChecked,
      onItemChange,
      onAllChange,
      valuesRef,
      recordValue,
    };
  }, [getIsChecked, value, name, onChange, variant, parentCtx]);

  return <CheckboxGroupContext.Provider value={context}>{children}</CheckboxGroupContext.Provider>;
};

CheckboxGroupProvider.propTypes = {
  value: PropTypes.array,
  name: PropTypes.string,
  /**
   * @function onChange
   * @param {array} newValue - the new checkboxGroup value
   * @param {string} name - the checkbox name
   * @param {string|number} value - the changed checkbox's value
   */
  onChange: PropTypes.func,
  /**
   * @function getIsChecked overrides the default checked state behaviour
   * @param {string|number} itemValue - the checkbox's value
   * @param {array} value - the checkbox group's value
   */
  getIsChecked: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'box']),
  children: PropTypes.node.isRequired,
};

export default CheckboxGroupProvider;
