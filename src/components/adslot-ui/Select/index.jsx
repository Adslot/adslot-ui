/* eslint-disable react/prop-types */
import _ from 'lodash';
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Select, { components, createFilter } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import defaultStyle from './styles';
import './styles.scss';

const componentBaseClass = 'select-component';

const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <div className="caret-icon" />
  </components.DropdownIndicator>
);

const ClearIndicator = props => <components.ClearIndicator {...props}>✕</components.ClearIndicator>;

const selectContainerBuilder = extraProps => props => {
  const containerProps = {
    ...props,
    innerProps: {
      ...props.innerProps,
      ...extraProps,
    },
  };

  return <components.SelectContainer {...containerProps} />;
};

/**
 * The propType for this component should be the same as 'React-Select` lib, plus any special props
 */
const selectComponentBuilder = Component => {
  const SelectComponent = props => {
    const customComponents = { DropdownIndicator, ClearIndicator };

    if (!_.isEmpty(props.dts)) {
      customComponents.SelectContainer = selectContainerBuilder({ 'data-test-selector': props.dts });
    }

    const selectProps = {
      ..._.omit(props, ['components', 'className', 'styles', 'dts', 'isInModal']),
      components: { ...customComponents, ...props.components },
      className: classnames(componentBaseClass, props.className),
      classNamePrefix: props.classNamePrefix || componentBaseClass,
      styles: { ...defaultStyle, ...props.styles },
    };

    if (props.isInModal) {
      selectProps.menuPortalTarget = document.body;
      selectProps.styles = {
        menuPortal: base => ({ ...base, zIndex: 9999 }),
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

const SelectComponent = selectComponentBuilder(Select);

// re-export components so user can customize various components
SelectComponent.components = components;
SelectComponent.Creatable = selectComponentBuilder(CreatableSelect);
SelectComponent.Async = selectComponentBuilder(AsyncSelect);
SelectComponent.AsyncCreatable = selectComponentBuilder(AsyncCreatableSelect);
SelectComponent.createFilter = createFilter;

export default SelectComponent;
/* eslint-enable react/prop-types */
