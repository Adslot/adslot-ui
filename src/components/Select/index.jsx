/* eslint-disable react/prop-types */
import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { components, createFilter } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import defaultStyle from './styles';
import './styles.css';

const componentBaseClass = 'select-component';

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <div className="caret-icon" />
  </components.DropdownIndicator>
);

const ClearIndicator = (props) => <components.ClearIndicator {...props}>✕</components.ClearIndicator>;

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
  const SelectComponent = (props) => {
    const customComponents = { SelectContainer, DropdownIndicator, ClearIndicator };

    const selectProps = {
      ..._.omit(props, ['components', 'className', 'styles', 'isInModal']),
      components: { ...customComponents, ...props.components },
      className: classnames(componentBaseClass, props.className),
      classNamePrefix: props.classNamePrefix || componentBaseClass,
      styles: { ...defaultStyle, ...props.styles },
    };

    if (props.isInModal) {
      selectProps.menuPortalTarget = document.body;
      selectProps.styles = {
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        ...selectProps.styles,
      };
    }

    return <Component {...selectProps} />;
  };

  SelectComponent.propTypes = {
    dts: PropTypes.string,
    isInModal: PropTypes.bool,
  };
  SelectComponent.defaultProps = {
    isInModal: false,
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
/* eslint-enable react/prop-types */
