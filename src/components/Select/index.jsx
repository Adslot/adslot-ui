import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { components as originalComponents, createFilter } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import defaultStyle from './styles';
import './styles.css';

const componentBaseClass = 'select-component';

const DropdownIndicator = (props) => (
  <originalComponents.DropdownIndicator {...props}>
    <div className="caret-icon" />
  </originalComponents.DropdownIndicator>
);

const ClearIndicator = (props) => <originalComponents.ClearIndicator {...props}>✕</originalComponents.ClearIndicator>;

const SelectContainer = (props) => {
  return (
    <originalComponents.SelectContainer
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
  const SelectComponent = ({ isInModal = false, components, className, styles, ...rest }) => {
    const customComponents = { SelectContainer, DropdownIndicator, ClearIndicator };

    const selectProps = {
      ...rest,
      components: { ...customComponents, ...components },
      className: classnames(componentBaseClass, className),
      classNamePrefix: rest.classNamePrefix || componentBaseClass,
      styles: { ...defaultStyle, ...styles },
    };

    if (isInModal) {
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
    className: PropTypes.string,
    components: PropTypes.object,
    styles: PropTypes.object,
    isInModal: PropTypes.bool,
  };

  return SelectComponent;
};

const Select = selectComponentBuilder(ReactSelect);

// re-export components so user can customize various components
Select.components = originalComponents;
Select.Creatable = selectComponentBuilder(CreatableSelect);
Select.Async = selectComponentBuilder(AsyncSelect);
Select.AsyncCreatable = selectComponentBuilder(AsyncCreatableSelect);
Select.createFilter = createFilter;

export default Select;
