import PropTypes from 'prop-types';
import React from 'react';
import Spinner from '../Spinner';

var OverlayLoader = function OverlayLoader(_ref) {
  var text = _ref.text,
      top = _ref.top,
      heading = _ref.heading,
      disableBackground = _ref.disableBackground;
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: "aui--overlay-loader ".concat(disableBackground ? 'aui--overlay-loader-disabled' : '')
  }, disableBackground ? {
    onClick: function onClick(event) {
      return event.stopPropagation();
    }
  } : {}), /*#__PURE__*/React.createElement("div", {
    className: "loader",
    style: {
      top: top
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