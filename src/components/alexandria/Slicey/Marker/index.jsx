import React from 'react';
import PropTypes from 'prop-types';
import { ROUND, QUARTER, getPointX, getPointY } from 'alexandria/Slicey/dataProcessor';
import './styles.scss';

const Marker = ({ fraction }) => {
  const getMarkerPoints = markerValue => {
    const pointOnCircle = ROUND * markerValue - QUARTER;
    return `${getPointX(pointOnCircle)},${getPointY(pointOnCircle)} 0,0`;
  };

  return <polyline className="marker-component" points={getMarkerPoints(fraction)} />;
};

Marker.displayName = 'AlexandriaSliceyMarkerComponent';

Marker.propTypes = {
  fraction: PropTypes.number,
};
Marker.defaultProps = {
  fraction: 0,
};

export default Marker;
