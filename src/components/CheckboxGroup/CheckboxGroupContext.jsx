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

  const onChange = parentCtx.onChange || onChangeProp;
  const name = parentCtx.name || nameProp;
  const value = parentCtx.value || valueProp;

  const [disabledValues, setDisabledValues] = React.useState([]);

  const context = React.useMemo(() => {
    const getIsItemChecked = (checkboxValue) => {
      if (getIsChecked) return getIsChecked(checkboxValue, value);

      return value.includes(checkboxValue);
    };

    const getIsAllChecked = (values) => {
      if (_.isEmpty(values)) return false;
      const result = _(values)
        .map((item) => getIsItemChecked(item))
        .uniq()
        .value();
      return result.length === 1 ? result[0] : 'partial';
    };

    const onItemChange = (checkboxValue) => {
      const newValues = value.includes(checkboxValue)
        ? value.filter((item) => item !== checkboxValue)
        : [...value, checkboxValue];

      onChange(newValues, name, checkboxValue);
    };

    const onAllChange = (values) => () => {
      const isAllChecked = getIsAllChecked(values);
      if (isAllChecked === true) {
        const newValues = value.filter((item) => !values.includes(item));
        onChange(newValues, name);
      } else {
        onChange(_(value).concat(values).uniq().value(), name);
      }
    };

    const registerDisabledValue = (disabledValue) => {
      if (!_.includes(disabledValues, disabledValue)) {
        setDisabledValues((prevValues) => [...prevValues, disabledValue]);
      }
    };

    const unregisterDisabledValue = (disabledValue) => {
      if (_.includes(disabledValues, disabledValue)) {
        setDisabledValues((prevValues) => _.filter(prevValues, (v) => v !== disabledValue));
      }
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

      registerDisabledValue,
      unregisterDisabledValue,
      disabledValues,
    };
  }, [getIsChecked, value, name, onChange, variant, disabledValues]);

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
