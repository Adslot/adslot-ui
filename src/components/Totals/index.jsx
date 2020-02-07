/* eslint-disable react/no-array-index-key */
import _ from 'lodash';
import { Grid, GridCell, GridRow } from 'adslot-ui';
import React from 'react';
import PropTypes from 'prop-types';

const Totals = ({ toSum, valueFormatter }) => (
  <Grid>
    {_(toSum)
      .reject({ isHidden: true })
      .map((item, index) => (
        <GridRow short horizontalBorder={false} key={index}>
          <GridCell stretch>{item.label}</GridCell>
          <GridCell dts={`${_.kebabCase(item.label)}-value`}>{valueFormatter(item.value)}</GridCell>
        </GridRow>
      ))
      .value()}
    <GridRow short horizontalBorder={false} type="footer">
      <GridCell stretch>Total</GridCell>
      <GridCell dts="total-value">{valueFormatter(_.sumBy(toSum, 'value'))}</GridCell>
    </GridRow>
  </Grid>
);

Totals.displayName = 'TotalsComponent';

Totals.propTypes = {
  /**
   * { label: PropTypes.node, value: PropTypes.number.isRequired, isHidden: PropTypes.bool }
   */
  toSum: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.number.isRequired,
      isHidden: PropTypes.bool,
    })
  ),
  valueFormatter: PropTypes.func,
};

Totals.defaultProps = {
  toSum: [],
  valueFormatter: value => `${value}`,
};

export default Totals;
