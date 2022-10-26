import PropTypes from 'prop-types';
import React from 'react';
import Spinner from '../Spinner';

const OverlayLoader = _ref => {
  let {
    text,
    top,
    heading,
    disableBackground
  } = _ref;
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: `aui--overlay-loader ${disableBackground ? 'aui--overlay-loader-disabled' : ''}`
  }, disableBackground ? {
    onClick: event => event.stopPropagation()
  } : {}), /*#__PURE__*/React.createElement("div", {
    className: "loader",
    style: {
      top
    }
  }, /*#__PURE__*/React.createElement(Spinner, {
    size: "medium"
  }), /*#__PURE__*/React.createElement("span", {
    className: "loader-heading"
  }, heading), text && /*#__PURE__*/React.createElement("span", {
    className: "loader-text"
  }, text)));
};

OverlayLoader.defaultProps = {
  heading: 'Loading',
  top: 320,
  disableBackground: false
};
OverlayLoader.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.string,
  top: PropTypes.number,
  disableBackground: PropTypes.bool
};
export default OverlayLoader;