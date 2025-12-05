import React from 'react';
import PropTypes from 'prop-types';
import cc from 'classnames';
import ReactSelect, { components, createFilter } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import getDefaultStyle from './styles';
import './styles.css';

const componentBaseClass = 'select-component';

const ClearIndicator = (props) => <components.ClearIndicator {...props}>✕</components.ClearIndicator>;

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <div className="caret-icon" />
  </components.DropdownIndicator>
);

const IndicatorSeparator = () => null;

const SelectContainer = (props) => {
  return (
    <components.SelectContainer
      {...props}
      innerProps={{
        ...props.innerProps,
        ...(props.selectProps.dts ? { 'data-test-selector': props.selectProps.dts } : {}),
      }}
    />
  );
};

/**
 * The propType for this component should be the same as 'React-Select` lib, plus any special props
 */
const selectComponentBuilder = (Component) => {
  const SelectComponent = ({ isInModal = false, ...rest }) => {
    return (
      <Component
        {...rest}
        components={{
          SelectContainer,
          ClearIndicator,
          IndicatorSeparator,
          DropdownIndicator,
          ...rest.components,
        }}
        className={cc(componentBaseClass, rest.className)}
        classNamePrefix={rest.classNamePrefix || componentBaseClass}
        styles={{
          ...getDefaultStyle({ isInModal }),
          ...rest.styles,
        }}
        {...(isInModal ? { menuPortalTarget: document.body } : {})}
      />
    );
  };

  SelectComponent.propTypes = {
    dts: PropTypes.string,
    isInModal: PropTypes.bool,
  };

  return SelectComponent;
};

const Select = selectComponentBuilder(ReactSelect);

// re-export components so user can customize various components
Select.components = components;
Select.Creatable = selectComponentBuilder(CreatableSelect);
Select.Async = selectComponentBuilder(AsyncSelect);
Select.AsyncCreatable = selectComponentBuilder(AsyncCreatableSelect);
Select.createFilter = createFilter;

export default Select;
