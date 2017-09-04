import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import expandDts from 'helpers/expandDtsHelper';

import './styles.scss';

const Checkbox = ({ label, disabled, checked, name, dts, onChange }) => {
  const optional = {};
  if (!_.isUndefined(onChange)) {
    optional.onChange = onChange;
  }
  return (
    <label className="checkbox-component" {...expandDts(dts)}>
      <input
        type="checkbox"
        defaultChecked={checked}
        name={name || _.kebabCase(label)}
        disabled={disabled}
        {...optional}
      /> {label}
    </label>
  );
};

Checkbox.displayName = 'AlexandriaCheckboxComponent';

Checkbox.propTypes = {
  label: PropTypes.any,
  dts: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  name: PropTypes.bool,
  onChange: PropTypes.function,
};

export default Checkbox;
