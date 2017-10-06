import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class Spinner extends PureComponent {
  render = () => (
    <div className="spinner-component">
      <div className={`spinner spinner-${this.props.size} spinner-colour-style-${this.props.colourStyle}`} />
    </div>
  );
}

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  colourStyle: PropTypes.string,
};

Spinner.defaultProps = {
  size: 'large',
  colourStyle: 'default',
};

export default Spinner;
