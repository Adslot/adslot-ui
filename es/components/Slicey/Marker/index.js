import React from 'react';
import PropTypes from 'prop-types';
import { ROUND, QUARTER, getPointX, getPointY } from '../dataProcessor';
const Marker = _ref => {
  let {
    fraction
  } = _ref;
  const getMarkerPoints = markerValue => {
    const pointOnCircle = ROUND * markerValue - QUARTER;
    return `${getPointX(pointOnCircle)},${getPointY(pointOnCircle)} 0,0`;
  };
  return /*#__PURE__*/React.createElement("polyline", {
    className: "marker-component",
    points: getMarkerPoints(fraction)
  });
};
Marker.propTypes = {
  fraction: PropTypes.number
};
Marker.defaultProps = {
  fraction: 0
};
export default Marker;