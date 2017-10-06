import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ROUND, QUARTER, getPointX, getPointY } from 'alexandria/Slicey/dataProcessor';
import './styles.scss';

class Marker extends PureComponent {
  getMarkerPoints = (markerValue) => {
    const pointOnCircle = (ROUND * markerValue) - QUARTER;
    return `${getPointX(pointOnCircle)},${getPointY(pointOnCircle)} 0,0`;
  };

  render = () => <polyline className="marker-component" points={this.getMarkerPoints(this.props.fraction)} />;
}

Marker.displayName = 'AlexandriaSliceyMarkerComponent';

Marker.propTypes = {
  fraction: PropTypes.number,
};
Marker.defaultProps = {
  fraction: 0,
};

export default Marker;
