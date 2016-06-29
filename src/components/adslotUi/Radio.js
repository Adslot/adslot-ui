import RadioComponent from 'react-icheck/lib/Radio';
import React, { PropTypes } from 'react';

const Radio = (props) =>
  <span data-test-selector={props.dts}>
    <RadioComponent {...props} />
  </span>;

Radio.propTypes = {
  dts: PropTypes.string,
};

export default Radio;
