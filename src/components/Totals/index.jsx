/* eslint-disable react/no-array-index-key */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'components/Grid';
import GridCell from 'components/Grid/Cell';
import GridRow from 'components/Grid/Row';

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
  toSum: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
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
