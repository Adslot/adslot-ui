import React from 'react';
import PropTypes from 'prop-types';
import { ROUND, QUARTER, getPointX, getPointY } from '../dataProcessor';
import './styles.css';

const Marker = ({ fraction = 0 }) => {
  const getMarkerPoints = (markerValue) => {
    const pointOnCircle = ROUND * markerValue - QUARTER;
    return `${getPointX(pointOnCircle)},${getPointY(pointOnCircle)} 0,0`;
  };

  return (
    <polyline data-testid="slicey-marker-wrapper" className="marker-component" points={getMarkerPoints(fraction)} />
  );
};

Marker.propTypes = {
  fraction: PropTypes.number,
};

export default Marker;
