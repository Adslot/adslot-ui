import React from 'react';
import Select, { components } from 'react-select';
import caretIcon from '../../../styles/icons/caret.svg';
import defaultStyle from './styles';

const componentBaseClass = 'select-component';

const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <img src={caretIcon} />
  </components.DropdownIndicator>
);

const ClearIndicator = props => <components.ClearIndicator {...props}>✕</components.ClearIndicator>;

// The propType for this component should be the same as 'React-Select` lib
const SelectComponent = props => (
  <Select
    components={{ DropdownIndicator, ClearIndicator }}
    className={componentBaseClass}
    classNamePrefix={componentBaseClass}
    styles={defaultStyle}
    {...props}
  />
);

export default SelectComponent;
