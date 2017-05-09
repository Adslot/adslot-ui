import React, { PropTypes } from 'react';

require('styles/alexandria/Spinner.scss');

const Spinner = ({ size, colourStyle }) => (
  <div className="spinner-component">
    <div className={`spinner spinner-${size} spinner-colour-style-${colourStyle}`} />
  </div>
);

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  colourStyle: PropTypes.string,
};

Spinner.defaultProps = {
  size: 'large',
  colourStyle: 'default',
};

export default Spinner;
