import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Arc from './Arc';
import Donut from './Donut';
import Marker from './Marker';
import { ROUND, HALF, QUARTER, getPointX, getPointY } from './dataProcessor';
import './styles.scss';

const filterDataset = dataset => _.filter(dataset, ({ value }) => value > 0);

const getArcs = datasetForArcs => {
  const total = _.sumBy(datasetForArcs, 'value');

  const arcs = new Array(datasetForArcs.length);
  let endAngle = -QUARTER;
  let startAngle = 0;

  return _.map(arcs, (undefinedArc, index) => {
    const datum = datasetForArcs[index];
    const angle = (ROUND * datum.value) / total;
    startAngle = endAngle;
    endAngle += angle;
    return {
      label: datum.label,
      id: index,
      largeArcFlag: angle > HALF ? 1 : 0,
      x1: getPointX(startAngle),
      y1: getPointY(startAngle),
      x2: getPointX(endAngle),
      y2: getPointY(endAngle),
    };
  });
};

// IE Can't draw a complete circle as an arc, so swap it to a circle element.
const getArcElements = filteredDataset => {
  if (filteredDataset.length > 1) {
    return _.map(getArcs(filteredDataset), arc => <Arc key={arc.id} data={arc} />);
  }

  return (
    <circle
      data-testid="slicey-circle"
      className={`arc-component ${_.kebabCase(filteredDataset[0].label)}`}
      r=".5"
      cx="0"
      cy="0"
    />
  );
};

const getSvgProps = diameter => ({
  className: 'slicey-component',
  height: diameter,
  width: diameter,
  viewBox: '-0.5 -0.5 1 1',
});

const Slicey = ({ dataset, diameter, donut, marker }) => {
  const filteredDataset = filterDataset(dataset);

  const donutEl = donut ? <Donut /> : null;

  const markerEl = marker ? <Marker fraction={marker} /> : null;

  if (_.isEmpty(filteredDataset)) {
    return (
      <svg data-testid="slicey-wrapper" {...getSvgProps(diameter)}>
        <circle data-testid="slicey-circle" className="slicey-empty" r=".5" cx="0" cy="0" />
        {markerEl}
        {donutEl}
      </svg>
    );
  }

  return (
    <svg data-testid="slicey-wrapper" {...getSvgProps(diameter)}>
      <circle data-testid="slicey-circle" className="slicey-background" r=".49" cx="0" cy="0" />
      {getArcElements(filteredDataset)}
      {markerEl}
      {donutEl}
    </svg>
  );
};

Slicey.propTypes = {
  /**
   * Slicey will represent all values as percentage of the pie based on the sum of all values.
   * Label will provide a className to each slice as <code>.arc-component-{'${label}'}</code>.
   */
  dataset: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  diameter: PropTypes.number,
  /**
   * Add a line across the radius at a set fraction of the whole e.g. .25 for ¼.
   */
  donut: PropTypes.bool,
  /**
   * Set to true if you wish the pie chart to have a hollow hole in the centre, like a donut :9
   */
  marker: PropTypes.number,
};

Slicey.defaultProps = {
  diameter: 100,
};

export default Slicey;
