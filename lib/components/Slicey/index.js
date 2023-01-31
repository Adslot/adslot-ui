"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _Arc = _interopRequireDefault(require("./Arc"));
var _Donut = _interopRequireDefault(require("./Donut"));
var _Marker = _interopRequireDefault(require("./Marker"));
var _dataProcessor = require("./dataProcessor");
const filterDataset = dataset => _lodash.default.filter(dataset, _ref => {
  let {
    value
  } = _ref;
  return value > 0;
});
const getArcs = datasetForArcs => {
  const total = _lodash.default.sumBy(datasetForArcs, 'value');
  const arcs = new Array(datasetForArcs.length);
  let endAngle = -_dataProcessor.QUARTER;
  let startAngle = 0;
  return _lodash.default.map(arcs, (_undefinedArc, index) => {
    const datum = datasetForArcs[index];
    const angle = _dataProcessor.ROUND * datum.value / total;
    startAngle = endAngle;
    endAngle += angle;
    return {
      label: datum.label,
      id: index,
      largeArcFlag: angle > _dataProcessor.HALF ? 1 : 0,
      x1: (0, _dataProcessor.getPointX)(startAngle),
      y1: (0, _dataProcessor.getPointY)(startAngle),
      x2: (0, _dataProcessor.getPointX)(endAngle),
      y2: (0, _dataProcessor.getPointY)(endAngle)
    };
  });
};

// IE Can't draw a complete circle as an arc, so swap it to a circle element.
const getArcElements = filteredDataset => {
  if (filteredDataset.length > 1) {
    return _lodash.default.map(getArcs(filteredDataset), arc => /*#__PURE__*/_react.default.createElement(_Arc.default, {
      key: arc.id,
      data: arc
    }));
  }
  return /*#__PURE__*/_react.default.createElement("circle", {
    className: `arc-component ${_lodash.default.kebabCase(filteredDataset[0].label)}`,
    r: ".5",
    cx: "0",
    cy: "0"
  });
};
const getSvgProps = diameter => ({
  className: 'slicey-component',
  height: diameter,
  width: diameter,
  viewBox: '-0.5 -0.5 1 1'
});
const Slicey = _ref2 => {
  let {
    dataset,
    diameter,
    donut,
    marker
  } = _ref2;
  const filteredDataset = filterDataset(dataset);
  const donutEl = donut ? /*#__PURE__*/_react.default.createElement(_Donut.default, null) : null;
  const markerEl = marker ? /*#__PURE__*/_react.default.createElement(_Marker.default, {
    fraction: marker
  }) : null;
  if (_lodash.default.isEmpty(filteredDataset)) {
    return /*#__PURE__*/_react.default.createElement("svg", getSvgProps(diameter), /*#__PURE__*/_react.default.createElement("circle", {
      className: "slicey-empty",
      r: ".5",
      cx: "0",
      cy: "0"
    }), markerEl, donutEl);
  }
  return /*#__PURE__*/_react.default.createElement("svg", getSvgProps(diameter), /*#__PURE__*/_react.default.createElement("circle", {
    className: "slicey-background",
    r: ".49",
    cx: "0",
    cy: "0"
  }), getArcElements(filteredDataset), markerEl, donutEl);
};
Slicey.propTypes = {
  /**
   * Slicey will represent all values as percentage of the pie based on the sum of all values.
   * Label will provide a className to each slice as <code>.arc-component-{'${label}'}</code>.
   */
  dataset: _propTypes.default.arrayOf(_propTypes.default.shape({
    label: _propTypes.default.string.isRequired,
    value: _propTypes.default.number.isRequired
  })),
  diameter: _propTypes.default.number,
  /**
   * Add a line across the radius at a set fraction of the whole e.g. .25 for ¼.
   */
  donut: _propTypes.default.bool,
  /**
   * Set to true if you wish the pie chart to have a hollow hole in the centre, like a donut :9
   */
  marker: _propTypes.default.number
};
Slicey.defaultProps = {
  diameter: 100
};
var _default = Slicey;
exports.default = _default;