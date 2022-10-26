/* eslint-disable react/no-array-index-key */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '../Grid';
import GridCell from '../Grid/Cell';
import GridRow from '../Grid/Row';

const Totals = _ref => {
  let {
    toSum,
    valueFormatter
  } = _ref;
  return /*#__PURE__*/React.createElement(Grid, null, _(toSum).reject({
    isHidden: true
  }).map((item, index) => /*#__PURE__*/React.createElement(GridRow, {
    short: true,
    horizontalBorder: false,
    key: index
  }, /*#__PURE__*/React.createElement(GridCell, {
    stretch: true
  }, item.label), /*#__PURE__*/React.createElement(GridCell, {
    dts: `${_.kebabCase(item.label)}-value`
  }, valueFormatter(item.value)))).value(), /*#__PURE__*/React.createElement(GridRow, {
    short: true,
    horizontalBorder: false,
    type: "footer"
  }, /*#__PURE__*/React.createElement(GridCell, {
    stretch: true
  }, "Total"), /*#__PURE__*/React.createElement(GridCell, {
    dts: "total-value"
  }, valueFormatter(_.sumBy(toSum, 'value')))));
};

Totals.propTypes = {
  /**
   * { label: PropTypes.node, value: PropTypes.number.isRequired, isHidden: PropTypes.bool }
   */
  toSum: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node,
    value: PropTypes.number.isRequired,
    isHidden: PropTypes.bool
  })),
  valueFormatter: PropTypes.func
};
Totals.defaultProps = {
  toSum: [],
  valueFormatter: value => `${value}`
};
export default Totals;