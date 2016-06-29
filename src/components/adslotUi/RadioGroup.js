import RadioGroupComponent from 'react-icheck/lib/RadioGroup';
import React, { PropTypes } from 'react';

const RadioGroup = (props) =>
  <div data-test-selector={props.dts}>
    <RadioGroupComponent {...props} />
  </div>;

RadioGroup.propTypes = {
  dts: PropTypes.string,
};

export default RadioGroup;
