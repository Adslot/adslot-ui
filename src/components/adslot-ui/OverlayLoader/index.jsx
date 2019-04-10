import React from 'react';
import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
import { Spinner } from 'alexandria';
import './styles.scss';

const OverlayLoader = ({ text, top, heading, disableBackground }) => (
  <div
    className={`aui--overlay-loader ${disableBackground ? 'aui--overlay-loader-disabled' : ''}`}
    {...(disableBackground ? { onClick: event => event.stopPropagation() } : {})}
  >
    <div className="loader" style={{ top }}>
      <Spinner size="medium" />
      <span className="loader-heading">{heading}</span>
      {text && <span className="loader-text">{text}</span>}
    </div>
  </div>
);

OverlayLoader.defaultProps = {
  heading: 'Loading',
  top: 320,
  disableBackground: false,
};

OverlayLoader.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
  top: PropTypes.number,
  disableBackground: PropTypes.bool,
};

export default OverlayLoader;
