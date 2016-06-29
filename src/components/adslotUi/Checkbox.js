import CheckboxComponent from 'react-icheck/lib/Checkbox';
import React, { PropTypes } from 'react';

const Checkbox = (props) =>
  <span data-test-selector={props.dts}>
    <CheckboxComponent {...props} />
  </span>;

Checkbox.propTypes = {
  dts: PropTypes.string,
};

export default Checkbox;
